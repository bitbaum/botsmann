'use client';

import { useState, type FC, type FormEvent } from 'react';
import type { IntakeQuestion, IntakeResponses } from '@/lib/demo/types';
import type { BotAccentColor } from '@/types/bot';
import {
  ACCENT_BUTTON_CLASSES,
  ACCENT_FOCUS_RING_CLASSES,
  ACCENT_CHECKBOX_CLASSES,
} from '@/lib/config/colors';

interface DemoIntakeProps {
  questions: IntakeQuestion[];
  responses: IntakeResponses;
  onUpdate: (questionId: string, value: string | string[]) => void;
  onStart: () => void;
  accentColor: BotAccentColor;
  icon: string;
  botName: string;
}

export const DemoIntake: FC<DemoIntakeProps> = ({
  questions,
  responses,
  onUpdate,
  onStart,
  accentColor,
  icon,
  botName,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const buttonClass = ACCENT_BUTTON_CLASSES[accentColor];
  const focusClass = ACCENT_FOCUS_RING_CLASSES[accentColor];
  const checkboxClass = ACCENT_CHECKBOX_CLASSES[accentColor];

  const essentialQuestions = questions.filter((q) => q.phase === 'essential');
  const advancedQuestions = questions.filter((q) => q.phase === 'advanced');

  // Check if all required questions are answered
  const requiredQuestions = questions.filter((q) => q.required);
  const allRequiredAnswered = requiredQuestions.every((q) => {
    const value = responses[q.id];
    if (Array.isArray(value)) return value.length > 0;
    return value && value.trim() !== '';
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (allRequiredAnswered) {
      onStart();
    }
  };

  const renderQuestion = (question: IntakeQuestion) => {
    const value = responses[question.id] || '';

    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            id={question.id}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onUpdate(question.id, e.target.value)}
            placeholder={question.placeholder}
            className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 ${focusClass} focus:outline-none focus:ring-1`}
          />
        );

      case 'textarea':
        return (
          <textarea
            id={question.id}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onUpdate(question.id, e.target.value)}
            placeholder={question.placeholder}
            rows={3}
            className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 ${focusClass} focus:outline-none focus:ring-1 resize-none`}
          />
        );

      case 'select':
        return (
          <select
            id={question.id}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onUpdate(question.id, e.target.value)}
            className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 ${focusClass} focus:outline-none focus:ring-1 bg-white`}
          >
            <option value="">Select an option...</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            {question.options?.map((option) => {
              const selectedValues = Array.isArray(value) ? value : [];
              const isChecked = selectedValues.includes(option);

              return (
                <label key={option} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onUpdate(question.id, [...selectedValues, option]);
                      } else {
                        onUpdate(
                          question.id,
                          selectedValues.filter((v) => v !== option),
                        );
                      }
                    }}
                    className={`h-4 w-4 rounded border-gray-300 ${checkboxClass}`}
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 text-5xl">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Let&apos;s get started with {botName}
        </h3>
        <p className="text-gray-600">
          Answer a few questions so I can better understand your needs
        </p>
      </div>

      {/* Essential Questions */}
      <div className="space-y-6">
        {essentialQuestions.map((question) => (
          <div key={question.id}>
            <label htmlFor={question.id} className="block text-sm font-medium text-gray-700 mb-2">
              {question.question}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderQuestion(question)}
          </div>
        ))}
      </div>

      {/* Advanced Questions Toggle */}
      {advancedQuestions.length > 0 && (
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            {showAdvanced ? 'Hide' : 'Show'} additional options ({advancedQuestions.length})
          </button>

          {showAdvanced && (
            <div className="mt-6 space-y-6 border-t border-gray-200 pt-6">
              {advancedQuestions.map((question) => (
                <div key={question.id}>
                  <label
                    htmlFor={question.id}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {question.question}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderQuestion(question)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-8 space-y-3">
        <button
          type="submit"
          disabled={!allRequiredAnswered}
          className={`w-full rounded-lg px-6 py-3 text-white font-medium transition-colors ${buttonClass} disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          Start Conversation
        </button>
        <button
          type="button"
          onClick={onStart}
          className="w-full rounded-lg px-6 py-2.5 text-gray-600 font-medium transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 text-sm"
        >
          Skip and chat directly →
        </button>
        <p className="text-center text-xs text-gray-500">
          You can upload documents and continue the conversation in the next step
        </p>
      </div>
    </form>
  );
};
