import { aiLivenessHandler } from '@/lib/ai-liveness';

export const dynamic = 'force-dynamic';

/**
 * Can the AI answer RIGHT NOW?
 *
 *   GET /api/health/ai            free. What the last real call did.
 *   GET /api/health/ai?probe=1    a real call. Needs AI_PROBE_SECRET, via the
 *                                 `x-probe-secret` header or `?secret=`.
 *
 * Separate from /api/health on purpose, because the two have OPPOSITE
 * contracts. That route is liveness: it must stay 200 while the LLM is down,
 * because restarting the app does not fix an expired API key and failing on it
 * would get a healthy process killed. This one is the inverse — 200 only when a
 * model actually answered, 503 when the chain could not — so an uptime monitor
 * can page on a real AI outage without paging on every deploy.
 *
 * On 2026-08-28 /api/health reported "healthy" while every AI feature was
 * failing on an invalid Groq key. Carrying `llm` in that body fixed the
 * reporting; it did not make the state observable BEFORE a user hit it, because
 * nothing calls a provider until somebody uses the bot. This route does.
 */
export const GET = aiLivenessHandler;
