'use client';

import { useState, type FC } from 'react';
import type { IntakeQuestion, IntakeResponses, UploadedFile } from '@/lib/demo/types';
import type { BotAccentColor } from '@/types/bot';
import { ACCENT_CONTEXT_PANEL_CLASSES } from '@/lib/config/colors';

interface DemoContextPanelProps {
  intakeQuestions: IntakeQuestion[];
  intakeResponses: IntakeResponses;
  files: UploadedFile[];
  onReset: () => void;
  accentColor: BotAccentColor;
}

export const DemoContextPanel: FC<DemoContextPanelProps> = ({
  intakeQuestions,
  intakeResponses,
  files,
  onReset,
  accentColor,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = ACCENT_CONTEXT_PANEL_CLASSES[accentColor];

  // Filter to only show answered questions
  const answeredQuestions = intakeQuestions.filter((q) => {
    const value = intakeResponses[q.id];
    if (Array.isArray(value)) return value.length > 0;
    return value && value.trim() !== '';
  });

  const readyFiles = files.filter((f) => f.status === 'ready');
  const hasContext = answeredQuestions.length > 0 || readyFiles.length > 0;

  if (!hasContext) return null;

  return (
    <div className={`rounded-lg border ${colors.border} ${colors.bg} overflow-hidden`}>
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <svg
            className={`w-4 h-4 ${colors.text}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className={`text-sm font-medium ${colors.text}`}>Your Context</span>
          <span className="text-xs text-gray-500">
            ({answeredQuestions.length} {answeredQuestions.length === 1 ? 'answer' : 'answers'}
            {readyFiles.length > 0 &&
              `, ${readyFiles.length} ${readyFiles.length === 1 ? 'file' : 'files'}`}
            )
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-200">
          {/* Intake responses */}
          {answeredQuestions.length > 0 && (
            <div className="pt-3">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Your Answers
              </p>
              <dl className="space-y-2">
                {answeredQuestions.map((q) => {
                  const value = intakeResponses[q.id];
                  const displayValue = Array.isArray(value) ? value.join(', ') : value;

                  return (
                    <div key={q.id}>
                      <dt className="text-xs text-gray-500">{q.question}</dt>
                      <dd className="text-sm text-gray-900 mt-0.5">{displayValue}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          )}

          {/* Uploaded files */}
          {readyFiles.length > 0 && (
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Uploaded Documents
              </p>
              <ul className="space-y-1">
                {readyFiles.map((file) => (
                  <li key={file.id} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg
                      className="w-4 h-4 text-gray-400"
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
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Reset button */}
          <div className="pt-3 border-t border-gray-200">
            <button
              onClick={onReset}
              className="text-xs text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
