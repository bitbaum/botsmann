'use client';

import type { FC } from 'react';
import { getBotDemoConfig } from '@/lib/demo/botDemoConfigs';
import { useDemoState } from './useDemoState';
import { DemoProgress } from './DemoProgress';
import { DemoIntake } from './DemoIntake';
import { DemoChat } from './DemoChat';
import { DemoFileUpload } from './DemoFileUpload';
import { DemoContextPanel } from './DemoContextPanel';

interface DemoSectionProps {
  botSlug: string;
  className?: string;
}

/**
 * Main demo container component used by all bots
 * Renders the appropriate demo view based on current step
 */
export const DemoSection: FC<DemoSectionProps> = ({ botSlug, className = '' }) => {
  const config = getBotDemoConfig(botSlug);
  const state = useDemoState(botSlug);

  if (!config) {
    return (
      <div className={`rounded-xl bg-gray-50 p-8 text-center ${className}`}>
        <p className="text-gray-500">Demo configuration not found for bot: {botSlug}</p>
      </div>
    );
  }

  // Get bot display name from config or capitalize slug
  const botName = config.slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className={`${className}`}>
      {/* Progress indicator */}
      <DemoProgress currentStep={state.step} />

      {/* Intake step */}
      {state.step === 'intake' && (
        <div className="rounded-xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
          <DemoIntake
            questions={config.intakeQuestions}
            responses={state.intakeResponses}
            onUpdate={state.updateIntake}
            onStart={state.startChat}
            icon={config.icon}
            botName={botName}
          />
        </div>
      )}

      {/* Chat step */}
      {state.step === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main chat area */}
          <div className="lg:col-span-2 space-y-4">
            <DemoChat
              messages={state.messages}
              onSendMessage={state.sendMessage}
              isLoading={state.isLoading}
              starterQuestions={config.starterQuestions}
              botIcon={config.icon}
              outputConfig={config.outputConfig}
            />
          </div>

          {/* Side panel */}
          <div className="space-y-4">
            {/* Context panel */}
            <DemoContextPanel
              intakeQuestions={config.intakeQuestions}
              intakeResponses={state.intakeResponses}
              files={state.files}
              onReset={state.reset}
            />

            {/* File upload */}
            {config.fileCategories.length > 0 && (
              <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-500"
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
                  Upload Documents
                </h3>
                <DemoFileUpload
                  files={state.files}
                  categories={config.fileCategories}
                  onUpload={state.uploadFiles}
                  onRemove={state.removeFile}
                  isUploading={state.isUploading}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
