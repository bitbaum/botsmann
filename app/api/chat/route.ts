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
  handleLLMError,
  searchUserDocuments,
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

    // Search for relevant document chunks
    logger.log('[Chat API] Searching for relevant chunks...');
    const searchStartTime = Date.now();
    const {
      context,
      sources,
      chunks: relevantChunks,
    } = await searchUserDocuments(supabase, embeddingResult.embedding, user.id, {
      documentId,
      matchCount: contextSize,
    });
    logger.log(
      `[Chat API] Search completed in ${Date.now() - searchStartTime} ms, found ${relevantChunks.length} chunks`,
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
      const fallbackSources = sources.map((s, i) => ({
        label: `**[Source ${i + 1}: ${s.document_name}]**`,
        content: s.preview,
      }));

      const errorResponse = handleLLMError(llmError, fallbackSources);
      if (errorResponse) return errorResponse;

      throw llmError;
    }
  } catch (error) {
    logger.error('[Chat API] Unhandled error:', error);
    return jsonError('Internal server error', 'INTERNAL_ERROR', HTTP_STATUS.INTERNAL_ERROR);
  }
}
