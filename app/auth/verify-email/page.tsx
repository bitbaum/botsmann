'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth, isRateLimitError, getRateLimitRetryAfter } from '@/lib/auth';
import { ROUTES } from '@/lib/routes';
import { PageLoading } from '@/components/shared/LoadingSpinner';

/**
 * Verify Email Page
 *
 * Shown to users who are logged in but haven't verified their email.
 * Allows them to resend the verification email.
 */
export default function VerifyEmailPage() {
  const { user, loading, isEmailVerified, resendVerificationEmail, signOut } = useAuth();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
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

  // Redirects run in effects (not during render) so the navigation side effects
  // stay out of the render phase.
  useEffect(() => {
    if (!loading && !user) {
      window.location.href = ROUTES.AUTH.SIGNIN;
    }
  }, [loading, user]);

  useEffect(() => {
    if (!loading && user && isEmailVerified) {
      window.location.href = ROUTES.SETTINGS;
    }
  }, [loading, user, isEmailVerified]);

  const isRateLimited = rateLimitSeconds > 0;

  const handleResend = async () => {
    // Don't allow resend while rate limited
    if (isRateLimited) return;

    setSending(true);
    setError('');
    setSent(false);

    const { error } = await resendVerificationEmail();

    if (error) {
      if (isRateLimitError(error)) {
        const retryAfter = getRateLimitRetryAfter(error);
        setRateLimitSeconds(retryAfter);
        setError(`Too many attempts. Please wait ${retryAfter} seconds.`);
      } else {
        setError(error.message);
      }
    } else {
      setSent(true);
    }
    setSending(false);
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = ROUTES.AUTH.SIGNIN;
  };

  // Loading state
  if (loading) {
    return <PageLoading />;
  }

  // Not logged in - the effect above redirects to signin.
  if (!user) {
    return null;
  }

  // Already verified - the effect above redirects to settings.
  if (isEmailVerified) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-action-tint to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-gray-900">
            Botsmann
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="text-center">
            {/* Email Icon */}
            <div className="mx-auto w-16 h-16 bg-action-tint rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-action"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
            <p className="text-gray-600 mb-6">
              We sent a verification link to <strong className="text-gray-900">{user.email}</strong>
              . Please check your inbox and click the link to verify your account.
            </p>

            {/* Success Message */}
            {sent && (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
                <p className="font-medium">Verification email sent!</p>
                <p className="text-sm mt-1">Check your inbox (and spam folder) for the link.</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div
                className={`p-4 rounded-lg mb-6 ${isRateLimited ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-600'}`}
              >
                {isRateLimited ? (
                  <div className="flex items-center justify-center gap-2">
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

            {/* Resend Button */}
            <button
              onClick={handleResend}
              disabled={sending || sent || isRateLimited}
              className="w-full py-3 bg-action text-white rounded-lg font-medium hover:bg-action-hover disabled:opacity-50 transition-colors mb-4"
            >
              {sending
                ? 'Sending...'
                : sent
                  ? 'Email Sent!'
                  : isRateLimited
                    ? `Wait ${rateLimitSeconds}s`
                    : 'Resend Verification Email'}
            </button>

            {/* Help Text */}
            <div className="text-sm text-gray-500 space-y-2">
              <p>Didn&apos;t receive the email?</p>
              <ul className="text-left list-disc list-inside space-y-1">
                <li>Check your spam or junk folder</li>
                <li>
                  Make sure <strong>{user.email}</strong> is correct
                </li>
                <li>Wait a few minutes and try resending</li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6" />

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href={ROUTES.SETTINGS}
              className="block w-full py-2 text-center text-sm text-gray-600 hover:text-action transition-colors"
            >
              Continue without verifying (limited features)
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              Sign out and use a different email
            </button>
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
