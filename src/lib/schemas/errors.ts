export type ErrorCode =
  | "UNAUTHORIZED"
  | "VALIDATION_ERROR"
  | "RATE_LIMIT"
  | "DATABASE_ERROR"
  | "INTERNAL_ERROR"
  | "NOT_FOUND";

export interface ErrorDetail {
  field?: string;
  message: string;
}

export interface ErrorResponse {
  error: string;
  code: ErrorCode;
  details?: ErrorDetail[];
}

export function createErrorResponse(
  message: string,
  code: ErrorCode,
  details?: ErrorDetail[],
): ErrorResponse {
  return {
    error: message,
    code,
    ...(details && { details }),
  };
}
