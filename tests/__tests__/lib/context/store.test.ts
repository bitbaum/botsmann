import { saveUserContext, getRelevantContext, type UserContextEntry } from '@/lib/context/store';

// Mock dependencies
jest.mock('@/lib/supabase', () => ({
  getServiceClient: jest.fn(),
}));

jest.mock('@/lib/embeddings', () => ({
  generateEmbedding: jest.fn(),
}));

import { getServiceClient } from '@/lib/supabase';
import { generateEmbedding } from '@/lib/embeddings';

const mockInsert = jest.fn();
const mockRpc = jest.fn();
const mockSupabase = {
  from: jest.fn(() => ({ insert: mockInsert })),
  rpc: mockRpc,
};

beforeEach(() => {
  jest.clearAllMocks();
  (getServiceClient as jest.Mock).mockReturnValue(mockSupabase);
  (generateEmbedding as jest.Mock).mockResolvedValue([0.1, 0.2, 0.3]);
});

describe('saveUserContext', () => {
  it('returns 0 for empty facts array', async () => {
    const result = await saveUserContext('user-1', []);
    expect(result).toBe(0);
    expect(getServiceClient).not.toHaveBeenCalled();
  });

  it('saves facts with generated embeddings', async () => {
    mockInsert.mockResolvedValue({ error: null });

    const facts = [
      {
        content: 'User lives in Zürich',
        domains: ['general'],
        sourceType: 'conversation' as const,
      },
      {
        content: 'User has a cat',
        domains: ['general'],
        sourceType: 'conversation' as const,
        sourceId: 'conv-1',
      },
    ];

    const result = await saveUserContext('user-1', facts);

    expect(result).toBe(2);
    expect(generateEmbedding).toHaveBeenCalledTimes(2);
    expect(generateEmbedding).toHaveBeenCalledWith('User lives in Zürich');
    expect(generateEmbedding).toHaveBeenCalledWith('User has a cat');
    expect(mockInsert).toHaveBeenCalledTimes(2);
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: 'user-1',
        content: 'User lives in Zürich',
        domains: ['general'],
        source_type: 'conversation',
        embedding: [0.1, 0.2, 0.3],
        confidence: 0.8, // default
      }),
    );
  });

  it('uses provided confidence instead of default', async () => {
    mockInsert.mockResolvedValue({ error: null });

    await saveUserContext('user-1', [
      { content: 'Fact', domains: ['legal'], sourceType: 'document' as const, confidence: 0.95 },
    ]);

    expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ confidence: 0.95 }));
  });

  it('skips facts that fail to save', async () => {
    mockInsert
      .mockResolvedValueOnce({ error: { message: 'duplicate' } })
      .mockResolvedValueOnce({ error: null });

    const facts = [
      { content: 'Fact 1', domains: ['general'], sourceType: 'conversation' as const },
      { content: 'Fact 2', domains: ['general'], sourceType: 'conversation' as const },
    ];

    const result = await saveUserContext('user-1', facts);
    expect(result).toBe(1); // only second succeeded
  });

  it('skips facts where embedding generation throws', async () => {
    (generateEmbedding as jest.Mock)
      .mockRejectedValueOnce(new Error('model load failed'))
      .mockResolvedValueOnce([0.1, 0.2]);
    mockInsert.mockResolvedValue({ error: null });

    const facts = [
      { content: 'Fact 1', domains: ['general'], sourceType: 'conversation' as const },
      { content: 'Fact 2', domains: ['general'], sourceType: 'conversation' as const },
    ];

    const result = await saveUserContext('user-1', facts);
    expect(result).toBe(1);
  });
});

describe('getRelevantContext', () => {
  it('calls RPC with correct parameters', async () => {
    const mockEntries: UserContextEntry[] = [
      {
        id: '1',
        content: 'User is 30',
        domains: ['general'],
        source_type: 'conversation',
        confidence: 0.9,
        similarity: 0.8,
      },
    ];
    mockRpc.mockResolvedValue({ data: mockEntries, error: null });

    const result = await getRelevantContext('user-1', ['legal', 'general'], 'age question');

    expect(generateEmbedding).toHaveBeenCalledWith('age question');
    expect(mockRpc).toHaveBeenCalledWith('get_relevant_context', {
      p_user_id: 'user-1',
      p_domains: ['legal', 'general'],
      p_embedding: [0.1, 0.2, 0.3],
      p_match_threshold: 0.3,
      p_max_results: 10,
    });
    expect(result).toEqual(mockEntries);
  });

  it('uses custom maxResults and matchThreshold', async () => {
    mockRpc.mockResolvedValue({ data: [], error: null });

    await getRelevantContext('user-1', ['health'], 'query', 5, 0.5);

    expect(mockRpc).toHaveBeenCalledWith(
      'get_relevant_context',
      expect.objectContaining({
        p_max_results: 5,
        p_match_threshold: 0.5,
      }),
    );
  });

  it('returns empty array on RPC error', async () => {
    mockRpc.mockResolvedValue({ data: null, error: { message: 'RPC failed' } });

    const result = await getRelevantContext('user-1', ['general'], 'test');
    expect(result).toEqual([]);
  });

  it('returns empty array when embedding generation fails', async () => {
    (generateEmbedding as jest.Mock).mockRejectedValue(new Error('model error'));

    const result = await getRelevantContext('user-1', ['general'], 'test');
    expect(result).toEqual([]);
  });

  it('returns empty array when data is null', async () => {
    mockRpc.mockResolvedValue({ data: null, error: null });

    const result = await getRelevantContext('user-1', ['general'], 'test');
    expect(result).toEqual([]);
  });
});
