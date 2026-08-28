/**
 * Guard: the brand palette lives in app/globals.css, and nowhere else.
 *
 * globals.css defines the identity -- editorial ink, one ochre accent -- and
 * says so plainly: "No generic AI gradient blue/purple." The product ignored it
 * anyway. A single viewport of a bot page once showed a blue logo, a blue nav
 * button and an ochre CTA at the same time, because four different files each
 * believed they owned colour.
 *
 * Components may only use semantic classes (bg-action, text-ink, border-edge...)
 * which tailwind.config maps to the CSS custom properties. Raw palette classes
 * are how the drift started, so they are refused here.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, sep } from 'path';

const ROOT = process.cwd();

/** Raw Tailwind palette hues that would compete with the brand accent. */
const BRAND_HUES = 'blue|purple|indigo|violet|cyan|pink|fuchsia|sky|teal';
const RAW_CLASS = new RegExp(
  `\\b(?:from|via|to|bg|text|border|ring|divide|outline|shadow|accent|decoration)-(?:${BRAND_HUES})-\\d{2,3}\\b`,
  'g',
);

/**
 * Surfaces where a user picks their own bot's colour. custom_bots.accent_color
 * is a real column with a CHECK constraint -- that is user data, not a design
 * token, so the per-colour class maps legitimately live here.
 */
const CUSTOM_BOT_SURFACES = [
  join('app', 'bots', 'custom'),
  join('app', 'bots', 'mine'),
  join('app', 'bots', 'create'),
  join('components', 'bot-builder'),
  join('components', 'shared', 'quick-create'),
  join('lib', 'config', 'colors.ts'),
];

/** Semantic status colours are a separate scale from the brand accent. */
const SEMANTIC_FILES = [join('components', 'knowledge', 'Callout.tsx')];

function tsxFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...tsxFiles(full));
    else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) out.push(full);
  }
  return out;
}

function isAllowed(rel: string): boolean {
  const norm = rel.split('/').join(sep);
  return (
    CUSTOM_BOT_SURFACES.some((p) => norm.startsWith(p)) || SEMANTIC_FILES.some((p) => norm === p)
  );
}

describe('design tokens', () => {
  const files = [...tsxFiles(join(ROOT, 'app')), ...tsxFiles(join(ROOT, 'components'))];

  it('scans a meaningful number of files', () => {
    expect(files.length).toBeGreaterThan(100);
  });

  it('no component uses a raw brand-palette class', () => {
    const offenders: string[] = [];

    for (const file of files) {
      const rel = relative(ROOT, file);
      if (isAllowed(rel)) continue;

      const matches = readFileSync(file, 'utf-8').match(RAW_CLASS);
      if (matches) offenders.push(`${rel}: ${[...new Set(matches)].join(', ')}`);
    }

    expect(offenders).toEqual([]);
  });

  it('no gradient is clipped to text (the identity is carried by type, not gradients)', () => {
    const offenders = files
      .filter((f) => !isAllowed(relative(ROOT, f)))
      .filter((f) => readFileSync(f, 'utf-8').includes('bg-clip-text'))
      .map((f) => relative(ROOT, f));

    expect(offenders).toEqual([]);
  });
});
