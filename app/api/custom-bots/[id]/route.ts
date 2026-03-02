/**
 * Individual Custom Bot API
 *
 * GET /api/custom-bots/[id] - Get a single custom bot
 * PATCH /api/custom-bots/[id] - Update a custom bot
 * DELETE /api/custom-bots/[id] - Delete a custom bot
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
import { UpdateCustomBotSchema } from '@/lib/validations/custom-bot';
import { logger } from '@/lib/logger';

const DOMAIN_ERROR = 'Failed to process custom bot request';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * Get a single custom bot by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const { id } = await params;
    const supabase = getServiceClient();

    const { data: bot, error } = await supabase
      .from('custom_bots')
      .select(
        `
        *,
        knowledge_count:bot_knowledge_chunks(count)
      `,
      )
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error || !bot) {
      return jsonNotFound('Custom bot not found');
    }

    // Transform the count aggregation
    const botWithStats = {
      ...bot,
      knowledge_count: bot.knowledge_count?.[0]?.count ?? 0,
    };

    return jsonSuccess({ bot: botWithStats });
  } catch (error) {
    return handleError(error, DOMAIN_ERROR);
  }
}

/**
 * Update a custom bot
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const { id } = await params;
    const body = await request.json();
    const validation = UpdateCustomBotSchema.safeParse(body);

    if (!validation.success) {
      return jsonValidationError('Invalid request', formatZodErrors(validation.error));
    }

    const supabase = getServiceClient();

    // Verify ownership
    const { data: existing, error: fetchError } = await supabase
      .from('custom_bots')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existing) {
      return jsonNotFound('Custom bot not found');
    }

    // Update the bot
    const { data: bot, error: updateError } = await supabase
      .from('custom_bots')
      .update(validation.data)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      logger.error('Database update error:', updateError);
      return jsonError('Failed to update custom bot', 'DATABASE_ERROR', HTTP_STATUS.INTERNAL_ERROR);
    }

    return jsonSuccess({ bot });
  } catch (error) {
    return handleError(error, DOMAIN_ERROR);
  }
}

/**
 * Delete a custom bot
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const { id } = await params;
    const supabase = getServiceClient();

    // Verify ownership
    const { data: existing, error: fetchError } = await supabase
      .from('custom_bots')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existing) {
      return jsonNotFound('Custom bot not found');
    }

    // Delete the bot (knowledge chunks will cascade delete)
    const { error: deleteError } = await supabase.from('custom_bots').delete().eq('id', id);

    if (deleteError) {
      logger.error('Database delete error:', deleteError);
      return jsonError('Failed to delete custom bot', 'DATABASE_ERROR', HTTP_STATUS.INTERNAL_ERROR);
    }

    return jsonSuccess({ deleted: true });
  } catch (error) {
    return handleError(error, DOMAIN_ERROR);
  }
}
