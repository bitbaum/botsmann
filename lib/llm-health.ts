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
 */

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

let consecutiveFailures = 0;
let lastError: string | null = null;
let lastSuccessAt: number | null = null;
let lastFailureAt: number | null = null;

/** Call after a generation that produced usable content. */
export function recordLLMSuccess(): void {
  consecutiveFailures = 0;
  lastError = null;
  lastSuccessAt = Date.now();
}

/** Call when generation threw, or returned nothing usable. */
export function recordLLMFailure(error: unknown): void {
  consecutiveFailures += 1;
  lastFailureAt = Date.now();
  lastError = error instanceof Error ? error.message : String(error ?? 'unknown error');
}

export function getLLMHealth(): LLMHealth {
  let status: LLMHealthStatus;
  if (consecutiveFailures >= DOWN_AFTER_CONSECUTIVE_FAILURES) status = 'down';
  else if (consecutiveFailures > 0) status = 'degraded';
  else if (lastSuccessAt !== null) status = 'ok';
  else status = 'unknown';

  return {
    status,
    consecutiveFailures,
    lastError,
    lastSuccessAt: lastSuccessAt ? new Date(lastSuccessAt).toISOString() : null,
    lastFailureAt: lastFailureAt ? new Date(lastFailureAt).toISOString() : null,
  };
}

/** Test seam. */
export function resetLLMHealth(): void {
  consecutiveFailures = 0;
  lastError = null;
  lastSuccessAt = null;
  lastFailureAt = null;
}
