'use client';

import { type FC } from 'react';
import Link from 'next/link';
import { AUTH_CTA_CONFIG, AUTH_CTA_DISMISSED_KEY } from '@/lib/config/auth-cta';
import { useLocalStorageFlag } from '@/lib/hooks/useLocalStorage';

interface ChatAuthCTAProps {
  /** If true, the CTA is dismissible */
  dismissible?: boolean;
  /** Custom className for styling */
  className?: string;
}

/**
 * Call-to-action banner for guest users to register/sign in.
 * Shows benefits of having an account. Dismissible with localStorage persistence.
 */
export const ChatAuthCTA: FC<ChatAuthCTAProps> = ({ dismissible = true, className = '' }) => {
  const [isDismissed, setIsDismissed] = useLocalStorageFlag(AUTH_CTA_DISMISSED_KEY, true);

  const config = AUTH_CTA_CONFIG.guest;

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={`relative bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 ${className}`}
    >
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">{config.headline}</h3>
          <ul className="space-y-1 mb-3">
            {config.benefits.slice(0, 3).map((benefit, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-green-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            <Link
              href={config.primaryAction.href}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {config.primaryAction.label}
            </Link>
            {config.secondaryAction && (
              <Link
                href={config.secondaryAction.href}
                className="inline-flex items-center px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {config.secondaryAction.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
