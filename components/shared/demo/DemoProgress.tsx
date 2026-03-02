'use client';

import type { FC } from 'react';
import type { DemoStep } from '@/lib/demo/types';
import type { BotAccentColor } from '@/types/bot';
import { ACCENT_PROGRESS_CLASSES } from '@/lib/config/colors';

interface DemoProgressProps {
  currentStep: DemoStep;
  accentColor: BotAccentColor;
}

const steps: { id: DemoStep; label: string; number: number }[] = [
  { id: 'intake', label: 'Tell us about your needs', number: 1 },
  { id: 'chat', label: 'Chat with your assistant', number: 2 },
];

export const DemoProgress: FC<DemoProgressProps> = ({ currentStep, accentColor }) => {
  const colors = ACCENT_PROGRESS_CLASSES[accentColor];
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-center gap-4 sm:gap-8">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = step.id === currentStep;

          return (
            <li key={step.id} className="flex items-center gap-2 sm:gap-3">
              {/* Step circle */}
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors ${
                  isCompleted
                    ? `${colors.completed} text-white`
                    : isCurrent
                      ? `${colors.active} ${colors.text}`
                      : 'border-gray-300 bg-white text-gray-500'
                }`}
              >
                {isCompleted ? (
                  <svg className="h-4 w-4\" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step.number
                )}
              </span>

              {/* Step label */}
              <span
                className={`text-sm font-medium hidden sm:inline ${
                  isCurrent ? colors.text : isCompleted ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>

              {/* Connector line (not for last item) */}
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-8 sm:w-12 ${
                    isCompleted ? colors.completed.replace('border-', 'bg-') : 'bg-gray-200'
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
