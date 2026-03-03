'use client';

import { ConversationList } from '@/components/conversations';
import { ChatMessageList } from './ChatMessageList';
import { useDocumentChat } from '@/hooks/useDocumentChat';
import type { Document } from '@/types/document';

interface DocumentChatPanelProps {
  documents: Document[];
  selectedDocId: string | null;
  hasReadyDocuments: boolean;
}

export const DocumentChatPanel = ({
  documents,
  selectedDocId,
  hasReadyDocuments,
}: DocumentChatPanelProps) => {
  const {
    chatMessages,
    chatInput,
    setChatInput,
    chatLoading,
    chatEndRef,
    activeConversationId,
    conversationRefreshTrigger,
    handleChat,
    handleSelectConversation,
    handleNewConversation,
  } = useDocumentChat({ selectedDocId });

  return (
    <>
      {/* Conversation History */}
      <ConversationList
        botType="documents"
        documentId={selectedDocId ?? undefined}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        refreshTrigger={conversationRefreshTrigger}
      />

      {/* Chat Interface */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Chat with Documents</h2>
          {selectedDocId && (
            <span className="text-sm text-blue-600">
              Filtering: {documents.find((d) => d.id === selectedDocId)?.name}
            </span>
          )}
        </div>

        {!hasReadyDocuments ? (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-center">
            <div>
              <svg
                className="w-12 h-12 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <p>Upload and process documents to start chatting</p>
            </div>
          </div>
        ) : (
          <>
            <ChatMessageList
              messages={chatMessages}
              loading={chatLoading}
              selectedDocId={selectedDocId}
              chatEndRef={chatEndRef}
            />

            {/* Chat Input */}
            <form onSubmit={handleChat} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={chatLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};
