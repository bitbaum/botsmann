'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useAuth, useAuthError, useRedirectWhenSignedIn } from '@/lib/auth';
import { ForgotPasswordSchema } from '@/lib/schemas/auth';
import { ROUTES } from '@/lib/routes';
import { PageLoading } from '@/components/shared/LoadingSpinner';
import { AuthShell, AuthAlert, AuthField, AuthSubmitButton } from '@/components/auth/AuthShell';

export default function ForgotPasswordPage() {
  const { resetPassword, loading: authLoading, user } = useAuth();
  const [email, setEmail] = useState('');
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
    setLoading(true);

    // Validate with Zod
    const result = ForgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0].message);
      setLoading(false);
      return;
    }

    const { error } = await resetPassword(email);

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
    <AuthShell subtitle="Reset your password">
      {success ? (
        <div className="text-center">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Check your email</h2>
          <p className="text-gray-600 mb-6">
            We sent a password reset link to <strong>{email}</strong>. Click the link in the email
            to reset your password.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Didn&apos;t receive the email? Check your spam folder or try again.
          </p>
          <Link href={ROUTES.AUTH.SIGNIN} className="text-action hover:underline">
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <p className="text-sm text-gray-600 mb-4">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>

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

          <AuthSubmitButton
            loading={loading}
            loadingLabel="Sending..."
            rateLimitSeconds={rateLimitSeconds}
          >
            Send Reset Link
          </AuthSubmitButton>
        </form>
      )}

      {!success && (
        <div className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{' '}
          <Link href={ROUTES.AUTH.SIGNIN} className="text-action hover:underline">
            Sign in
          </Link>
        </div>
      )}
    </AuthShell>
  );
}
