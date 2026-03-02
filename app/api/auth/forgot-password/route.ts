/**
 * Forgot Password API Route
 *
 * POST /api/auth/forgot-password
 * Rate limited: 3 requests per 5 minutes (strict)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase-server';
import { z } from 'zod';
import { rateLimit, RATE_LIMIT_CONFIGS } from '@/lib/middleware/rate-limit';
import { logger } from '@/lib/logger';

const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(req: NextRequest) {
  // Rate limiting (stricter for password reset)
  const rateLimitResult = await rateLimit(req, RATE_LIMIT_CONFIGS.passwordReset);
  if (rateLimitResult) return rateLimitResult;

  try {
    const body = await req.json();

    // Validate input
    const result = ForgotPasswordSchema.safeParse(body);
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

    const { email } = result.data;

    // Get the origin for the redirect URL
    const origin = req.headers.get('origin') || req.nextUrl.origin;

    // Send password reset email
    const supabase = createRouteHandlerClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?type=recovery`,
    });

    // Always return success to prevent email enumeration
    // Even if the email doesn't exist, we don't reveal that
    if (error) {
      logger.error('Password reset error:', error);
    }

    return NextResponse.json({
      success: true,
      message: 'If an account with this email exists, a password reset link has been sent',
    });
  } catch (error) {
    logger.error('Forgot password error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while sending reset email',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 },
    );
  }
}
