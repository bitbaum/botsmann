'use client';

import { useState } from 'react';
import { formatBytes } from '@/lib/format';
import { documentToasts } from '@/lib/toast';
import { InlineLoading } from '@/components/shared/LoadingSpinner';
import { DocumentStatusBadge } from '@/components/shared/DocumentStatusBadge';
import type { Document } from '@/types/document';
import { DOCUMENT_STATUS } from '@/lib/constants';

interface DocumentListPanelProps {
  documents: Document[];
  loading: boolean;
  selectedDocId: string | null;
  onSelectDoc: (id: string | null) => void;
  onDocumentsChange: (updater: (prev: Document[]) => Document[]) => void;
  onOpenAddToBot?: (doc: Document) => void;
}

export const DocumentListPanel = ({
  documents,
  loading,
  selectedDocId,
  onSelectDoc,
  onDocumentsChange,
  onOpenAddToBot,
}: DocumentListPanelProps) => {
  const [processing, setProcessing] = useState<string | null>(null);

  const handleProcess = async (documentId: string) => {
    setProcessing(documentId);

    try {
      const response = await fetch('/api/documents/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId }),
      });

      const data = await response.json();

      if (data.success) {
        onDocumentsChange((prev) =>
          prev.map((doc) => (doc.id === documentId ? data.document : doc)),
        );
        documentToasts.processSuccess(data.chunks_created);
      } else {
        documentToasts.processError(data.error);
        // Reload documents to get error state
        const listResponse = await fetch('/api/documents');
        const listData = await listResponse.json();
        if (listData.success) {
          onDocumentsChange(() => listData.documents);
        }
      }
    } catch {
      documentToasts.processError();
    } finally {
      setProcessing(null);
    }
  };

  const handleDelete = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      const response = await fetch(`/api/documents?id=${documentId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        onDocumentsChange((prev) => prev.filter((doc) => doc.id !== documentId));
        documentToasts.deleteSuccess();
      } else {
        documentToasts.deleteError(data.error);
      }
    } catch {
      documentToasts.deleteError();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>

      {loading ? (
        <InlineLoading />
      ) : documents.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p>No documents yet</p>
          <p className="text-sm mt-1">Upload a PDF, TXT, or MD file to get started</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`p-4 border rounded-lg ${
                selectedDocId === doc.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
                    <DocumentStatusBadge status={doc.status} />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatBytes(doc.size_bytes || 0)}
                    {doc.chunk_count ? ` • ${doc.chunk_count} chunks` : ''}
                  </p>
                  {doc.error_message && (
                    <p className="text-sm text-red-500 mt-1">{doc.error_message}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {doc.status === DOCUMENT_STATUS.PENDING && (
                    <button
                      onClick={() => handleProcess(doc.id)}
                      disabled={processing === doc.id}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
                    >
                      {processing === doc.id ? 'Processing...' : 'Process'}
                    </button>
                  )}
                  {doc.status === DOCUMENT_STATUS.READY && (
                    <>
                      {onOpenAddToBot && (
                        <button
                          onClick={() => onOpenAddToBot(doc)}
                          className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                          title="Add to Bot"
                        >
                          + Bot
                        </button>
                      )}
                      <button
                        onClick={() => onSelectDoc(selectedDocId === doc.id ? null : doc.id)}
                        className={`px-3 py-1 text-sm rounded ${
                          selectedDocId === doc.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {selectedDocId === doc.id ? 'Selected' : 'Select'}
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                    title="Delete"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
