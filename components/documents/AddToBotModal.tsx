'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { documentToasts } from '@/lib/toast';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

interface Bot {
  id: string;
  title: string;
  emoji: string;
  slug: string;
  knowledge_count?: number;
}

interface AddToBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
  documentName: string;
}

export const AddToBotModal = ({
  isOpen,
  onClose,
  documentId,
  documentName,
}: AddToBotModalProps) => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load user's bots
  useEffect(() => {
    if (!isOpen) return;

    const loadBots = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/custom-bots');
        const data = await response.json();

        if (data.success) {
          setBots(data.data?.bots || []);
        } else {
          setError('Failed to load bots');
        }
      } catch {
        setError('Failed to load bots');
      } finally {
        setLoading(false);
      }
    };

    loadBots();
  }, [isOpen]);

  const handleImport = async (botId: string) => {
    setImporting(botId);
    setError(null);

    try {
      const response = await fetch(`/api/custom-bots/${botId}/import-document`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document_id: documentId }),
      });

      const data = await response.json();

      if (data.success) {
        documentToasts.addToBotSuccess(data.data.bot_title, data.data.imported_chunks);
        onClose();
      } else {
        setError(data.error || 'Failed to import document');
      }
    } catch {
      setError('Failed to import document');
    } finally {
      setImporting(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Add to Bot</h2>
            <p className="text-sm text-gray-500 mt-0.5 truncate max-w-[280px]">{documentName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 max-h-80 overflow-y-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : bots.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl mb-3 block">🤖</span>
              <p className="text-gray-600 mb-4">No bots yet</p>
              <Link
                href="/bots/create"
                className="inline-flex items-center px-4 py-2 bg-action text-white rounded-lg font-medium hover:bg-action-hover transition-colors text-sm"
              >
                Create your first bot
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-3">
                Select a bot to import this document&apos;s knowledge:
              </p>
              {bots.map((bot) => (
                <button
                  key={bot.id}
                  onClick={() => handleImport(bot.id)}
                  disabled={importing !== null}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
                    importing === bot.id
                      ? 'bg-action-tint border-edge'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  <span className="text-2xl flex-shrink-0">{bot.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{bot.title}</p>
                    <p className="text-xs text-gray-500">
                      {bot.knowledge_count || 0} knowledge chunks • /{bot.slug}
                    </p>
                  </div>
                  {importing === bot.id ? (
                    <div className="w-5 h-5 border-2 border-edge border-t-transparent rounded-full animate-spin flex-shrink-0" />
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <Link href="/bots/create" className="text-sm text-action hover:text-action font-medium">
            + Create new bot
          </Link>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
