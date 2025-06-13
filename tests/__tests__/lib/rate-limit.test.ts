import { rateLimit } from '@/src/lib/rate-limit';

describe('rateLimit utility', () => {
  test('limits requests per token', () => {
    const limiter = rateLimit({ limit: 2, interval: 1000, uniqueTokenPerInterval: 2 });
    expect(limiter.check('user1')).toEqual({ isRateLimited: false, remaining: 1 });
    expect(limiter.check('user1')).toEqual({ isRateLimited: false, remaining: 0 });
    expect(limiter.check('user1')).toEqual({ isRateLimited: true, remaining: 0 });
  });

  test('handles anonymous tokens', () => {
    const limiter = rateLimit({ limit: 1, interval: 1000, uniqueTokenPerInterval: 2 });
    expect(limiter.check(null).isRateLimited).toBe(false);
    expect(limiter.check(null).isRateLimited).toBe(true);
  });

  test('tracks separate tokens individually', () => {
    const limiter = rateLimit({ limit: 1, interval: 1000, uniqueTokenPerInterval: 2 });
    expect(limiter.check('A').isRateLimited).toBe(false);
    expect(limiter.check('B').isRateLimited).toBe(false);
    expect(limiter.check('A').isRateLimited).toBe(true);
    expect(limiter.check('B').isRateLimited).toBe(true);
  });
});
