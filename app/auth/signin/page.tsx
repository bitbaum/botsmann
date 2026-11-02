import type { Metadata, Route } from 'next';
import { redirect } from 'next/navigation';
import { authLabelsFor } from '@bitbaum/accountkit/auth';
import { AuthShell } from '@/components/auth/AuthShell';
import { BotsmannSignIn } from '@/components/auth/AuthScreens';
import { authStatus, getSession, methods } from '@/lib/accounts/server';
import { safeNext } from '@/lib/accounts/paths';

export const metadata: Metadata = { title: 'Sign in', robots: { index: false } };

type Search = Promise<{ next?: string; token?: string; error?: string; method?: string }>;

/** Every way in on one screen; the mailed reset link comes back here too. */
export default async function SignInPage({ searchParams }: { searchParams: Search }) {
  const query = await searchParams;
  const next = safeNext(query.next);
  const recovering =
    Boolean(query.token) || (query.error === 'INVALID_TOKEN' && query.method !== 'magic-link');
  if (!recovering && (await getSession())) redirect(next as Route);
  return (
    <AuthShell subtitle={recovering ? 'Choose a new password' : 'Sign in to your account'}>
      {authStatus().ready ? (
        <BotsmannSignIn
          labels={authLabelsFor('en')}
          methods={methods()}
          next={next}
          initialError={Boolean(query.error) && !recovering}
        />
      ) : (
        <p className="text-sm text-gray-600">
          Accounts are not available right now. Try again in a little while.
        </p>
      )}
    </AuthShell>
  );
}
