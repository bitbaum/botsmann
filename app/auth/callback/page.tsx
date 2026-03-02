'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClientComponentClient } from '@/lib/supabase';
import { ROUTES } from '@/lib/routes';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

type CallbackStatus = 'loading' | 'success' | 'error';
type CallbackType = 'signup' | 'recovery' | 'email_change' | 'unknown';

/**
 * Auth Callback Content Component
 *
 * This component uses useSearchParams and must be wrapped in Suspense.
 */
function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<CallbackStatus>('loading');
  const [callbackType, setCallbackType] = useState<CallbackType>('unknown');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClientComponentClient();

      // Check for error in URL params (Supabase sometimes passes errors here)
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      if (error) {
        setStatus('error');
        setErrorMessage(errorDescription || error);
        return;
      }

      // Get the type of callback from URL params
      const type = searchParams.get('type');
      if (type === 'signup') {
        setCallbackType('signup');
      } else if (type === 'recovery') {
        setCallbackType('recovery');
      } else if (type === 'email_change') {
        setCallbackType('email_change');
      }

      // The hash fragment contains the tokens
      // Supabase auth-helpers should automatically handle the token exchange
      // when we call getSession after the page loads with the hash
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (session) {
          setStatus('success');

          // Redirect based on callback type after a short delay
          setTimeout(() => {
            if (type === 'recovery') {
              window.location.href = ROUTES.AUTH.RESET_PASSWORD;
            } else {
              window.location.href = ROUTES.SETTINGS;
            }
          }, 2000);
        } else {
          // No session - might be an expired or invalid link
          // Try to exchange the code if present
          const code = searchParams.get('code');
          if (code) {
            const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
            if (exchangeError) {
              throw exchangeError;
            }
            setStatus('success');
            setTimeout(() => {
              window.location.href =
                type === 'recovery' ? ROUTES.AUTH.RESET_PASSWORD : ROUTES.SETTINGS;
            }, 2000);
          } else {
            throw new Error('Invalid or expired link. Please try again.');
          }
        }
      } catch (err) {
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    handleCallback();
  }, [searchParams]);

  const getSuccessMessage = () => {
    switch (callbackType) {
      case 'signup':
        return {
          title: 'Email Verified!',
          description: 'Your email has been verified. You can now access all features.',
        };
      case 'recovery':
        return {
          title: 'Link Verified',
          description: 'Redirecting you to set a new password...',
        };
      case 'email_change':
        return {
          title: 'Email Updated!',
          description: 'Your email address has been successfully updated.',
        };
      default:
        return {
          title: 'Success!',
          description: 'Redirecting you to your account...',
        };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      {status === 'loading' && (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <LoadingSpinner size="lg" className="h-12 w-12" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying...</h2>
          <p className="text-gray-600">Please wait while we verify your link.</p>
        </div>
      )}

      {status === 'success' && (
        <div className="text-center">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{getSuccessMessage().title}</h2>
          <p className="text-gray-600 mb-6">{getSuccessMessage().description}</p>
          <div className="flex justify-center">
            <LoadingSpinner size="md" />
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Failed</h2>
          <p className="text-gray-600 mb-6">
            {errorMessage || 'The link is invalid or has expired. Please try again.'}
          </p>
          <div className="space-y-3">
            <Link
              href={ROUTES.AUTH.SIGNIN}
              className="block w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
            >
              Go to Sign In
            </Link>
            <Link
              href={ROUTES.AUTH.SIGNUP}
              className="block w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
            >
              Create New Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Loading fallback for Suspense boundary
 */
function LoadingFallback() {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <LoadingSpinner size="lg" className="h-12 w-12" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
        <p className="text-gray-600">Please wait...</p>
      </div>
    </div>
  );
}

/**
 * Auth Callback Page
 *
 * Handles redirects from Supabase email links:
 * - Email verification (signup confirmation)
 * - Password reset
 * - Email change confirmation
 *
 * Supabase adds tokens to the URL hash which this page processes.
 */
export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-gray-900">
            Botsmann
          </Link>
        </div>

        <Suspense fallback={<LoadingFallback />}>
          <AuthCallbackContent />
        </Suspense>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
