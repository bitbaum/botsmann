/**
 * Shared context building utilities for RAG chat routes
 * @module lib/chat/context
 */

import { API_CONFIG } from '@/lib/constants';

interface ContentChunk {
  content: string;
}

/**
 * Truncate an array of content chunks to fit within a character budget.
 * Partially includes the last chunk if there's enough remaining space (>200 chars).
 */
export function truncateChunks<T extends ContentChunk>(
  chunks: T[],
  maxChars: number = API_CONFIG.MAX_CONTEXT_CHARS,
): T[] {
  let totalChars = 0;
  const result: T[] = [];

  for (const chunk of chunks) {
    const len = chunk.content.length;
    if (totalChars + len > maxChars) {
      const remaining = maxChars - totalChars;
      if (remaining > 200) {
        result.push({
          ...chunk,
          content: chunk.content.substring(0, remaining) + '... [truncated]',
        });
      }
      break;
    }
    result.push(chunk);
    totalChars += len;
  }

  return result;
}

/**
 * Join context parts with a standard separator.
 */
export function joinContext(parts: string[]): string {
  return parts.join('\n\n---\n\n');
}
