'use client';

import { useState, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import { useAuth, isRateLimitError, getRateLimitRetryAfter } from '@/lib/auth';
import { ForgotPasswordSchema } from '@/lib/schemas/auth';
import { ROUTES } from '@/lib/routes';
import { PageLoading } from '@/components/shared/LoadingSpinner';

export default function ForgotPasswordPage() {
  const { resetPassword, loading: authLoading, user } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);

  // Countdown timer for rate limit
  useEffect(() => {
    if (rateLimitSeconds <= 0) return;

    const timer = setInterval(() => {
      setRateLimitSeconds((prev) => {
        if (prev <= 1) {
          setError('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [rateLimitSeconds]);

  // Redirect if already logged in. Runs in an effect (not during render) so the
  // navigation side effect stays out of the render phase.
  useEffect(() => {
    if (user) {
      window.location.href = ROUTES.SETTINGS;
    }
  }, [user]);

  if (user) {
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Don't allow submit while rate limited
    if (rateLimitSeconds > 0) return;

    setError('');
    setLoading(true);

    // Validate with Zod
    const result = ForgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.errors[0].message);
      setLoading(false);
      return;
    }

    const { error } = await resetPassword(email);

    if (error) {
      if (isRateLimitError(error)) {
        const retryAfter = getRateLimitRetryAfter(error);
        setRateLimitSeconds(retryAfter);
        setError(`Too many attempts. Please wait ${retryAfter} seconds.`);
      } else {
        setError(error.message);
      }
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (authLoading) {
    return <PageLoading />;
  }

  const isRateLimited = rateLimitSeconds > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-gray-900">
            Botsmann
          </Link>
          <p className="text-gray-600 mt-2">Reset your password</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {success ? (
            <div className="text-center">
              <div className="text-green-600 text-5xl mb-4">✓</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Check your email</h2>
              <p className="text-gray-600 mb-6">
                We sent a password reset link to <strong>{email}</strong>. Click the link in the
                email to reset your password.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Didn&apos;t receive the email? Check your spam folder or try again.
              </p>
              <Link href={ROUTES.AUTH.SIGNIN} className="text-blue-600 hover:underline">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-sm text-gray-600 mb-4">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>

              {error && (
                <div
                  className={`p-3 rounded-lg text-sm ${isRateLimited ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-600'}`}
                >
                  {isRateLimited ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Too many attempts. Try again in {rateLimitSeconds}s</span>
                    </div>
                  ) : (
                    error
                  )}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isRateLimited}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="you@example.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading || isRateLimited}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading
                  ? 'Sending...'
                  : isRateLimited
                    ? `Wait ${rateLimitSeconds}s`
                    : 'Send Reset Link'}
              </button>
            </form>
          )}

          {!success && (
            <div className="mt-6 text-center text-sm text-gray-600">
              Remember your password?{' '}
              <Link href={ROUTES.AUTH.SIGNIN} className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
