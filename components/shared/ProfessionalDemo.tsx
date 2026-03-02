'use client';

import { type FC, useState, useRef, useEffect, useCallback } from 'react';
import { type Professional, getAccentColorClasses } from '@/data/professionals';
import { useAuth } from '@/lib/auth';
import { ModelIndicator } from '@/components/chat/ModelIndicator';
import { ModelSelector } from '@/components/chat/ModelSelector';
import { ChatAuthCTA } from '@/components/chat/ChatAuthCTA';
import { PrivacyTierInfo } from '@/components/chat/PrivacyTierInfo';
import { ACCENT_STARTER_HOVER_CLASSES, ACCENT_FOCUS_BORDER_CLASSES } from '@/lib/config/colors';
import type { ModelProvider } from '@/lib/llm-client';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  provider?: ModelProvider;
  model?: string;
}

interface ProfessionalDemoProps {
  professional: Professional;
}

/**
 * Interactive chat demo for AI Professionals
 * Allows users to try chatting with the professional before signing up
 */
export const ProfessionalDemo: FC<ProfessionalDemoProps> = ({ professional }) => {
  const { user, loading: authLoading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<ModelProvider>('groq');
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const colors = getAccentColorClasses(professional.accentColor);
  const isAuthenticated = !authLoading && !!user;

  const getWelcomeMessage = useCallback(() => {
    return professional.welcomeMessage;
  }, [professional]);

  // Welcome message on mount
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content: getWelcomeMessage(),
    };
    setMessages([welcomeMessage]);
    inputRef.current?.focus({ preventScroll: true });
  }, [getWelcomeMessage]);

  // Scroll to bottom on new messages (within container only, without scrolling the page)
  useEffect(() => {
    if (messagesContainerRef.current) {
      // Use requestAnimationFrame to ensure DOM is updated first
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history (exclude welcome message, only include actual exchanges)
      const conversationHistory = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch('/api/quick-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          systemPrompt: professional.systemPromptBase,
          additionalContext: `Professional: ${professional.name} (${professional.title}). Role: ${professional.role}.`,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const responseData = data.data || data;
      const responseContent =
        responseData.response ||
        responseData.message ||
        "I'm sorry, I couldn't generate a response.";

      // Update current provider from response
      if (responseData.provider && responseData.provider !== 'fallback') {
        setCurrentProvider(responseData.provider as ModelProvider);
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: responseContent,
        provider: responseData.provider as ModelProvider,
        model: responseData.model,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "I'm sorry, I had trouble responding. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus({ preventScroll: true });
    }
  };

  const handleStarterQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus({ preventScroll: true });
  };

  const handleProviderChange = (provider: ModelProvider) => {
    setCurrentProvider(provider);
    // TODO: Persist to user settings via API when implementing model switching
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Chat Header */}
        <div className={`px-6 py-4 bg-gradient-to-r ${colors.bgGradient} text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{professional.emoji}</span>
              <div>
                <h3 className="font-bold">{professional.name}</h3>
                <p className="text-sm opacity-90">{professional.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ModelIndicator provider={currentProvider} compact showTier={false} />
              <button
                type="button"
                onClick={() => setShowPrivacyInfo(!showPrivacyInfo)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Privacy info"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Model Selector (for authenticated users) */}
        {!authLoading && (
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <ModelSelector
              currentProvider={currentProvider}
              onProviderChange={handleProviderChange}
              isAuthenticated={isAuthenticated}
              disabled={isLoading}
            />
          </div>
        )}

        {/* Messages */}
        <div ref={messagesContainerRef} className="h-[300px] overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === 'user' ? `${colors.bg} text-white` : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.role === 'assistant' && (
                  <span className="text-lg mr-2">{professional.emoji}</span>
                )}
                <span className="whitespace-pre-wrap">{message.content}</span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-2">
                <span className="text-lg">{professional.emoji}</span>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Starter Questions */}
        {messages.length <= 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {professional.exampleQuestions.slice(0, 3).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleStarterQuestion(question)}
                  className={`text-sm bg-white border border-gray-200 px-3 py-1.5 rounded-full ${ACCENT_STARTER_HOVER_CLASSES[professional.accentColor] || 'hover:border-blue-300 hover:bg-blue-50'} transition-colors`}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${professional.name}...`}
              disabled={isLoading}
              className={`flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 ${ACCENT_FOCUS_BORDER_CLASSES[professional.accentColor] || 'focus:border-blue-500'} focus:ring-0 transition-colors disabled:opacity-50`}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                input.trim() && !isLoading
                  ? `${colors.bg} text-white ${colors.hover}`
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Auth CTA for guests */}
      {!authLoading && !isAuthenticated && <ChatAuthCTA />}

      {/* Privacy Tier Info (expandable) */}
      {showPrivacyInfo && <PrivacyTierInfo defaultExpanded />}
    </div>
  );
};
