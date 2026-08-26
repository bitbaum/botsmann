/**
 * The OpenRouter fallback must never be a paid model.
 *
 * Pinned as a test rather than trusted to review because this path is invisible
 * in normal operation: OpenRouter is only reached when Groq's free tier is
 * spent, so a paid id there bills precisely when nobody is watching. The
 * original default was `anthropic/claude-sonnet-5` — a premium model, and a
 * breach of the standing fleet rule that Anthropic is never a primary or
 * fallback provider.
 *
 * The rule itself is unchanged. What changed is what it is checked against.
 *
 * It used to assert a regex on ONE constant in this repo,
 * `OPENROUTER_DEFAULT_MODEL`. That constant is gone: it named
 * `openai/gpt-oss-20b:free`, which the vendor has since retired, and the Groq id
 * beside it went the same way. The ids now come from `ai-kit`, so the guarantee
 * has to cover the whole list this app might actually send — every model, not
 * just the first — and it uses `modelCost`, the function the rest of the fleet
 * reasons about price with, rather than a regex re-derived here.
 *
 * `modelCost` is the right check and not merely the convenient one: for a routed
 * id (`vendor/model`) the `:free` suffix is the entire difference between free
 * routing and a per-call charge for identical weights, which is why an id one
 * token away from correct kept slipping through review.
 */
import { freeChain, providerModels, modelCost } from 'ai-kit';

const openRouter = freeChain('BOTSMANN')[1];

describe('free-first fallback', () => {
  it('has an OpenRouter list to fall back to at all', () => {
    // Guards the indexing above. If the chain is ever reordered so that [1] is
    // not OpenRouter, every assertion below would pass vacuously against the
    // wrong vendor.
    expect(openRouter.id).toBe('openrouter');
    expect(providerModels(openRouter).length).toBeGreaterThan(0);
  });

  it('offers only free models as the fallback — every one of them', () => {
    const paid = providerModels(openRouter).filter((m) => modelCost(m) !== 'free');
    // Named, not counted: the failure should say which id would bill.
    expect(paid).toEqual([]);
  });

  it('never falls back to Anthropic', () => {
    // Standing fleet rule: Anthropic is paid and is not a fallback anywhere.
    const anthropic = providerModels(openRouter).filter((m) => /anthropic/i.test(m));
    expect(anthropic).toEqual([]);
  });
});
