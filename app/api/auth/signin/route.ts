/**
 * Sign In API Route
 *
 * POST /api/auth/signin
 * Rate limited: 5 requests per minute
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase-server';
import { z } from 'zod';
import { rateLimit, RATE_LIMIT_CONFIGS } from '@/lib/middleware/rate-limit';
import { logger } from '@/lib/logger';

const SignInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(req: NextRequest) {
  // Rate limiting
  const rateLimitResult = await rateLimit(req, RATE_LIMIT_CONFIGS.auth);
  if (rateLimitResult) return rateLimitResult;

  try {
    const body = await req.json();

    // Validate input
    const result = SignInSchema.safeParse(body);
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

    const { email, password } = result.data;

    // Sign in with Supabase
    const supabase = createRouteHandlerClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Don't reveal whether email exists for security
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email or password',
          code: 'AUTH_ERROR',
        },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        emailVerified: Boolean(data.user.email_confirmed_at),
      },
    });
  } catch (error) {
    logger.error('Sign in error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred during sign in',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 },
    );
  }
}
