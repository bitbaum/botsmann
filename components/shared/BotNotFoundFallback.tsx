import { type FC } from 'react';
import Link from 'next/link';

interface BotNotFoundFallbackProps {
  botName?: string;
}

/**
 * Consistent error fallback when bot configuration is not found
 */
export const BotNotFoundFallback: FC<BotNotFoundFallbackProps> = ({ botName = 'Bot' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-8 text-center">
        <div className="text-6xl mb-4">🤖</div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">{botName} Not Found</h1>
        <p className="text-gray-600 mb-6">The bot configuration could not be loaded.</p>
        <Link
          href="/bots"
          className="inline-flex items-center px-4 py-2 bg-action text-white rounded-md hover:bg-action-hover transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to All Bots
        </Link>
      </div>
    </div>
  );
};
