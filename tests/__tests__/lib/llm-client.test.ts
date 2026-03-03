import { generateLLMResponse, isOllamaAvailable, getBestProvider } from '@/lib/llm-client';

// Mock dependencies
jest.mock('@/lib/constants', () => ({
  API_CONFIG: {
    GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',
    GROQ_MODEL: 'llama-3.1-8b-instant',
    OPENROUTER_API_URL: 'https://openrouter.ai/api/v1/chat/completions',
    OPENROUTER_DEFAULT_MODEL: 'anthropic/claude-3.5-sonnet',
  },
}));

jest.mock('@/lib/config/env', () => ({
  getServerEnv: jest.fn(() => ({
    GROQ_API_KEY: 'test-groq-key',
    OPENROUTER_API_KEY: '',
    OLLAMA_URL: 'http://localhost:11434',
    OLLAMA_MODEL: 'llama3.2',
  })),
  getClientEnv: jest.fn(() => ({
    NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
  })),
}));

jest.mock('@/lib/logger', () => ({
  logger: { log: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() },
}));

// Polyfill AbortSignal.timeout for Jest/Node environment
if (!AbortSignal.timeout) {
  AbortSignal.timeout = (ms: number) => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), ms);
    return controller.signal;
  };
}

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

import { getServerEnv } from '@/lib/config/env';

const defaultEnv = {
  GROQ_API_KEY: 'test-groq-key',
  OPENROUTER_API_KEY: '',
  OLLAMA_URL: 'http://localhost:11434',
  OLLAMA_MODEL: 'llama3.2',
};

beforeEach(() => {
  jest.clearAllMocks();
  // Restore default env mock after each test
  (getServerEnv as jest.Mock).mockReturnValue(defaultEnv);
});

const testMessages = [
  { role: 'system' as const, content: 'You are helpful.' },
  { role: 'user' as const, content: 'Hello' },
];

describe('generateLLMResponse', () => {
  describe('groq provider', () => {
    it('sends correct request to Groq API', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'Hello back!' } }],
        }),
      });

      const result = await generateLLMResponse(testMessages, { provider: 'groq' });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.groq.com/openai/v1/chat/completions',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: 'Bearer test-groq-key',
          }),
          body: expect.stringContaining('"model":"llama-3.1-8b-instant"'),
        }),
      );
      expect(result).toEqual({
        content: 'Hello back!',
        provider: 'groq',
        model: 'llama-3.1-8b-instant',
      });
    });

    it('uses provided API key over server key', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'ok' } }],
        }),
      });

      await generateLLMResponse(testMessages, { provider: 'groq', apiKey: 'user-key' });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer user-key',
          }),
        }),
      );
    });

    it('throws when no Groq API key available', async () => {
      (getServerEnv as jest.Mock).mockReturnValue({ ...defaultEnv, GROQ_API_KEY: '' });

      await expect(generateLLMResponse(testMessages, { provider: 'groq' })).rejects.toThrow(
        'Groq API key not configured',
      );
    });

    it('throws on non-ok response', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        text: async () => 'rate limited',
      });

      await expect(generateLLMResponse(testMessages, { provider: 'groq' })).rejects.toThrow(
        'Groq API error: 429',
      );
    });

    it('returns empty string when no content in response', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ choices: [{ message: {} }] }),
      });

      const result = await generateLLMResponse(testMessages, { provider: 'groq' });
      expect(result.content).toBe('');
    });
  });

  describe('openrouter provider', () => {
    it('requires API key', async () => {
      await expect(generateLLMResponse(testMessages, { provider: 'openrouter' })).rejects.toThrow(
        'OpenRouter API key required',
      );
    });

    it('uses default model when none specified', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'response' } }],
        }),
      });

      const result = await generateLLMResponse(testMessages, {
        provider: 'openrouter',
        apiKey: 'or-key',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://openrouter.ai/api/v1/chat/completions',
        expect.objectContaining({
          body: expect.stringContaining('"model":"anthropic/claude-3.5-sonnet"'),
        }),
      );
      expect(result.model).toBe('anthropic/claude-3.5-sonnet');
    });

    it('uses custom model when specified', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'response' } }],
        }),
      });

      const result = await generateLLMResponse(testMessages, {
        provider: 'openrouter',
        apiKey: 'or-key',
        model: 'google/gemini-pro',
      });

      expect(result.model).toBe('google/gemini-pro');
    });
  });

  describe('ollama provider', () => {
    it('uses default URL when none provided', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          message: { content: 'local response' },
        }),
      });

      const result = await generateLLMResponse(testMessages, { provider: 'ollama' });

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:11434/api/chat',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('"stream":false'),
        }),
      );
      expect(result.provider).toBe('ollama');
    });

    it('uses custom ollama URL', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          message: { content: 'ok' },
        }),
      });

      await generateLLMResponse(testMessages, {
        provider: 'ollama',
        ollamaUrl: 'http://remote:11434',
      });

      expect(mockFetch).toHaveBeenCalledWith('http://remote:11434/api/chat', expect.any(Object));
    });

    it('throws connection error for fetch TypeError', async () => {
      const fetchError = new TypeError('fetch failed');
      mockFetch.mockRejectedValue(fetchError);

      await expect(generateLLMResponse(testMessages, { provider: 'ollama' })).rejects.toThrow(
        'Cannot connect to Ollama. Is it running?',
      );
    });
  });

  it('throws for unknown provider', async () => {
    await expect(
      generateLLMResponse(testMessages, { provider: 'unknown' as 'groq' }),
    ).rejects.toThrow('Unknown provider: unknown');
  });

  it('passes temperature and maxTokens', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'ok' } }],
      }),
    });

    await generateLLMResponse(testMessages, {
      provider: 'groq',
      temperature: 0.2,
      maxTokens: 512,
    });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.temperature).toBe(0.2);
    expect(body.max_tokens).toBe(512);
  });
});

