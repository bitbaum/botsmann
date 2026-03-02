/**
 * Embeddings Service using Transformers.js
 *
 * Uses all-MiniLM-L6-v2 model (384 dimensions)
 * Runs locally in Node.js - no API costs
 */

// Defer heavy import to runtime to speed up dev/server startup.
// Avoid pulling @xenova/transformers into the initial bundle.
import type { FeatureExtractionPipeline } from '@xenova/transformers';
import { logger } from './logger';

// Model configuration
const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2';
export const EMBEDDING_DIMENSION = 384;

// Singleton pipeline instance (lazy loaded)
let embeddingPipeline: FeatureExtractionPipeline | null = null;
let pipelineLoading: Promise<FeatureExtractionPipeline> | null = null;

/**
 * Initialize the embedding pipeline (lazy loaded)
 */
async function getEmbeddingPipeline(): Promise<FeatureExtractionPipeline> {
  if (embeddingPipeline) {
    return embeddingPipeline;
  }

  // Prevent multiple simultaneous initializations
  if (pipelineLoading) {
    return pipelineLoading;
  }

  logger.log('Initializing embedding model...');
  const { pipeline } = await import('@xenova/transformers');
  pipelineLoading = pipeline('feature-extraction', MODEL_NAME, {
    // Use ONNX runtime for better performance
    quantized: true,
  });

  embeddingPipeline = await pipelineLoading;
  pipelineLoading = null;
  logger.log('Embedding model initialized');

  return embeddingPipeline;
}

/**
 * Generate embedding for a single text
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const extractor = await getEmbeddingPipeline();

  // Generate embedding with mean pooling
  const output = await extractor(text, {
    pooling: 'mean',
    normalize: true,
  });

  // Convert to regular array
  return Array.from(output.data as Float32Array);
}

/**
 * Generate embeddings for multiple texts (batched)
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const extractor = await getEmbeddingPipeline();

  const embeddings: number[][] = [];

  // Process in batches to manage memory
  const batchSize = 32;
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);

    for (const text of batch) {
      const output = await extractor(text, {
        pooling: 'mean',
        normalize: true,
      });
      embeddings.push(Array.from(output.data as Float32Array));
    }
  }

  return embeddings;
}

/**
 * Calculate cosine similarity between two embeddings
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Embeddings must have same dimension');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Text chunking with overlap
 * Splits text into chunks of approximately targetTokens size
 */
export function chunkText(
  text: string,
  targetTokens: number = 500,
  overlapTokens: number = 50,
): string[] {
  // Approximate tokens as words (rough estimate: 1 token ≈ 0.75 words)
  const wordsPerToken = 0.75;
  const targetWords = Math.floor(targetTokens * wordsPerToken);
  const overlapWords = Math.floor(overlapTokens * wordsPerToken);

  // Split into sentences first for better chunk boundaries
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];

  let currentChunk: string[] = [];
  let currentWordCount = 0;

  for (const sentence of sentences) {
    const sentenceWords = sentence.split(/\s+/).length;

    // If adding this sentence exceeds target, start new chunk
    if (currentWordCount + sentenceWords > targetWords && currentChunk.length > 0) {
      chunks.push(currentChunk.join(' '));

      // Calculate overlap: keep last N words worth of sentences
      let overlapWordCount = 0;
      const overlapSentences: string[] = [];

      for (let i = currentChunk.length - 1; i >= 0 && overlapWordCount < overlapWords; i--) {
        overlapSentences.unshift(currentChunk[i]);
        overlapWordCount += currentChunk[i].split(/\s+/).length;
      }

      currentChunk = overlapSentences;
      currentWordCount = overlapWordCount;
    }

    currentChunk.push(sentence);
    currentWordCount += sentenceWords;
  }

  // Don't forget the last chunk
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(' '));
  }

  return chunks;
}
