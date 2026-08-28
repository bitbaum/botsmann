'use client';

import { useState, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { ResetPasswordSchema, PASSWORD_MIN_LENGTH } from '@/lib/schemas/auth';
import { ROUTES } from '@/lib/routes';
import { PageLoading } from '@/components/shared/LoadingSpinner';

export default function ResetPasswordPage() {
  const { updatePassword, loading: authLoading, session } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);

  // Check if user has a valid recovery session
  useEffect(() => {
    if (authLoading) return;

    // User should have a session from the email link
    // Supabase handles the token exchange automatically
    if (session) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs a local validity flag to the external Supabase auth session
      setIsValidSession(true);
    } else {
      // Give it a moment for the session to be established
      const timer = setTimeout(() => {
        setIsValidSession(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [session, authLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate with Zod
    const result = ResetPasswordSchema.safeParse({ password, confirmPassword });
    if (!result.success) {
      setError(result.error.errors[0].message);
      setLoading(false);
      return;
    }

    const { error } = await updatePassword(password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  // Loading state
  if (authLoading || isValidSession === null) {
    return <PageLoading />;
  }

  // Invalid or expired link
  if (!isValidSession) {
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
              <div className="text-red-500 text-5xl mb-4">!</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Invalid or Expired Link</h2>
              <p className="text-gray-600 mb-6">
                This password reset link is invalid or has expired. Please request a new one.
              </p>
              <Link
                href={ROUTES.AUTH.FORGOT_PASSWORD}
                className="inline-block px-6 py-3 bg-action text-white rounded-lg font-medium hover:bg-action-hover transition-colors"
              >
                Request New Link
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href={ROUTES.AUTH.SIGNIN} className="text-sm text-gray-500 hover:text-gray-700">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-action-tint to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-gray-900">
            Botsmann
          </Link>
          <p className="text-gray-600 mt-2">Set your new password</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {success ? (
            <div className="text-center">
              <div className="text-green-600 text-5xl mb-4">✓</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Password Updated</h2>
              <p className="text-gray-600 mb-6">
                Your password has been successfully updated. You can now sign in with your new
                password.
              </p>
              <Link
                href={ROUTES.AUTH.SIGNIN}
                className="inline-block px-6 py-3 bg-action text-white rounded-lg font-medium hover:bg-action-hover transition-colors"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={PASSWORD_MIN_LENGTH}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-action"
                  placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={PASSWORD_MIN_LENGTH}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-action"
                  placeholder="Confirm your new password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-action text-white rounded-lg font-medium hover:bg-action-hover disabled:opacity-50 transition-colors"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
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
