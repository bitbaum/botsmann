/**
 * Distributed Rate Limiting via Supabase
 *
 * Uses a PostgreSQL function (check_rate_limit) for atomic check-and-increment.
 * Works correctly across serverless function instances.
 */

import type { NextRequest, NextResponse } from 'next/server';
import { jsonRateLimitError } from '@/lib/api';
import { getClientIp } from '@/lib/request';
import { getServiceClient, isSupabaseConfigured } from '@/lib/supabase';

export interface RateLimitResult {
  isRateLimited: boolean;
  remaining: number;
}

/**
 * Check rate limit for a given key.
 *
 * @param key - Unique identifier (e.g. "contact:192.168.1.1")
 * @param maxRequests - Maximum requests allowed in the window
 * @param windowSeconds - Window duration in seconds
 * @returns Whether the request is rate limited
 */
export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  if (!isSupabaseConfigured()) {
    // Development fallback: allow all requests
    return { isRateLimited: false, remaining: maxRequests };
  }

  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase.rpc('check_rate_limit', {
      p_key: key,
      p_max_requests: maxRequests,
      p_window_seconds: windowSeconds,
    });

    if (error) {
      // Fail open: if rate limiting breaks, don't block users
      return { isRateLimited: false, remaining: maxRequests };
    }

    return {
      isRateLimited: !data.allowed,
      remaining: data.remaining,
    };
  } catch {
    // Fail open on unexpected errors
    return { isRateLimited: false, remaining: maxRequests };
  }
}

// ============================================================================
// Route-level enforcement
// ============================================================================

/**
 * Every rate-limited bucket in the product, with its budget.
 *
 * SSOT: limits live here, not as magic numbers scattered across route files.
 * A route names a bucket; it does not get to invent a number.
 */
export const RATE_LIMITS = {
  chat: { max: 20, windowSeconds: 60 },
  'professional-chat': { max: 15, windowSeconds: 60 },
  'quick-chat': { max: 10, windowSeconds: 60 },
  'demo-chat': { max: 15, windowSeconds: 60 },
  'demo-doc-chat': { max: 15, windowSeconds: 60 },
  'demo-pdf-parse': { max: 10, windowSeconds: 60 },
  'custom-bot-chat': { max: 15, windowSeconds: 60 },
  contact: { max: 5, windowSeconds: 600 },
  rebuild: { max: 5, windowSeconds: 600 },
} as const;

export type RateLimitBucket = keyof typeof RATE_LIMITS;

/**
 * Enforce a bucket's limit for the caller, scoped per client IP.
 *
 * Returns a ready-to-return 429 when the caller is over budget, or null when
 * the request may proceed — so a route reads:
 *
 *   const limited = await enforceRateLimit(request, 'demo-chat');
 *   if (limited) return limited;
 *
 * `scope` narrows the key further (e.g. a bot id), so one hot resource cannot
 * exhaust another's budget.
 */
export async function enforceRateLimit(
  request: NextRequest,
  bucket: RateLimitBucket,
  scope?: string,
): Promise<NextResponse | null> {
  const { max, windowSeconds } = RATE_LIMITS[bucket];
  const ip = getClientIp(request);
  const key = scope ? `${bucket}:${scope}:${ip}` : `${bucket}:${ip}`;

  const { isRateLimited } = await checkRateLimit(key, max, windowSeconds);
  if (!isRateLimited) return null;

  return jsonRateLimitError('Too many requests. Please slow down.');
}
