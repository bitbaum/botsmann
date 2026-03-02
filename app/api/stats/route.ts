/**
 * User Stats API
 *
 * GET /api/stats - Get user's usage statistics
 */

import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
import { getServiceClient } from '@/lib/supabase';
import { verifyUser } from '@/lib/api-utils';
import { jsonSuccess, jsonError, jsonUnauthorized, handleError, HTTP_STATUS } from '@/lib/api';
import { logger } from '@/lib/logger';

const DOMAIN_ERROR = 'Failed to fetch user statistics';

/**
 * Get user's usage statistics
 */
export async function GET(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const supabase = getServiceClient();

    // Fetch all stats in parallel
    const [conversationsResult, messagesResult, documentsResult, botsResult] = await Promise.all([
      // Total conversations
      supabase
        .from('conversations')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id),

      // Total messages (sum of message_count from conversations)
      supabase.from('conversations').select('message_count').eq('user_id', user.id),

      // Documents with status breakdown
      supabase.from('documents').select('status').eq('user_id', user.id),

      // Bots with published breakdown
      supabase.from('custom_bots').select('is_published').eq('user_id', user.id),
    ]);

    // Check for errors
    if (conversationsResult.error || documentsResult.error || botsResult.error) {
      logger.error('Database query errors:', {
        conversations: conversationsResult.error,
        documents: documentsResult.error,
        bots: botsResult.error,
      });
      return jsonError('Failed to fetch statistics', 'DATABASE_ERROR', HTTP_STATUS.INTERNAL_ERROR);
    }

    // Calculate stats
    const totalConversations = conversationsResult.count ?? 0;

    const totalMessages =
      messagesResult.data?.reduce((sum, conv) => sum + (conv.message_count || 0), 0) ?? 0;

    const documents = documentsResult.data ?? [];
    const totalDocuments = documents.length;
    const documentsReady = documents.filter((d) => d.status === 'ready').length;
    const documentsPending = documents.filter((d) => d.status === 'pending').length;

    const bots = botsResult.data ?? [];
    const totalBots = bots.length;
    const botsPublished = bots.filter((b) => b.is_published).length;

    return jsonSuccess(
      {
        stats: {
          total_conversations: totalConversations,
          total_messages: totalMessages,
          total_documents: totalDocuments,
          documents_ready: documentsReady,
          documents_pending: documentsPending,
          total_bots: totalBots,
          bots_published: botsPublished,
        },
      },
      { cache: 'PRIVATE_SHORT' },
    );
  } catch (error) {
    return handleError(error, DOMAIN_ERROR);
  }
}
