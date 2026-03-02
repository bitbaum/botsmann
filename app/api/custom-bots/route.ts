/**
 * Custom Bots API
 *
 * POST /api/custom-bots - Create a new custom bot
 * GET /api/custom-bots - List user's custom bots
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
import { CreateCustomBotSchema } from '@/lib/validations/custom-bot';
import { logger } from '@/lib/logger';

const DOMAIN_ERROR = 'Failed to process custom bot request';

/**
 * Create a new custom bot
 */
export async function POST(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const body = await request.json();
    const validation = CreateCustomBotSchema.safeParse(body);

    if (!validation.success) {
      return jsonValidationError('Invalid request', formatZodErrors(validation.error));
    }

    const { slug, title, description, emoji, accent_color, system_prompt, nav_config } =
      validation.data;

    const supabase = getServiceClient();

    // Check if slug already exists for this user
    const { data: existing } = await supabase
      .from('custom_bots')
      .select('id')
      .eq('user_id', user.id)
      .eq('slug', slug)
      .single();

    if (existing) {
      return jsonError(
        `A bot with slug "${slug}" already exists`,
        'DUPLICATE_SLUG',
        HTTP_STATUS.CONFLICT,
      );
    }

    // Create the custom bot
    const { data: bot, error: dbError } = await supabase
      .from('custom_bots')
      .insert({
        user_id: user.id,
        slug,
        title,
        description: description ?? null,
        emoji: emoji ?? '🤖',
        accent_color: accent_color ?? 'blue',
        system_prompt,
        nav_config: nav_config ?? { menuItems: [] },
      })
      .select()
      .single();

    if (dbError) {
      logger.error('Database insert error:', dbError);
      return jsonError('Failed to create custom bot', 'DATABASE_ERROR', HTTP_STATUS.INTERNAL_ERROR);
    }

    return jsonSuccess({ bot }, undefined, HTTP_STATUS.CREATED);
  } catch (error) {
    return handleError(error, DOMAIN_ERROR);
  }
}

/**
 * List user's custom bots
 */
export async function GET(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const supabase = getServiceClient();

    // Get bots with knowledge chunk count
    const { data: bots, error } = await supabase
      .from('custom_bots')
      .select(
        `
        *,
        knowledge_count:bot_knowledge_chunks(count)
      `,
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      logger.error('Database query error:', error);
      return jsonError('Failed to fetch custom bots', 'DATABASE_ERROR', HTTP_STATUS.INTERNAL_ERROR);
    }

    // Transform the count aggregation
    const botsWithStats = bots?.map((bot) => ({
      ...bot,
      knowledge_count: bot.knowledge_count?.[0]?.count ?? 0,
    }));

    return jsonSuccess({ bots: botsWithStats });
  } catch (error) {
    return handleError(error, DOMAIN_ERROR);
  }
}
