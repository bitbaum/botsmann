/**
 * Professional Chat API Tests
 *
 * Tests the chat route with mocked dependencies:
 * - Auth (verifyUser)
 * - Supabase (document search, user context)
 * - LLM (generateLLMResponse)
 * - Embeddings (generateEmbedding)
 * - Rate limiting (checkRateLimit)
 */

import { NextRequest } from 'next/server';

// Mock dependencies before importing route
jest.mock('@/lib/api-utils', () => ({
  verifyUser: jest.fn(),
}));

jest.mock('@/lib/supabase', () => ({
  getServiceClient: jest.fn(),
  isSupabaseConfigured: jest.fn(() => true),
}));

jest.mock('@/lib/llm-client', () => ({
  generateLLMResponse: jest.fn(),
}));

jest.mock('@/lib/embeddings', () => ({
  generateEmbedding: jest.fn(),
}));

jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: jest.fn(() => Promise.resolve({ isRateLimited: false, remaining: 10 })),
}));

jest.mock('@/lib/chat', () => ({
  getUserLLMSettings: jest.fn(() =>
    Promise.resolve({ provider: 'groq', apiKey: 'test-key', ollamaUrl: null }),
  ),
  joinContext: jest.fn((parts: string[]) => parts.join('\n\n---\n\n')),
}));

jest.mock('@/lib/context', () => ({
  getRelevantContext: jest.fn(() => Promise.resolve([])),
  extractAndSaveContext: jest.fn(() => Promise.resolve(0)),
}));

import { POST } from '@/app/api/professional-chat/route';
import { verifyUser } from '@/lib/api-utils';
import { generateLLMResponse } from '@/lib/llm-client';
import { checkRateLimit } from '@/lib/rate-limit';

const mockVerifyUser = verifyUser as jest.MockedFunction<typeof verifyUser>;
const mockGenerateLLM = generateLLMResponse as jest.MockedFunction<typeof generateLLMResponse>;
const mockCheckRateLimit = checkRateLimit as jest.MockedFunction<typeof checkRateLimit>;

function makeRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest('http://localhost:3000/api/professional-chat', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('POST /api/professional-chat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCheckRateLimit.mockResolvedValue({ isRateLimited: false, remaining: 10 });
    mockVerifyUser.mockResolvedValue(null);
    mockGenerateLLM.mockResolvedValue({
      content: 'Test response from AI',
      provider: 'groq',
      model: 'llama3-8b',
    });
  });

  it('returns 400 when message is missing', async () => {
    const req = makeRequest({ systemPrompt: 'You are helpful' });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.code).toBe('VALIDATION_ERROR');
  });

  it('returns 400 when system prompt is missing', async () => {
    const req = makeRequest({ message: 'Hello' });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('returns successful response for unauthenticated user', async () => {
    const req = makeRequest({
      message: 'What is a contract?',
      systemPrompt: 'You are Lex, an AI legal assistant.',
      professionalSlug: 'legal',
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.response).toBe('Test response from AI');
    expect(data.data.provider).toBe('groq');
  });

  it('returns 429 when rate limited', async () => {
    mockCheckRateLimit.mockResolvedValue({ isRateLimited: true, remaining: 0 });

    const req = makeRequest({
      message: 'Hello',
      systemPrompt: 'You are helpful',
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(429);
    expect(data.success).toBe(false);
    expect(data.code).toBe('RATE_LIMIT');
  });

  it('handles LLM errors gracefully', async () => {
    mockGenerateLLM.mockRejectedValue(new Error('LLM unavailable'));

    const req = makeRequest({
      message: 'Hello',
      systemPrompt: 'You are helpful',
      professionalSlug: 'legal',
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.data.response).toContain('moment');
    expect(data.data.provider).toBe('fallback');
  });

  it('includes conversation history in LLM call', async () => {
    const req = makeRequest({
      message: 'Follow up question',
      systemPrompt: 'You are helpful',
      professionalSlug: 'legal',
      conversationHistory: [
        { role: 'user', content: 'First message' },
        { role: 'assistant', content: 'First response' },
      ],
    });

    await POST(req);

    expect(mockGenerateLLM).toHaveBeenCalledTimes(1);
    const messages = mockGenerateLLM.mock.calls[0][0];
    // system + 2 history + 1 current = 4 messages
    expect(messages).toHaveLength(4);
    expect(messages[0].role).toBe('system');
    expect(messages[1].role).toBe('user');
    expect(messages[2].role).toBe('assistant');
    expect(messages[3].role).toBe('user');
  });
});
