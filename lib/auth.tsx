'use client';

import { createContext, useCallback, useContext, useEffect, type ReactNode } from 'react';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/accounts/client';
import { ROUTES } from '@/lib/routes';

/**
 * Who is signed in, for Botsmann's pages: AccountKit's session
 * (@bitbaum/accountkit, /api/auth/get-session), in the shape the pages read.
 * Signing in, signing up, recovery, passkeys and the second factor are
 * AccountKit's own screens (/auth/signin, /auth/signup, /account); this file
 * only answers who it is and signs out.
 */

/** The signed-in person. `email` is empty for an OrangeCat sign-in's `.invalid` placeholder. */
export interface AppUser {
  id: string;
  email: string;
  created_at: string;
}

export interface AuthError extends Error {
  code?: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  isEmailVerified: boolean;
  displayName: string | null;
  avatarUrl: string | null;
  signOut: () => Promise<void>;
  updateProfile: (data: {
    display_name?: string;
    avatar_url?: string | null;
  }) => Promise<{ error: AuthError | null }>;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authError(message: string): AuthError {
  return new Error(message) as AuthError;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending, refetch } = authClient.useSession();
  const raw = data?.user;
  const user: AppUser | null = raw
    ? {
        id: raw.id,
        email: raw.email.endsWith('.invalid') ? '' : raw.email,
        created_at: new Date(raw.createdAt).toISOString(),
      }
    : null;

  const signOut = useCallback(async () => {
    await authClient.signOut();
    window.location.href = ROUTES.HOME;
  }, []);

  const updateProfile = useCallback(
    async (input: { display_name?: string; avatar_url?: string | null }) => {
      const { error } = await authClient.updateUser({
        ...(input.display_name !== undefined ? { name: input.display_name } : {}),
        ...(input.avatar_url !== undefined ? { image: input.avatar_url } : {}),
      });
      if (error) return { error: authError(error.message ?? 'Could not save your profile.') };
      await refetch();
      return { error: null };
    },
    [refetch],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isPending,
        isEmailVerified: Boolean(raw?.emailVerified),
        displayName: raw?.name || null,
        avatarUrl: raw?.image ?? null,
        signOut,
        updateProfile,
        isConfigured: true,
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

/** A signed-in page: a visitor who is not signed in is sent to sign in first. */
export function useRequireAuth() {
  const { user, loading, signOut, isEmailVerified, displayName, avatarUrl, updateProfile } =
    useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || user) return;
    // The session hook can read "nobody" for a moment before its first
    // answer arrives; ask the server once before sending anyone away.
    let live = true;
    void authClient.getSession().then(({ data }) => {
      if (!live || data?.user) return;
      const next = `${window.location.pathname}${window.location.search}`;
      router.replace(`${ROUTES.AUTH.SIGNIN}?next=${encodeURIComponent(next)}` as Route);
    });
    return () => {
      live = false;
    };
  }, [user, loading, router]);

  return { user, loading, signOut, isEmailVerified, displayName, avatarUrl, updateProfile };
}
