/**
 * Conversations API
 *
 * POST /api/conversations - Create a new conversation
 * GET /api/conversations - List user's conversations
 */

import { type NextRequest } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { verifyUser } from '@/lib/api-utils';
import {
  jsonSuccess,
  jsonError,
  jsonUnauthorized,
  jsonValidationError,
  formatZodErrors,
  handleError,
  HTTP_STATUS,
} from '@/lib/api';
import { CreateConversationSchema } from '@/lib/validations/conversation';
import { logger } from '@/lib/logger';

const DOMAIN_ERROR = 'Failed to process conversation request';

/**
 * Create a new conversation
 */
export async function POST(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const body = await request.json();
    const validation = CreateConversationSchema.safeParse(body);

    if (!validation.success) {
      return jsonValidationError('Invalid request', formatZodErrors(validation.error));
    }

    const { title, bot_type, bot_id, document_id } = validation.data;

    const supabase = getServiceClient();

    // Create the conversation
    const { data: conversation, error: dbError } = await supabase
      .from('conversations')
      .insert({
        user_id: user.id,
        title: title ?? 'New Conversation',
        bot_type: bot_type ?? 'documents',
        bot_id: bot_id ?? null,
        document_id: document_id ?? null,
      })
      .select()
      .single();

    if (dbError) {
      logger.error('Database insert error:', dbError);
      return jsonError(
        'Failed to create conversation',
        'DATABASE_ERROR',
        HTTP_STATUS.INTERNAL_ERROR,
      );
    }

    return jsonSuccess({ conversation }, { cache: 'NONE' }, HTTP_STATUS.CREATED);
  } catch (error) {
    return handleError(error, DOMAIN_ERROR);
  }
}

/**
 * List user's conversations
 */
export async function GET(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const { searchParams } = new URL(request.url);
    const botType = searchParams.get('bot_type');
    const botId = searchParams.get('bot_id');
    const documentId = searchParams.get('document_id');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    const supabase = getServiceClient();

    let query = supabase
      .from('conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (botType) {
      query = query.eq('bot_type', botType);
    }
    if (botId) {
      query = query.eq('bot_id', botId);
    }
    if (documentId) {
      query = query.eq('document_id', documentId);
    }

    const { data: conversations, error } = await query;

    if (error) {
      logger.error('Database query error:', error);
      return jsonError(
        'Failed to fetch conversations',
        'DATABASE_ERROR',
        HTTP_STATUS.INTERNAL_ERROR,
      );
    }

    return jsonSuccess({ conversations: conversations ?? [] }, { cache: 'PRIVATE_SHORT' });
  } catch (error) {
    return handleError(error, DOMAIN_ERROR);
  }
}
