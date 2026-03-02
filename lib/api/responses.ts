/**
 * Centralized API Response Utilities
 * @module lib/api/responses
 *
 * SSOT for API response patterns across all routes.
 * Consolidates response creation, error handling, and Zod validation.
 * Includes HTTP caching headers for performance optimization.
 */

import { NextResponse } from 'next/server';
import { ZodError, type ZodSchema } from 'zod';

// ============================================================================
// Cache Control
// ============================================================================

/**
 * Cache control presets for different response types
 */
export const CACHE_CONTROL = {
  /** No caching - for mutations, auth, sensitive data */
  NONE: 'no-store, no-cache, must-revalidate',

  /** Private short cache - user-specific data (1 minute) */
  PRIVATE_SHORT: 'private, max-age=60',

  /** Private medium cache - user data that changes less frequently (5 minutes) */
  PRIVATE_MEDIUM: 'private, max-age=300',

  /** Public short cache - public data (5 minutes) */
  PUBLIC_SHORT: 'public, max-age=300',

  /** Public medium cache - semi-static public data (1 hour) */
  PUBLIC_MEDIUM: 'public, max-age=3600',

  /** Immutable - truly static data (1 day, immutable) */
  IMMUTABLE: 'public, max-age=86400, immutable',
} as const;

export type CacheControlPreset = keyof typeof CACHE_CONTROL;

/**
 * Response options including cache control
 */
export interface ResponseOptions {
  /** Cache control preset or custom header value */
  cache?: CacheControlPreset | string;
  /** Additional headers to include */
  headers?: Record<string, string>;
}

/**
 * Build headers object with cache control
 */
function buildHeaders(options?: ResponseOptions): HeadersInit {
  const headers: Record<string, string> = {};

  // Add cache control
  if (options?.cache) {
    const cacheValue =
      options.cache in CACHE_CONTROL
        ? CACHE_CONTROL[options.cache as CacheControlPreset]
        : options.cache;
    headers['Cache-Control'] = cacheValue;
  }

  // Add any additional headers
  if (options?.headers) {
    Object.assign(headers, options.headers);
  }

  return headers;
}

/**
 * Standard API response shape
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: ErrorCode;
  details?: ValidationError[];
}

/**
 * Error codes for categorizing API errors
 */
export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'DUPLICATE_SLUG'
  | 'RATE_LIMIT'
  | 'DATABASE_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'INTERNAL_ERROR';

/**
 * Validation error detail
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * HTTP Status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  RATE_LIMIT: 429,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

/**
 * Create a successful JSON response
 *
 * @param data - Response data
 * @param options - Response options (cache, headers) or just a message string for backwards compatibility
 * @param status - HTTP status code
 */
export function jsonSuccess<T>(
  data: T,
  options?: ResponseOptions | string,
  status: HttpStatusCode = HTTP_STATUS.OK,
): NextResponse<ApiResponse<T>> {
  const response: ApiResponse<T> = { success: true, data };

  // Handle backwards compatibility: options can be a message string
  let responseOptions: ResponseOptions | undefined;
  if (typeof options === 'string') {
    response.message = options;
  } else {
    responseOptions = options;
  }

  const headers = buildHeaders(responseOptions);

  return NextResponse.json(response, {
    status,
    headers: Object.keys(headers).length > 0 ? headers : undefined,
  });
}

/**
 * Create a success response with just a message (no data)
 */
export function jsonMessage(
  message: string,
  status = HTTP_STATUS.OK,
  options?: ResponseOptions,
): NextResponse<ApiResponse> {
  const headers = buildHeaders(options);
  return NextResponse.json(
    { success: true, message },
    {
      status,
      headers: Object.keys(headers).length > 0 ? headers : undefined,
    },
  );
}

/**
 * Create an error JSON response
 * Errors are never cached (Cache-Control: no-store)
 */
export function jsonError(
  error: string,
  code: ErrorCode = 'INTERNAL_ERROR',
  status: HttpStatusCode = HTTP_STATUS.INTERNAL_ERROR,
  details?: ValidationError[],
): NextResponse<ApiResponse> {
  const response: ApiResponse = { success: false, error, code };
  if (details?.length) response.details = details;
  return NextResponse.json(response, {
    status,
    headers: { 'Cache-Control': CACHE_CONTROL.NONE },
  });
}

/**
 * Create a validation error response
 */
export function jsonValidationError(
  message: string,
  details: ValidationError[],
): NextResponse<ApiResponse> {
  return jsonError(message, 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST, details);
}

/**
 * Create a rate limit error response
 */
export function jsonRateLimitError(
  message = 'Rate limit exceeded. Please try again later.',
): NextResponse<ApiResponse> {
  return jsonError(message, 'RATE_LIMIT', HTTP_STATUS.RATE_LIMIT);
}

/**
 * Create an unauthorized error response
 */
export function jsonUnauthorized(message = 'Unauthorized'): NextResponse<ApiResponse> {
  return jsonError(message, 'UNAUTHORIZED', HTTP_STATUS.UNAUTHORIZED);
}

/**
 * Create a not found error response
 */
export function jsonNotFound(message = 'Not found'): NextResponse<ApiResponse> {
  return jsonError(message, 'NOT_FOUND', HTTP_STATUS.NOT_FOUND);
}

/**
 * Create a service unavailable error response
 */
export function jsonServiceUnavailable(
  message = 'Service temporarily unavailable',
): NextResponse<ApiResponse> {
  return jsonError(message, 'SERVICE_UNAVAILABLE', HTTP_STATUS.SERVICE_UNAVAILABLE);
}

/**
 * Convert ZodError to ValidationError array
 */
export function formatZodErrors(error: ZodError): ValidationError[] {
  return error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
}

/**
 * Validate request body with Zod schema
 * Returns validated data or throws formatted validation error
 */
export async function validateBody<T>(
  request: Request,
  schema: ZodSchema<T>,
): Promise<{ data: T } | { error: NextResponse<ApiResponse> }> {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return {
        error: jsonValidationError('Validation failed', formatZodErrors(result.error)),
      };
    }

    return { data: result.data };
  } catch {
    return {
      error: jsonError('Invalid JSON body', 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST),
    };
  }
}

/**
 * Type guard to check if validation result has error
 */
export function hasValidationError<T>(
  result: { data: T } | { error: NextResponse<ApiResponse> },
): result is { error: NextResponse<ApiResponse> } {
  return 'error' in result;
}

/**
 * Handle caught errors and return appropriate response
 */
export function handleError(error: unknown, fallbackMessage: string): NextResponse<ApiResponse> {
  if (error instanceof ZodError) {
    return jsonValidationError('Validation failed', formatZodErrors(error));
  }

  const errorWithCode = error as { code?: string };
  if (errorWithCode.code === 'RATE_LIMIT') {
    return jsonRateLimitError();
  }

  return jsonError(fallbackMessage, 'INTERNAL_ERROR', HTTP_STATUS.INTERNAL_ERROR);
}
