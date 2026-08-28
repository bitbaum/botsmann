'use client';

import { useState, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import { useAuth, isRateLimitError, getRateLimitRetryAfter } from '@/lib/auth';
import { SignInSchema } from '@/lib/schemas/auth';
import { ROUTES } from '@/lib/routes';
import { PageLoading } from '@/components/shared/LoadingSpinner';
import { ClockIcon } from '@/components/icons';

export default function SignInPage() {
  const { signIn, loading: authLoading, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    const result = SignInSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      setLoading(false);
      return;
    }

    const { error } = await signIn(email, password);

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
      window.location.href = ROUTES.SETTINGS;
    }
  };

  if (authLoading) {
    return <PageLoading />;
  }

  const isRateLimited = rateLimitSeconds > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-action-tint to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-gray-900">
            Botsmann
          </Link>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div
                className={`p-3 rounded-lg text-sm ${isRateLimited ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-600'}`}
              >
                {isRateLimited ? (
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 flex-shrink-0" />
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-action disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  href={ROUTES.AUTH.FORGOT_PASSWORD}
                  className="text-sm text-action hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isRateLimited}
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-action disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading || isRateLimited}
              className="w-full py-3 bg-action text-white rounded-lg font-medium hover:bg-action-hover disabled:opacity-50 transition-colors"
            >
              {loading ? 'Signing in...' : isRateLimited ? `Wait ${rateLimitSeconds}s` : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href={ROUTES.AUTH.SIGNUP} className="text-action hover:underline">
              Sign up
            </Link>
          </div>
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
