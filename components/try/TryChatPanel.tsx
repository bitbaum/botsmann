'use client';

import { useState, useRef, type FormEvent } from 'react';
import type { TryDocument } from './TryDocumentsPanel';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{
    document_name: string;
    preview: string;
  }>;
}

interface TryChatPanelProps {
  documents: TryDocument[];
  onError: (msg: string) => void;
}

export const TryChatPanel = ({ documents, onError }: TryChatPanelProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleChat = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || documents.length === 0) return;

    const message = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);
    onError('');

    try {
      const response = await fetch('/api/demo/document-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          documents: documents.map((doc) => ({
            name: doc.name,
            content: doc.content,
          })),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.data.response,
            sources: data.data.sources,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `Error: ${data.error || 'Something went wrong'}` },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Failed to get response. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-16rem)] min-h-[400px] max-h-[600px] md:max-h-none md:h-[600px]">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <h2 className="text-lg font-bold text-gray-900">Chat</h2>
        <p className="text-sm text-gray-600">Ask questions about your documents</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {documents.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-center">
            <div className="max-w-sm">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Drop your document here</p>
              <p className="text-sm text-gray-500 mb-4">
                Upload a PDF, text file, or markdown document to start chatting with its content.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                <span className="px-2 py-1 bg-gray-100 rounded">Contracts</span>
                <span className="px-2 py-1 bg-gray-100 rounded">Research papers</span>
                <span className="px-2 py-1 bg-gray-100 rounded">Reports</span>
                <span className="px-2 py-1 bg-gray-100 rounded">Legal docs</span>
              </div>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-center">
            <div className="max-w-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-500"
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
              </div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Your documents are ready!</p>
              <p className="text-sm text-gray-500 mb-4">
                Ask any question about your documents. Try one of these:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setInput('What is this document about?')}
                  className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                >
                  What is this document about?
                </button>
                <button
                  onClick={() => setInput('Summarize the key points')}
                  className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                >
                  Summarize the key points
                </button>
                <button
                  onClick={() => setInput('What are the main conclusions?')}
                  className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                >
                  What are the main conclusions?
                </button>
                <button
                  onClick={() => setInput('List any action items or recommendations')}
                  className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                >
                  List action items
                </button>
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200/30">
                    <p className="text-xs opacity-70 mb-1">Sources:</p>
                    {msg.sources.map((source, j) => (
                      <p key={j} className="text-xs opacity-70">
                        {source.document_name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
                <span className="text-sm text-gray-500">Analyzing your documents...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleChat} className="p-4 border-t border-gray-100">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                if (input.trim() && documents.length > 0 && !isLoading) {
                  const syntheticEvent = new Event('submit', {
                    cancelable: true,
                  }) as unknown as FormEvent;
                  Object.defineProperty(syntheticEvent, 'preventDefault', {
                    value: Function.prototype,
                  });
                  handleChat(syntheticEvent);
                }
              }
            }}
            placeholder={
              documents.length === 0
                ? 'Upload a document first...'
                : 'Ask a question about your documents...'
            }
            disabled={isLoading || documents.length === 0}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:bg-gray-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || documents.length === 0}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            title="Send (Cmd+Enter)"
          >
            Send
          </button>
        </div>
        {documents.length > 0 && (
          <p className="text-xs text-gray-400 mt-2 text-right">
            Press{' '}
            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-mono text-[10px]">
              ⌘
            </kbd>{' '}
            +{' '}
            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-mono text-[10px]">
              Enter
            </kbd>{' '}
            to send
          </p>
        )}
      </form>
    </div>
  );
};
