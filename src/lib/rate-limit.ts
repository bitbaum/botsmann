import { LRUCache } from "lru-cache";

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
      const tokenKey = token || "anonymous";
      const tokenCount = (tokenCache.get(tokenKey) as number[]) || [0];
      const [currentCount] = tokenCount;
      const newCount = currentCount + 1;

      tokenCache.set(tokenKey, [newCount]);

      const isRateLimited = newCount > config.limit;
      return { isRateLimited, remaining: Math.max(0, config.limit - newCount) };
    },
  };
}
