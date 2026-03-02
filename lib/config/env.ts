/**
 * Environment Variable Validation - SSOT
 * @module lib/config/env
 *
 * Validates required env vars at first access (fail-fast).
 * Server-only vars are validated lazily (only when accessed).
 */

import { z } from 'zod';

/**
 * Client-side env vars (NEXT_PUBLIC_*) — available everywhere
 */
const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('https://botsmann.com'),
});

/**
 * Server-only env vars — validated lazily on first access
 */
const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),

  // LLM providers (at least one should be set)
  GROQ_API_KEY: z.string().optional(),
  OPENROUTER_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),

  // Ollama (local dev)
  OLLAMA_MODEL: z.string().default('llama3.2:latest'),
  OLLAMA_URL: z.string().url().default('http://localhost:11434'),

  // Email (AWS SES)
  NEXT_AWS_REGION: z.string().default('eu-central-1'),
  NEXT_AWS_ACCESS_KEY_ID: z.string().default(''),
  NEXT_AWS_SECRET_ACCESS_KEY: z.string().default(''),
  FROM_EMAIL: z.string().email().default('noreply@botsmann.com'),
  ADMIN_EMAIL: z.string().email().default('admin@botsmann.com'),

  // API key for middleware
  API_KEY: z.string().default('development-key'),
});

export type ClientEnv = z.infer<typeof clientSchema>;
export type ServerEnv = z.infer<typeof serverSchema>;

/**
 * Validated client env — parsed once, cached
 */
let _clientEnv: ClientEnv | null = null;

export function getClientEnv(): ClientEnv {
  if (_clientEnv) return _clientEnv;

  const result = clientSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  });

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    const missing = Object.entries(errors)
      .map(([key, msgs]) => `  ${key}: ${msgs?.join(', ')}`)
      .join('\n');
    throw new Error(`Missing required environment variables:\n${missing}`);
  }

  _clientEnv = result.data;
  return _clientEnv;
}

/**
 * Validated server env — parsed once, cached.
 * Only call from server-side code (API routes, server components).
 */
let _serverEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (_serverEnv) return _serverEnv;

  const result = serverSchema.safeParse({
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OLLAMA_MODEL: process.env.OLLAMA_MODEL,
    OLLAMA_URL: process.env.OLLAMA_URL,
    NEXT_AWS_REGION: process.env.NEXT_AWS_REGION,
    NEXT_AWS_ACCESS_KEY_ID: process.env.NEXT_AWS_ACCESS_KEY_ID,
    NEXT_AWS_SECRET_ACCESS_KEY: process.env.NEXT_AWS_SECRET_ACCESS_KEY,
    FROM_EMAIL: process.env.FROM_EMAIL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    API_KEY: process.env.API_KEY,
  });

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    const missing = Object.entries(errors)
      .map(([key, msgs]) => `  ${key}: ${msgs?.join(', ')}`)
      .join('\n');
    throw new Error(`Missing required server environment variables:\n${missing}`);
  }

  _serverEnv = result.data;
  return _serverEnv;
}
