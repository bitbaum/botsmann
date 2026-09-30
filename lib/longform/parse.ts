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
 *
 * bip-kit's `normalizeMarkdown` is the lenient step in front of the strict
 * parser: `* ` bullets, nested items (74 such lines live in the guides), a
 * body `# h1`, single-quoted figure captions. Code fences are left alone.
 */

import { extractToc, normalizeMarkdown, parseContentBlocks, readingTime } from 'bip-kit';
import type { ContentBlock, TocEntry } from 'bip-kit';

export interface ParsedLongform {
  blocks: ContentBlock[];
  toc: TocEntry[];
  /** Word-count based minutes (200 wpm, min 1). */
  readingMinutes: number;
}

/** Parse a long-form markdown body into bip-kit typed blocks + TOC. */
export function parseLongform(markdown: string): ParsedLongform {
  const blocks = parseContentBlocks(normalizeMarkdown(markdown));
  return {
    blocks,
    toc: extractToc(blocks),
    readingMinutes: readingTime(blocks).minutes,
  };
}
