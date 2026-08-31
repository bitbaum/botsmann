'use client';

import { type FC, useState, useRef, useEffect, useCallback } from 'react';
import { type BotTemplate } from '@/lib/bot-templates';
import { getAccentColorBgTintClass } from '@/lib/config/colors';

interface CreatedBot {
  template: BotTemplate;
  name: string;
  systemPrompt: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface QuickChatProps {
  bot: CreatedBot;
  onReset: () => void;
}

export const QuickChat: FC<QuickChatProps> = ({ bot, onReset }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getWelcomeMessage = useCallback(() => {
    const { template, name } = bot;

    if (template.category === 'memorial') {
      if (template.id.includes('dog')) {
        return `*tail wagging excitedly* Hi! I'm ${name}! I'm so happy to see you! 🐕`;
      }
      if (template.id.includes('cat')) {
        return `*looks up with knowing eyes* ...Hello. It's ${name}. I suppose I'm glad you're here. *slow blink*`;
      }
      return `Hello, my dear. It's ${name}. I'm here with you now. What would you like to talk about?`;
    }

    if (template.category === 'legends') {
      return `Greetings. I am ${name}. What wisdom do you seek?`;
    }

    if (template.category === 'gods') {
      return `I am ${name}. Speak, mortal, and I shall listen.`;
    }

    if (template.category === 'magical') {
      if (template.id.includes('wizard')) {
        return `*adjusts pointed hat* Ah, a seeker of knowledge. I am ${name}. What mysteries draw you here?`;
      }
      if (template.id.includes('fairy')) {
        return `*sparkles appear* Hello hello! ✨ I'm ${name}! What wish can I help with today?`;
      }
      return `Greetings, traveler. I am ${name}. What brings you to me?`;
    }

    if (template.category === 'helpers') {
      if (template.id.includes('butler')) {
        return `Good day. I am ${name}, at your service. How may I assist you?`;
      }
      if (template.id.includes('chef')) {
        return `Buongiorno! I am ${name}. Are you hungry? Let's talk about food!`;
      }
      return `Hello! I'm ${name}. I'm here to help. What can I do for you?`;
    }

    return `Hello! I'm ${name}. How can I help you today?`;
  }, [bot]);

  // Welcome message on mount
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content: getWelcomeMessage(),
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect -- seeds the on-mount welcome message
    setMessages([welcomeMessage]);
    inputRef.current?.focus({ preventScroll: true });
  }, [getWelcomeMessage]);

  // Scroll to bottom on new messages (within container only, without scrolling the page)
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
      const response = await fetch('/api/quick-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          systemPrompt: bot.systemPrompt,
          additionalContext: `Bot name: ${bot.name}. Template: ${bot.template.name}.`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // API returns { success: true, data: { response: "..." } }
      const responseContent =
        data.data?.response ||
        data.response ||
        data.message ||
        "I'm sorry, I couldn't generate a response.";

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: responseContent,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      // Error already handled by showing user-friendly message below
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

  const accentTint = getAccentColorBgTintClass(bot.template.accentColor);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${accentTint}`}
          >
            {bot.template.emoji}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{bot.name}</h1>
            <p className="text-sm text-gray-500">{bot.template.name}</p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Another
        </button>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Messages */}
        <div ref={messagesContainerRef} className="h-[400px] overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.role === 'assistant' && (
                  <span className="text-lg mr-2">{bot.template.emoji}</span>
                )}
                <span className="whitespace-pre-wrap">{message.content}</span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-2">
                <span className="text-lg">{bot.template.emoji}</span>
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
              {bot.template.starterQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleStarterQuestion(question)}
                  className="text-sm bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:border-purple-300 hover:bg-purple-50 transition-colors"
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
              placeholder={`Message ${bot.name}...`}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                input.trim() && !isLoading
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
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

      {/* Info Footer */}
      <div className="text-center mt-6 text-sm text-gray-500">
        <p>
          This is a preview. In the full version, {bot.name} will remember your conversations and
          learn more about you over time.
        </p>
      </div>
    </div>
  );
};
