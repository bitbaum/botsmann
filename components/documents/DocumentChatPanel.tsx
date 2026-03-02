'use client';

import { useState, useEffect, useRef, useCallback, type FormEvent } from 'react';
import { conversationToasts } from '@/lib/toast';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ConversationList } from '@/components/conversations';
import type { Document } from '@/types/document';
import type { Conversation, ConversationMessage, MessageSource } from '@/types/conversation';

interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: MessageSource[];
}

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
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [conversationRefreshTrigger, setConversationRefreshTrigger] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Load conversation messages when active conversation changes
  useEffect(() => {
    if (!activeConversationId) {
      setChatMessages([]);
      return;
    }

    const loadConversation = async () => {
      try {
        const response = await fetch(`/api/conversations/${activeConversationId}`);
        const data = await response.json();

        if (data.success && data.data?.conversation) {
          const conversation: Conversation & { messages: ConversationMessage[] } =
            data.data.conversation;
          setChatMessages(
            conversation.messages.map((msg) => ({
              id: msg.id,
              role: msg.role,
              content: msg.content,
              sources: msg.sources ?? undefined,
            })),
          );
        }
      } catch {
        conversationToasts.loadError();
      }
    };

    loadConversation();
  }, [activeConversationId]);

  const createNewConversation = useCallback(async (): Promise<string | null> => {
    try {
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bot_type: 'documents',
          document_id: selectedDocId,
        }),
      });

      const data = await response.json();
      if (data.success && data.data?.conversation) {
        setConversationRefreshTrigger((prev) => prev + 1);
        return data.data.conversation.id;
      }
    } catch {
      conversationToasts.createError();
    }
    return null;
  }, [selectedDocId]);

  const saveMessageToConversation = async (conversationId: string, message: ChatMessage) => {
    try {
      await fetch(`/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: message.role,
          content: message.content,
          sources: message.sources,
        }),
      });
    } catch {
      // Failed to persist message - non-critical
    }
  };

  const handleChat = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const message = chatInput.trim();
    setChatInput('');

    // Create new conversation if needed
    let convId = activeConversationId;
    if (!convId) {
      convId = await createNewConversation();
      if (convId) {
        setActiveConversationId(convId);
      }
    }

    const userMessage: ChatMessage = { role: 'user', content: message };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatLoading(true);

    // Save user message to conversation
    if (convId) {
      await saveMessageToConversation(convId, userMessage);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          documentId: selectedDocId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: data.response,
          sources: data.sources,
        };
        setChatMessages((prev) => [...prev, assistantMessage]);

        // Save assistant message to conversation
        if (convId) {
          await saveMessageToConversation(convId, assistantMessage);
          setConversationRefreshTrigger((prev) => prev + 1);
        }
      } else {
        setChatMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `Error: ${data.error}` },
        ]);
      }
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Failed to get response. Please try again.' },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleSelectConversation = (id: string | null) => {
    setActiveConversationId(id);
    if (!id) {
      setChatMessages([]);
    }
  };

  const handleNewConversation = () => {
    setActiveConversationId(null);
    setChatMessages([]);
  };

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
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-[300px] max-h-[400px]">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>Ask a question about your documents</p>
                  <p className="text-sm mt-1">
                    {selectedDocId
                      ? 'Searching in selected document only'
                      : 'Searching across all your documents'}
                  </p>
                </div>
              ) : (
                chatMessages.map((msg, i) => (
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
                            {source.preview && (
                              <span className="text-gray-400"> - {source.preview}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
              {chatLoading && (
                <div className="bg-gray-100 p-4 rounded-lg mr-8">
                  <div className="flex items-center gap-2 text-gray-500">
                    <LoadingSpinner size="sm" className="border-gray-600" />
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

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
