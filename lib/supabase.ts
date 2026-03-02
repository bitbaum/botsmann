/**
 * Supabase Client for Botsmann
 *
 * Free tier includes:
 * - 500MB PostgreSQL database
 * - 1GB file storage
 * - Unlimited API requests
 * - pgvector for embeddings
 *
 * Setup: https://supabase.com/dashboard
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import { getClientEnv, getServerEnv } from '@/lib/config/env';

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

// Lazy-loaded Supabase client singleton
let _supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (_supabaseClient) {
    return _supabaseClient;
  }

  const { NEXT_PUBLIC_SUPABASE_URL: supabaseUrl, NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey } =
    getClientEnv();

  _supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return _supabaseClient;
}

// Convenience export that throws if not configured
// Use isSupabaseConfigured() first if you want to check
export const supabase = {
  from: (table: string) => {
    return getSupabaseClient().from(table);
  },
  auth: {
    get user() {
      return getSupabaseClient().auth.getUser();
    },
    signIn: (credentials: { email: string; password: string }) => {
      return getSupabaseClient().auth.signInWithPassword(credentials);
    },
    signOut: () => {
      return getSupabaseClient().auth.signOut();
    },
  },
  storage: {
    from: (bucket: string) => {
      return getSupabaseClient().storage.from(bucket);
    },
  },
};

// Server-side client with service role (for admin operations)
export function getServiceClient(): SupabaseClient {
  const { NEXT_PUBLIC_SUPABASE_URL: supabaseUrl } = getClientEnv();
  const { SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey } = getServerEnv();

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Create Supabase client for client components
 * Replaces deprecated createClientComponentClient from @supabase/auth-helpers-nextjs
 *
 * During SSG/SSR without env vars, returns a mock client to prevent build errors.
 * The real client is created on the client side when env vars are available.
 */
export function createClientComponentClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // During SSG or when env vars are missing, return a mock client
  // This prevents build failures; the real client is created client-side
  if (!supabaseUrl || !supabaseAnonKey) {
    // Only throw in browser where we actually need the client
    if (typeof window !== 'undefined') {
      throw new Error(
        'Supabase environment variables not configured. ' +
          'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
      );
    }
    // Return mock during SSG - will be replaced on hydration
    // Using 'any' here because properly typing the full Supabase client mock
    // would require importing internal Supabase types that aren't exported.
    // This mock is only used during build-time SSG, never at runtime.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockClient: any = {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        onAuthStateChange: (_event: string, _callback: (event: string, session: null) => void) => {
          // Return immediately with no-op subscription
          return {
            data: {
              subscription: {
                unsubscribe: () => {
                  /* no-op */
                },
              },
            },
          };
        },
        signInWithPassword: () =>
          Promise.resolve({ data: { user: null, session: null }, error: null }),
        signUp: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
        signOut: () => Promise.resolve({ error: null }),
        updateUser: () => Promise.resolve({ data: { user: null }, error: null }),
        resend: () => Promise.resolve({ error: null }),
        exchangeCodeForSession: () => Promise.resolve({ data: { session: null }, error: null }),
        resetPasswordForEmail: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
        insert: () => ({
          select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
        }),
        update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
        delete: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
      }),
      storage: {
        from: () => ({
          upload: () => Promise.resolve({ data: null, error: null }),
          download: () => Promise.resolve({ data: null, error: null }),
          remove: () => Promise.resolve({ data: null, error: null }),
        }),
      },
    };
    return mockClient;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
