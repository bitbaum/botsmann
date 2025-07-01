import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/bots/route';

describe('Bots API', () => {
  it('generates slug from name', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: { name: 'My Cool Bot', description: 'test' }
    });
    const res = await POST(req as any);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.slug).toBe('my-cool-bot');
  });
});