describe('isOllamaAvailable', () => {
  it('returns true when Ollama responds ok', async () => {
    mockFetch.mockResolvedValue({ ok: true });

    const result = await isOllamaAvailable('http://localhost:11434');
    expect(result).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:11434/api/tags',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('returns false when Ollama is unreachable', async () => {
    mockFetch.mockRejectedValue(new Error('connection refused'));

    const result = await isOllamaAvailable('http://localhost:11434');
    expect(result).toBe(false);
  });

  it('returns false when Ollama returns non-ok', async () => {
    mockFetch.mockResolvedValue({ ok: false });

    const result = await isOllamaAvailable();
    expect(result).toBe(false);
  });
});

describe('getBestProvider', () => {
  it('prefers Ollama when available', async () => {
    mockFetch.mockResolvedValue({ ok: true });

    const result = await getBestProvider();
    expect(result.provider).toBe('ollama');
    expect(result.available).toBe(true);
  });

  it('falls back to Groq when Ollama unavailable', async () => {
    mockFetch.mockRejectedValue(new Error('connection refused'));
    (getServerEnv as jest.Mock).mockReturnValue({
      ...defaultEnv,
      GROQ_API_KEY: 'key',
    });

    const result = await getBestProvider();
    expect(result.provider).toBe('groq');
    expect(result.available).toBe(true);
  });

  it('falls back to OpenRouter when no Groq key', async () => {
    mockFetch.mockRejectedValue(new Error('connection refused'));
    (getServerEnv as jest.Mock).mockReturnValue({
      ...defaultEnv,
      GROQ_API_KEY: '',
      OPENROUTER_API_KEY: 'or-key',
    });

    const result = await getBestProvider();
    expect(result.provider).toBe('openrouter');
    expect(result.available).toBe(true);
  });

  it('returns unavailable when no provider configured', async () => {
    mockFetch.mockRejectedValue(new Error('connection refused'));
    (getServerEnv as jest.Mock).mockReturnValue({
      ...defaultEnv,
      GROQ_API_KEY: '',
      OPENROUTER_API_KEY: '',
    });

    const result = await getBestProvider();
    expect(result.available).toBe(false);
    expect(result.reason).toContain('No LLM provider available');
  });
});
