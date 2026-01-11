'use client';

import React, { useState } from 'react';
import { LEGAL_AREAS, MOCK_LAWYERS } from './constants';
import { JURISDICTIONS } from './jurisdictions';
import { CaseContext, UploadedFile } from './types';
import FileUploader from './FileUploader';
import LawyerMatcher from './LawyerMatcher';
import AIWorkspace from './AIWorkspace';
import JurisdictionSelector from './JurisdictionSelector';
import DataRoomDemo from './DataRoomDemo';
import WorkspaceDashboard from './WorkspaceDashboard';

type DemoStep = 'input' | 'lawyer-match' | 'workspace' | 'dataroom';

const DemoSection: React.FC = () => {
  const [step, setStep] = useState<DemoStep>('input');
  const [caseContext, setCaseContext] = useState<CaseContext>({
    jurisdiction: 'US',
    legalArea: 'immigration',
    description: '',
    files: [],
    urgency: 'medium'
  });
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);
  const [showWorkspace, setShowWorkspace] = useState(false);

  const handleFilesUploaded = (newFiles: UploadedFile[]) => {
    setCaseContext(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles.filter(nf => !prev.files.some(pf => pf.id === nf.id))]
    }));
  };

  const handleProceed = () => {
    if (step === 'input') {
      setStep('lawyer-match');
    } else if (step === 'lawyer-match') {
      setStep('workspace');
    } else if (step === 'workspace') {
      // Open workspace dashboard in full screen
      setShowWorkspace(true);
    }
  };

  const handleFileDelete = (fileId: string) => {
    setCaseContext(prev => ({
      ...prev,
      files: prev.files.filter(f => f.id !== fileId)
    }));
  };

  const handleFileVisibilityChange = (fileId: string, visibility: string) => {
    setCaseContext(prev => ({
      ...prev,
      files: prev.files.map(f =>
        f.id === fileId ? { ...f, visibility: visibility as UploadedFile['visibility'] } : f
      )
    }));
  };

  const handleBack = () => {
    if (step === 'dataroom') {
      setStep('workspace');
    } else if (step === 'workspace') {
      setStep('lawyer-match');
    } else if (step === 'lawyer-match') {
      setStep('input');
    }
  };

  const handleReset = () => {
    setStep('input');
    setCaseContext({
      jurisdiction: 'US',
      legalArea: 'immigration',
      description: '',
      files: [],
      urgency: 'medium'
    });
    setSelectedLawyer(null);
  };

  const canProceed = step === 'input'
    ? caseContext.description.trim().length > 20
    : step === 'lawyer-match'
    ? selectedLawyer !== null
    : true;

  return (
    <>
    <section className="mb-20" id="demo">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-full text-sm font-medium mb-6">
          <span className="mr-2">💻</span>
          Interactive Demo
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience Lex in Action</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          See how Lex transforms legal case management with AI-powered matching, intelligent file organization, and collaborative workspaces
        </p>
      </div>

      {/* Progress Steps */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          {[
            { id: 'input', label: 'Case Details', icon: '📝' },
            { id: 'lawyer-match', label: 'Find Lawyer', icon: '👨‍⚖️' },
            { id: 'workspace', label: 'AI Workspace', icon: '🤖' },
            { id: 'dataroom', label: 'Data Room', icon: '💬' }
          ].map((s, idx) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
                    step === s.id
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white scale-110 shadow-lg'
                      : idx < ['input', 'lawyer-match', 'workspace', 'dataroom'].indexOf(step)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {idx < ['input', 'lawyer-match', 'workspace', 'dataroom'].indexOf(step) ? '✓' : s.icon}
                </div>
                <span className="text-xs font-medium text-gray-600 mt-2">{s.label}</span>
              </div>
              {idx < 3 && (
                <div
                  className={`flex-1 h-1 mx-4 rounded ${
                    idx < ['input', 'lawyer-match', 'workspace', 'dataroom'].indexOf(step)
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-6xl mx-auto">
        {/* Step 1: Case Input */}
        {step === 'input' && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border-2 border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Describe Your Legal Case</h3>

            <div className="space-y-6">
              {/* Jurisdiction - Hierarchical Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Jurisdiction
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    (Drill down or skip to select broader region)
                  </span>
                </label>
                <JurisdictionSelector
                  jurisdictions={JURISDICTIONS}
                  selectedCode={caseContext.jurisdiction}
                  onSelect={(code) => setCaseContext({ ...caseContext, jurisdiction: code })}
                />
              </div>

              {/* Legal Area */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Area of Law
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    (🔥 = High demand)
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                  {LEGAL_AREAS.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => setCaseContext({ ...caseContext, legalArea: area.id })}
                      className={`p-3 rounded-lg border-2 transition-all text-left relative active:scale-95 ${
                        caseContext.legalArea === area.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 active:border-blue-400'
                      }`}
                    >
                      {area.demandLevel === 'high' && (
                        <span className="absolute top-1 right-1 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded">
                          🔥
                        </span>
                      )}
                      <div className="text-xl mb-1">{area.icon}</div>
                      <div className="text-sm font-medium text-gray-900">{area.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{area.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Case Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Case Description
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    (Provide context - minimum 20 characters)
                  </span>
                </label>
                <textarea
                  value={caseContext.description}
                  onChange={(e) => setCaseContext({ ...caseContext, description: e.target.value })}
                  placeholder="Describe your legal situation in detail. Include relevant dates, parties involved, and what you're seeking help with..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {caseContext.description.length} / 20 minimum characters
                  </span>
                  {caseContext.description.length >= 20 && (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <span>✓</span> Ready to proceed
                    </span>
                  )}
                </div>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Urgency Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {[
                    { id: 'low', label: 'Low', icon: '🟢', desc: 'No rush' },
                    { id: 'medium', label: 'Medium', icon: '🟡', desc: 'Few weeks' },
                    { id: 'high', label: 'High', icon: '🟠', desc: 'This week' },
                    { id: 'critical', label: 'Critical', icon: '🔴', desc: 'Urgent' }
                  ].map((u) => (
                    <button
                      key={u.id}
                      onClick={() => setCaseContext({ ...caseContext, urgency: u.id as CaseContext['urgency'] })}
                      className={`p-3 rounded-lg border-2 transition-all active:scale-95 ${
                        caseContext.urgency === u.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 active:border-blue-400'
                      }`}
                    >
                      <div className="text-2xl mb-1">{u.icon}</div>
                      <div className="text-sm font-medium text-gray-900">{u.label}</div>
                      <div className="text-xs text-gray-600">{u.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Upload Documents (Optional)
                </label>
                <FileUploader onFilesUploaded={handleFilesUploaded} />
                {caseContext.files.length > 0 && (
                  <div className="mt-3 text-sm text-gray-600">
                    📎 {caseContext.files.length} file(s) uploaded
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Lawyer Matching */}
        {step === 'lawyer-match' && (
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-gray-100">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">📋 Your Case Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-gray-500">Jurisdiction:</span>
                  <span className="font-medium text-gray-900">
                    {caseContext.jurisdiction || 'Not selected'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-500">Area:</span>
                  <span className="font-medium text-gray-900">
                    {LEGAL_AREAS.find(a => a.id === caseContext.legalArea)?.name}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-500">Urgency:</span>
                  <span className="font-medium text-gray-900 capitalize">{caseContext.urgency}</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <span className="text-gray-500 block mb-2">Description:</span>
                  <p className="text-gray-900 text-sm">{caseContext.description}</p>
                </div>
                {caseContext.files.length > 0 && (
                  <div className="pt-3 border-t border-gray-200">
                    <span className="text-gray-500 block mb-2">Files:</span>
                    <span className="text-gray-900">{caseContext.files.length} document(s) attached</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-gray-100">
              <LawyerMatcher
                lawyers={MOCK_LAWYERS}
                selectedLawyer={selectedLawyer}
                onSelectLawyer={setSelectedLawyer}
                legalArea={LEGAL_AREAS.find(a => a.id === caseContext.legalArea)?.name || ''}
              />
            </div>
          </div>
        )}

        {/* Step 3: AI Workspace */}
        {step === 'workspace' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🎉</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Private Data Room Created!
                  </h3>
                  <p className="text-gray-700">
                    Your case has been matched with{' '}
                    <strong>
                      {MOCK_LAWYERS.find(l => l.id === selectedLawyer)?.username}
                    </strong>
                    . All files are encrypted and organized by AI.
                  </p>
                </div>
              </div>
            </div>

            <AIWorkspace files={caseContext.files} />

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🔐</span>
                  <h4 className="font-semibold text-gray-900">Multi-Level Access</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Control who sees what. Set different permissions for attorney, paralegal, expert witnesses.
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">💬</span>
                  <h4 className="font-semibold text-gray-900">Transparent Communication</h4>
                </div>
                <p className="text-sm text-gray-600">
                  All interactions logged. Full transparency between client, attorney, and collaborators.
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🤝</span>
                  <h4 className="font-semibold text-gray-900">Collaborative Workspace</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Work together in real-time. Comment, annotate, and collaborate on documents.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Data Room with Live Chat */}
        {step === 'dataroom' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-500 rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl sm:text-4xl">🚀</div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                    Welcome to Your Private Data Room!
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    Chat with AI and your lawyer in real-time. All conversations are encrypted and logged for transparency.
                  </p>
                </div>
              </div>
            </div>

            <DataRoomDemo
              files={caseContext.files}
              lawyerUsername={MOCK_LAWYERS.find(l => l.id === selectedLawyer)?.username || '@LegalExpert'}
              lawyerAvatar={MOCK_LAWYERS.find(l => l.id === selectedLawyer)?.avatar || '👨‍⚖️'}
            />

            <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🤖</span>
                  <h4 className="font-semibold text-gray-900 text-sm">AI Assistant</h4>
                </div>
                <p className="text-xs text-gray-600">
                  Instant answers, document analysis, and case research 24/7
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">👨‍⚖️</span>
                  <h4 className="font-semibold text-gray-900 text-sm">Human Lawyer</h4>
                </div>
                <p className="text-xs text-gray-600">
                  Expert review, strategy, and representation when needed
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🔒</span>
                  <h4 className="font-semibold text-gray-900 text-sm">Full Transparency</h4>
                </div>
                <p className="text-xs text-gray-600">
                  Every action logged. Share access with family, advisors, or team
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">💡 How the Data Room Works</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">✓</span>
                  <span><strong>Real-time collaboration:</strong> Chat with AI and lawyers instantly, no appointments needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">✓</span>
                  <span><strong>Smart file management:</strong> AI auto-categorizes and analyzes all documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">✓</span>
                  <span><strong>Multi-level access:</strong> Grant different permissions to attorneys, paralegals, and advisors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">✓</span>
                  <span><strong>Full audit trail:</strong> Every message, file upload, and action is logged and encrypted</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Navigation Buttons - Mobile Optimized */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            {step !== 'input' && (
              <button
                onClick={handleBack}
                className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                ← Back
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleReset}
              className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors text-center"
            >
              🔄 Reset Demo
            </button>

            {step !== 'dataroom' && (
              <button
                onClick={handleProceed}
                disabled={!canProceed}
                className="px-6 py-4 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-95"
              >
                {step === 'input' ? '🔍 Find Lawyers' : step === 'lawyer-match' ? '🚀 Create Workspace' : '🚀 Open Workspace Dashboard'} →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>

      {/* Workspace Dashboard - Full Screen Portal */}
      {showWorkspace && selectedLawyer && (
        <WorkspaceDashboard
          files={caseContext.files}
          lawyer={MOCK_LAWYERS.find(l => l.id === selectedLawyer)!}
          caseDescription={caseContext.description}
          onClose={() => setShowWorkspace(false)}
          onFileUpload={handleFilesUploaded}
          onFileDelete={handleFileDelete}
          onFileVisibilityChange={handleFileVisibilityChange}
        />
      )}
    </>
  );
};

export default DemoSection;
