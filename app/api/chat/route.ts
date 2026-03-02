/**
 * RAG Chat API
 *
 * POST /api/chat - Chat with documents using RAG
 *
 * Flow:
 * 1. Search for relevant document chunks
 * 2. Build context from retrieved chunks
 * 3. Generate response using user's preferred LLM
 */

import { type NextRequest } from 'next/server';
import { generateLLMResponse } from '@/lib/llm-client';
import { logger } from '@/lib/logger';
import { getServiceClient } from '@/lib/supabase';
import { verifyUser } from '@/lib/api-utils';
import { jsonSuccess, jsonError, jsonUnauthorized, HTTP_STATUS } from '@/lib/api';
import { SYSTEM_PROMPTS } from '@/lib/constants';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request';
import {
  generateEmbeddingWithTimeout,
  getUserLLMSettings,
  truncateChunks,
  joinContext,
  handleLLMError,
} from '@/lib/chat';

// Extend function timeout for model loading (Vercel)
// Note: Free tier max is 10s, Pro tier allows up to 60s
export const maxDuration = 30;

/**
 * Chat with documents using RAG
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  logger.log('[Chat API] Starting request');

  try {
    // Rate limit per user/IP
    const ip = getClientIp(request);
    const { isRateLimited } = await checkRateLimit(`chat:${ip}`, 20, 60);
    if (isRateLimited) {
      return jsonError(
        'Too many requests. Please slow down.',
        'RATE_LIMIT',
        HTTP_STATUS.RATE_LIMIT,
      );
    }
    logger.log('[Chat API] Verifying user...');
    const user = await verifyUser(request);
    if (!user) {
      logger.log('[Chat API] User verification failed');
      return jsonUnauthorized();
    }
    logger.log(`[Chat API] User verified: ${user.id} Time: ${Date.now() - startTime} ms`);

    const body = await request.json();
    const { message, documentId, contextSize = 3 } = body;
    logger.log(`[Chat API] Request body parsed, message length: ${message?.length}`);

    if (!message || typeof message !== 'string') {
      return jsonError('Message required', 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
    }

    const supabase = getServiceClient();

    // Get user settings for LLM provider
    const { provider, apiKey, ollamaUrl } = await getUserLLMSettings(user.id);

    // Check if user has any processed documents
    const { count: docCount } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'ready');

    if (!docCount || docCount === 0) {
      logger.log('[Chat API] No documents found for user');
      return jsonSuccess({
        response:
          "You don't have any processed documents yet. Please upload and process some documents first, then I can answer questions about them.",
        sources: [],
        provider,
      });
    }
    logger.log(`[Chat API] Found ${docCount} documents. Time: ${Date.now() - startTime} ms`);

    // Generate embedding for the query with timeout
    logger.log('[Chat API] Generating query embedding...');
    const embeddingResult = await generateEmbeddingWithTimeout(message);
    if ('error' in embeddingResult) {
      return embeddingResult.error;
    }
    const queryEmbedding = embeddingResult.embedding;

    // Search for relevant chunks
    logger.log('[Chat API] Searching for relevant chunks...');
    const searchStartTime = Date.now();
    const { data: searchResults, error: searchError } = await supabase.rpc('match_documents', {
      query_embedding: `[${queryEmbedding.join(',')}]`,
      match_count: contextSize,
      filter_user_id: user.id,
    });

    logger.log(`[Chat API] Search completed in ${Date.now() - searchStartTime} ms`);

    if (searchError) {
      logger.error('[Chat API] Search error:', searchError);
      return jsonError('Failed to search documents', 'DATABASE_ERROR', HTTP_STATUS.INTERNAL_ERROR);
    }
    logger.log(`[Chat API] Found ${searchResults?.length || 0} relevant chunks`);

    // Filter by documentId if provided
    let relevantChunks = searchResults || [];
    if (documentId) {
      relevantChunks = relevantChunks.filter(
        (r: { document_id: string }) => r.document_id === documentId,
      );
    }

    // Get document names
    const documentIds = Array.from(
      new Set(relevantChunks.map((r: { document_id: string }) => r.document_id)),
    );

    const { data: documents } = await supabase
      .from('documents')
      .select('id, name')
      .in('id', documentIds);

    const documentMap = new Map(
      (documents || []).map((d: { id: string; name: string }) => [d.id, d.name]),
    );

    // Build context from relevant chunks, respecting token limits
    const fitChunks = truncateChunks(
      relevantChunks as Array<{ document_id: string; content: string; similarity: number }>,
    );

    const contextParts = fitChunks.map((chunk, index: number) => {
      const docName = documentMap.get(chunk.document_id) || 'Unknown Document';
      return `[Source ${index + 1}: ${docName}]\n${chunk.content}`;
    });

    const context = joinContext(contextParts);

    // Format sources for response (prepare before LLM call)
    const sources = relevantChunks.map(
      (chunk: { id: string; document_id: string; content: string; similarity: number }) => ({
        document_id: chunk.document_id,
        document_name: documentMap.get(chunk.document_id) || 'Unknown',
        preview: chunk.content.substring(0, 200) + (chunk.content.length > 200 ? '...' : ''),
        similarity: chunk.similarity,
      }),
    );

    // Try to generate response using LLM
    logger.log(`[Chat API] Calling LLM, provider: ${provider}`);
    const llmStartTime = Date.now();
    try {
      const llmResponse = await generateLLMResponse(
        [
          { role: 'system', content: SYSTEM_PROMPTS.RAG_ASSISTANT },
          {
            role: 'user',
            content: `Context from documents:\n\n${context}\n\n---\n\nUser question: ${message}`,
          },
        ],
        {
          provider,
          apiKey,
          ollamaUrl,
          temperature: 0.7,
          maxTokens: 1024,
        },
      );

      logger.log(`[Chat API] LLM response received in ${Date.now() - llmStartTime} ms`);
      logger.log(`[Chat API] Total request time: ${Date.now() - startTime} ms`);

      return jsonSuccess({
        response: llmResponse.content,
        sources,
        provider: llmResponse.provider,
        model: llmResponse.model,
      });
    } catch (llmError) {
      logger.error(`[Chat API] LLM call failed after ${Date.now() - llmStartTime} ms`);

      // Build fallback sources for API key errors
      const fallbackSources = relevantChunks.map(
        (chunk: { document_id: string; content: string }, index: number) => ({
          label: `**[Source ${index + 1}: ${documentMap.get(chunk.document_id) || 'Unknown Document'}]**`,
          content: chunk.content,
        }),
      );

      const errorResponse = handleLLMError(llmError, fallbackSources);
      if (errorResponse) return errorResponse;

      throw llmError;
    }
  } catch (error) {
    logger.error('[Chat API] Unhandled error:', error);
    return jsonError('Internal server error', 'INTERNAL_ERROR', HTTP_STATUS.INTERNAL_ERROR);
  }
}
