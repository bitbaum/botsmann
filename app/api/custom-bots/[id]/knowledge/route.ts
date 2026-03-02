/**
 * Bot Knowledge Chunks API
 *
 * POST /api/custom-bots/[id]/knowledge - Add knowledge chunks
 * GET /api/custom-bots/[id]/knowledge - List knowledge chunks
 * DELETE /api/custom-bots/[id]/knowledge?chunkId=xxx - Delete a knowledge chunk
 */

import { type NextRequest } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { verifyUser } from '@/lib/api-utils';
import {
  jsonSuccess,
  jsonError,
  jsonUnauthorized,
  jsonNotFound,
  jsonValidationError,
  formatZodErrors,
  handleError,
  HTTP_STATUS,
} from '@/lib/api';
import {
  CreateKnowledgeChunkSchema,
  BulkCreateKnowledgeChunksSchema,
} from '@/lib/validations/custom-bot';
import { generateEmbedding } from '@/lib/embeddings';

const DOMAIN_ERROR = 'Failed to process knowledge chunk request';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * Verify bot ownership and return bot if owned by user
 */
async function verifyBotOwnership(botId: string, userId: string) {
  const supabase = getServiceClient();
  const { data: bot, error } = await supabase
    .from('custom_bots')
    .select('id')
    .eq('id', botId)
    .eq('user_id', userId)
    .single();

  if (error || !bot) {
    return null;
  }
  return bot;
}

/**
 * Add knowledge chunks to a bot
 * Supports both single chunk and bulk creation
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const { id: botId } = await params;
    const body = await request.json();

    // Verify bot ownership
    const bot = await verifyBotOwnership(botId, user.id);
    if (!bot) {
      return jsonNotFound('Custom bot not found');
    }

    const supabase = getServiceClient();

    // Check if this is a bulk request or single chunk
    if (body.chunks && Array.isArray(body.chunks)) {
      // Bulk creation
      const validation = BulkCreateKnowledgeChunksSchema.safeParse({ ...body, bot_id: botId });

      if (!validation.success) {
        return jsonValidationError('Invalid request', formatZodErrors(validation.error));
      }

      const { chunks } = validation.data;

      // Generate embeddings for all chunks (allSettled for partial failure handling)
      const results = await Promise.allSettled(
        chunks.map(async (chunk) => {
          const embedding = await generateEmbedding(chunk.content);
          return {
            bot_id: botId,
            user_id: user.id,
            topic: chunk.topic ?? null,
            question: chunk.question ?? null,
            content: chunk.content,
            keywords: chunk.keywords ?? [],
            source: chunk.source ?? null,
            embedding,
          };
        }),
      );

      const chunksWithEmbeddings = results
        .filter(
          (
            r,
          ): r is PromiseFulfilledResult<
            typeof r extends PromiseSettledResult<infer T> ? T : never
          > => r.status === 'fulfilled',
        )
        .map((r) => r.value);

      if (chunksWithEmbeddings.length === 0) {
        return jsonError(
          'Failed to generate embeddings for all chunks',
          'INTERNAL_ERROR',
          HTTP_STATUS.INTERNAL_ERROR,
        );
      }

      const { data: created, error: insertError } = await supabase
        .from('bot_knowledge_chunks')
        .insert(chunksWithEmbeddings)
        .select('id, topic, question, content, keywords, source, created_at');

      if (insertError) {
        console.error('Database insert error:', insertError);
        return jsonError(
          'Failed to create knowledge chunks',
          'DATABASE_ERROR',
          HTTP_STATUS.INTERNAL_ERROR,
        );
      }

      return jsonSuccess(
        { chunks: created, count: created?.length ?? 0 },
        undefined,
        HTTP_STATUS.CREATED,
      );
    } else {
      // Single chunk creation
      const validation = CreateKnowledgeChunkSchema.safeParse({ ...body, bot_id: botId });

      if (!validation.success) {
        return jsonValidationError('Invalid request', formatZodErrors(validation.error));
      }

      const { topic, question, content, keywords, source, metadata } = validation.data;

      // Generate embedding for semantic search
      const embedding = await generateEmbedding(content);

      const { data: chunk, error: insertError } = await supabase
        .from('bot_knowledge_chunks')
        .insert({
          bot_id: botId,
          user_id: user.id,
          topic: topic ?? null,
          question: question ?? null,
          content,
          keywords: keywords ?? [],
          source: source ?? null,
          metadata: metadata ?? {},
          embedding,
        })
        .select('id, topic, question, content, keywords, source, metadata, created_at')
        .single();

      if (insertError) {
        console.error('Database insert error:', insertError);
        return jsonError(
          'Failed to create knowledge chunk',
          'DATABASE_ERROR',
          HTTP_STATUS.INTERNAL_ERROR,
        );
      }

      return jsonSuccess({ chunk }, undefined, HTTP_STATUS.CREATED);
    }
  } catch (error) {
    return handleError(error, DOMAIN_ERROR);
  }
}

/**
 * List knowledge chunks for a bot
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const { id: botId } = await params;

    // Verify bot ownership
    const bot = await verifyBotOwnership(botId, user.id);
    if (!bot) {
      return jsonNotFound('Custom bot not found');
    }

    const supabase = getServiceClient();

    const { data: chunks, error } = await supabase
      .from('bot_knowledge_chunks')
      .select('id, topic, question, content, keywords, source, metadata, created_at')
      .eq('bot_id', botId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database query error:', error);
      return jsonError(
        'Failed to fetch knowledge chunks',
        'DATABASE_ERROR',
        HTTP_STATUS.INTERNAL_ERROR,
      );
    }

    return jsonSuccess({ chunks, count: chunks?.length ?? 0 });
  } catch (error) {
    return handleError(error, DOMAIN_ERROR);
  }
}

/**
 * Delete a knowledge chunk
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const { id: botId } = await params;
    const { searchParams } = new URL(request.url);
    const chunkId = searchParams.get('chunkId');

    if (!chunkId) {
      return jsonError(
        'chunkId query parameter required',
        'VALIDATION_ERROR',
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    // Verify bot ownership
    const bot = await verifyBotOwnership(botId, user.id);
    if (!bot) {
      return jsonNotFound('Custom bot not found');
    }

    const supabase = getServiceClient();

    // Verify chunk belongs to this bot
    const { data: chunk, error: fetchError } = await supabase
      .from('bot_knowledge_chunks')
      .select('id')
      .eq('id', chunkId)
      .eq('bot_id', botId)
      .single();

    if (fetchError || !chunk) {
      return jsonNotFound('Knowledge chunk not found');
    }

    const { error: deleteError } = await supabase
      .from('bot_knowledge_chunks')
      .delete()
      .eq('id', chunkId);

    if (deleteError) {
      console.error('Database delete error:', deleteError);
      return jsonError(
        'Failed to delete knowledge chunk',
        'DATABASE_ERROR',
        HTTP_STATUS.INTERNAL_ERROR,
      );
    }

    return jsonSuccess({ deleted: true });
  } catch (error) {
    return handleError(error, DOMAIN_ERROR);
  }
}
