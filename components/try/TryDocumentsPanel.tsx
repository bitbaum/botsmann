'use client';

import { useRef, useState, type ChangeEvent } from 'react';
import { VALIDATION } from '@/lib/constants';
import { formatBytes } from '@/lib/format';

export interface TryDocument {
  id: string;
  name: string;
  content: string;
  size: number;
}

interface TryDocumentsPanelProps {
  documents: TryDocument[];
  onDocumentsChange: (updater: (prev: TryDocument[]) => TryDocument[]) => void;
  onError: (msg: string) => void;
  onSuccess: (msg: string) => void;
}

export const TryDocumentsPanel = ({
  documents,
  onDocumentsChange,
  onError,
  onSuccess,
}: TryDocumentsPanelProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    onError('');
    onSuccess('');

    const newDocs: TryDocument[] = [];

    for (const file of Array.from(files)) {
      try {
        // Check file type
        const validTypes = ['text/plain', 'text/markdown', 'application/pdf'];
        const validExtensions = ['.txt', '.md', '.pdf'];
        const hasValidExtension = validExtensions.some((ext) =>
          file.name.toLowerCase().endsWith(ext),
        );

        if (!validTypes.includes(file.type) && !hasValidExtension) {
          onError(`Invalid file type: ${file.name}. Please upload TXT, MD, or PDF files.`);
          continue;
        }

        // Check file size
        if (file.size > VALIDATION.DEMO_MAX_FILE_SIZE) {
          onError(`File too large: ${file.name}. Maximum size is 5MB.`);
          continue;
        }

        let content = '';

        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
          const formData = new FormData();
          formData.append('file', file);

          const response = await fetch('/api/demo/parse-pdf', {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();

          if (!data.success) {
            onError(data.error || `Failed to parse PDF: ${file.name}`);
            continue;
          }

          content = data.data.text;
        } else {
          content = await file.text();
        }

        if (content.trim().length === 0) {
          onError(`File is empty: ${file.name}`);
          continue;
        }

        newDocs.push({
          id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          content,
          size: file.size,
        });
      } catch {
        onError(`Failed to read file: ${file.name}`);
      }
    }

    if (newDocs.length > 0) {
      onDocumentsChange((prev) => [...prev, ...newDocs]);
      onSuccess(
        `Uploaded ${newDocs.length} document${newDocs.length > 1 ? 's' : ''}. You can now ask questions!`,
      );
    }

    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveDocument = (id: string) => {
    onDocumentsChange((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Your Documents</h2>

      {/* Upload Area */}
      <div className="mb-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.md,.pdf,text/plain,text/markdown,application/pdf"
          onChange={handleFileUpload}
          multiple
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
            uploading
              ? 'border-blue-300 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
        >
          {uploading ? (
            <div className="flex items-center gap-2 text-blue-600">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Uploading...</span>
            </div>
          ) : (
            <>
              <svg
                className="w-8 h-8 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="text-sm text-gray-600">Drop files or click to upload</span>
              <span className="text-xs text-gray-400 mt-1">PDF, TXT, MD (max 5MB)</span>
            </>
          )}
        </label>
      </div>

      {/* Document List */}
      {documents.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <svg
            className="w-10 h-10 mx-auto mb-2 text-gray-300"
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
          <p className="text-sm">No documents yet</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                <p className="text-xs text-gray-500">{formatBytes(doc.size)}</p>
              </div>
              <button
                onClick={() => handleRemoveDocument(doc.id)}
                className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                title="Remove"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {documents.length > 0 && (
        <p className="text-xs text-gray-500 mt-4 text-center">
          {documents.length} document{documents.length > 1 ? 's' : ''} loaded
        </p>
      )}
    </div>
  );
};
