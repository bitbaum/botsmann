import { validateApiKey } from '@/src/lib/middleware/auth';

function createRequest(key?: string): Request {
  return new Request('http://localhost/test', {
    headers: key ? { 'x-api-key': key } : {},
  });
}

describe('validateApiKey', () => {
  const env = process.env;
  beforeEach(() => {
    process.env = { ...env, API_KEY: 'secret' };
  });
  afterEach(() => {
    process.env = env;
  });

  it('returns 401 when header missing', async () => {
    const res = await validateApiKey(createRequest());
    expect(res?.status).toBe(401);
    const data = res && await res.json();
    expect(data.error).toBe('API key is required');
  });

  it('returns 401 for invalid key', async () => {
    const res = await validateApiKey(createRequest('wrong'));
    expect(res?.status).toBe(401);
    const data = res && await res.json();
    expect(data.error).toBe('Invalid API key');
  });

  it('passes with valid key', async () => {
    const res = await validateApiKey(createRequest('secret'));
    expect(res).toBeUndefined();
  });
});
