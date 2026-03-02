/**
 * Rate Limiting Middleware
 *
 * Wraps the Supabase-based rate limiter with NextRequest/NextResponse handling.
 * Provides pre-configured limits for different route types.
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  maxRequests: number;
  /** Time window in seconds */
  windowSizeSeconds: number;
  /** Identifier for this rate limit (used as key prefix) */
  name: string;
}

/**
 * Pre-configured rate limit settings for different use cases
 */
export const RATE_LIMIT_CONFIGS = {
  /** Auth routes: 5 requests per minute (strict for security) */
  auth: {
    maxRequests: 5,
    windowSizeSeconds: 60,
    name: 'auth',
  },
  /** Password reset: 3 requests per 5 minutes (very strict) */
  passwordReset: {
    maxRequests: 3,
    windowSizeSeconds: 300,
    name: 'password-reset',
  },
  /** Email resend: 2 requests per 2 minutes */
  emailResend: {
    maxRequests: 2,
    windowSizeSeconds: 120,
    name: 'email-resend',
  },
  /** API routes: 60 requests per minute */
  api: {
    maxRequests: 60,
    windowSizeSeconds: 60,
    name: 'api',
  },
  /** Strict API: 10 requests per minute (for expensive operations) */
  apiStrict: {
    maxRequests: 10,
    windowSizeSeconds: 60,
    name: 'api-strict',
  },
} as const;

/**
 * Get client identifier from request
 */
function getClientIdentifier(req: NextRequest, configName: string): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip');

  const ip = cfConnectingIp || realIp || forwardedFor?.split(',')[0]?.trim() || 'unknown';

  return `${ip}:${configName}`;
}

/**
 * Check rate limit and return 429 response if limited, null if allowed.
 */
export async function rateLimit(
  req: NextRequest,
  config: RateLimitConfig,
): Promise<NextResponse | null> {
  const identifier = getClientIdentifier(req, config.name);
  const result = await checkRateLimit(identifier, config.maxRequests, config.windowSizeSeconds);

  if (result.isRateLimited) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many requests',
        code: 'RATE_LIMITED',
        retryAfter: config.windowSizeSeconds,
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(config.maxRequests),
          'X-RateLimit-Remaining': '0',
          'Retry-After': String(config.windowSizeSeconds),
        },
      },
    );
  }

  return null;
}

/**
 * Higher-order function to wrap an API handler with rate limiting
 */
export function withRateLimit<T>(
  config: RateLimitConfig,
  handler: (req: NextRequest) => Promise<NextResponse<T>>,
) {
  return async (req: NextRequest): Promise<NextResponse<T> | NextResponse> => {
    const rateLimitResult = await rateLimit(req, config);
    if (rateLimitResult) {
      return rateLimitResult;
    }
    return handler(req);
  };
}
