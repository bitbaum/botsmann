/**
 * /api/settings and a reader's own keys: the key never goes back to the
 * browser, a key the provider refuses is never stored, and a stored key is
 * sealed.
 */
import { NextRequest } from 'next/server';
import type { MockedFunction } from 'vitest';

vi.mock('@/lib/api-utils', () => ({ verifyUser: vi.fn() }));
vi.mock('@/lib/supabase', () => ({ getServiceClient: vi.fn() }));
vi.mock('@bitbaum/ai-kit/byok-probe', () => ({ probeByokKey: vi.fn() }));

import { GET, PUT } from '@/app/api/settings/route';
import { verifyUser } from '@/lib/api-utils';
import { getServiceClient } from '@/lib/supabase';
import { probeByokKey } from '@bitbaum/ai-kit/byok-probe';
import { isSealed, sealKey } from '@/lib/byok-vault';

const SECRET = 'test-seal-secret-0123456789';
const KEY = 'sk-or-v1-not-a-real-key-wxyz';

const mockVerify = verifyUser as MockedFunction<typeof verifyUser>;
const mockClient = getServiceClient as MockedFunction<typeof getServiceClient>;
const mockProbe = probeByokKey as MockedFunction<typeof probeByokKey>;

let upserted: Record<string, unknown> | null;
let row: Record<string, unknown> | null;

function fakeSupabase() {
  const query = {
    select: () => query,
    eq: () => query,
    single: async () => ({ data: row, error: null }),
    upsert: async (value: Record<string, unknown>) => {
      upserted = value;
      return { error: null };
    },
  };
  return { from: () => query } as unknown as ReturnType<typeof getServiceClient>;
}

function put(body: Record<string, unknown>) {
  return PUT(
    new NextRequest('http://localhost/api/settings', {
      method: 'PUT',
      body: JSON.stringify({ preferred_model: 'openrouter', ...body }),
    }),
  );
}

beforeEach(() => {
  vi.stubEnv('BYOK_SEAL_SECRET', SECRET);
  upserted = null;
  row = null;
  mockVerify.mockResolvedValue({ id: 'user-1' } as Awaited<ReturnType<typeof verifyUser>>);
  mockClient.mockReturnValue(fakeSupabase());
  mockProbe.mockResolvedValue({
    ok: true,
    status: 200,
    message: 'Works.',
    models: [],
    suggested: null,
  });
});

afterEach(() => vi.unstubAllEnvs());

describe('/api/settings keys', () => {
  it('GET returns a hint, never the key', async () => {
    row = { preferred_model: 'openrouter', openrouter_api_key: sealKey(KEY, SECRET) };
    const body = await (await GET(new NextRequest('http://localhost/api/settings'))).json();
    expect(JSON.stringify(body)).not.toContain(KEY);
    expect(JSON.stringify(body)).not.toContain(row.openrouter_api_key as string);
    expect(body.data.settings.openrouter_key_hint).toContain('wxyz');
  });

  it('GET does not leak a legacy plaintext key either', async () => {
    row = { preferred_model: 'openrouter', openrouter_api_key: KEY };
    const body = await (await GET(new NextRequest('http://localhost/api/settings'))).json();
    expect(JSON.stringify(body)).not.toContain(KEY);
  });

  it('PUT refuses a key the provider rejects, in the provider’s words', async () => {
    mockProbe.mockResolvedValue({
      ok: false,
      status: 401,
      message: 'OpenRouter says: No auth credentials found.',
      models: [],
      suggested: null,
    });
    const res = await put({ openrouter_api_key: KEY });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain('No auth credentials');
    expect(upserted).toBeNull();
  });

  it('PUT seals a key that works', async () => {
    const res = await put({ openrouter_api_key: KEY });
    expect(res.status).toBe(200);
    const stored = upserted?.openrouter_api_key as string;
    expect(stored).not.toContain(KEY);
    expect(isSealed(stored)).toBe(true);
  });

  it('PUT with an empty key field leaves the saved key alone', async () => {
    await put({ openrouter_api_key: '' });
    expect(upserted).not.toHaveProperty('openrouter_api_key');
    expect(mockProbe).not.toHaveBeenCalled();
  });

  it('PUT removes a key only when asked', async () => {
    await put({ remove_keys: ['openrouter'] });
    expect(upserted?.openrouter_api_key).toBeNull();
  });

  it('PUT stores nothing when the server cannot seal', async () => {
    vi.stubEnv('BYOK_SEAL_SECRET', '');
    const res = await put({ openrouter_api_key: KEY });
    expect(res.status).toBe(503);
    expect(upserted).toBeNull();
  });
});
