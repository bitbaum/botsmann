import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseFrontmatter } from 'bip-kit';
import { parseLongform } from '@/lib/longform/parse';

/**
 * The content collection is committed, so it is the trust boundary — and
 * bip-kit is deliberately strict there: a malformed chart or stats fence
 * THROWS at parse time rather than silently rendering nothing. Without a
 * test, a bad fence in a new guide would only surface as a 500 on the live
 * page (or a failed build, if you were lucky enough to have it prerendered).
 *
 * This walks every file the two content surfaces can serve and asserts the
 * pipeline the pages actually use — same normalizer, same parser, same TOC
 * derivation — produces something renderable.
 */

const CONTENT = join(process.cwd(), 'content');

function markdownFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) out.push(...markdownFiles(path));
    else if (entry.endsWith('.md')) out.push(path);
  }
  return out;
}

const files = markdownFiles(CONTENT);

describe('content collection', () => {
  it('has content to serve', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files.map((f) => [f.slice(CONTENT.length + 1), f]))(
    '%s parses into renderable blocks',
    (_name, path) => {
      const { meta, body } = parseFrontmatter(readFileSync(path, 'utf8'));

      // Every file must declare its publication state explicitly: the loaders
      // ship a file only on `published: true`, so a typo here silently hides
      // a post rather than failing anything.
      expect(['true', 'false']).toContain(meta.published);
      expect(meta.title).toBeTruthy();

      const { blocks, toc, readingMinutes } = parseLongform(body);
      expect(blocks.length).toBeGreaterThan(0);
      expect(readingMinutes).toBeGreaterThan(0);

      // Anchors are only useful if they are unique — a duplicated heading id
      // makes the TOC jump to the wrong section.
      const ids = toc.map((entry) => entry.id);
      expect(new Set(ids).size).toBe(ids.length);
    },
  );

  it('leaves no MDX component tags behind', () => {
    // The old sources carried JSX (<Callout>, <YouTube>, <Tweet>, <Img>).
    // bip-kit renders markdown only, so a stray tag would now print as
    // literal text in the middle of a paragraph instead of a component.
    for (const path of files) {
      const body = parseFrontmatter(readFileSync(path, 'utf8')).body;
      const outsideFences = body.replace(/```[\s\S]*?```/g, '');
      expect(outsideFences).not.toMatch(/<\/?[A-Z][A-Za-z0-9]*[\s/>]/);
    }
  });
});
