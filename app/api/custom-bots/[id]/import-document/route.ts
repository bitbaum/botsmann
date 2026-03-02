/**
 * Import Document to Bot API
 *
 * POST /api/custom-bots/[id]/import-document - Import document chunks to bot knowledge
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
import { z } from 'zod';
import { logger } from '@/lib/logger';

const DOMAIN_ERROR = 'Failed to import document to bot';

const ImportDocumentSchema = z.object({
  document_id: z.string().uuid('Invalid document ID'),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * Import document chunks to bot knowledge
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const { id: botId } = await params;
    const body = await request.json();

    // Validate input
    const validation = ImportDocumentSchema.safeParse(body);
    if (!validation.success) {
      return jsonValidationError('Invalid request', formatZodErrors(validation.error));
    }

    const { document_id } = validation.data;
    const supabase = getServiceClient();

    // Verify bot ownership
    const { data: bot, error: botError } = await supabase
      .from('custom_bots')
      .select('id, title')
      .eq('id', botId)
      .eq('user_id', user.id)
      .single();

    if (botError || !bot) {
      return jsonNotFound('Bot not found');
    }

    // Verify document ownership and that it's processed
    const { data: document, error: docError } = await supabase
      .from('documents')
      .select('id, name, status')
      .eq('id', document_id)
      .eq('user_id', user.id)
      .single();

    if (docError || !document) {
      return jsonNotFound('Document not found');
    }

    if (document.status !== 'ready') {
      return jsonError(
        'Document must be processed before importing',
        'VALIDATION_ERROR',
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    // Get document chunks
    const { data: chunks, error: chunksError } = await supabase
      .from('document_chunks')
      .select('content, embedding, metadata, chunk_index')
      .eq('document_id', document_id)
      .order('chunk_index', { ascending: true });

    if (chunksError) {
      logger.error('Error fetching document chunks:', chunksError);
      return jsonError(
        'Failed to fetch document chunks',
        'DATABASE_ERROR',
        HTTP_STATUS.INTERNAL_ERROR,
      );
    }

    if (!chunks || chunks.length === 0) {
      return jsonError('No chunks found in document', 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
    }

    // Get current max chunk index for the bot
    const { data: maxIndexResult } = await supabase
      .from('bot_knowledge_chunks')
      .select('chunk_index')
      .eq('bot_id', botId)
      .order('chunk_index', { ascending: false })
      .limit(1)
      .single();

    const startIndex = (maxIndexResult?.chunk_index ?? -1) + 1;

    // Prepare knowledge entries with source tracking
    const knowledgeEntries = chunks.map((chunk, index) => ({
      bot_id: botId,
      content: chunk.content,
      embedding: chunk.embedding,
      metadata: {
        ...chunk.metadata,
        imported_from_document: document_id,
        imported_from_document_name: document.name,
        original_chunk_index: chunk.chunk_index,
      },
      chunk_index: startIndex + index,
    }));

    // Insert knowledge entries
    const { error: insertError } = await supabase
      .from('bot_knowledge_chunks')
      .insert(knowledgeEntries);

    if (insertError) {
      logger.error('Error inserting knowledge:', insertError);
      return jsonError(
        'Failed to import document to bot',
        'DATABASE_ERROR',
        HTTP_STATUS.INTERNAL_ERROR,
      );
    }

    return jsonSuccess({
      imported_chunks: chunks.length,
      bot_title: bot.title,
      document_name: document.name,
    });
  } catch (error) {
    return handleError(error, DOMAIN_ERROR);
  }
}
