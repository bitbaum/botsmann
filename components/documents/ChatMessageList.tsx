'use client';

import type { RefObject } from 'react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import type { ChatMessage } from '@/hooks/useDocumentChat';

interface ChatMessageListProps {
  messages: ChatMessage[];
  loading: boolean;
  selectedDocId: string | null;
  chatEndRef: RefObject<HTMLDivElement>;
}

export const ChatMessageList = ({
  messages,
  loading,
  selectedDocId,
  chatEndRef,
}: ChatMessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-[300px] max-h-[400px]">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>Ask a question about your documents</p>
          <p className="text-sm mt-1">
            {selectedDocId
              ? 'Searching in selected document only'
              : 'Searching across all your documents'}
          </p>
        </div>
      ) : (
        messages.map((msg, i) => (
          <div
            key={msg.id || i}
            className={`p-4 rounded-lg ${
              msg.role === 'user' ? 'bg-blue-100 ml-8' : 'bg-gray-100 mr-8'
            }`}
          >
            <p className="text-gray-900 whitespace-pre-wrap">{msg.content}</p>
            {msg.sources && msg.sources.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Sources:</p>
                {msg.sources.map((source, j) => (
                  <div key={j} className="text-xs text-gray-600 mb-1">
                    <span className="font-medium">{source.document_name}</span>
                    {source.preview && <span className="text-gray-400"> - {source.preview}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
      {loading && (
        <div className="bg-gray-100 p-4 rounded-lg mr-8">
          <div className="flex items-center gap-2 text-gray-500">
            <LoadingSpinner size="sm" className="border-gray-600" />
            Thinking...
          </div>
        </div>
      )}
      <div ref={chatEndRef} />
    </div>
  );
};
