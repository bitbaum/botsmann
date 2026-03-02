/**
 * Shared embedding generation with timeout
 * @module lib/chat/embedding
 */

import { generateEmbedding } from '@/lib/embeddings';
import { API_CONFIG, DOMAIN_ERRORS } from '@/lib/constants';
import { jsonError, HTTP_STATUS } from '@/lib/api';

/**
 * Generate an embedding with a timeout guard.
 * Returns the embedding array or a pre-formatted error Response.
 */
export async function generateEmbeddingWithTimeout(
  text: string,
): Promise<{ embedding: number[] } | { error: Response }> {
  try {
    const embeddingPromise = generateEmbedding(text);
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Embedding timeout')), API_CONFIG.EMBEDDING_TIMEOUT);
    });

    const embedding = await Promise.race([embeddingPromise, timeoutPromise]);
    return { embedding };
  } catch (err) {
    if (err instanceof Error && err.message === DOMAIN_ERRORS.EMBEDDING_TIMEOUT) {
      return {
        error: jsonError(
          DOMAIN_ERRORS.SERVICE_WARMING_UP,
          'SERVICE_UNAVAILABLE',
          HTTP_STATUS.SERVICE_UNAVAILABLE,
        ),
      };
    }
    return {
      error: jsonError(
        DOMAIN_ERRORS.FAILED_PROCESS_QUERY,
        'SERVICE_UNAVAILABLE',
        HTTP_STATUS.SERVICE_UNAVAILABLE,
      ),
    };
  }
}
