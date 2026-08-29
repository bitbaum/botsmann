import { processQuery } from '@/lib/nlp';
import type { Mock } from 'vitest';

describe('NLP Processing', () => {
  beforeEach(() => {
    // Mock OpenAI API response
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            choices: [
              {
                message: {
                  content: JSON.stringify({
                    category: 'electronics/computers',
                    attributes: {
                      type: 'laptop',
                      minRam: '8GB',
                      minStorage: '256GB',
                    },
                  }),
                },
              },
            ],
          }),
      }),
    ) as Mock;
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

  it('handles API errors gracefully', async () => {
    global.fetch = vi.fn(() => Promise.reject('API Error')) as Mock;
    const result = await processQuery('laptop');
    expect(result).toEqual({
      category: 'general',
      attributes: { query: 'laptop' },
    });
  });

  it('handles invalid API responses', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            choices: [
              {
                message: {
                  content: 'invalid json',
                },
              },
            ],
          }),
      }),
    ) as Mock;
    const result = await processQuery('laptop');
    expect(result).toEqual({
      category: 'general',
      attributes: { query: 'laptop' },
    });
  });
});
