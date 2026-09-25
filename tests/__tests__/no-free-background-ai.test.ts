/**
 * No background path spends the shared free-tier AI key.
 *
 * George, 2026-09-25: free-tier keys are spent only when a person deliberately
 * asks. `/api/rebuild` runs daily from a box timer (appcron-botsmann-rebuild),
 * `/api/warmup` exists to be called by a cron/uptime check, and `/api/health`
 * is polled by monitors. None of them may reach a model client. This walks the
 * import graph from each and fails if anything reachable imports the model
 * modules or calls ai-kit's completion functions.
 *
 * The walker is tested on a synthetic graph first, so a walker that finds
 * nothing cannot pass for a clean tree.
 */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const ROOT = process.cwd();

/** Entry points that run with nobody waiting on an answer. */
const BACKGROUND = [
  'app/api/rebuild/route.ts',
  'app/api/warmup/route.ts',
  'app/api/health/route.ts',
];
/** Modules that call a model on the shared key. */
const MODEL_MODULES = /^lib\/(llm-client|nlp|ai-liveness|context\/extractor)\.ts$/;
const AI_KIT_CALLS = /\b(complete|completeStream|tryChain|freeChain|usableChain|transcribe)\b/;

type Source = (path: string) => string | null;

function importsOf(code: string): { spec: string; names: string }[] {
  const out: { spec: string; names: string }[] = [];
  const re =
    /(?:import|export)\s*(?:type\s+)?([^'";]*?)\s*from\s*['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)|import\s+['"]([^'"]+)['"]/g;
  for (const m of code.matchAll(re)) out.push({ spec: m[2] ?? m[3] ?? m[4], names: m[1] ?? '*' });
  return out;
}

function resolveSpec(from: string, spec: string, read: Source): string | null {
  let base: string;
  if (spec.startsWith('@/')) base = spec.slice(2);
  else if (spec.startsWith('.')) base = relative(ROOT, resolve(ROOT, dirname(from), spec));
  else return null;
  for (const c of [base, `${base}.ts`, `${base}.tsx`, `${base}/index.ts`]) {
    if (/\.(ts|tsx)$/.test(c) && read(c) !== null) return c;
  }
  return null;
}

function violations(entries: string[], read: Source): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();
  const queue = [...entries];
  while (queue.length) {
    const path = queue.shift()!;
    if (seen.has(path)) continue;
    seen.add(path);
    const code = read(path);
    if (code === null) continue;
    if (MODEL_MODULES.test(path)) problems.push(`${path}: a model client`);
    for (const { spec, names } of importsOf(code)) {
      if (/^import\s+type\b/.test(names) || /^type\s/.test(names)) continue;
      if (spec.startsWith('@bitbaum/ai-kit') && AI_KIT_CALLS.test(names))
        problems.push(`${path}: imports ${names.trim()} from ${spec}`);
      const next = resolveSpec(path, spec, read);
      if (next) queue.push(next);
    }
  }
  return problems;
}

const fromDisk: Source = (path) => {
  const abs = join(ROOT, path);
  return existsSync(abs) && statSync(abs).isFile() ? readFileSync(abs, 'utf8') : null;
};

describe('no background path reaches the free-tier models', () => {
  it('the walker fires on each way a model could come back (it can fail)', () => {
    const tree: Record<string, string> = {
      'app/api/cron/a/route.ts': "import { run } from '@/lib/job';",
      'lib/job.ts': "import { helper } from './helper';",
      'lib/helper.ts': "import { generateLLMResponse } from '@/lib/llm-client';",
      'lib/llm-client.ts': 'export const x = 1;',
      'app/api/cron/b/route.ts': "const m = import('../../../../lib/direct');",
      'lib/direct.ts': "import {\n  complete,\n} from '@bitbaum/ai-kit';",
    };
    const found = violations(['app/api/cron/a/route.ts', 'app/api/cron/b/route.ts'], (p) =>
      p in tree ? tree[p] : null,
    );
    expect(found.some((f) => f.startsWith('lib/llm-client.ts'))).toBe(true);
    expect(found.some((f) => f.startsWith('lib/direct.ts') && f.includes('complete'))).toBe(true);
  });

  it('no timer, warmup or health route can reach a model', () => {
    for (const entry of BACKGROUND) expect(fromDisk(entry)).not.toBeNull();
    expect(violations(BACKGROUND, fromDisk)).toEqual([]);
  });
});
