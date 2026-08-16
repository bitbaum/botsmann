/**
 * The OpenRouter fallback must never be a paid model.
 *
 * Pinned as a test rather than trusted to review because this path is invisible
 * in normal operation: OpenRouter is only reached when Groq's free tier is
 * spent, so a paid id there bills precisely when nobody is watching. The
 * previous default was `anthropic/claude-sonnet-5` — a premium model, and a
 * breach of the standing fleet rule that Anthropic is never a primary or
 * fallback provider.
 *
 * The rule mirrors `modelCost` in the shared `ai-ration` package: a routed id
 * (`vendor/model`) is free only with the `:free` suffix. That suffix is the
 * entire difference between free routing and a per-call charge for identical
 * weights, which is why an id one token away from correct kept slipping through.
 */
import { API_CONFIG } from '@/lib/constants';

describe('free-first fallback', () => {
  it('uses a :free OpenRouter model as the fallback default', () => {
    expect(API_CONFIG.OPENROUTER_DEFAULT_MODEL).toMatch(/:free$/);
  });

  it('never falls back to Anthropic', () => {
    // Standing fleet rule: Anthropic is paid and is not a fallback anywhere.
    expect(API_CONFIG.OPENROUTER_DEFAULT_MODEL).not.toMatch(/anthropic/i);
  });
});
