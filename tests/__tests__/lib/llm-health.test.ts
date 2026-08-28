/**
 * Guard: an LLM outage must not look like success.
 *
 * On 2026-08-28 the Groq key was returning 401, no other provider was
 * configured, and every AI endpoint answered HTTP 200:
 *
 *   /api/demo/chat         -> {"success":true,"data":{"response":""}}
 *   /api/quick-chat        -> {"success":true,"data":{"response":"I'm having a moment..."}}
 *   /api/professional-chat -> same
 *   /api/health            -> {"success":true,"data":{"status":"healthy"}}
 *
 * Every automated check was green while the product's core feature was dead.
 * These tests cover the two halves of that: the tracker's state machine, and
 * the source-level promise that no chat route answers a failure with success.
 */
import { readFileSync } from 'fs';
import { join } from 'path';
import { recordLLMSuccess, recordLLMFailure, getLLMHealth, resetLLMHealth } from '@/lib/llm-health';

describe('llm health tracker', () => {
  beforeEach(() => resetLLMHealth());

  it('starts unknown, before anything has been observed', () => {
    expect(getLLMHealth().status).toBe('unknown');
  });

  it('is ok after a success', () => {
    recordLLMSuccess();
    expect(getLLMHealth().status).toBe('ok');
  });

  it('is degraded on the first failures, not down', () => {
    recordLLMFailure(new Error('401 Invalid API Key'));
    expect(getLLMHealth().status).toBe('degraded');
    recordLLMFailure(new Error('401 Invalid API Key'));
    expect(getLLMHealth().status).toBe('degraded');
  });

  it('is down once failures are consistent', () => {
    for (let i = 0; i < 3; i += 1) recordLLMFailure(new Error('401 Invalid API Key'));
    const health = getLLMHealth();
    expect(health.status).toBe('down');
    expect(health.consecutiveFailures).toBe(3);
    expect(health.lastError).toContain('401');
  });

  it('recovers to ok on the next success', () => {
    for (let i = 0; i < 5; i += 1) recordLLMFailure(new Error('boom'));
    expect(getLLMHealth().status).toBe('down');
    recordLLMSuccess();
    const health = getLLMHealth();
    expect(health.status).toBe('ok');
    expect(health.consecutiveFailures).toBe(0);
    expect(health.lastError).toBeNull();
  });
});

describe('chat routes do not dress a failure as success', () => {
  const ROUTES = [
    'app/api/demo/chat/route.ts',
    'app/api/quick-chat/route.ts',
    'app/api/professional-chat/route.ts',
  ];

  it.each(ROUTES)('%s reports LLM failure with a real status', (route) => {
    const source = readFileSync(join(process.cwd(), route), 'utf-8');

    // it must have a way to say "unavailable"...
    expect(source).toMatch(/jsonLLMUnavailable|LLMUnavailableError/);
    // ...and it must record the outcome so /api/health can see it
    expect(source).toContain('recordLLMFailure');
  });

  it.each(ROUTES)('%s no longer apologises with HTTP 200', (route) => {
    const source = readFileSync(join(process.cwd(), route), 'utf-8');
    expect(source).not.toContain("I'm having a moment");
  });

  it('health reports the LLM chain, not just the database', () => {
    const source = readFileSync(join(process.cwd(), 'app/api/health/route.ts'), 'utf-8');
    expect(source).toContain('getLLMHealth');
    expect(source).toMatch(/llm/);
  });

  // Liveness must not fail on a dependency a restart cannot fix -- otherwise a
  // stale API key gets a perfectly healthy process killed, and fails deploy
  // gates on a problem no deploy caused. Readiness is where that belongs.
  it('health separates liveness from readiness', () => {
    const source = readFileSync(join(process.cwd(), 'app/api/health/route.ts'), 'utf-8');
    expect(source).toContain('strict');
    // the 503-on-LLM path must be gated behind strict, never unconditional
    expect(source).toMatch(/if \(strict && llm\.status === 'down'\)/);
  });
});
