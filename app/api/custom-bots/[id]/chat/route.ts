/**
 * Custom Bot Chat API
 *
 * POST /api/custom-bots/[id]/chat - Chat with a custom bot using RAG
 *
 * Flow:
 * 1. Load bot configuration and system prompt
 * 2. Search for relevant knowledge chunks
 * 3. Build context from retrieved chunks
 * 4. Generate response using user's preferred LLM
 */

/* eslint-disable no-console */

import { type NextRequest } from 'next/server';
import { z } from 'zod';
import { generateLLMResponse } from '@/lib/llm-client';
import { getServiceClient } from '@/lib/supabase';
import { verifyUser } from '@/lib/api-utils';
import {
  jsonSuccess,
  jsonError,
  jsonUnauthorized,
  jsonNotFound,
  jsonValidationError,
  formatZodErrors,
  HTTP_STATUS,
} from '@/lib/api';
import {
  generateEmbeddingWithTimeout,
  getUserLLMSettings,
  truncateChunks,
  joinContext,
  handleLLMError,
  parseResponseWithSuggestions,
} from '@/lib/chat';

// Extend function timeout for model loading (Vercel)
export const maxDuration = 30;

const ChatRequestSchema = z.object({
  message: z.string().min(1, 'Message required').max(5000, 'Message too long'),
  contextSize: z.number().min(1).max(10).optional().default(5),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * Chat with a custom bot
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  const startTime = Date.now();
  console.log('[Custom Bot Chat] Starting request');

  try {
    // For public bots, auth is optional
    // For private bots, auth is required
    const user = await verifyUser(request);
    const { id: botId } = await params;

    const supabase = getServiceClient();

    // Get the custom bot
    const { data: bot, error: botError } = await supabase
      .from('custom_bots')
      .select('*')
      .eq('id', botId)
      .single();

    if (botError || !bot) {
      return jsonNotFound('Custom bot not found');
    }

    // Check access permissions
    const isOwner = user && bot.user_id === user.id;
    const isPublic = bot.is_public && bot.is_published;

    if (!isOwner && !isPublic) {
      return jsonUnauthorized('This bot is private');
    }

    console.log('[Custom Bot Chat] Bot loaded:', bot.title, 'Time:', Date.now() - startTime, 'ms');

    // Validate request body
    const body = await request.json();
    const validation = ChatRequestSchema.safeParse(body);

    if (!validation.success) {
      return jsonValidationError('Invalid request', formatZodErrors(validation.error));
    }

    const { message, contextSize } = validation.data;

    // Get user settings for LLM provider (use owner's settings for public bots)
    const settingsUserId = user?.id ?? bot.user_id;
    const { provider, apiKey, ollamaUrl } = await getUserLLMSettings(settingsUserId);

    // Check if bot has any knowledge chunks
    const { count: knowledgeCount } = await supabase
      .from('bot_knowledge_chunks')
      .select('*', { count: 'exact', head: true })
      .eq('bot_id', botId);

    console.log('[Custom Bot Chat] Knowledge chunks:', knowledgeCount);

    let context = '';
    let sources: Array<{
      topic: string | null;
      preview: string;
      similarity: number;
    }> = [];

    // If bot has knowledge, perform RAG search
    if (knowledgeCount && knowledgeCount > 0) {
      // Generate embedding for the query
      console.log('[Custom Bot Chat] Generating query embedding...');
      const embeddingResult = await generateEmbeddingWithTimeout(message);
      if ('error' in embeddingResult) {
        return embeddingResult.error;
      }
      const queryEmbedding = embeddingResult.embedding;

      // Search for relevant knowledge chunks
      console.log('[Custom Bot Chat] Searching knowledge base...');
      const searchStartTime = Date.now();

      const { data: searchResults, error: searchError } = await supabase.rpc(
        'match_bot_knowledge',
        {
          query_embedding: `[${queryEmbedding.join(',')}]`,
          target_bot_id: botId,
          match_count: contextSize,
        },
      );

      console.log('[Custom Bot Chat] Search completed in', Date.now() - searchStartTime, 'ms');

      if (searchError) {
        console.error('[Custom Bot Chat] Search error:', searchError);
        // Continue without RAG context if search fails
      } else if (searchResults && searchResults.length > 0) {
        // Build context from knowledge chunks
        type KnowledgeChunk = { content: string; topic: string | null; similarity: number };
        const fitChunks = truncateChunks(searchResults as KnowledgeChunk[]);

        const contextParts = fitChunks.map((chunk) => {
          const topicLabel = chunk.topic ? `[${chunk.topic}]` : '[Knowledge]';
          return `${topicLabel}\n${chunk.content}`;
        });

        context = joinContext(contextParts);

        // Format sources
        sources = searchResults.map(
          (chunk: { topic: string | null; content: string; similarity: number }) => ({
            topic: chunk.topic,
            preview: chunk.content.substring(0, 200) + (chunk.content.length > 200 ? '...' : ''),
            similarity: chunk.similarity,
          }),
        );

        console.log('[Custom Bot Chat] Context built');
      }
    }

    // Build the user message with context
    let userMessage = message;
    if (context) {
      userMessage = `Relevant knowledge:\n\n${context}\n\n---\n\nUser question: ${message}`;
    }

    // Enhanced system prompt to include follow-up suggestion generation
    const enhancedSystemPrompt = `${bot.system_prompt}

IMPORTANT: After your response, always include 2-3 contextually relevant follow-up questions the user might want to ask next. These should be specific to what was just discussed, not generic questions. Format them on separate lines at the very end of your response, each starting with ">>>" like this:
>>>Question 1 here?
>>>Question 2 here?
>>>Question 3 here?

Make the questions natural, conversational, and directly related to the current topic.`;

    // Generate response using LLM
    console.log('[Custom Bot Chat] Calling LLM, provider:', provider);
    const llmStartTime = Date.now();

    try {
      const llmResponse = await generateLLMResponse(
        [
          { role: 'system', content: enhancedSystemPrompt },
          { role: 'user', content: userMessage },
        ],
        {
          provider,
          apiKey,
          ollamaUrl,
          temperature: 0.7,
          maxTokens: 1024,
        },
      );

      console.log('[Custom Bot Chat] LLM response in', Date.now() - llmStartTime, 'ms');
      console.log('[Custom Bot Chat] Total time:', Date.now() - startTime, 'ms');

      // Parse response to extract suggestions
      const { content, suggestions } = parseResponseWithSuggestions(llmResponse.content);

      return jsonSuccess({
        content,
        response: content, // Keep for backward compatibility
        suggestions,
        sources,
        bot: {
          id: bot.id,
          title: bot.title,
          emoji: bot.emoji,
        },
        provider: llmResponse.provider,
        model: llmResponse.model,
      });
    } catch (llmError) {
      console.error('[Custom Bot Chat] LLM failed after', Date.now() - llmStartTime, 'ms');

      // Build fallback sources for API key errors
      const fallbackSources = sources.map((s, i) => ({
        label: s.topic ? `**[${s.topic}]**` : `**[Source ${i + 1}]**`,
        content: s.preview,
      }));

      const errorResponse = handleLLMError(llmError, fallbackSources);
      if (errorResponse) return errorResponse;

      throw llmError;
    }
  } catch (error) {
    console.error('[Custom Bot Chat] Unhandled error:', error);
    return jsonError('Internal server error', 'INTERNAL_ERROR', HTTP_STATUS.INTERNAL_ERROR);
  }
}
