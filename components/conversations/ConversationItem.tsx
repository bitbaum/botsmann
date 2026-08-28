'use client';

import { formatDistanceToNow } from 'date-fns';
import type { Conversation } from '@/types/conversation';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ConversationItem = ({
  conversation,
  isActive,
  onSelect,
  onDelete,
}: ConversationItemProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && confirm('Delete this conversation?')) {
      onDelete(conversation.id);
    }
  };

  return (
    <div
      onClick={() => onSelect(conversation.id)}
      className={`p-3 rounded-lg cursor-pointer transition-colors group ${
        isActive
          ? 'bg-action-tint border-edge border'
          : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate text-sm">{conversation.title}</h4>
          <p className="text-xs text-gray-500 mt-1">
            {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
            {conversation.message_count > 0 && (
              <span className="ml-2">
                {conversation.message_count} message{conversation.message_count !== 1 ? 's' : ''}
              </span>
            )}
          </p>
        </div>
        {onDelete && (
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Delete conversation"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
