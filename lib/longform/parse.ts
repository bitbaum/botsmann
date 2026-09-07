/**
 * The ONE long-form markdown pipeline. Both surfaces — the blog
 * (content/blog/*.md) and the Knowledge Center (content/knowledge/**\/*.md) —
 * parse through bip-kit's typed-block parser and render through its reference
 * renderer (lib/longform/LongformBody).
 *
 * Typed blocks are the security model: markdown becomes a discriminated
 * union and the renderer emits React elements from typed data, so there is no
 * HTML/JSX passthrough for content to hide in. That is what let the MDX stack
 * (next-mdx-remote + remark/rehype + a hand-rolled component map per surface)
 * go away — an MDX file could evaluate arbitrary JSX; a markdown file cannot.
 */

import { extractToc, parseContentBlocks, readingTime } from 'bip-kit';
import type { ContentBlock, TocEntry } from 'bip-kit';

/**
 * Normalize author-flavored markdown to bip-kit's deliberately scoped
 * vocabulary, without changing meaning:
 *
 * - `* item` / `+ item` bullets → `- item` (bip-kit only parses `- `)
 * - indented list items are flattened to top-level (the parser has no
 *   nesting; a flat item preserves the text, an unparsed one would merge
 *   into the previous paragraph — 74 such lines live in the guides)
 * - `# Heading` → `## Heading` (every surface renders the title from
 *   frontmatter as the page's single h1; a body h1 is outside the
 *   vocabulary and would render as a literal `# …` paragraph)
 *
 * Code fences are left untouched — a `# comment` inside a ``` fence is a
 * shell comment, not a heading, and the guides are full of them.
 */
export function normalizeLongformMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let inFence = false;
  const out = lines.map((line) => {
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence;
      return line;
    }
    if (inFence) {
      return line;
    }
    if (/^# (?!#)/.test(line)) {
      return `#${line}`;
    }
    const bullet = line.match(/^(\s*)[*+] (.*)$/);
    if (bullet) {
      return `- ${bullet[2]}`;
    }
    const nested = line.match(/^\s+- (.*)$/);
    if (nested) {
      return `- ${nested[1]}`;
    }
    return line;
  });
  return out.join('\n');
}

export interface ParsedLongform {
  blocks: ContentBlock[];
  toc: TocEntry[];
  /** Word-count based minutes (200 wpm, min 1). */
  readingMinutes: number;
}

/** Parse a long-form markdown body into bip-kit typed blocks + TOC. */
export function parseLongform(markdown: string): ParsedLongform {
  const blocks = parseContentBlocks(normalizeLongformMarkdown(markdown));
  return {
    blocks,
    toc: extractToc(blocks),
    readingMinutes: readingTime(blocks).minutes,
  };
}
