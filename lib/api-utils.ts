/**
 * API Authentication Utilities
 * @module lib/api-utils
 *
 * Auth helpers for API routes. For response formatting, use lib/api/responses.
 */

import { NextRequest } from 'next/server';
import { getServiceClient } from './supabase';
import type { User } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from './supabase-server';

/**
 * Verify user from JWT token in Authorization header
 * Extracts Bearer token and validates against Supabase
 *
 * @param request - Next.js request object
 * @returns User object if valid, null otherwise
 */
export async function verifyUser(request: NextRequest): Promise<User | null> {
  // Preferred: cookie-based via auth-helpers
  try {
    const routeClient = createRouteHandlerClient({ cookies });
    const { data, error } = await routeClient.auth.getUser();
    if (!error && data.user) return data.user;
  } catch {}

  // Fallback: Bearer token header
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const supabase = getServiceClient();
    const { data, error } = await supabase.auth.getUser(token);
    if (!error && data.user) return data.user;
  }
  return null;
}
