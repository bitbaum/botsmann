/**
 * User Profile API Route
 *
 * GET /api/auth/profile - Get current user profile
 * PUT /api/auth/profile - Update user profile (display_name, avatar_url)
 *
 * Rate limited: 10 requests per minute
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase-server';
import { z } from 'zod';
import { rateLimit, RATE_LIMIT_CONFIGS } from '@/lib/middleware/rate-limit';
import { logger } from '@/lib/logger';

const UpdateProfileSchema = z.object({
  display_name: z
    .string()
    .min(1, 'Display name is required')
    .max(50, 'Display name must be 50 characters or less')
    .regex(
      /^[a-zA-Z0-9\s\-_.]+$/,
      'Display name can only contain letters, numbers, spaces, and -_.',
    )
    .optional(),
  avatar_url: z
    .string()
    .url('Invalid avatar URL')
    .max(500, 'Avatar URL is too long')
    .optional()
    .nullable(),
});

/**
 * GET - Retrieve current user profile
 */
export async function GET(req: NextRequest) {
  // Rate limiting
  const rateLimitResult = await rateLimit(req, RATE_LIMIT_CONFIGS.api);
  if (rateLimitResult) return rateLimitResult;

  try {
    const supabase = createRouteHandlerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          code: 'UNAUTHORIZED',
        },
        { status: 401 },
      );
    }

    // Extract profile data from user_metadata
    const profile = {
      id: user.id,
      email: user.email,
      display_name: user.user_metadata?.display_name || null,
      avatar_url: user.user_metadata?.avatar_url || null,
      email_verified: Boolean(user.email_confirmed_at),
      created_at: user.created_at,
    };

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    logger.error('Get profile error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while fetching profile',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 },
    );
  }
}

/**
 * PUT - Update user profile
 */
export async function PUT(req: NextRequest) {
  // Rate limiting (stricter for profile updates)
  const rateLimitResult = await rateLimit(req, RATE_LIMIT_CONFIGS.api);
  if (rateLimitResult) return rateLimitResult;

  try {
    const supabase = createRouteHandlerClient();

    // Check authentication
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          code: 'UNAUTHORIZED',
        },
        { status: 401 },
      );
    }

    const body = await req.json();

    // Validate input
    const result = UpdateProfileSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error.errors[0].message,
          code: 'VALIDATION_ERROR',
        },
        { status: 400 },
      );
    }

    const { display_name, avatar_url } = result.data;

    // Build metadata update object (only include fields that are being updated)
    const metadataUpdate: Record<string, string | null> = {};
    if (display_name !== undefined) {
      metadataUpdate.display_name = display_name;
    }
    if (avatar_url !== undefined) {
      metadataUpdate.avatar_url = avatar_url;
    }

    // Update user metadata
    const { data, error } = await supabase.auth.updateUser({
      data: metadataUpdate,
    });

    if (error) {
      logger.error('Update profile error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to update profile',
          code: 'UPDATE_ERROR',
        },
        { status: 500 },
      );
    }

    // Return updated profile
    const updatedProfile = {
      id: data.user.id,
      email: data.user.email,
      display_name: data.user.user_metadata?.display_name || null,
      avatar_url: data.user.user_metadata?.avatar_url || null,
      email_verified: Boolean(data.user.email_confirmed_at),
      created_at: data.user.created_at,
    };

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      profile: updatedProfile,
    });
  } catch (error) {
    logger.error('Update profile error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while updating profile',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 },
    );
  }
}
