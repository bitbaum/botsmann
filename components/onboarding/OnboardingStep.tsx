'use client';

import Link from 'next/link';
import type { Route } from 'next';

interface OnboardingStepProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  href?: Route;
  stepNumber: number;
  isOptional?: boolean;
  onComplete?: () => void;
}

export const OnboardingStep = ({
  title,
  description,
  completed,
  href,
  stepNumber,
  isOptional,
  onComplete,
}: OnboardingStepProps) => {
  const content = (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
        completed
          ? 'bg-green-50 border border-green-200'
          : href
            ? 'bg-gray-50 hover:bg-gray-100 border border-gray-200 cursor-pointer'
            : 'bg-gray-50 border border-gray-200'
      }`}
    >
      {/* Step Number / Checkmark */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          completed ? 'bg-green-500 text-white' : 'bg-action-tint text-action'
        }`}
      >
        {completed ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          stepNumber
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className={`font-medium ${completed ? 'text-green-800' : 'text-gray-900'}`}>
            {title}
          </h4>
          {isOptional && (
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Optional</span>
          )}
        </div>
        <p className={`text-sm mt-0.5 ${completed ? 'text-green-600' : 'text-gray-500'}`}>
          {description}
        </p>
      </div>

      {/* Action */}
      {!completed && (
        <div className="flex-shrink-0">
          {href ? (
            <span className="text-action text-sm font-medium">Go &rarr;</span>
          ) : onComplete ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onComplete();
              }}
              className="text-action text-sm font-medium hover:text-action"
            >
              Mark done
            </button>
          ) : null}
        </div>
      )}
    </div>
  );

  if (href && !completed) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};
