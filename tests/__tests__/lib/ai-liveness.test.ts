/**
 * On 2026-08-28 `/api/health` reported "healthy" while every AI feature on the
 * site was failing on an invalid Groq key. Carrying `llm` in that body fixed
 * the REPORTING; it did not make the state observable before a user hit it,
 * because nothing calls a provider until somebody uses the bot.
 *
 * This probe does. ai-kit owns the gating, the caching and the
 * never-cache-a-failure rule and tests them there. What is app-specific, and
 * what these hold, is the WIRING: an ordinary poll is free, the gate is really
 * connected to AI_PROBE_SECRET, and the probe walks THIS app's chain rather
 * than a parallel one.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/**
 * Each test loads the module FRESH.
 *
 * The handler is a module-level singleton — the probe's cache lives inside it —
 * and a success is cached for ten minutes. Sharing one instance would let the
 * first success answer every later case, so the failure tests would read 200
 * and pass for the wrong reason. The caching is a safety property worth
 * keeping: it is what stops a monitor in a retry loop draining the free budget.
 */
async function loadHandler() {
  vi.resetModules();
  return (await import('@/lib/ai-liveness')).aiLivenessHandler;
}

const ORIGINAL_ENV = { ...process.env };

/** Built PER CALL: one Response body can be read only once. */
function completion(content: string) {
  return new Response(JSON.stringify({ choices: [{ message: { content } }] }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  // generateWithBestProvider goes through getServerEnv(), which validates the
  // WHOLE server env and throws on the first missing var — so a probe test that
  // sets only the AI keys fails on Supabase, not on the chain. Prod has these.
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'service';
  process.env.GROQ_API_KEY = 'gsk_test';
  delete process.env.AI_PROBE_SECRET;
  delete process.env.OPENROUTER_API_KEY;
  delete process.env.OLLAMA_URL;
  // Ollama is tried FIRST and its availability is a live ping, so a mock that
  // answers every URL makes a local runtime appear to exist and win the chain.
  // Prod has no Ollama; refusing that host is what makes this the real shape.
  fetchMock = vi.fn(async (url: string) =>
    String(url).includes('11434') || String(url).includes('/api/tags')
      ? Promise.reject(new Error('ECONNREFUSED'))
      : completion('blue'),
  );
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  process.env = { ...ORIGINAL_ENV };
});

describe('GET /api/health/ai', () => {
  it('an ordinary poll costs nothing', async () => {
    const handler = await loadHandler();
    const res = await handler(new Request('https://b.test/api/health/ai'));

    expect(res.status).toBe(200);
    expect((await res.json()).probed).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('refuses to probe without the secret, and spends nothing while refusing', async () => {
    process.env.AI_PROBE_SECRET = 'right';
    const handler = await loadHandler();

    expect((await handler(new Request('https://b.test/api/health/ai?probe=1'))).status).toBe(401);
    expect(
      (await handler(new Request('https://b.test/api/health/ai?probe=1&secret=nope'))).status,
    ).toBe(401);

    // The point of the gate is the SPEND, not the status code.
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('with AI_PROBE_SECRET unset, probing is OFF (501) rather than open', async () => {
    const handler = await loadHandler();
    const res = await handler(new Request('https://b.test/api/health/ai?probe=1&secret=anything'));

    expect(res.status).toBe(501);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("probes THIS app's chain and reports which link served it", async () => {
    process.env.AI_PROBE_SECRET = 'right';
    const handler = await loadHandler();

    const res = await handler(new Request('https://b.test/api/health/ai?probe=1&secret=right'));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.answer).toBe('blue');
    expect(body.servedBy).toMatch(/^groq\//);
    // The real chain, not a parallel one. Not calls[0]: Ollama is tried first
    // and its availability check is a live ping, so the first request is that
    // ping rather than a completion. What matters is that a completion reached
    // the vendor the chain actually chose.
    const urls = fetchMock.mock.calls.map(([u]) => String(u));
    expect(urls.some((u) => u.includes('groq'))).toBe(true);
  });

  it('a dead chain is 503, so an uptime monitor can watch this URL', async () => {
    process.env.AI_PROBE_SECRET = 'right';
    fetchMock.mockImplementation(async (url: string) =>
      String(url).includes('11434')
        ? Promise.reject(new Error('ECONNREFUSED'))
        : new Response('boom', { status: 500 }),
    );
    const handler = await loadHandler();

    const res = await handler(new Request('https://b.test/api/health/ai?probe=1&secret=right'));

    expect(res.status).toBe(503);
  });

  it('an EMPTY 200 is a failure — the exact shape that reads as success', async () => {
    process.env.AI_PROBE_SECRET = 'right';
    fetchMock.mockImplementation(async (url: string) =>
      String(url).includes('11434') ? Promise.reject(new Error('ECONNREFUSED')) : completion(''),
    );
    const handler = await loadHandler();

    const res = await handler(new Request('https://b.test/api/health/ai?probe=1&secret=right'));

    expect(res.status).toBe(503);
  });

  it('one probe teaches /api/health — it stops saying "unknown"', async () => {
    process.env.AI_PROBE_SECRET = 'right';
    vi.resetModules();
    // Same module graph as the handler, or this reads a different tracker
    // instance and always sees "unknown".
    const { aiLivenessHandler } = await import('@/lib/ai-liveness');
    const { getLLMHealth } = await import('@/lib/llm-health');

    expect(getLLMHealth().status).toBe('unknown');
    await aiLivenessHandler(new Request('https://b.test/api/health/ai?probe=1&secret=right'));
    expect(getLLMHealth().status).toBe('ok');
  });
});
