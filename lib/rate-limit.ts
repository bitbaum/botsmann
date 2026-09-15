/**
 * Rate limiting — one module, one table of budgets.
 *
 * The decision (sliding window, bounded in-process store, the standard
 * X-RateLimit-* / Retry-After headers, which forwarded hop to trust) is
 * limitkit's — see fleet/SHARED.md. What stays here is app semantics: WHICH
 * buckets exist and how much each allows. A route names a bucket; it does not
 * get to invent a number.
 *
 * Counts live in process memory. This app runs as ONE `next start` process
 * behind Caddy on bitbaum, so that is the shared store. The Supabase RPC
 * (`check_rate_limit`, migration 010) the two previous limiters called was
 * written for serverless instances this app no longer has — and it failed
 * OPEN on every error, i.e. the limiter switched itself off whenever the
 * database hiccupped. limitkit has no such mode. Behind N workers the
 * effective limit would multiply by N; if that ever happens, implement
 * limitkit's two-method `Store` over Postgres and change nothing else.
 */

import type { NextRequest, NextResponse } from 'next/server';
import { slidingWindow, clientIp, toHeaders, type Limiter } from 'limitkit';
import { jsonRateLimitError, type ApiResponse } from '@/lib/api';

interface RateLimitRule {
  /** Hits allowed inside the window. */
  max: number;
  /** Window length in seconds. */
  windowSeconds: number;
  /**
   * Count every caller together instead of per client IP. For budgets that
   * protect a downstream (an outbound mailbox), not a caller.
   */
  global?: boolean;
}

/**
 * Every rate-limited bucket in the product, with its budget.
 */
export const RATE_LIMITS = {
  // Routes that call an LLM — each request costs money.
  chat: { max: 20, windowSeconds: 60 },
  'professional-chat': { max: 15, windowSeconds: 60 },
  'quick-chat': { max: 10, windowSeconds: 60 },
  'demo-chat': { max: 15, windowSeconds: 60 },
  'demo-doc-chat': { max: 15, windowSeconds: 60 },
  'demo-pdf-parse': { max: 10, windowSeconds: 60 },
  'custom-bot-chat': { max: 15, windowSeconds: 60 },

  // Auth — strict, because every attempt is a guess at somebody's password.
  auth: { max: 5, windowSeconds: 60 },
  'password-reset': { max: 3, windowSeconds: 300 },
  'email-resend': { max: 2, windowSeconds: 120 },
  profile: { max: 60, windowSeconds: 60 },

  // Forms and operations.
  contact: { max: 5, windowSeconds: 600 },
  consultations: { max: 5, windowSeconds: 60, global: true },
  rebuild: { max: 5, windowSeconds: 600 },
} as const satisfies Record<string, RateLimitRule>;

export type RateLimitBucket = keyof typeof RATE_LIMITS;

const limiters = Object.fromEntries(
  (Object.entries(RATE_LIMITS) as [RateLimitBucket, RateLimitRule][]).map(([bucket, rule]) => [
    bucket,
    slidingWindow({ limit: rule.max, windowMs: rule.windowSeconds * 1000 }),
  ]),
) as Record<RateLimitBucket, Limiter>;

/**
 * Enforce a bucket's limit for the caller, scoped per client IP.
 *
 * Returns a ready-to-return 429 when the caller is over budget, or null when
 * the request may proceed — so a route reads:
 *
 *   const limited = enforceRateLimit(request, 'demo-chat');
 *   if (limited) return limited;
 *
 * `scope` narrows the key further (e.g. a bot id), so one hot resource cannot
 * exhaust another's budget.
 */
export function enforceRateLimit(
  request: NextRequest,
  bucket: RateLimitBucket,
  scope?: string,
): NextResponse<ApiResponse> | null {
  const rule: RateLimitRule = RATE_LIMITS[bucket];
  const who = rule.global ? 'all' : clientIp(request.headers);
  const key = scope ? `${bucket}:${scope}:${who}` : `${bucket}:${who}`;

  const result = limiters[bucket].check(key);
  if (result.allowed) return null;

  return jsonRateLimitError('Too many requests. Please slow down.', {
    retryAfter: result.retryAfterSeconds,
    headers: toHeaders(result),
  });
}
