/**
 * Rate Limit Countdown Hook
 *
 * Reusable countdown timer for rate-limited forms.
 * Automatically clears error message when countdown reaches 0.
 */

import { useState, useEffect, useRef } from 'react';

interface UseRateLimitCountdownOptions {
  onExpire?: () => void;
}

interface UseRateLimitCountdownReturn {
  rateLimitSeconds: number;
  setRateLimitSeconds: (seconds: number) => void;
  isRateLimited: boolean;
}

/**
 * Hook for managing rate limit countdown timer
 *
 * @example
 * const { rateLimitSeconds, setRateLimitSeconds, isRateLimited } = useRateLimitCountdown({
 *   onExpire: () => setError(''),
 * });
 */
export function useRateLimitCountdown(
  options: UseRateLimitCountdownOptions = {},
): UseRateLimitCountdownReturn {
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);

  // Held in a ref so an inline `onExpire` never restarts the interval.
  const onExpire = useRef(options.onExpire);
  useEffect(() => {
    onExpire.current = options.onExpire;
  }, [options.onExpire]);

  useEffect(() => {
    if (rateLimitSeconds <= 0) return;

    const timer = setInterval(() => {
      setRateLimitSeconds((prev) => {
        if (prev <= 1) {
          onExpire.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [rateLimitSeconds]);

  return {
    rateLimitSeconds,
    setRateLimitSeconds,
    isRateLimited: rateLimitSeconds > 0,
  };
}
