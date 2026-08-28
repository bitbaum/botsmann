'use client';

/* eslint-disable @next/next/no-html-link-for-pages */

/**
 * Global Error Boundary
 *
 * Catches errors at the root level, including in the root layout.
 * Must include its own <html> and <body> tags since it replaces the entire page.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Error</h1>

            <p className="text-gray-600 mb-6">
              We encountered a critical error. Our team has been notified.
            </p>

            {process.env.NODE_ENV === 'development' && error.message && (
              <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
                <p className="text-sm font-mono text-gray-700 break-all">{error.message}</p>
                {error.digest && (
                  <p className="text-xs text-gray-500 mt-2">Error ID: {error.digest}</p>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-action text-white font-medium rounded-lg hover:bg-action-hover transition-colors"
              >
                Try again
              </button>
              <a
                href="/"
                className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Return home
              </a>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              If this problem persists, please{' '}
              <a href="/contact" className="text-action hover:underline">
                contact support
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
