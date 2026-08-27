/**
 * Every Supabase client must be told which schema we live in.
 *
 * Botsmann shares one self-hosted Supabase database with orangecat. orangecat
 * owns `public`; our tables are in `botsmann`. A client created without
 * `db: { schema }` silently queries orangecat's schema and gets PGRST205
 * "Could not find the table" — which is exactly the 503 /api/health served for
 * months while eleven migrations sat unapplied.
 *
 * The failure is silent at compile time and at review time: the call looks
 * completely ordinary. So it is pinned here, per file, by count — adding a new
 * client factory without a schema fails this test rather than production.
 */

import { readFileSync } from 'fs';
import { join } from 'path';

import { DB_SCHEMA } from '@/lib/constants';

const ROOT = join(__dirname, '..', '..', '..');

// Comments are where someone documents the very call they are about to write,
// so counting them as code makes this guard lie in both directions.
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

const CLIENT_FILES = ['lib/supabase.ts', 'lib/supabase-server.ts'];

const CREATE_CALL = /\bcreate(?:Browser|Server)?Client\s*\(/g;
const SCHEMA_OPT = /db:\s*\{\s*schema:\s*DB_SCHEMA\s*\}/g;

describe('every Supabase client is scoped to our schema', () => {
  it('names a schema that is not public', () => {
    expect(DB_SCHEMA).toBe('botsmann');
    expect(DB_SCHEMA).not.toBe('public');
  });

  it.each(CLIENT_FILES)('%s scopes every client it creates', (rel) => {
    const code = stripComments(readFileSync(join(ROOT, rel), 'utf-8'));

    // The import itself is a `createClient(` -free line, but be explicit: only
    // call sites count, not the `import { createClient }` statement.
    const calls = (code.match(CREATE_CALL) ?? []).length;
    const scoped = (code.match(SCHEMA_OPT) ?? []).length;

    expect(calls).toBeGreaterThan(0);
    expect(scoped).toBe(calls);
  });

  it('uses the shared constant rather than a literal, in every client file', () => {
    for (const rel of CLIENT_FILES) {
      const code = stripComments(readFileSync(join(ROOT, rel), 'utf-8'));
      expect(code).toContain('import { DB_SCHEMA }');
      // A second source of truth is how the first one goes stale.
      expect(code).not.toMatch(/schema:\s*['"`]botsmann['"`]/);
    }
  });

  it('leaves no hand-rolled migration runner that would write to public', () => {
    // These applied SQL through the service-role client with no schema set, so
    // they would create our tables inside orangecat's `public`. Schema is the
    // deploy pipeline's job now (fleetcrown apply-schema.sh, `supabase:botsmann`).
    for (const gone of ['scripts/run-migration.ts', 'scripts/migrate-via-api.ts']) {
      expect(() => readFileSync(join(ROOT, gone), 'utf-8')).toThrow();
    }
  });
});
