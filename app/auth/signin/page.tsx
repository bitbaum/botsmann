'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useAuth, useAuthError, useRedirectWhenSignedIn } from '@/lib/auth';
import { SignInSchema } from '@/lib/schemas/auth';
import { ROUTES } from '@/lib/routes';
import { PageLoading } from '@/components/shared/LoadingSpinner';
import { AuthShell, AuthAlert, AuthField, AuthSubmitButton } from '@/components/auth/AuthShell';

export default function SignInPage() {
  const { signIn, loading: authLoading, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { error, setError, showAuthError, rateLimitSeconds, isRateLimited } = useAuthError();

  useRedirectWhenSignedIn(user);

  if (user) {
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Don't allow submit while rate limited
    if (isRateLimited) return;

    setError('');
    setLoading(true);

    // Validate with Zod
    const result = SignInSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      setLoading(false);
      return;
    }

    const { error } = await signIn(email, password);

    if (error) {
      showAuthError(error);
      setLoading(false);
    } else {
      window.location.href = ROUTES.SETTINGS;
    }
  };

  if (authLoading) {
    return <PageLoading />;
  }

  return (
    <AuthShell subtitle="Sign in to your account">
      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthAlert error={error} rateLimitSeconds={rateLimitSeconds} />

        <AuthField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isRateLimited}
          placeholder="you@example.com"
        />

        <AuthField
          id="password"
          label="Password"
          labelExtra={
            <Link
              href={ROUTES.AUTH.FORGOT_PASSWORD}
              className="text-sm text-action hover:underline"
            >
              Forgot password?
            </Link>
          }
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isRateLimited}
          minLength={6}
          placeholder="Enter your password"
        />

        <AuthSubmitButton
          loading={loading}
          loadingLabel="Signing in..."
          rateLimitSeconds={rateLimitSeconds}
        >
          Sign In
        </AuthSubmitButton>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link href={ROUTES.AUTH.SIGNUP} className="text-action hover:underline">
          Sign up
        </Link>
      </div>
    </AuthShell>
  );
}
