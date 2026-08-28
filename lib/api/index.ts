/**
 * API Utilities Module
 * @module lib/api
 *
 * Centralized exports for API-related utilities.
 */

export {
  // Response creators
  jsonSuccess,
  jsonMessage,
  jsonError,
  jsonValidationError,
  jsonRateLimitError,
  jsonUnauthorized,
  jsonNotFound,
  jsonServiceUnavailable,
  jsonLLMUnavailable,
  // Validation helpers
  validateBody,
  hasValidationError,
  formatZodErrors,
  handleError,
  // Constants
  HTTP_STATUS,
  CACHE_CONTROL,
  // Types
  type ApiResponse,
  type ErrorCode,
  type ValidationError,
  type CacheControlPreset,
  type ResponseOptions,
} from './responses';
