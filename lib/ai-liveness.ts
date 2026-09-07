/**
 * Can this deployment reach a model RIGHT NOW?
 *
 * `/api/health` carries `llm` as an informational field, and that field reports
 * what happened the LAST time something called a provider. Straight after a
 * deploy it is `"unknown"`, and unknown is what it stays until real traffic
 * arrives — so the one question a deploy needs answered ("did I just ship a
 * working AI path?") is exactly the one it cannot answer.
 *
 * This repo already knows the cost of that gap. On 2026-08-28 `/api/health`
 * said "healthy" while every AI feature on the site was failing on an invalid
 * Groq key. Adding `llm` to the body fixed the reporting; it did not make the
 * state OBSERVABLE before a user hit it, because nothing calls a provider until
 * somebody uses the bot.
 *
 * ── It probes THIS app's chain ───────────────────────────────────────────────
 * `ask` calls `generateWithBestProvider`, the same function the chat routes
 * use. A probe built from its own provider list would test a path nothing else
 * takes and would drift from this one the first time the chain changed.
 *
 * ── Gating and caching are ai-kit's ──────────────────────────────────────────
 * A probe spends real tokens from the same free budget the bot draws on, so it
 * runs only on `?probe=1` WITH the secret, a success is cached ten minutes, and
 * a failure is never cached. With no secret configured the route answers 501
 * rather than becoming an open endpoint that can spend money.
 */

import { createAiHealthHandler } from '@bitbaum/ai-kit';

import { generateWithBestProvider } from './llm-client';
import { llmHealthTracker } from './llm-health';

/**
 * Built lazily. Next evaluates module-level code during the BUILD, where the
 * runtime's keys are absent — an eagerly-built handler would capture that empty
 * environment and report a dead engine forever on a deployment whose keys are
 * fine.
 */
let handler: ((request: Request) => Promise<Response>) | null = null;

export function aiLivenessHandler(request: Request): Promise<Response> {
  handler ??= createAiHealthHandler({
    // A getter, not a value: the handler is built once and reused, so a plain
    // string would be whatever the environment held on the first request —
    // un-rotatable without a restart, and untestable.
    secret: () => process.env.AI_PROBE_SECRET,
    // The tracker the real chat writes to, so one probe also answers the next
    // ordinary /api/health poll instead of dying with this request.
    health: llmHealthTracker,
    ask: async () => {
      const result = await generateWithBestProvider(
        [
          { role: 'system', content: 'Answer with a single word, no punctuation.' },
          { role: 'user', content: 'What colour is a clear midday sky? One word.' },
        ],
        // Generous on purpose: the chain leads with reasoning models, which
        // spend this budget thinking before emitting a visible token, and an
        // empty completion is treated as a failure. A mean budget would make a
        // healthy deployment report itself dead.
        { maxTokens: 256, temperature: 0 },
      );
      return { text: result.content, id: `${result.provider}/${result.model}` };
    },
  });
  return handler(request);
}
