import { LRUCache } from 'lru-cache';

export interface RateLimitConfig {
  interval: number;
  uniqueTokenPerInterval: number;
  limit: number;
}

export function rateLimit(config: RateLimitConfig) {
  const tokenCache = new LRUCache({
    max: config.uniqueTokenPerInterval || 500,
    ttl: config.interval || 60000,
  });

  return {
    check: (token: string | null) => {
      const tokenKey = token || 'anonymous';
      const tokenCount = (tokenCache.get(tokenKey) as number[]) || [0];
      const [currentCount] = tokenCount;
      const newCount = currentCount + 1;

      tokenCache.set(tokenKey, [newCount]);

      const isRateLimited = newCount > config.limit;
      return { isRateLimited, remaining: Math.max(0, config.limit - newCount) };
    },
  };
}

// Enhanced rate limiting with IP-based tracking for better security
export function createRateLimiter(config: RateLimitConfig) {
  const ipCache = new LRUCache({
    max: 1000,
    ttl: config.interval || 60000,
  });

  return {
    check: (ip: string, userId?: string) => {
      // Use a combination of IP and user ID for more accurate rate limiting
      const key = userId ? `${ip}:${userId}` : ip;
      const requestCount = (ipCache.get(key) as number) || 0;
      const newCount = requestCount + 1;

      ipCache.set(key, newCount);

      const isRateLimited = newCount > config.limit;
      return {
        isRateLimited,
        remaining: Math.max(0, config.limit - newCount),
        resetTime: Date.now() + (config.interval || 60000)
      };
    },
  };
}
