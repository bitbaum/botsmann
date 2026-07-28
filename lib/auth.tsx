'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { createClientComponentClient, isSupabaseConfigured } from '@/lib/supabase';
import { ROUTES } from '@/lib/routes';
import type { UserProfile } from '@/lib/schemas/auth';

// Lazy-loaded client - only created when Supabase is configured and first used
let _supabaseClient: ReturnType<typeof createClientComponentClient> | null = null;

function getSupabaseClient() {
  if (!_supabaseClient && isSupabaseConfigured()) {
    _supabaseClient = createClientComponentClient();
  }
  return _supabaseClient;
}

/**
 * Auth error with optional code for specific handling (e.g., rate limiting)
 */
export interface AuthError extends Error {
  code?: string;
  retryAfter?: number;
}

/**
 * Create an AuthError from an API response
 */
function createAuthError(message: string, code?: string, retryAfter?: number): AuthError {
  const error = new Error(message) as AuthError;
  error.code = code;
  error.retryAfter = retryAfter;
  return error;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isEmailVerified: boolean;
  displayName: string | null;
  avatarUrl: string | null;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: AuthError | null }>;
  resendVerificationEmail: () => Promise<{ error: AuthError | null }>;
  updateProfile: (data: {
    display_name?: string;
    avatar_url?: string | null;
  }) => Promise<{ error: AuthError | null; profile?: UserProfile }>;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const isConfigured = isSupabaseConfigured();

  // Check if email is verified
  // Supabase sets email_confirmed_at when email is verified
  const isEmailVerified = Boolean(user?.email_confirmed_at);

  // Get display name and avatar from user metadata
  const displayName = (user?.user_metadata?.display_name as string) || null;
  const avatarUrl = (user?.user_metadata?.avatar_url as string) || null;

  useEffect(() => {
    const client = getSupabaseClient();

    // If Supabase is not configured, just set loading to false
    if (!client) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- initializes auth state from the external Supabase client
      setLoading(false);
      return;
    }

    // Get initial session
    client.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event: string, newSession: Session | null) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Sign in via rate-limited API route
   */
  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: createAuthError(data.error || 'Sign in failed', data.code, data.retryAfter),
        };
      }

      // Refresh the session after successful API login
      await getSupabaseClient()?.auth.getSession();

      return { error: null };
    } catch (err) {
      return {
        error: createAuthError('Network error. Please try again.'),
      };
    }
  };

  /**
   * Sign up via rate-limited API route
   */
  const signUp = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: createAuthError(data.error || 'Sign up failed', data.code, data.retryAfter),
        };
      }

      return { error: null };
    } catch (err) {
      return {
        error: createAuthError('Network error. Please try again.'),
      };
    }
  };

  const signOut = async () => {
    await getSupabaseClient()?.auth.signOut();
  };

  /**
   * Request password reset via rate-limited API route
   */
  const resetPassword = async (email: string) => {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: createAuthError(
            data.error || 'Failed to send reset email',
            data.code,
            data.retryAfter,
          ),
        };
      }

      return { error: null };
    } catch (err) {
      return {
        error: createAuthError('Network error. Please try again.'),
      };
    }
  };

  /**
   * Update password (called from reset-password page after email link)
   * This still uses Supabase directly as the user already has a session
   */
  const updatePassword = async (newPassword: string) => {
    const { error } = await getSupabaseClient()?.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      return { error: createAuthError(error.message) };
    }
    return { error: null };
  };

  /**
   * Resend verification email via rate-limited API route
   */
  const resendVerificationEmail = async () => {
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: createAuthError(
            data.error || 'Failed to send verification email',
            data.code,
            data.retryAfter,
          ),
        };
      }

      return { error: null };
    } catch (err) {
      return {
        error: createAuthError('Network error. Please try again.'),
      };
    }
  };

  /**
   * Update user profile (display name, avatar URL)
   */
  const updateProfile = useCallback(
    async (data: { display_name?: string; avatar_url?: string | null }) => {
      try {
        const response = await fetch('/api/auth/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          return {
            error: createAuthError(
              result.error || 'Failed to update profile',
              result.code,
              result.retryAfter,
            ),
          };
        }

        // Refresh the session to get updated user metadata
        await getSupabaseClient()?.auth.getSession();

        return { error: null, profile: result.profile as UserProfile };
      } catch (err) {
        return {
          error: createAuthError('Network error. Please try again.'),
        };
      }
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isEmailVerified,
        displayName,
        avatarUrl,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        resendVerificationEmail,
        updateProfile,
        isConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * Hook to require authentication
 * Redirects to signin if not authenticated
 *
 * @param options.requireVerified - If true, also requires email to be verified
 */
export function useRequireAuth(options?: { requireVerified?: boolean }) {
  const { user, loading, signOut, isEmailVerified, displayName, avatarUrl, updateProfile } =
    useAuth();
  const { requireVerified = false } = options ?? {};

  useEffect(() => {
    if (loading) return;

    if (!user) {
      window.location.href = ROUTES.AUTH.SIGNIN;
      return;
    }

    // If verification is required but email is not verified, redirect to verify page
    if (requireVerified && !isEmailVerified) {
      window.location.href = ROUTES.AUTH.VERIFY_EMAIL;
    }
  }, [user, loading, isEmailVerified, requireVerified]);

  return { user, loading, signOut, isEmailVerified, displayName, avatarUrl, updateProfile };
}

/**
 * Check if an error is a rate limit error
 */
export function isRateLimitError(error: AuthError | null): boolean {
  return error?.code === 'RATE_LIMITED';
}

/**
 * Get retry after seconds from a rate limit error
 */
export function getRateLimitRetryAfter(error: AuthError | null): number {
  return error?.retryAfter ?? 60;
}
