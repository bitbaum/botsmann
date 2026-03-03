'use client';

import Link from 'next/link';
import { InlineLoading } from '@/components/shared/LoadingSpinner';
import { DocumentStatusBadge } from '@/components/shared/DocumentStatusBadge';
import type { Document } from '@/types/document';
import type { CustomBot } from '@/lib/hooks/useDashboardStats';

interface RecentActivityProps {
  documents: Document[];
  bots: CustomBot[];
  loading: boolean;
}

export function RecentActivity({ documents, bots, loading }: RecentActivityProps) {
  const recentDocuments = documents.slice(0, 3);
  const recentBots = bots.slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Documents */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Documents</h2>
          <Link href="/documents" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all
          </Link>
        </div>

        {loading ? (
          <InlineLoading />
        ) : recentDocuments.length === 0 ? (
          <EmptyState
            icon={
              <svg
                className="w-12 h-12 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            }
            message="No documents yet"
            action={
              <Link
                href="/documents"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Upload your first document
              </Link>
            }
          />
        ) : (
          <div className="space-y-3">
            {recentDocuments.map((doc) => (
              <DocumentRow key={doc.id} document={doc} />
            ))}
          </div>
        )}
      </div>

      {/* Recent Bots */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Your Custom Bots</h2>
          <Link href="/bots/mine" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Manage bots
          </Link>
        </div>

        {loading ? (
          <InlineLoading />
        ) : recentBots.length === 0 ? (
          <EmptyState
            icon={<span className="text-5xl">🤖</span>}
            message="No custom bots yet"
            action={
              <Link
                href="/bots/create"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Create your first bot
              </Link>
            }
          />
        ) : (
          <div className="space-y-3">
            {recentBots.map((bot) => (
              <BotRow key={bot.id} bot={bot} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  message: string;
  action?: React.ReactNode;
}

function EmptyState({ icon, message, action }: EmptyStateProps) {
  return (
    <div className="text-center py-8">
      <div className="mx-auto mb-4">{icon}</div>
      <p className="text-gray-500">{message}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

function DocumentRow({ document }: { document: Document }) {
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <svg
          className="w-5 h-5 text-gray-400 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <div className="min-w-0">
          <p className="font-medium text-gray-900 truncate">{document.name}</p>
          <p className="text-xs text-gray-400">{formatSize(document.size_bytes || 0)}</p>
        </div>
      </div>
      <DocumentStatusBadge status={document.status} />
    </div>
  );
}

function BotRow({ bot }: { bot: CustomBot }) {
  return (
    <Link
      href={`/bots/custom/${bot.slug}`}
      className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl flex-shrink-0">{bot.emoji}</span>
        <div className="min-w-0">
          <p className="font-medium text-gray-900 truncate">{bot.title}</p>
          <p className="text-xs text-gray-400">{bot.knowledge_count} knowledge chunks</p>
        </div>
      </div>
      {bot.is_published ? (
        <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
          Published
        </span>
      ) : (
        <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">Draft</span>
      )}
    </Link>
  );
}
