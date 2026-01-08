'use client';

import React, { useState, useRef } from 'react';
import CaseIntakeForm from './CaseIntakeForm';
import AICaseAnalysis from './AICaseAnalysis';
import { CaseIntake } from '../workspace/types';

type DemoStep = 'intake' | 'ai-analysis' | 'lawyer-match' | 'workspace';

const DemoOrchestrator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<DemoStep>('intake');
  const [caseIntake, setCaseIntake] = useState<CaseIntake | null>(null);
  const demoRef = useRef<HTMLElement>(null);

  const handleIntakeComplete = (intake: CaseIntake) => {
    setCaseIntake(intake);
    setCurrentStep('ai-analysis');
    // Scroll to top of demo using React ref
    demoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnalysisBack = () => {
    setCurrentStep('intake');
    demoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnalysisContinue = () => {
    setCurrentStep('lawyer-match');
    demoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReset = () => {
    setCaseIntake(null);
    setCurrentStep('intake');
    demoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const steps = [
    { id: 'intake', label: 'Case Details', icon: '📝', number: 1 },
    { id: 'ai-analysis', label: 'AI Analysis', icon: '🤖', number: 2 },
    { id: 'lawyer-match', label: 'Find Lawyer', icon: '⚖️', number: 3 },
    { id: 'workspace', label: 'Workspace', icon: '💼', number: 4 }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <section className="mb-20" id="demo" ref={demoRef}>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-full text-sm font-medium mb-6">
          <span className="mr-2">✨</span>
          Try Lex Now - Free Demo
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience Lex in Action</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get AI-powered case analysis, then connect with the perfect lawyer. No signup required.
        </p>
      </div>

      {/* Step Progress Indicator */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="relative">
          {/* Progress Bar Background */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200" />

          {/* Progress Bar Fill */}
          <div
            className="absolute top-6 left-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-500"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          />

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                      isCompleted
                        ? 'bg-green-500 text-white scale-100'
                        : isCurrent
                        ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white scale-110 shadow-lg'
                        : 'bg-gray-200 text-gray-400 scale-100'
                    }`}
                  >
                    {isCompleted ? '✓' : step.icon}
                  </div>

                  {/* Step Label */}
                  <div className="mt-2 text-center">
                    <div className={`text-xs font-semibold ${isCurrent ? 'text-blue-600' : 'text-gray-500'}`}>
                      Step {step.number}
                    </div>
                    <div className={`text-sm font-medium mt-1 ${isCurrent ? 'text-gray-900' : 'text-gray-600'}`}>
                      {step.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-6xl mx-auto">
        {/* Step 1: Case Intake */}
        {currentStep === 'intake' && (
          <div className="animate-fadeIn">
            <CaseIntakeForm
              onSubmit={handleIntakeComplete}
            />
          </div>
        )}

        {/* Step 2: AI Analysis */}
        {currentStep === 'ai-analysis' && caseIntake && (
          <div className="animate-fadeIn">
            <AICaseAnalysis
              intake={caseIntake}
              onBack={handleAnalysisBack}
              onContinue={handleAnalysisContinue}
            />
          </div>
        )}

        {/* Step 3: Lawyer Matching */}
        {currentStep === 'lawyer-match' && caseIntake && (
          <div className="animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Finding Your Perfect Lawyer...</h3>
              <p className="text-gray-600 mb-8">
                This is where the lawyer matching component will go. Based on your AI analysis and case details,
                we'll show you the top 3 best-matched lawyers with clear explanations of why they're a great fit.
              </p>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep('ai-analysis')}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  ← Back to Analysis
                </button>
                <button
                  onClick={() => setCurrentStep('workspace')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-lg transition-all shadow-lg"
                >
                  Continue to Workspace →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Workspace Preview */}
        {currentStep === 'workspace' && caseIntake && (
          <div className="animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Workspace is Ready!</h3>
              <p className="text-gray-600 mb-8">
                This is where the workspace preview will show both client and lawyer perspectives.
                Users can explore how the collaborative data room works from both sides.
              </p>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep('lawyer-match')}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  ← Back to Lawyers
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  🔄 Start New Case
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset Button (always visible) */}
        {currentStep !== 'intake' && (
          <div className="mt-6 text-center">
            <button
              onClick={handleReset}
              className="text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors"
            >
              🔄 Start Over
            </button>
          </div>
        )}
      </div>

      {/* Demo Info Banner */}
      <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="text-2xl">💡</div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">This is a Demo</h4>
            <p className="text-sm text-gray-600">
              This demo shows how Lex works. The AI analysis is simulated, and lawyer matches are examples.
              In production, you'll get real AI-powered legal analysis and connect with actual verified lawyers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoOrchestrator;
