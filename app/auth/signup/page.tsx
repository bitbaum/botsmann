'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useAuth, useAuthError, useRedirectWhenSignedIn } from '@/lib/auth';
import { SignUpSchema, PASSWORD_MIN_LENGTH } from '@/lib/schemas/auth';
import { ROUTES } from '@/lib/routes';
import { PageLoading } from '@/components/shared/LoadingSpinner';
import { AuthShell, AuthAlert, AuthField, AuthSubmitButton } from '@/components/auth/AuthShell';

export default function SignUpPage() {
  const { signUp, loading: authLoading, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
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

    // Validate with Zod
    const result = SignUpSchema.safeParse({ email, password, confirmPassword });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password);

    if (error) {
      showAuthError(error);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (authLoading) {
    return <PageLoading />;
  }

  return (
    <AuthShell subtitle="Create your account">
      {success ? (
        <div className="text-center">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Check your email</h2>
          <p className="text-gray-600 mb-6">
            We sent a confirmation link to <strong>{email}</strong>. Click the link to activate your
            account.
          </p>
          <Link href={ROUTES.AUTH.SIGNIN} className="text-action hover:underline">
            Back to Sign In
          </Link>
        </div>
      ) : (
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isRateLimited}
            minLength={PASSWORD_MIN_LENGTH}
            placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
          />

          <AuthField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isRateLimited}
            minLength={PASSWORD_MIN_LENGTH}
            placeholder="Confirm your password"
          />

          <AuthSubmitButton
            loading={loading}
            loadingLabel="Creating account..."
            rateLimitSeconds={rateLimitSeconds}
          >
            Sign Up
          </AuthSubmitButton>
        </form>
      )}

      {!success && (
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href={ROUTES.AUTH.SIGNIN} className="text-action hover:underline">
            Sign in
          </Link>
        </div>
      )}
    </AuthShell>
  );
}
