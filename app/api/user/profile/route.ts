/**
 * User Profile API Route
 *
 * GET /api/user/profile - Get or create user profile from user_profiles table
 * PATCH /api/user/profile - Update user profile preferences
 *
 * This is separate from /api/auth/profile which handles auth.users metadata.
 * This route manages the user_profiles table for domain preferences and stats.
 */

import { type NextRequest } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase-server';
import {
  jsonSuccess,
  jsonError,
  jsonUnauthorized,
  validateBody,
  hasValidationError,
  HTTP_STATUS,
} from '@/lib/api/responses';
import { UpdateUserProfileSchema } from '@/lib/validations/user-profile';
import { logger } from '@/lib/logger';

/**
 * GET - Get or create user profile
 * Uses the ensure_user_profile database function to create if doesn't exist
 */
export async function GET() {
  try {
    const supabase = createRouteHandlerClient();

    // Check authentication
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return jsonUnauthorized();
    }

    // Call database function to get or create profile
    const { data: profile, error: profileError } = await supabase.rpc('ensure_user_profile', {
      p_user_id: user.id,
    });

    if (profileError) {
      logger.error('Error fetching user profile:', profileError);
      return jsonError('Failed to fetch profile', 'DATABASE_ERROR', HTTP_STATUS.INTERNAL_ERROR);
    }

    return jsonSuccess(profile);
  } catch (error) {
    logger.error('User profile GET error:', error);
    return jsonError('An error occurred', 'INTERNAL_ERROR', HTTP_STATUS.INTERNAL_ERROR);
  }
}

/**
 * PATCH - Update user profile
 */
export async function PATCH(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient();

    // Check authentication
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return jsonUnauthorized();
    }

    // Validate request body
    const validation = await validateBody(request, UpdateUserProfileSchema);
    if (hasValidationError(validation)) {
      return validation.error;
    }

    const updates = validation.data;

    // Build update object (only include provided fields)
    const updateData: Record<string, unknown> = {};

    if (updates.display_name !== undefined) {
      updateData.display_name = updates.display_name;
    }
    if (updates.preferred_language !== undefined) {
      updateData.preferred_language = updates.preferred_language;
    }
    if (updates.timezone !== undefined) {
      updateData.timezone = updates.timezone;
    }
    if (updates.active_domains !== undefined) {
      updateData.active_domains = updates.active_domains;
    }

    // Update profile
    const { data: profile, error: updateError } = await supabase
      .from('user_profiles')
      .update(updateData)
      .eq('id', user.id)
      .select()
      .single();

    if (updateError) {
      // If profile doesn't exist, create it first then update
      if (updateError.code === 'PGRST116') {
        // No rows returned - profile doesn't exist
        const { error: insertError } = await supabase.from('user_profiles').insert({
          id: user.id,
          ...updateData,
        });

        if (insertError) {
          logger.error('Error creating user profile:', insertError);
          return jsonError(
            'Failed to create profile',
            'DATABASE_ERROR',
            HTTP_STATUS.INTERNAL_ERROR,
          );
        }

        // Fetch the created profile
        const { data: newProfile, error: fetchError } = await supabase
          .from('user_profiles')
          .select()
          .eq('id', user.id)
          .single();

        if (fetchError) {
          logger.error('Error fetching created profile:', fetchError);
          return jsonError('Failed to fetch profile', 'DATABASE_ERROR', HTTP_STATUS.INTERNAL_ERROR);
        }

        return jsonSuccess(newProfile, 'Profile created');
      }

      logger.error('Error updating user profile:', updateError);
      return jsonError('Failed to update profile', 'DATABASE_ERROR', HTTP_STATUS.INTERNAL_ERROR);
    }

    return jsonSuccess(profile, 'Profile updated');
  } catch (error) {
    logger.error('User profile PATCH error:', error);
    return jsonError('An error occurred', 'INTERNAL_ERROR', HTTP_STATUS.INTERNAL_ERROR);
  }
}
