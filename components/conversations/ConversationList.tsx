'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Conversation, ConversationBotType } from '@/types/conversation';
import { ConversationItem } from './ConversationItem';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

interface ConversationListProps {
  botType?: ConversationBotType;
  botId?: string;
  documentId?: string;
  activeConversationId?: string | null;
  onSelectConversation: (id: string | null) => void;
  onNewConversation: () => void;
  refreshTrigger?: number;
}

export const ConversationList = ({
  botType = 'documents',
  botId,
  documentId,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  refreshTrigger = 0,
}: ConversationListProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

  const loadConversations = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      params.set('bot_type', botType);
      if (botId) params.set('bot_id', botId);
      if (documentId) params.set('document_id', documentId);

      const response = await fetch(`/api/conversations?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setConversations(data.data?.conversations ?? []);
      }
    } catch {
      // Failed to load conversations - showing empty state
    } finally {
      setLoading(false);
    }
  }, [botType, botId, documentId]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations, refreshTrigger]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/conversations/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setConversations((prev) => prev.filter((c) => c.id !== id));
        if (activeConversationId === id) {
          onSelectConversation(null);
        }
      }
    } catch {
      // Failed to delete conversation - UI unchanged
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        type="button"
        className="flex items-center justify-between w-full p-3 bg-gray-50 border-b border-gray-200 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Collapse conversations' : 'Expand conversations'}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isExpanded ? 'rotate-90' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <h3 className="text-sm font-medium text-gray-700">Conversations</h3>
          <span className="text-xs text-gray-500">({conversations.length})</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNewConversation();
          }}
          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
          aria-label="New conversation"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </button>

      {isExpanded && (
        <div className="p-2 max-h-64 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-4">
              <LoadingSpinner size="sm" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-sm">
              <p>No conversations yet</p>
              <button
                onClick={onNewConversation}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
              >
                Start a new conversation
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={activeConversationId === conversation.id}
                  onSelect={onSelectConversation}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
