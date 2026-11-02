import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { authLabelsFor, isDeliverable } from '@bitbaum/accountkit/auth';
import { AuthShell } from '@/components/auth/AuthShell';
import { BotsmannAccount } from '@/components/auth/AuthScreens';
import { getAuth, getSession, methods } from '@/lib/accounts/server';

export const metadata: Metadata = { title: 'Your account', robots: { index: false } };

/** Password, passkeys, the second factor, linked sign-ins, and deleting the account. */
export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect('/auth/signin?next=/account');
  const accounts = await getAuth()
    .api.listUserAccounts({ headers: await headers() })
    .catch(() => [] as { providerId: string }[]);
  const { user } = session;
  return (
    <AuthShell subtitle="Your account">
      <BotsmannAccount
        labels={authLabelsFor('en')}
        methods={methods()}
        user={{
          name: user.name ?? '',
          email: isDeliverable(user.email) ? user.email : null,
          emailVerified: Boolean(user.emailVerified),
          role: 'customer',
          twoFactorEnabled: Boolean(user.twoFactorEnabled),
        }}
        linked={(accounts as { providerId: string }[]).map((a) => a.providerId)}
      />
    </AuthShell>
  );
}
