/**
 * Conversation Messages API
 *
 * POST /api/conversations/[id]/messages - Add message to conversation
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
import { AddMessageSchema } from '@/lib/validations/conversation';
import { logger } from '@/lib/logger';

const DOMAIN_ERROR = 'Failed to process message request';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * Add message to conversation
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const { id: conversationId } = await params;
    const body = await request.json();
    const validation = AddMessageSchema.safeParse(body);

    if (!validation.success) {
      return jsonValidationError('Invalid request', formatZodErrors(validation.error));
    }

    const { role, content, sources } = validation.data;
    const supabase = getServiceClient();

    // Verify conversation exists and belongs to user
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('id')
      .eq('id', conversationId)
      .eq('user_id', user.id)
      .single();

    if (convError || !conversation) {
      return jsonNotFound('Conversation not found');
    }

    // Add message
    const { data: message, error: msgError } = await supabase
      .from('conversation_messages')
      .insert({
        conversation_id: conversationId,
        role,
        content,
        sources: sources ?? null,
      })
      .select()
      .single();

    if (msgError) {
      logger.error('Database insert error:', msgError);
      return jsonError('Failed to add message', 'DATABASE_ERROR', HTTP_STATUS.INTERNAL_ERROR);
    }

    return jsonSuccess({ message }, undefined, HTTP_STATUS.CREATED);
  } catch (error) {
    return handleError(error, DOMAIN_ERROR);
  }
}
