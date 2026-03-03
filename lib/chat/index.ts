/**
 * Shared chat utilities
 * @module lib/chat
 *
 * Common functionality extracted from chat API routes:
 * - app/api/chat
 * - app/api/custom-bots/[id]/chat
 * - app/api/professional-chat
 */

export { generateEmbeddingWithTimeout } from './embedding';
export { getUserLLMSettings, type LLMSettings } from './settings';
export { truncateChunks, joinContext } from './context';
export { handleLLMError } from './llm-errors';
export { parseResponseWithSuggestions } from './parse';
export { searchUserDocuments, type DocumentSource, type DocumentSearchResult } from './search';
