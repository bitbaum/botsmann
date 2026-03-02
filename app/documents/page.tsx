'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { PageLoading } from '@/components/shared/LoadingSpinner';
import {
  AddToBotModal,
  DocumentUploadButton,
  DocumentListPanel,
  DocumentChatPanel,
} from '@/components/documents';
import type { Document } from '@/types/document';
import { DOCUMENT_STATUS } from '@/lib/constants';

export default function DocumentsPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  // Add to Bot modal state
  const [addToBotModalOpen, setAddToBotModalOpen] = useState(false);
  const [addToBotDocument, setAddToBotDocument] = useState<{ id: string; name: string } | null>(
    null,
  );

  // Load documents
  useEffect(() => {
    if (!user) return;

    const loadDocuments = async () => {
      try {
        const response = await fetch('/api/documents');
        const data = await response.json();
        if (data.success) {
          setDocuments(data.documents);
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

  const handleOpenAddToBot = (doc: Document) => {
    setAddToBotDocument({ id: doc.id, name: doc.name });
    setAddToBotModalOpen(true);
  };

  const handleCloseAddToBot = () => {
    setAddToBotModalOpen(false);
    setAddToBotDocument(null);
  };

  if (authLoading) {
    return <PageLoading />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign in required</h1>
          <p className="text-gray-600 mb-6">
            To save and manage your documents, please sign in or create an account.
          </p>
          <div className="space-y-3">
            <Link
              href="/auth/signin"
              className="block w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/try"
              className="block w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Try without signing up
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            The free demo lets you upload documents and chat without creating an account.
          </p>
        </div>
      </div>
    );
  }

  const hasReadyDocuments = documents.some((d) => d.status === DOCUMENT_STATUS.READY);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header with User Controls */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
            <p className="text-gray-600">Upload documents and chat with your knowledge base</p>
          </div>
          <div className="flex items-center gap-4">
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

        <DocumentUploadButton onUploaded={(doc) => setDocuments((prev) => [doc, ...prev])} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column: Document list + Conversations */}
          <div className="space-y-4">
            <DocumentListPanel
              documents={documents}
              loading={loading}
              selectedDocId={selectedDocId}
              onSelectDoc={setSelectedDocId}
              onDocumentsChange={setDocuments}
              onOpenAddToBot={handleOpenAddToBot}
            />
          </div>

          {/* Right column: Conversations + Chat */}
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
          <h3 className="font-semibold text-blue-900 mb-2">How it works</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Upload a document (PDF, TXT, or Markdown)</li>
            <li>Click &quot;Process&quot; to extract and index the content</li>
            <li>
              Ask questions in the chat - the AI will search your documents and provide answers
            </li>
          </ol>
          <p className="mt-4 text-sm text-blue-600">
            Your documents are private and only accessible to you. Processing happens locally using
            free AI models. Your conversations are saved automatically.
          </p>
        </div>
      </div>

      {/* Add to Bot Modal */}
      {addToBotDocument && (
        <AddToBotModal
          isOpen={addToBotModalOpen}
          onClose={handleCloseAddToBot}
          documentId={addToBotDocument.id}
          documentName={addToBotDocument.name}
        />
      )}
    </div>
  );
}
