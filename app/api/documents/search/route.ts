/**
 * Document Search API
 *
 * POST /api/documents/search - Semantic search across user's documents
 *
 * Uses pgvector for similarity search with cosine distance
 */

import { type NextRequest } from 'next/server';
import { generateEmbedding } from '@/lib/embeddings';
import { getServiceClient } from '@/lib/supabase';
import { verifyUser } from '@/lib/api-utils';
import { jsonSuccess, jsonError, jsonUnauthorized, handleError, HTTP_STATUS } from '@/lib/api';
import { DOMAIN_ERRORS } from '@/lib/constants';
import { logger } from '@/lib/logger';

// Extend function timeout for embedding generation (Vercel)
export const maxDuration = 30;

/**
 * Search for relevant document chunks
 */
export async function POST(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const body = await request.json();
    const { query, limit = 5, documentId } = body;

    if (!query || typeof query !== 'string') {
      return jsonError('Query string required', 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
    }

    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);

    const supabase = getServiceClient();

    // Use the match_documents function for vector similarity search
    const { data: results, error } = await supabase.rpc('match_documents', {
      query_embedding: `[${queryEmbedding.join(',')}]`,
      match_count: limit,
      filter_user_id: user.id,
    });

    if (error) {
      logger.error('Search error:', error);
      return jsonError('Search failed', 'DATABASE_ERROR', HTTP_STATUS.INTERNAL_ERROR);
    }

    // If documentId filter is provided, filter results
    let filteredResults = results || [];
    if (documentId) {
      filteredResults = filteredResults.filter(
        (r: { document_id: string }) => r.document_id === documentId,
      );
    }

    // Get document names for the results
    const documentIds = Array.from(
      new Set(filteredResults.map((r: { document_id: string }) => r.document_id)),
    );

    const { data: documents } = await supabase
      .from('documents')
      .select('id, name')
      .in('id', documentIds);

    const documentMap = new Map(
      (documents || []).map((d: { id: string; name: string }) => [d.id, d.name]),
    );

    // Format results
    const formattedResults = filteredResults.map(
      (r: { id: string; document_id: string; content: string; similarity: number }) => ({
        chunk_id: r.id,
        document_id: r.document_id,
        document_name: documentMap.get(r.document_id) || 'Unknown',
        content: r.content,
        similarity: r.similarity,
      }),
    );

    return jsonSuccess({ results: formattedResults, query });
  } catch (error) {
    return handleError(error, DOMAIN_ERRORS.FAILED_SEARCH_DOCUMENTS);
  }
}
