/**
 * Shared document search for RAG chat routes
 * @module lib/chat/search
 *
 * Extracts the common "embed query → search → build context" pattern
 * shared by app/api/chat and app/api/professional-chat routes.
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';
import { truncateChunks, joinContext } from './context';

interface SearchChunk {
  document_id: string;
  content: string;
  similarity: number;
}

export interface DocumentSource {
  document_id: string;
  document_name: string;
  preview: string;
  similarity: number;
}

export interface DocumentSearchResult {
  context: string;
  sources: DocumentSource[];
  chunks: SearchChunk[];
}

/**
 * Search user documents via match_documents RPC, build context and sources.
 *
 * @param supabase - Supabase service client
 * @param embedding - Pre-computed query embedding vector
 * @param userId - User whose documents to search
 * @param options - Optional filters (documentId, allowedDocumentIds, matchCount, maxContextChars)
 */
export async function searchUserDocuments(
  supabase: SupabaseClient,
  embedding: number[],
  userId: string,
  options: {
    documentId?: string;
    allowedDocumentIds?: string[];
    matchCount?: number;
    maxContextChars?: number;
  } = {},
): Promise<DocumentSearchResult> {
  const { documentId, allowedDocumentIds, matchCount = 5 } = options;

  const { data: searchResults, error: searchError } = await supabase.rpc('match_documents', {
    query_embedding: `[${embedding.join(',')}]`,
    match_count: matchCount,
    filter_user_id: userId,
  });

  if (searchError) {
    logger.error('[searchUserDocuments] Search error:', searchError);
    return { context: '', sources: [], chunks: [] };
  }

  let chunks: SearchChunk[] = searchResults || [];

  // Filter by specific document
  if (documentId) {
    chunks = chunks.filter((c) => c.document_id === documentId);
  }

  // Filter by allowed document IDs (e.g., professional domain access)
  if (allowedDocumentIds) {
    chunks = chunks.filter((c) => allowedDocumentIds.includes(c.document_id));
  }

  if (chunks.length === 0) {
    return { context: '', sources: [], chunks: [] };
  }

  // Look up document names
  const documentIds = Array.from(new Set(chunks.map((c) => c.document_id)));
  const { data: documents } = await supabase
    .from('documents')
    .select('id, name')
    .in('id', documentIds);

  const docMap = new Map(
    (documents || []).map((d: { id: string; name: string }) => [d.id, d.name]),
  );

  // Build context
  const fitChunks = truncateChunks(chunks, options.maxContextChars);
  const contextParts = fitChunks.map((chunk, i) => {
    const name = docMap.get(chunk.document_id) || 'Unknown Document';
    return `[Source ${i + 1}: ${name}]\n${chunk.content}`;
  });

  const context = joinContext(contextParts);

  // Build sources
  const sources: DocumentSource[] = chunks.map((chunk) => ({
    document_id: chunk.document_id,
    document_name: docMap.get(chunk.document_id) || 'Unknown',
    preview: chunk.content.substring(0, 200) + (chunk.content.length > 200 ? '...' : ''),
    similarity: chunk.similarity,
  }));

  return { context, sources, chunks };
}
