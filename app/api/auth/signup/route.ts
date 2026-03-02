/**
 * Sign Up API Route
 *
 * POST /api/auth/signup
 * Rate limited: 5 requests per minute
 */

import { NextRequest } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase-server';
import { z } from 'zod';
import { rateLimit, RATE_LIMIT_CONFIGS } from '@/lib/middleware/rate-limit';
import { jsonSuccess, jsonError, handleError, HTTP_STATUS } from '@/lib/api';

const SignUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(req: NextRequest) {
  // Rate limiting
  const rateLimitResult = await rateLimit(req, RATE_LIMIT_CONFIGS.auth);
  if (rateLimitResult) return rateLimitResult;

  try {
    const body = await req.json();

    // Validate input
    const result = SignUpSchema.safeParse(body);
    if (!result.success) {
      return jsonError(result.error.errors[0].message, 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
    }

    const { email, password } = result.data;

    // Get the origin for the redirect URL
    const origin = req.headers.get('origin') || req.nextUrl.origin;

    // Sign up with Supabase
    const supabase = createRouteHandlerClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback?type=signup`,
      },
    });

    if (error) {
      // Check for specific errors
      if (error.message.includes('already registered')) {
        return jsonError(
          'An account with this email already exists',
          'VALIDATION_ERROR',
          HTTP_STATUS.CONFLICT,
        );
      }

      return jsonError(error.message, 'UNAUTHORIZED', HTTP_STATUS.BAD_REQUEST);
    }

    return jsonSuccess({
      message: 'Please check your email to verify your account',
      user: data.user
        ? {
            id: data.user.id,
            email: data.user.email,
          }
        : null,
    });
  } catch (error) {
    return handleError(error, 'Failed to sign up');
  }
}
