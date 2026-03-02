'use client';

import { useState, useRef, useEffect, type FC, type FormEvent, type KeyboardEvent } from 'react';
import type { ChatMessage, DemoOutputConfig } from '@/lib/demo/types';
import type { BotAccentColor } from '@/types/bot';
import {
  ACCENT_BUTTON_CLASSES,
  ACCENT_FOCUS_RING_CLASSES,
  ACCENT_STARTER_CLASSES,
} from '@/lib/config/colors';
import { DemoMessage, DemoDisclaimer } from './DemoMessage';

interface DemoChatProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  starterQuestions: string[];
  botIcon: string;
  accentColor: BotAccentColor;
  outputConfig: DemoOutputConfig;
}

// Typing indicator with animated dots
const TypingIndicator: FC<{ botIcon: string }> = ({ botIcon }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
      {botIcon}
    </div>
    <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  </div>
);

export const DemoChat: FC<DemoChatProps> = ({
  messages,
  onSendMessage,
  isLoading,
  starterQuestions,
  botIcon,
  accentColor,
  outputConfig,
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const buttonClass = ACCENT_BUTTON_CLASSES[accentColor];
  const focusClass = ACCENT_FOCUS_RING_CLASSES[accentColor];
  const starterClass = ACCENT_STARTER_CLASSES[accentColor];

  // Show starter questions only when there's just the welcome message
  const showStarters = messages.length === 1 && messages[0].role === 'assistant';

  // Auto-scroll to bottom when new messages arrive (within container only)
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesContainerRef.current) {
      requestAnimationFrame(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behavior: 'smooth',
          });
        }
      });
    }
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    await onSendMessage(message);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleStarterClick = async (question: string) => {
    if (isLoading) return;
    await onSendMessage(question);
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Messages area */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <DemoMessage
            key={message.id}
            message={message}
            botIcon={botIcon}
            accentColor={accentColor}
            outputConfig={outputConfig}
          />
        ))}

        {/* Starter questions */}
        {showStarters && starterQuestions.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {starterQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStarterClick(question)}
                  disabled={isLoading}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${starterClass} disabled:opacity-50`}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Typing indicator when loading */}
        {isLoading && <TypingIndicator botIcon={botIcon} />}

        <div ref={messagesEndRef} />
      </div>

      {/* Disclaimer */}
      {outputConfig.showDisclaimer && (
        <div className="px-4 pb-2">
          <DemoDisclaimer config={outputConfig} accentColor={accentColor} />
        </div>
      )}

      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isLoading}
            rows={1}
            className={`flex-1 resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 ${focusClass} focus:outline-none focus:ring-1 disabled:opacity-50`}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${buttonClass} disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            {isLoading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-400 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </form>
    </div>
  );
};
