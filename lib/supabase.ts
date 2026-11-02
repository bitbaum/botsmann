/**
 * Supabase Client for Botsmann
 *
 * This talks to OUR Supabase, self-hosted on bitbaum at supabase.orangecat.ch —
 * there is no supabase.com project and no dashboard to log into. Capacity is
 * whatever the box has, not a hosted tier.
 *
 * One database backs several apps, so every client here is pinned to the
 * `botsmann` schema via DB_SCHEMA. An unpinned client reads `public`, which is
 * orangecat's, where our tables simply do not exist — that reads as a dead
 * database rather than as a misconfiguration.
 *
 * Setup: docs/SUPABASE_SETUP.md
 */

import { createClient } from '@supabase/supabase-js';
import { getClientEnv, getServerEnv } from '@/lib/config/env';
import { DB_SCHEMA } from '@/lib/constants';

// Database row types
export interface ConsultationRow {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  created_at: string;
  updated_at: string;
}

export interface UserSettingsRow {
  id: string;
  preferred_model: 'groq' | 'openrouter' | 'ollama';
  groq_api_key: string | null;
  openrouter_api_key: string | null;
  ollama_url: string | null;
  created_at: string;
}

export interface DocumentRow {
  id: string;
  user_id: string;
  name: string;
  type: string;
  size_bytes: number | null;
  storage_path: string;
  status: 'pending' | 'processing' | 'ready' | 'error';
  error_message: string | null;
  chunk_count: number;
  created_at: string;
  updated_at: string;
}

export interface DocumentChunkRow {
  id: string;
  document_id: string;
  user_id: string;
  content: string;
  embedding: number[] | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

// Helper to check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(supabaseUrl && supabaseAnonKey);
}

function createAnonClient() {
  const { NEXT_PUBLIC_SUPABASE_URL: supabaseUrl, NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey } =
    getClientEnv();

  return createClient(supabaseUrl, supabaseAnonKey, { db: { schema: DB_SCHEMA } });
}

/**
 * A client scoped to OUR schema.
 *
 * The bare `SupabaseClient` type hardcodes `'public'` as its schema, so
 * annotating with it silently asserts we query orangecat's tables — and the
 * compiler rejects the client we actually build. Deriving the type from the
 * factory keeps the two in step, and survives supabase-js changing the order
 * of its generic parameters.
 */
export type AppSupabaseClient = ReturnType<typeof createAnonClient>;

// Lazy-loaded Supabase client singleton
let _supabaseClient: AppSupabaseClient | null = null;

export function getSupabaseClient(): AppSupabaseClient {
  if (_supabaseClient) {
    return _supabaseClient;
  }

  _supabaseClient = createAnonClient();
  return _supabaseClient;
}

// Convenience export that throws if not configured
// Use isSupabaseConfigured() first if you want to check
export const supabase = {
  from: (table: string) => {
    return getSupabaseClient().from(table);
  },
  storage: {
    from: (bucket: string) => {
      return getSupabaseClient().storage.from(bucket);
    },
  },
};

// Server-side client with service role (for admin operations)
export function getServiceClient() {
  const { NEXT_PUBLIC_SUPABASE_URL: supabaseUrl } = getClientEnv();
  const { SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey } = getServerEnv();

  return createClient(supabaseUrl, serviceRoleKey, {
    db: { schema: DB_SCHEMA },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
