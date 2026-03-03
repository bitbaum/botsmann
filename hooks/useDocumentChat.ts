import { useState, useEffect, useRef, useCallback, type FormEvent } from 'react';
import { conversationToasts } from '@/lib/toast';
import type { Conversation, ConversationMessage, MessageSource } from '@/types/conversation';

export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: MessageSource[];
}

interface UseDocumentChatOptions {
  selectedDocId: string | null;
}

export const useDocumentChat = ({ selectedDocId }: UseDocumentChatOptions) => {
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

  return {
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
  };
};
