'use client';

import { useState } from 'react';
import type { Route } from 'next';
import { OnboardingStep } from './OnboardingStep';
import { showSuccess } from '@/lib/toast';
import { useLocalStorageFlag } from '@/lib/hooks/useLocalStorage';

interface OnboardingChecklistProps {
  documentsCount: number;
  readyDocumentsCount: number;
  conversationsCount: number;
  botsCount: number;
  onDismiss?: () => void;
}

interface StepConfig {
  id: string;
  title: string;
  description: string;
  href?: Route;
  isOptional?: boolean;
  checkComplete: (props: OnboardingChecklistProps) => boolean;
}

const ONBOARDING_STEPS: StepConfig[] = [
  {
    id: 'upload_document',
    title: 'Upload your first document',
    description: 'Add a PDF, TXT, or Markdown file to your knowledge base',
    href: '/documents' as Route,
    checkComplete: (props) => props.documentsCount > 0,
  },
  {
    id: 'process_document',
    title: 'Process a document',
    description: 'Extract and index content for AI-powered search',
    href: '/documents' as Route,
    checkComplete: (props) => props.readyDocumentsCount > 0,
  },
  {
    id: 'chat_with_docs',
    title: 'Chat with your documents',
    description: 'Ask questions and get answers from your knowledge base',
    href: '/documents' as Route,
    checkComplete: (props) => props.conversationsCount > 0,
  },
  {
    id: 'create_bot',
    title: 'Create a custom bot',
    description: 'Build your own AI assistant with custom expertise',
    href: '/bots/create' as Route,
    isOptional: true,
    checkComplete: (props) => props.botsCount > 0,
  },
];

export const OnboardingChecklist = ({
  documentsCount,
  readyDocumentsCount,
  conversationsCount,
  botsCount,
  onDismiss,
}: OnboardingChecklistProps) => {
  const [isDismissed, setIsDismissed] = useLocalStorageFlag('onboarding_dismissed', false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Calculate completion
  const steps = ONBOARDING_STEPS.map((step) => ({
    ...step,
    completed: step.checkComplete({
      documentsCount,
      readyDocumentsCount,
      conversationsCount,
      botsCount,
      onDismiss,
    }),
  }));

  const completedCount = steps.filter((s) => s.completed).length;
  const requiredSteps = steps.filter((s) => !s.isOptional);
  const requiredCompleted = requiredSteps.filter((s) => s.completed).length;
  const allRequiredComplete = requiredCompleted === requiredSteps.length;
  const progress = Math.round((completedCount / steps.length) * 100);

  const handleDismiss = () => {
    setIsDismissed(true);
    showSuccess('Onboarding dismissed', 'You can always find help in Settings.');
    onDismiss?.();
  };

  // Don't render if dismissed
  if (isDismissed) {
    return null;
  }

  // Show congratulations if all required steps are complete
  if (allRequiredComplete && !isMinimized) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900">You&apos;re all set!</h3>
              <p className="text-green-700 text-sm">
                You&apos;ve completed the essential steps. Keep exploring to unlock more features.
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-green-500 hover:text-green-700 p-1"
            title="Dismiss"
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
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 cursor-pointer"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Getting Started</h3>
            <p className="text-sm text-gray-600">
              {completedCount} of {steps.length} steps completed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress Bar */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>

          {/* Collapse/Expand */}
          <button
            className="text-gray-400 hover:text-gray-600 p-1"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
          >
            <svg
              className={`w-5 h-5 transition-transform ${isMinimized ? '' : 'rotate-180'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>

          {/* Dismiss */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            className="text-gray-400 hover:text-gray-600 p-1"
            title="Dismiss checklist"
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
      </div>

      {/* Steps */}
      {!isMinimized && (
        <div className="p-4 space-y-3">
          {steps.map((step, index) => (
            <OnboardingStep
              key={step.id}
              id={step.id}
              title={step.title}
              description={step.description}
              completed={step.completed}
              href={step.href}
              stepNumber={index + 1}
              isOptional={step.isOptional}
            />
          ))}
        </div>
      )}
    </div>
  );
};
