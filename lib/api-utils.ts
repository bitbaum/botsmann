/**
 * API Authentication Utilities
 * @module lib/api-utils
 *
 * Auth helpers for API routes. For response formatting, use lib/api/responses.
 */

import { isDeliverable } from '@bitbaum/accountkit/auth';
import { sessionFor } from '@/lib/accounts/server';

/** The signed-in person as API routes read them. */
export interface ApiUser {
  id: string;
  /** Their address, or null for one that cannot receive mail (an OrangeCat sign-in's placeholder). */
  email: string | null;
}

/**
 * The person behind this request, from AccountKit's session cookie, or null.
 *
 * Botsmann's data stays in the `botsmann` supabase schema and every route
 * reads it with the service-role client (lib/supabase getServiceClient), which
 * bypasses row-level security; each route filters by this id.
 */
export async function verifyUser(request: Request): Promise<ApiUser | null> {
  const session = await sessionFor(request.headers).catch(() => null);
  if (!session) return null;
  return {
    id: session.user.id,
    email: isDeliverable(session.user.email) ? session.user.email : null,
  };
}
