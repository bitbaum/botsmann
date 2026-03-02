/**
 * Server-side Supabase utilities
 *
 * This file contains utilities that use `next/headers` and can only
 * be used in server components and API routes.
 *
 * For client components, use `createClientComponentClient` from `@/lib/supabase`.
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getClientEnv } from '@/lib/config/env';

/**
 * Create Supabase client for route handlers (API routes)
 * Replaces deprecated createRouteHandlerClient from @supabase/auth-helpers-nextjs
 *
 * @param _options - Options object (for backwards compatibility, not used)
 */
export function createRouteHandlerClient(_options?: { cookies?: unknown }) {
  const { NEXT_PUBLIC_SUPABASE_URL: supabaseUrl, NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey } =
    getClientEnv();

  const cookieStore = cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
  });
}
