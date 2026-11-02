import type { Metadata, Route } from 'next';
import { redirect } from 'next/navigation';
import { authLabelsFor } from '@bitbaum/accountkit/auth';
import { AuthShell } from '@/components/auth/AuthShell';
import { BotsmannSignUp } from '@/components/auth/AuthScreens';
import { authStatus, getSession, methods } from '@/lib/accounts/server';
import { safeNext } from '@/lib/accounts/paths';

export const metadata: Metadata = { title: 'Create an account', robots: { index: false } };

/** A new account in one step: an email and a password, or any other way in. */
export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const next = safeNext((await searchParams).next);
  if (await getSession()) redirect(next as Route);
  return (
    <AuthShell subtitle="Create your account">
      {authStatus().ready ? (
        <BotsmannSignUp labels={authLabelsFor('en')} methods={methods()} next={next} />
      ) : (
        <p className="text-sm text-gray-600">
          Accounts are not available right now. Try again in a little while.
        </p>
      )}
    </AuthShell>
  );
}
