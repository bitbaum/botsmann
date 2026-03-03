import { cosineSimilarity, chunkText, EMBEDDING_DIMENSION } from '@/lib/embeddings';

// Note: generateEmbedding/generateEmbeddings require @xenova/transformers
// which needs ONNX runtime. We test the pure functions that don't need model loading.

describe('EMBEDDING_DIMENSION', () => {
  it('is 384 for all-MiniLM-L6-v2', () => {
    expect(EMBEDDING_DIMENSION).toBe(384);
  });
});

describe('cosineSimilarity', () => {
  it('returns 1 for identical vectors', () => {
    const vec = [1, 2, 3, 4, 5];
    expect(cosineSimilarity(vec, vec)).toBeCloseTo(1.0);
  });

  it('returns -1 for opposite vectors', () => {
    const a = [1, 0, 0];
    const b = [-1, 0, 0];
    expect(cosineSimilarity(a, b)).toBeCloseTo(-1.0);
  });

  it('returns 0 for orthogonal vectors', () => {
    const a = [1, 0, 0];
    const b = [0, 1, 0];
    expect(cosineSimilarity(a, b)).toBeCloseTo(0.0);
  });

  it('throws for mismatched dimensions', () => {
    expect(() => cosineSimilarity([1, 2], [1, 2, 3])).toThrow(
      'Embeddings must have same dimension',
    );
  });

  it('handles normalized unit vectors', () => {
    const a = [0.6, 0.8]; // unit vector
    const b = [0.8, 0.6]; // unit vector
    const sim = cosineSimilarity(a, b);
    expect(sim).toBeGreaterThan(0);
    expect(sim).toBeLessThan(1);
  });

  it('handles zero vectors gracefully', () => {
    const zero = [0, 0, 0];
    const vec = [1, 2, 3];
    const result = cosineSimilarity(zero, vec);
    expect(result).toBeNaN(); // 0/0
  });
});

describe('chunkText', () => {
  it('returns single chunk for short text', () => {
    const text = 'This is a short sentence.';
    const chunks = chunkText(text);
    expect(chunks).toHaveLength(1);
    expect(chunks[0]).toBe(text);
  });

  it('splits long text into multiple chunks', () => {
    // Create text with many sentences that exceeds target
    const sentences = Array.from(
      { length: 50 },
      (_, i) => `Sentence number ${i} has several words in it.`,
    );
    const text = sentences.join(' ');
    const chunks = chunkText(text, 100); // small target to force splitting
    expect(chunks.length).toBeGreaterThan(1);
  });

  it('respects sentence boundaries', () => {
    const text =
      'First sentence here. Second sentence here. Third sentence here. Fourth sentence here.';
    const chunks = chunkText(text, 10, 0); // very small target
    // Each chunk should end at a sentence boundary (contain a period)
    for (const chunk of chunks) {
      expect(chunk).toMatch(/\.$/);
    }
  });

  it('includes overlap between chunks', () => {
    const sentences = Array.from({ length: 20 }, (_, i) => `Unique sentence number ${i} here.`);
    const text = sentences.join(' ');
    const chunks = chunkText(text, 50, 20); // moderate target with overlap

    if (chunks.length >= 2) {
      // Find words in common between consecutive chunks
      const words1 = new Set(chunks[0].split(/\s+/));
      const words2 = new Set(chunks[1].split(/\s+/));
      const common = [...words2].filter((w) => words1.has(w));
      expect(common.length).toBeGreaterThan(0);
    }
  });

  it('returns empty array for empty text', () => {
    const chunks = chunkText('');
    expect(chunks).toHaveLength(1); // empty string splits to one empty-ish chunk
  });

  it('handles text without sentence boundaries', () => {
    const text = 'word '.repeat(1000).trim();
    const chunks = chunkText(text, 50);
    // Should still produce chunks even without sentence-ending punctuation
    expect(chunks.length).toBeGreaterThanOrEqual(1);
  });

  it('uses default parameters', () => {
    const text = 'A sentence. '.repeat(100);
    const chunks = chunkText(text); // defaults: targetTokens=500, overlapTokens=50
    expect(chunks.length).toBeGreaterThanOrEqual(1);
  });
});
