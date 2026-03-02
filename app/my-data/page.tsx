'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRequireAuth } from '@/lib/auth';
import { PageLoading } from '@/components/shared/LoadingSpinner';
import { DocumentUploadButton, DocumentListPanel, DocumentChatPanel } from '@/components/documents';
import type { Document } from '@/types/document';
import { DOCUMENT_STATUS } from '@/lib/constants';

/**
 * My Data Page
 * Manage uploaded documents and personalizations for AI Professionals
 */
export default function MyDataPage() {
  const { user, loading: authLoading, signOut } = useRequireAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  // Load documents
  useEffect(() => {
    if (!user) return;

    const loadDocuments = async () => {
      try {
        const response = await fetch('/api/documents');
        const data = await response.json();
        if (data.success) {
          setDocuments(data.documents || []);
        }
      } catch {
        // Failed to load documents - showing empty state
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  if (authLoading || !user) {
    return <PageLoading />;
  }

  const hasReadyDocuments = (documents || []).some((d) => d.status === DOCUMENT_STATUS.READY);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header with User Controls */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Data</h1>
            <p className="text-gray-600">
              Manage your documents and personalize your AI Professionals
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/professionals" className="text-sm text-blue-600 hover:text-blue-700">
              AI Professionals
            </Link>
            <Link href="/settings" className="text-sm text-gray-500 hover:text-gray-700">
              Settings
            </Link>
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm text-gray-600">{user.email}</span>
            <button onClick={handleSignOut} className="text-sm text-gray-500 hover:text-red-600">
              Sign Out
            </button>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-green-800">Your data is private</p>
            <p className="text-sm text-green-700">
              Documents are encrypted and only accessible to you. We never use your data to train AI
              models.
            </p>
          </div>
        </div>

        <DocumentUploadButton onUploaded={(doc) => setDocuments((prev) => [doc, ...prev])} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Documents List */}
          <DocumentListPanel
            documents={documents}
            loading={loading}
            selectedDocId={selectedDocId}
            onSelectDoc={setSelectedDocId}
            onDocumentsChange={setDocuments}
          />

          {/* Chat Interface */}
          <div className="space-y-4">
            <DocumentChatPanel
              documents={documents}
              selectedDocId={selectedDocId}
              hasReadyDocuments={hasReadyDocuments}
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-2">
            How to personalize your AI Professionals
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Upload your documents (contracts, medical records, research papers, etc.)</li>
            <li>Click &quot;Process&quot; to extract and index the content securely</li>
            <li>Your AI Professionals will use this knowledge to provide personalized guidance</li>
          </ol>
          <div className="mt-4">
            <Link
              href="/professionals"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              Talk to an AI Professional
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
