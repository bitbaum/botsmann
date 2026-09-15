/**
 * Rate Limit Tests
 *
 * The algorithm is limitkit's and tested there. What is pinned here is the
 * app's contract on top of it: a bucket refuses at its budget with the
 * response shape the auth forms read, keys are per client IP unless the
 * bucket is global, and every bucket a route can name has a sane budget.
 */

import { NextRequest } from 'next/server';
import { enforceRateLimit, RATE_LIMITS, type RateLimitBucket } from '@/lib/rate-limit';

function request(ip: string): NextRequest {
  return new NextRequest('http://localhost:3000/api/x', {
    method: 'POST',
    // Caddy appends the hop it saw; limitkit trusts exactly that one.
    headers: { 'x-forwarded-for': `10.0.0.1, ${ip}` },
  });
}

/** A scope no other test touches, so buckets never bleed between cases. */
let scopeSeq = 0;
const freshScope = () => `t${++scopeSeq}`;

describe('enforceRateLimit', () => {
  it('allows up to the budget, then refuses with a 429 the auth forms can read', async () => {
    const scope = freshScope();
    const { max, windowSeconds } = RATE_LIMITS.auth;

    for (let i = 0; i < max; i++) {
      expect(enforceRateLimit(request('203.0.113.7'), 'auth', scope)).toBeNull();
    }

    const refused = enforceRateLimit(request('203.0.113.7'), 'auth', scope);
    expect(refused).not.toBeNull();
    expect(refused!.status).toBe(429);
    expect(refused!.headers.get('Retry-After')).toBe(String(windowSeconds));
    expect(refused!.headers.get('X-RateLimit-Limit')).toBe(String(max));
    expect(refused!.headers.get('X-RateLimit-Remaining')).toBe('0');

    const body = await refused!.json();
    expect(body).toMatchObject({ success: false, code: 'RATE_LIMIT', retryAfter: windowSeconds });
    expect(typeof body.error).toBe('string');
  });

  it('keys per client IP: one caller filling a bucket does not lock another out', () => {
    const scope = freshScope();
    for (let i = 0; i < RATE_LIMITS.auth.max; i++) {
      enforceRateLimit(request('198.51.100.1'), 'auth', scope);
    }
    expect(enforceRateLimit(request('198.51.100.1'), 'auth', scope)).not.toBeNull();
    expect(enforceRateLimit(request('198.51.100.2'), 'auth', scope)).toBeNull();
  });

  it('a global bucket counts every caller together', () => {
    const scope = freshScope();
    for (let i = 0; i < RATE_LIMITS.consultations.max; i++) {
      expect(enforceRateLimit(request(`192.0.2.${i}`), 'consultations', scope)).toBeNull();
    }
    expect(enforceRateLimit(request('192.0.2.200'), 'consultations', scope)).not.toBeNull();
  });

  it('a forged first hop does not mint a fresh bucket', () => {
    const scope = freshScope();
    for (let i = 0; i < RATE_LIMITS.auth.max; i++) {
      const req = new NextRequest('http://localhost:3000/api/x', {
        method: 'POST',
        headers: { 'x-forwarded-for': `1.2.3.${i}, 203.0.113.9` },
      });
      enforceRateLimit(req, 'auth', scope);
    }
    const req = new NextRequest('http://localhost:3000/api/x', {
      method: 'POST',
      headers: { 'x-forwarded-for': '9.9.9.9, 203.0.113.9' },
    });
    expect(enforceRateLimit(req, 'auth', scope)).not.toBeNull();
  });

  it('every bucket has a positive budget and window', () => {
    for (const bucket of Object.keys(RATE_LIMITS) as RateLimitBucket[]) {
      const rule = RATE_LIMITS[bucket];
      expect(rule.max, bucket).toBeGreaterThan(0);
      expect(rule.windowSeconds, bucket).toBeGreaterThan(0);
    }
  });
});
