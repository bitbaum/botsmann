/**
 * Resend Verification Email API Route
 *
 * POST /api/auth/resend-verification
 * Rate limited: 2 requests per 2 minutes
 * Requires authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase-server';
import { rateLimit, RATE_LIMIT_CONFIGS } from '@/lib/middleware/rate-limit';
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
  // Rate limiting (strict for email resend)
  const rateLimitResult = await rateLimit(req, RATE_LIMIT_CONFIGS.emailResend);
  if (rateLimitResult) return rateLimitResult;

  try {
    const supabase = createRouteHandlerClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: 'You must be logged in to resend verification email',
          code: 'UNAUTHORIZED',
        },
        { status: 401 },
      );
    }

    // Check if already verified
    if (user.email_confirmed_at) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email is already verified',
          code: 'ALREADY_VERIFIED',
        },
        { status: 400 },
      );
    }

    if (!user.email) {
      return NextResponse.json(
        {
          success: false,
          error: 'No email address found',
          code: 'NO_EMAIL',
        },
        { status: 400 },
      );
    }

    // Get the origin for the redirect URL
    const origin = req.headers.get('origin') || req.nextUrl.origin;

    // Resend verification email
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email,
      options: {
        emailRedirectTo: `${origin}/auth/callback?type=signup`,
      },
    });

    if (error) {
      logger.error('Resend verification error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send verification email. Please try again later.',
          code: 'SEND_ERROR',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Verification email sent. Please check your inbox.',
    });
  } catch (error) {
    logger.error('Resend verification error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while sending verification email',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 },
    );
  }
}
