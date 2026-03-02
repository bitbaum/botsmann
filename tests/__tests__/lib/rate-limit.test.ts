/**
 * Rate Limit Tests
 *
 * Tests the checkRateLimit function's fallback behavior when Supabase is not configured.
 * Full integration tests with Supabase would require a running database.
 */

// Mock supabase before import
jest.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: jest.fn(),
  getServiceClient: jest.fn(),
}));

import { checkRateLimit } from '@/lib/rate-limit';
import { isSupabaseConfigured, getServiceClient } from '@/lib/supabase';

const mockIsConfigured = isSupabaseConfigured as jest.MockedFunction<typeof isSupabaseConfigured>;
const mockGetServiceClient = getServiceClient as jest.MockedFunction<typeof getServiceClient>;

describe('checkRateLimit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows all requests when Supabase is not configured', async () => {
    mockIsConfigured.mockReturnValue(false);

    const result = await checkRateLimit('test:ip', 10, 60);
    expect(result.isRateLimited).toBe(false);
    expect(result.remaining).toBe(10);
    expect(mockGetServiceClient).not.toHaveBeenCalled();
  });

  it('calls Supabase RPC when configured', async () => {
    mockIsConfigured.mockReturnValue(true);
    const mockRpc = jest.fn().mockResolvedValue({
      data: { allowed: true, remaining: 9 },
      error: null,
    });
    mockGetServiceClient.mockReturnValue({ rpc: mockRpc } as never);

    const result = await checkRateLimit('test:ip', 10, 60);
    expect(result.isRateLimited).toBe(false);
    expect(result.remaining).toBe(9);
    expect(mockRpc).toHaveBeenCalledWith('check_rate_limit', {
      p_key: 'test:ip',
      p_max_requests: 10,
      p_window_seconds: 60,
    });
  });

  it('reports rate limited when RPC returns allowed=false', async () => {
    mockIsConfigured.mockReturnValue(true);
    const mockRpc = jest.fn().mockResolvedValue({
      data: { allowed: false, remaining: 0 },
      error: null,
    });
    mockGetServiceClient.mockReturnValue({ rpc: mockRpc } as never);

    const result = await checkRateLimit('test:ip', 5, 60);
    expect(result.isRateLimited).toBe(true);
    expect(result.remaining).toBe(0);
  });

  it('fails open on RPC error', async () => {
    mockIsConfigured.mockReturnValue(true);
    const mockRpc = jest.fn().mockResolvedValue({
      data: null,
      error: { message: 'DB error' },
    });
    mockGetServiceClient.mockReturnValue({ rpc: mockRpc } as never);

    const result = await checkRateLimit('test:ip', 10, 60);
    expect(result.isRateLimited).toBe(false);
    expect(result.remaining).toBe(10);
  });

  it('fails open on unexpected exception', async () => {
    mockIsConfigured.mockReturnValue(true);
    mockGetServiceClient.mockImplementation(() => {
      throw new Error('Connection failed');
    });

    const result = await checkRateLimit('test:ip', 10, 60);
    expect(result.isRateLimited).toBe(false);
    expect(result.remaining).toBe(10);
  });
});
