import Link from 'next/link';

/**
 * Not Found Page
 *
 * Displayed when a route doesn't exist (404 errors).
 */
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <span className="text-8xl font-bold text-gray-200">404</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>

        <p className="text-gray-600 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go home
          </Link>
          <Link
            href="/bots"
            className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Explore bots
          </Link>
        </div>
      </div>
    </div>
  );
}
