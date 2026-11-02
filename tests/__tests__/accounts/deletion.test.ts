// @vitest-environment node
/**
 * A deleted account takes every row that was keyed on the person: each table
 * whose column referenced auth.users before migration 013 (whose cascade did
 * this job then) is in PERSON_ROWS, under that column.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

vi.mock('server-only', () => ({}));

const dir = join(process.cwd(), 'supabase/migrations');
const referencing = new Map<string, string>();
for (const file of readdirSync(dir).filter((f) => f.endsWith('.sql'))) {
  const sql = readFileSync(join(dir, file), 'utf8');
  for (const table of sql.matchAll(/CREATE TABLE IF NOT EXISTS (\w+) \(([\s\S]*?)\n\);/g)) {
    const column = table[2].match(/^\s*(\w+)\s+UUID[^\n]*REFERENCES auth\.users/m);
    if (column) referencing.set(table[1], column[1]);
  }
}

describe('account deletion', () => {
  it('removes the rows of every table that referenced auth.users', async () => {
    const { PERSON_ROWS } = await import('@/lib/accounts/deletion');
    expect(referencing.size).toBeGreaterThan(5);
    const covered = new Map(PERSON_ROWS.map((r) => [r.table, r.column]));
    for (const [table, column] of referencing) expect(covered.get(table), table).toBe(column);
  });
});
