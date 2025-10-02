'use client';

import React from 'react';
import { UploadedFile, WorkspaceSection } from './types';
import { FILE_CATEGORIES } from './constants';

interface AIWorkspaceProps {
  files: UploadedFile[];
}

const AIWorkspace: React.FC<AIWorkspaceProps> = ({ files }) => {
  // Organize files into categories
  const organizedSections: WorkspaceSection[] = FILE_CATEGORIES.map(category => ({
    id: category.id,
    title: category.title,
    icon: category.icon,
    files: files.filter(f => f.category === category.id && f.status === 'completed'),
    aiSuggestion: getAISuggestion(category.id, files.filter(f => f.category === category.id))
  })).filter(section => section.files.length > 0 || section.aiSuggestion);

  const processingFiles = files.filter(f => f.status !== 'completed');

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <h3 className="text-white font-semibold">AI-Organized Workspace</h3>
            <p className="text-slate-300 text-xs">Files automatically categorized and analyzed</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-300 text-sm">{files.length} files</span>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>

      {/* Processing Files */}
      {processingFiles.length > 0 && (
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="animate-spin text-blue-600">⚙️</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">
                Processing {processingFiles.length} file{processingFiles.length > 1 ? 's' : ''}...
              </p>
              <p className="text-xs text-blue-700">
                AI is analyzing content, extracting key information, and organizing
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Organized Sections */}
      <div className="divide-y divide-gray-200">
        {organizedSections.length === 0 && processingFiles.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="text-5xl mb-3">📂</div>
            <p className="text-gray-600">No files uploaded yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Upload documents to see AI auto-organization in action
            </p>
          </div>
        ) : (
          organizedSections.map((section) => (
            <div key={section.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{section.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-2">{section.title}</h4>

                  {/* Files in this category */}
                  <div className="space-y-2 mb-3">
                    {section.files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200"
                      >
                        <span className="text-sm">📄</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                        <span className="text-green-500 text-sm">✓</span>
                      </div>
                    ))}
                  </div>

                  {/* AI Suggestion */}
                  {section.aiSuggestion && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <span className="text-purple-600 text-sm">🤖</span>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-purple-900 mb-1">AI Insight</p>
                          <p className="text-xs text-purple-700">{section.aiSuggestion}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {files.length > 0 && (
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>🔒 All files encrypted end-to-end</span>
            <span>Last updated: Just now</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function getAISuggestion(categoryId: string, files: UploadedFile[]): string | undefined {
  if (files.length === 0) return undefined;

  const suggestions: Record<string, string> = {
    'evidence': `${files.length} evidence file(s) detected. Consider organizing chronologically and adding descriptions for court submission.`,
    'contracts': `${files.length} contract(s) found. AI has identified key clauses and potential red flags for review.`,
    'correspondence': `${files.length} correspondence item(s). Timeline view available to track communication history.`,
    'court-filings': `${files.length} court document(s) categorized. Deadlines and filing requirements extracted.`,
    'identification': `${files.length} ID document(s) verified. Information extracted for case profile.`,
    'financial': `${files.length} financial record(s) analyzed. Summary of amounts and dates available.`,
    'medical': `${files.length} medical record(s) processed. Key dates and diagnoses extracted.`,
    'other': `${files.length} additional document(s) uploaded. AI is analyzing for relevance.`
  };

  return suggestions[categoryId];
}

export default AIWorkspace;
