/**
 * Guard: every route that spends money must be rate limited.
 *
 * Two routes once shipped without a limit — app/api/demo/chat (public and
 * unauthenticated) and app/api/custom-bots/[id]/chat (anonymous callers, billed
 * to the bot OWNER's key). Nothing failed, because nothing was checking. This
 * test is that check: it reads the route files and fails on the next omission
 * rather than after the next bill.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const API_DIR = join(process.cwd(), 'app', 'api');

/** Routes that call an LLM provider and therefore cost money per request. */
const LLM_IMPORT = /from '@\/lib\/llm-client'/;

/** Routes deliberately exempt, each with the reason it is safe. */
const EXEMPT: Record<string, string> = {
  'consultations/route.ts': 'API-key gated and rate limited on a global key (see lib/rate-limit)',
};

function routeFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...routeFiles(full));
    else if (entry === 'route.ts') out.push(full);
  }
  return out;
}

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

describe('rate limit coverage', () => {
  const files = routeFiles(API_DIR);

  it('finds the API routes', () => {
    expect(files.length).toBeGreaterThan(20);
  });

  it('every LLM-calling route enforces a rate limit', () => {
    const unprotected: string[] = [];

    for (const file of files) {
      const rel = file.slice(API_DIR.length + 1);
      if (EXEMPT[rel]) continue;

      const source = stripComments(readFileSync(file, 'utf-8'));
      if (!LLM_IMPORT.test(source)) continue;

      const enforced = /enforceRateLimit\s*\(/.test(source);
      if (!enforced) unprotected.push(rel);
    }

    expect(unprotected).toEqual([]);
  });

  it('rate limits come from the shared SSOT, not inline magic numbers', () => {
    const offenders: string[] = [];

    for (const file of files) {
      const source = stripComments(readFileSync(file, 'utf-8'));
      // checkRateLimit takes raw (key, max, window) — routes must not call it
      // directly, or the budget stops living in one place.
      if (/\bcheckRateLimit\s*\(/.test(source)) {
        offenders.push(file.slice(API_DIR.length + 1));
      }
    }

    expect(offenders).toEqual(Object.keys(EXEMPT).filter((f) => offenders.includes(f)));
  });
});
