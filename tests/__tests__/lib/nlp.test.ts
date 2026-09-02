import { processQuery } from '@/lib/nlp';
import { generateWithBestProvider } from '@/lib/llm-client';
import type { Mock } from 'vitest';

vi.mock('@/lib/llm-client', () => ({
  generateWithBestProvider: vi.fn(),
}));

const mockGenerateWithBestProvider = generateWithBestProvider as Mock;

describe('NLP Processing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGenerateWithBestProvider.mockResolvedValue({
      content: JSON.stringify({
        category: 'electronics/computers',
        attributes: {
          type: 'laptop',
          minRam: '8GB',
          minStorage: '256GB',
        },
      }),
      provider: 'groq',
      model: 'test-model',
      providerInfo: 'groq (test-model)',
    });
  });

  it('processes one-word query correctly', async () => {
    const result = await processQuery('laptop');
    expect(result).toEqual({
      category: 'electronics/computers',
      attributes: {
        type: 'laptop',
        minRam: '8GB',
        minStorage: '256GB',
      },
    });
  });

  it('handles a fully unavailable LLM chain gracefully (no vendor bypass)', async () => {
    mockGenerateWithBestProvider.mockRejectedValue(
      new Error('No LLM provider available. Start Ollama or configure API keys.'),
    );
    const result = await processQuery('laptop');
    expect(result).toEqual({
      category: 'general',
      attributes: { query: 'laptop' },
    });
  });

  it('handles provider errors gracefully', async () => {
    mockGenerateWithBestProvider.mockRejectedValue(new Error('API Error'));
    const result = await processQuery('laptop');
    expect(result).toEqual({
      category: 'general',
      attributes: { query: 'laptop' },
    });
  });

  it('handles invalid (non-JSON) provider responses', async () => {
    mockGenerateWithBestProvider.mockResolvedValue({
      content: 'invalid json',
      provider: 'groq',
      model: 'test-model',
      providerInfo: 'groq (test-model)',
    });
    const result = await processQuery('laptop');
    expect(result).toEqual({
      category: 'general',
      attributes: { query: 'laptop' },
    });
  });

  it('handles an empty content response gracefully', async () => {
    mockGenerateWithBestProvider.mockResolvedValue({
      content: '',
      provider: 'groq',
      model: 'test-model',
      providerInfo: 'groq (test-model)',
    });
    const result = await processQuery('laptop');
    expect(result).toEqual({
      category: 'general',
      attributes: { query: 'laptop' },
    });
  });
});
