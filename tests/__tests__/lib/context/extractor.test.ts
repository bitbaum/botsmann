import { extractAndSaveContext } from '@/lib/context/extractor';

// Mock dependencies
jest.mock('@/lib/llm-client', () => ({
  generateLLMResponse: jest.fn(),
}));

jest.mock('@/lib/context/store', () => ({
  saveUserContext: jest.fn(),
}));

jest.mock('@/lib/context/domain-detector', () => ({
  detectDomains: jest.fn(),
}));

import { generateLLMResponse } from '@/lib/llm-client';
import { saveUserContext } from '@/lib/context/store';
import { detectDomains } from '@/lib/context/domain-detector';

beforeEach(() => {
  jest.clearAllMocks();
  (detectDomains as jest.Mock).mockReturnValue(['general']);
});

describe('extractAndSaveContext', () => {
  it('extracts facts from conversation and saves them', async () => {
    (generateLLMResponse as jest.Mock).mockResolvedValue({
      content: JSON.stringify([
        { fact: 'User lives in Zürich', confidence: 0.9 },
        { fact: 'User has two children', confidence: 0.85 },
      ]),
    });
    (saveUserContext as jest.Mock).mockResolvedValue(2);

    const result = await extractAndSaveContext(
      'user-1',
      'conv-1',
      'I live in Zürich with my two kids',
      'That sounds lovely!',
    );

    expect(result).toBe(2);
    expect(generateLLMResponse).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ role: 'system' }),
        expect.objectContaining({
          role: 'user',
          content: expect.stringContaining('I live in Zürich with my two kids'),
        }),
      ]),
      expect.objectContaining({ provider: 'groq', temperature: 0.1 }),
    );
    expect(saveUserContext).toHaveBeenCalledWith('user-1', [
      expect.objectContaining({
        content: 'User lives in Zürich',
        sourceType: 'conversation',
        sourceId: 'conv-1',
        confidence: 0.9,
      }),
      expect.objectContaining({
        content: 'User has two children',
        confidence: 0.85,
      }),
    ]);
  });

  it('uses professional domain when provided', async () => {
    (generateLLMResponse as jest.Mock).mockResolvedValue({
      content: JSON.stringify([{ fact: 'User has back pain', confidence: 0.9 }]),
    });
    (saveUserContext as jest.Mock).mockResolvedValue(1);

    await extractAndSaveContext('user-1', 'conv-1', 'My back hurts', 'Sorry to hear', 'health');

    expect(saveUserContext).toHaveBeenCalledWith('user-1', [
      expect.objectContaining({
        domains: ['health', 'general'],
      }),
    ]);
    // detectDomains should NOT be called when professional domain is provided
    expect(detectDomains).not.toHaveBeenCalled();
  });

  it('uses detectDomains when no professional domain', async () => {
    (generateLLMResponse as jest.Mock).mockResolvedValue({
      content: JSON.stringify([{ fact: 'User needs a lawyer', confidence: 0.8 }]),
    });
    (detectDomains as jest.Mock).mockReturnValue(['legal', 'general']);
    (saveUserContext as jest.Mock).mockResolvedValue(1);

    await extractAndSaveContext('user-1', 'conv-1', 'I need legal help', 'Sure');

    expect(detectDomains).toHaveBeenCalledWith('User needs a lawyer');
    expect(saveUserContext).toHaveBeenCalledWith('user-1', [
      expect.objectContaining({
        domains: ['legal', 'general'],
      }),
    ]);
  });

  it('returns 0 when no facts extracted', async () => {
    (generateLLMResponse as jest.Mock).mockResolvedValue({
      content: JSON.stringify([]),
    });

    const result = await extractAndSaveContext('user-1', 'conv-1', 'Hello', 'Hi!');

    expect(result).toBe(0);
    expect(saveUserContext).not.toHaveBeenCalled();
  });

  it('returns 0 when LLM returns invalid JSON', async () => {
    (generateLLMResponse as jest.Mock).mockResolvedValue({
      content: 'not json',
    });

    const result = await extractAndSaveContext('user-1', 'conv-1', 'Hi', 'Hello');
    expect(result).toBe(0);
  });

  it('returns 0 when LLM returns non-array JSON', async () => {
    (generateLLMResponse as jest.Mock).mockResolvedValue({
      content: JSON.stringify({ fact: 'not an array' }),
    });

    const result = await extractAndSaveContext('user-1', 'conv-1', 'Hi', 'Hello');
    expect(result).toBe(0);
  });

  it('returns 0 when LLM call throws', async () => {
    (generateLLMResponse as jest.Mock).mockRejectedValue(new Error('API error'));

    const result = await extractAndSaveContext('user-1', 'conv-1', 'Hi', 'Hello');
    expect(result).toBe(0);
  });

  it('filters out facts exceeding 200 characters', async () => {
    const longFact = 'A'.repeat(201);
    (generateLLMResponse as jest.Mock).mockResolvedValue({
      content: JSON.stringify([
        { fact: longFact, confidence: 0.9 },
        { fact: 'Short valid fact', confidence: 0.8 },
      ]),
    });
    (saveUserContext as jest.Mock).mockResolvedValue(1);

    await extractAndSaveContext('user-1', 'conv-1', 'msg', 'resp');

    expect(saveUserContext).toHaveBeenCalledWith('user-1', [
      expect.objectContaining({ content: 'Short valid fact' }),
    ]);
  });

  it('clamps confidence to 0.5-1.0 range', async () => {
    (generateLLMResponse as jest.Mock).mockResolvedValue({
      content: JSON.stringify([
        { fact: 'Low confidence', confidence: 0.1 },
        { fact: 'High confidence', confidence: 1.5 },
        { fact: 'No confidence' },
      ]),
    });
    (saveUserContext as jest.Mock).mockResolvedValue(3);

    await extractAndSaveContext('user-1', 'conv-1', 'msg', 'resp');

    const savedFacts = (saveUserContext as jest.Mock).mock.calls[0][1];
    expect(savedFacts[0].confidence).toBe(0.5);
    expect(savedFacts[1].confidence).toBe(1.0);
    expect(savedFacts[2].confidence).toBe(0.8); // default
  });

  it('filters out facts with empty string', async () => {
    (generateLLMResponse as jest.Mock).mockResolvedValue({
      content: JSON.stringify([
        { fact: '', confidence: 0.9 },
        { fact: 'Valid fact', confidence: 0.8 },
      ]),
    });
    (saveUserContext as jest.Mock).mockResolvedValue(1);

    await extractAndSaveContext('user-1', 'conv-1', 'msg', 'resp');

    expect(saveUserContext).toHaveBeenCalledWith('user-1', [
      expect.objectContaining({ content: 'Valid fact' }),
    ]);
  });
});
