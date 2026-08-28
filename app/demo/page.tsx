'use client';

import { useState, useRef, useEffect, type FC, type FormEvent } from 'react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{ topic: string; question: string; score: number }>;
}

interface ChatResponse {
  success: boolean;
  response: string;
  sources: Array<{ topic: string; question: string; score: number }>;
  llmEnabled?: boolean;
  error?: string;
}

const suggestedQuestions = [
  'What is Botsmann?',
  'What AI assistants do you offer?',
  'How do I get started?',
  'How do you handle privacy?',
  'Tell me about Heidi',
  'What consulting services do you offer?',
];

const DemoPage: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hello! 👋 I'm the Botsmann AI Assistant. I can answer questions about our platform, AI assistants (Heidi, Lex, Imhotep, and more), consulting services, and how to get started. Ask me anything!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [llmEnabled, setLlmEnabled] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/demo/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data: ChatResponse = await response.json();

      // Track if LLM is enabled
      if (data.llmEnabled !== undefined) {
        setLlmEnabled(data.llmEnabled);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.success ? data.response : data.error || 'Sorry, something went wrong.',
        sources: data.sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Sorry, I couldn't connect to the server. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-action-tint to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🤖</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Botsmann AI Assistant</h1>
              <p className="text-sm text-gray-500">RAG Demo • Private AI Knowledge Base</p>
            </div>
          </div>
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Info Banner */}
      <div className="bg-action-tint border-b border-edge">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <p className="text-sm text-action">
            <strong>How it works:</strong> This assistant uses RAG (Retrieval Augmented Generation)
            to search our knowledge base and generate helpful responses.
            {llmEnabled === true && " Powered by Groq's free LLM tier."}
            {llmEnabled === false && ' Running in knowledge-base-only mode.'}
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user' ? 'bg-action text-white' : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Sources:</p>
                      <div className="flex flex-wrap gap-1">
                        {message.sources.map((source, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
                          >
                            {source.topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:100ms]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:200ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-4">
              <p className="text-xs text-gray-500 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(question)}
                    className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Botsmann..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-action focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-action text-white rounded-xl font-medium hover:bg-action-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>

        {/* Technical Details */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🔧 How This Demo Works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">RAG Architecture</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>
                  • <strong>Retrieval:</strong> Keyword-based search finds relevant knowledge
                </li>
                <li>
                  • <strong>Augmentation:</strong> Retrieved context enhances the prompt
                </li>
                <li>
                  • <strong>Generation:</strong> LLM creates a natural response
                </li>
                <li>• 23 knowledge chunks about Botsmann</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Technology Stack</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>
                  • <strong>LLM:</strong> Groq (Llama 3.1) - free tier, no cost
                </li>
                <li>
                  • <strong>Search:</strong> TF-IDF-like keyword scoring
                </li>
                <li>
                  • <strong>Backend:</strong> Next.js API routes
                </li>
                <li>
                  • <strong>Deployment:</strong> Self-hosted (Hetzner + Caddy)
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Want this for your business?</strong> This is a simplified demo. For
              production, we use vector embeddings for semantic search, and can deploy locally on
              your infrastructure for maximum privacy.{' '}
              <Link href="/contact" className="text-action hover:underline">
                Book a consultation →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
