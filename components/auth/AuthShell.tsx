import Link from 'next/link';
import { type FC, type ReactNode } from 'react';

/**
 * The page frame every auth screen shares: the brand, an optional line under
 * it, the card, and the way back home.
 */
export const AuthShell: FC<{ subtitle?: string; children: ReactNode }> = ({
  subtitle,
  children,
}) => (
  <div className="min-h-screen bg-gradient-to-b from-action-tint to-white flex items-center justify-center px-4">
    <div className="max-w-md w-full">
      <div className="text-center mb-8">
        <Link href="/" className="text-3xl font-bold text-gray-900">
          Botsmann
        </Link>
        {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">{children}</div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          Back to Home
        </Link>
      </div>
    </div>
  </div>
);
