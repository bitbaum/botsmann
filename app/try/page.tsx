'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TryDocumentsPanel, type TryDocument } from '@/components/try/TryDocumentsPanel';
import { TryChatPanel } from '@/components/try/TryChatPanel';

export default function TryPage() {
  const [documents, setDocuments] = useState<TryDocument[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Botsmann
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Chat With Your Documents
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Upload any text document and ask questions about it. No account required. Your documents
            stay in your browser - nothing is stored on our servers.
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl max-w-4xl mx-auto">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl max-w-4xl mx-auto">
            {success}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Documents Panel */}
          <div className="lg:col-span-1">
            <TryDocumentsPanel
              documents={documents}
              onDocumentsChange={setDocuments}
              onError={setError}
              onSuccess={setSuccess}
            />
          </div>

          {/* Chat Panel */}
          <div className="lg:col-span-2">
            <TryChatPanel documents={documents} onError={setError} />
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="font-bold text-gray-900 mb-4">How it works</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Upload one or more documents (PDF, TXT, or Markdown)</li>
              <li>Ask questions about the content in natural language</li>
              <li>Get AI-powered answers based on your documents</li>
            </ol>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-sm text-gray-600">
                <strong>Privacy:</strong> Your documents are processed in your browser and sent
                directly to the AI. Nothing is stored on our servers. For persistent storage and
                advanced features,{' '}
                <Link href="/auth/signup" className="text-blue-600 hover:underline">
                  create a free account
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
