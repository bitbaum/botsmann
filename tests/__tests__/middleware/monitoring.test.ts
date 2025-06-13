import { monitorRequest, getRecentMetrics } from '@/src/lib/middleware/monitoring';

describe('monitorRequest', () => {
  it('records successful metrics', async () => {
    const req = new Request('http://localhost/success', { method: 'GET' });
    const res = await monitorRequest(req, async () => new Response('ok', { status: 200 }));
    expect(res.status).toBe(200);
    const metrics = getRecentMetrics();
    const entry = metrics[metrics.length - 1];
    expect(entry.path).toBe('/success');
    expect(entry.method).toBe('GET');
    expect(entry.status).toBe(200);
  });

  it('records error metrics when handler throws', async () => {
    const req = new Request('http://localhost/fail', { method: 'POST' });
    await expect(
      monitorRequest(req, async () => { throw new Error('boom'); })
    ).rejects.toThrow('boom');
    const metrics = getRecentMetrics();
    const entry = metrics[metrics.length - 1];
    expect(entry.path).toBe('/fail');
    expect(entry.method).toBe('POST');
    expect(entry.status).toBe(500);
  });
});
