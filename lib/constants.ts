/**
 * Application Constants
 *
 * Centralized constants for error messages, API configuration, etc.
 * Import from here instead of hardcoding strings.
 *
 * Note: Basic API response helpers and HTTP status codes are in lib/api (SSOT: lib/api/responses)
 * This file contains domain-specific constants.
 */

// Domain-specific error messages (extends api-utils ERROR_MESSAGES)
export const DOMAIN_ERRORS = {
  // Service errors
  SERVICE_UNAVAILABLE: 'Service temporarily unavailable',
  SERVICE_WARMING_UP: 'Service is warming up. Please try again in a few seconds.',
  AI_UNAVAILABLE: 'AI service temporarily unavailable. Please try again in a moment.',

  // Document errors
  DOCUMENT_NOT_FOUND: 'Document not found',
  FAILED_UPLOAD: 'Failed to upload file',
  FAILED_UPLOAD_DOCUMENT: 'Failed to upload document',
  FAILED_GET_DOCUMENTS: 'Failed to get documents',
  FAILED_DELETE_DOCUMENT: 'Failed to delete document',
  FAILED_SEARCH_DOCUMENTS: 'Failed to search documents',
  FAILED_PROCESS_DOCUMENT: 'Failed to process document',
  NO_DOCUMENTS:
    "You don't have any processed documents yet. Please upload and process some documents first.",

  // Form errors
  FAILED_SUBMIT_FORM: 'Failed to submit form. Please try again.',
  FAILED_SUBMIT_CONSULTATION: 'Failed to submit consultation',
  FAILED_SUBMIT_CONTACT: 'Failed to process submission. Please try again.',

  // Settings errors
  FAILED_GET_SETTINGS: 'Failed to get settings',
  FAILED_UPDATE_SETTINGS: 'Failed to update settings',

  // Chat errors
  MESSAGE_REQUIRED: 'Message required',
  FAILED_PROCESS_QUERY: 'Failed to process query. Please try again.',
  EMBEDDING_TIMEOUT: 'Embedding timeout',

  // Ollama errors
  OLLAMA_NOT_RUNNING: 'Cannot connect to Ollama. Make sure it is running.',

  // Product errors
  FAILED_SEARCH_PRODUCTS: 'Failed to search products',
} as const;

// API Configuration
export const API_CONFIG = {
  // Groq
  GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',
  GROQ_MODEL: 'llama-3.1-8b-instant',

  // OpenRouter
  OPENROUTER_API_URL: 'https://openrouter.ai/api/v1/chat/completions',
  // Must be a FREE id. OpenRouter is the FALLBACK here — reached when Groq's
  // free tier is spent, i.e. only when nobody is watching. This default was
  // `anthropic/claude-sonnet-5`, a premium paid model, so "the free tier ran
  // out" produced a bill rather than a degraded answer — a spending decision
  // made by an outage instead of by a person. (It also broke the standing rule
  // that Anthropic is never a primary or fallback provider in this fleet.)
  //
  // `openai/gpt-oss-20b:free` reports pricing.prompt = 0 in OpenRouter's own
  // catalogue (checked 2026-08-16) and was probed live for tool support on
  // 2026-08-15. Free catalogues rot — when it does, replace it with another
  // `:free` id, never by dropping the suffix.
  OPENROUTER_DEFAULT_MODEL: 'openai/gpt-oss-20b:free',

  // Token limits
  MAX_CONTEXT_CHARS: 8000,
  MAX_TOKENS_RESPONSE: 1024,

  // Timeouts (ms)
  EMBEDDING_TIMEOUT: 8000,
  DEFAULT_TIMEOUT: 30000,
} as const;

// System prompts
export const SYSTEM_PROMPTS = {
  RAG_ASSISTANT: `You are a helpful assistant that answers questions based on the provided document context.

Instructions:
- Only use information from the provided context to answer questions
- If the context doesn't contain relevant information, say so clearly
- Cite which document the information comes from when possible
- Be concise but thorough
- If asked about something not in the documents, acknowledge the limitation

Context from user's documents will be provided below.`,

  BOTSMANN_ASSISTANT: `You are Botsmann, a helpful AI assistant created by Botsmann AI. You help users with questions about Botsmann's products and services.

About Botsmann:
- Botsmann is an AI company that creates specialized AI assistants
- Products include: Medical Expert (Imhotep), Research Assistant (Nerd), Legal Expert (Solon), Swiss German Teacher, and Product Manager
- Focus on privacy, accuracy, and helpfulness

Guidelines:
- Be friendly and professional
- Keep responses concise
- If you don't know something, say so
- Focus on Botsmann-related topics`,
} as const;

// Validation constants
export const VALIDATION = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  DEMO_MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB - for demo/try pages
  MAX_MESSAGE_LENGTH: 10000,
  MIN_PASSWORD_LENGTH: 8,
} as const;

/**
 * Supported LLM model providers
 */
export const MODEL_PROVIDERS = ['groq', 'openrouter', 'ollama'] as const;
export type ModelProviderType = (typeof MODEL_PROVIDERS)[number];

/**
 * Default user settings
 */
export const DEFAULT_USER_SETTINGS = {
  preferred_model: 'groq' as ModelProviderType,
  groq_api_key: null,
  openrouter_api_key: null,
  ollama_url: null,
} as const;

/**
 * Database error codes (Supabase/PostgREST)
 */
export const DB_ERROR_CODES = {
  NO_ROWS_FOUND: 'PGRST116',
} as const;

/**
 * Document processing settings
 */
export const CHUNK_SETTINGS = {
  DEFAULT_SIZE: 500,
  DEFAULT_OVERLAP: 50,
  BATCH_SIZE: 50,
} as const;

/**
 * Document status values (SSOT)
 */
export const DOCUMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  READY: 'ready',
  ERROR: 'error',
} as const;

export type DocumentStatusType = (typeof DOCUMENT_STATUS)[keyof typeof DOCUMENT_STATUS];

/**
 * Document status display config
 */
export const DOCUMENT_STATUS_CONFIG = {
  [DOCUMENT_STATUS.PENDING]: {
    label: 'Pending',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
  },
  [DOCUMENT_STATUS.PROCESSING]: {
    label: 'Processing...',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
  },
  [DOCUMENT_STATUS.READY]: {
    label: 'Ready',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
  },
  [DOCUMENT_STATUS.ERROR]: {
    label: 'Error',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
  },
} as const;
