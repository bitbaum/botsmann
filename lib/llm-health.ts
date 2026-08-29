/**
 * Observed health of the LLM provider chain.
 *
 * On 2026-08-28 every AI feature on the site was dead -- the Groq key was
 * returning 401 and no other provider was configured -- and nothing noticed.
 * The chat routes caught the error and answered HTTP 200 with
 * "I'm having a moment... could you try again?", and /api/health reported
 * "healthy" because it only ever checked the database. A total outage of the
 * product's core feature was invisible to every automated check.
 *
 * So the routes now record what actually happened, and health reports it.
 * This is deliberately in-process: botsmann runs as a single systemd service
 * on one box, so module state is shared by every request. If it is ever
 * scaled horizontally this becomes per-instance and wants a shared store.
 *
 * The state machine itself now lives in `ai-kit` (`createHealthTracker`),
 * extracted from this exact file so the next app that needs it does not
 * hand-roll its own copy. This module is a thin, backward-compatible
 * wrapper: one shared tracker instance, the same five function names
 * every route and test already imports, and epoch timestamps turned into
 * the ISO strings the health API has always returned.
 */

import { createHealthTracker } from 'ai-kit';

/** Consecutive failures before we call the chain down rather than flaky. */
const DOWN_AFTER_CONSECUTIVE_FAILURES = 3;

export type LLMHealthStatus = 'ok' | 'degraded' | 'down' | 'unknown';

export interface LLMHealth {
  status: LLMHealthStatus;
  consecutiveFailures: number;
  lastError: string | null;
  lastSuccessAt: string | null;
  lastFailureAt: string | null;
}

const tracker = createHealthTracker({ downAfter: DOWN_AFTER_CONSECUTIVE_FAILURES });

/** Call after a generation that produced usable content. */
export function recordLLMSuccess(): void {
  tracker.recordSuccess();
}

/** Call when generation threw, or returned nothing usable. */
export function recordLLMFailure(error: unknown): void {
  tracker.recordFailure(error);
}

export function getLLMHealth(): LLMHealth {
  const health = tracker.getHealth();
  return {
    status: health.status,
    consecutiveFailures: health.consecutiveFailures,
    lastError: health.lastError,
    lastSuccessAt: health.lastSuccessAt ? new Date(health.lastSuccessAt).toISOString() : null,
    lastFailureAt: health.lastFailureAt ? new Date(health.lastFailureAt).toISOString() : null,
  };
}

/** Test seam. */
export function resetLLMHealth(): void {
  tracker.reset();
}
