/**
 * Distributed Rate Limiting via Supabase
 *
 * Uses a PostgreSQL function (check_rate_limit) for atomic check-and-increment.
 * Works correctly across serverless function instances.
 */

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
