'use client';

import Link from 'next/link';
import {
  AccountPanel,
  SignInForm,
  SignUpForm,
  type AuthClasses,
  type AuthLabels,
} from '@bitbaum/accountkit/auth/react';
import type { SignInMethods } from '@bitbaum/accountkit/auth';
import { authClient } from '@/lib/accounts/client';
import { ROUTES } from '@/lib/routes';

/**
 * The fleet's account screens (@bitbaum/accountkit/auth/react) in Botsmann's
 * look. The logic and the words are the package's, the same in every product.
 */
const CLASSES: Partial<AuthClasses> = {
  stack: 'flex flex-col gap-5',
  field: 'flex flex-col gap-1',
  label: 'text-sm font-medium text-gray-700',
  hint: 'text-sm leading-relaxed text-gray-600',
  input:
    'w-full min-h-11 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-action disabled:bg-gray-50 disabled:text-gray-500',
  button:
    'inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-action px-4 py-3 font-medium text-white transition-colors hover:bg-action-hover disabled:opacity-50',
  buttonQuiet:
    'inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50 disabled:opacity-50',
  notice:
    'rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-relaxed text-gray-700',
  error: 'rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700',
  divider:
    'flex items-center gap-3 text-xs text-gray-500 before:h-px before:flex-1 before:bg-gray-200 after:h-px after:flex-1 after:bg-gray-200',
  section: 'flex flex-col gap-4 border-t border-gray-200 pt-8',
  sectionTitle: 'text-lg font-semibold text-gray-900',
  link: 'break-all text-action underline underline-offset-4',
  check: 'flex min-h-11 items-center gap-3 text-sm text-gray-700',
};

const textLink = 'inline-flex min-h-11 items-center font-medium text-action hover:underline';

export function BotsmannSignIn(props: {
  labels: AuthLabels;
  methods: SignInMethods;
  next: string;
  initialError: boolean;
}) {
  return (
    <SignInForm
      client={authClient}
      classes={CLASSES}
      labels={props.labels}
      methods={props.methods}
      next={props.next}
      signInPath={ROUTES.AUTH.SIGNIN}
      initialError={props.initialError}
      signUpLink={
        <Link
          prefetch={false}
          href={`${ROUTES.AUTH.SIGNUP}?next=${encodeURIComponent(props.next)}`}
          className={textLink}
        >
          {props.labels.createAccount}
        </Link>
      }
    />
  );
}

export function BotsmannSignUp(props: {
  labels: AuthLabels;
  methods: SignInMethods;
  next: string;
}) {
  return (
    <SignUpForm
      client={authClient}
      classes={CLASSES}
      labels={props.labels}
      methods={props.methods}
      next={props.next}
      signUpPath={ROUTES.AUTH.SIGNUP}
      signInPath={ROUTES.AUTH.SIGNIN}
      signInLink={
        <Link
          prefetch={false}
          href={`${ROUTES.AUTH.SIGNIN}?next=${encodeURIComponent(props.next)}`}
          className={textLink}
        >
          {props.labels.signIn}
        </Link>
      }
    />
  );
}

export function BotsmannAccount(props: {
  labels: AuthLabels;
  methods: SignInMethods;
  user: {
    name: string;
    email: string | null;
    emailVerified: boolean;
    role: string;
    twoFactorEnabled: boolean;
  };
  linked: string[];
}) {
  return (
    <AccountPanel
      client={authClient}
      classes={CLASSES}
      accountPath={ROUTES.AUTH.ACCOUNT}
      homePath={ROUTES.HOME}
      {...props}
    />
  );
}
