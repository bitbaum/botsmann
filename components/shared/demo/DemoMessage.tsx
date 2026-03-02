'use client';

import type { FC } from 'react';
import type { ChatMessage, DemoOutputConfig } from '@/lib/demo/types';
import type { BotAccentColor } from '@/types/bot';
import { ACCENT_MESSAGE_CLASSES } from '@/lib/config/colors';

interface DemoMessageProps {
  message: ChatMessage;
  botIcon: string;
  accentColor: BotAccentColor;
  outputConfig: DemoOutputConfig;
}

export const DemoMessage: FC<DemoMessageProps> = ({
  message,
  botIcon,
  accentColor,
  outputConfig,
}) => {
  const isUser = message.role === 'user';
  const colors = ACCENT_MESSAGE_CLASSES[accentColor];

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Bot avatar (left side for bot messages) */}
      {!isUser && (
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center text-lg`}
        >
          {botIcon}
        </div>
      )}

      {/* Message content */}
      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-gray-900 text-white rounded-br-md'
              : `${colors.bg} ${colors.border} border rounded-bl-md text-gray-800`
          }`}
        >
          {/* Streaming indicator */}
          {message.isStreaming ? (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
              <span className="text-sm text-gray-500">Thinking...</span>
            </div>
          ) : (
            <>
              {/* Message text */}
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>

              {/* Sources (for bot messages) */}
              {!isUser &&
                outputConfig.showSources &&
                message.sources &&
                message.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs font-medium text-gray-500 mb-2">Sources:</p>
                    <ul className="space-y-1">
                      {message.sources.map((source, idx) => (
                        <li key={idx} className="text-xs text-gray-600">
                          <span className="font-medium">{source.title}</span>
                          {source.relevance && (
                            <span className="ml-2 text-gray-400">
                              ({Math.round(source.relevance * 100)}% relevant)
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </>
          )}
        </div>

        {/* Timestamp */}
        <p className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {/* User avatar (right side for user messages) */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm font-medium">
          U
        </div>
      )}
    </div>
  );
};

// Disclaimer component shown at bottom of chat
interface DemoDisclaimerProps {
  config: DemoOutputConfig;
  accentColor: BotAccentColor;
}

export const DemoDisclaimer: FC<DemoDisclaimerProps> = ({ config, accentColor }) => {
  if (!config.showDisclaimer || !config.disclaimerText) return null;

  const colors = ACCENT_MESSAGE_CLASSES[accentColor];

  return (
    <div className={`${colors.bg} ${colors.border} border rounded-lg p-3 text-xs text-gray-600`}>
      <div className="flex items-start gap-2">
        <svg
          className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p>{config.disclaimerText}</p>
      </div>
    </div>
  );
};
