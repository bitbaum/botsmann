/**
 * Single Conversation API
 *
 * GET /api/conversations/[id] - Get conversation with messages
 * PUT /api/conversations/[id] - Update conversation title
 * DELETE /api/conversations/[id] - Delete conversation
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
import { UpdateConversationSchema } from '@/lib/validations/conversation';
import { logger } from '@/lib/logger';

const DOMAIN_ERROR = 'Failed to process conversation request';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * Get conversation with messages
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const { id } = await params;
    const supabase = getServiceClient();

    // Get conversation
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (convError || !conversation) {
      return jsonNotFound('Conversation not found');
    }

    // Get messages
    const { data: messages, error: msgError } = await supabase
      .from('conversation_messages')
      .select('*')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true });

    if (msgError) {
      logger.error('Database query error:', msgError);
      return jsonError('Failed to fetch messages', 'DATABASE_ERROR', HTTP_STATUS.INTERNAL_ERROR);
    }

    return jsonSuccess({
      conversation: {
        ...conversation,
        messages: messages ?? [],
      },
    });
  } catch (error) {
    return handleError(error, DOMAIN_ERROR);
  }
}

/**
 * Update conversation title
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const { id } = await params;
    const body = await request.json();
    const validation = UpdateConversationSchema.safeParse(body);

    if (!validation.success) {
      return jsonValidationError('Invalid request', formatZodErrors(validation.error));
    }

    const { title } = validation.data;
    const supabase = getServiceClient();

    // Update conversation
    const { data: conversation, error } = await supabase
      .from('conversations')
      .update({ title })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error || !conversation) {
      if (error?.code === 'PGRST116') {
        return jsonNotFound('Conversation not found');
      }
      logger.error('Database update error:', error);
      return jsonError(
        'Failed to update conversation',
        'DATABASE_ERROR',
        HTTP_STATUS.INTERNAL_ERROR,
      );
    }

    return jsonSuccess({ conversation });
  } catch (error) {
    return handleError(error, DOMAIN_ERROR);
  }
}

/**
 * Delete conversation
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const { id } = await params;
    const supabase = getServiceClient();

    // Delete conversation (messages will cascade)
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      logger.error('Database delete error:', error);
      return jsonError(
        'Failed to delete conversation',
        'DATABASE_ERROR',
        HTTP_STATUS.INTERNAL_ERROR,
      );
    }

    return jsonSuccess({ deleted: true });
  } catch (error) {
    return handleError(error, DOMAIN_ERROR);
  }
}
