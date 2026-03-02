/**
 * Shared LLM error handling for chat routes
 * @module lib/chat/llm-errors
 */

import { jsonError, jsonSuccess, HTTP_STATUS } from '@/lib/api';
import { DOMAIN_ERRORS } from '@/lib/constants';

interface FallbackSource {
  label: string;
  content: string;
}

/**
 * Handle common LLM call errors.
 * Returns a Response or null if the error isn't recognized.
 */
export function handleLLMError(
  error: unknown,
  fallbackSources?: FallbackSource[],
): Response | null {
  if (!(error instanceof Error)) return null;

  // API key errors — return context-only response if we have sources
  if (error.message.includes('API key') && fallbackSources && fallbackSources.length > 0) {
    const parts = fallbackSources.map((s) => `${s.label}\n${s.content}`);
    return jsonSuccess({
      response: `Here's what I found:\n\n${parts.join('\n\n---\n\n')}`,
      sources: fallbackSources,
      provider: 'none',
      model: 'context-only',
    });
  }

  // Ollama connection errors
  if (error.message.includes('Cannot connect to Ollama')) {
    return jsonError(
      DOMAIN_ERRORS.OLLAMA_NOT_RUNNING,
      'SERVICE_UNAVAILABLE',
      HTTP_STATUS.SERVICE_UNAVAILABLE,
    );
  }

  // Generic AI unavailable
  return jsonError(
    DOMAIN_ERRORS.AI_UNAVAILABLE,
    'SERVICE_UNAVAILABLE',
    HTTP_STATUS.SERVICE_UNAVAILABLE,
  );
}
