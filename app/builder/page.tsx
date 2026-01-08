'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface BotRequirement {
  domain: string;
  useCase: string;
  dataTypes: string[];
  complexity: 'simple' | 'moderate' | 'complex';
  timeline: 'asap' | '1-2weeks' | '1month' | 'flexible';
  budget: 'under-5k' | '5k-15k' | '15k-50k' | '50k-plus';
  contactInfo: {
    name: string;
    email: string;
    company?: string;
  };
}

export default function BotBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [requirements, setRequirements] = useState<Partial<BotRequirement>>({
    contactInfo: {
      name: '',
      email: '',
      company: ''
    }
  });

  const updateRequirements = (updates: Partial<BotRequirement>) => {
    setRequirements(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would send the requirements to your backend
    // For now, just show a success message
    alert('Thank you! We\'ll review your requirements and get back to you within 24 hours.');
  };

  const steps = [
    { number: 1, title: 'Domain & Use Case', description: 'Tell us about your field' },
    { number: 2, title: 'Technical Details', description: 'Data types and complexity' },
    { number: 3, title: 'Timeline & Budget', description: 'Project scope and investment' },
    { number: 4, title: 'Contact Info', description: 'How we can reach you' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-2xl border-b border-gray-100/50 shadow-sm">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex h-16 items-center justify-between px-6">
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-openai-green to-green-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-openai-green to-green-600 text-white font-bold text-xl px-4 py-2 rounded-lg shadow-lg">
                  B
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Botsmann
              </span>
            </Link>
            <Link
              href="/bots"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-openai-green transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Bots
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-20">
        {/* Progress Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Build Your Custom AI Bot</h1>
          <p className="text-xl text-gray-600 mb-8">
            Tell us about your domain and needs, and we'll create a specialized AI assistant just for you.
          </p>

          {/* Progress Steps */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className={`flex items-center space-x-2 ${currentStep >= step.number ? 'text-openai-green' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step.number ? 'bg-openai-green text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.number}
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 ${currentStep > step.number ? 'bg-openai-green' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {currentStep === 1 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Domain & Use Case</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What domain/field do you work in?
                  </label>
                  <select
                    value={requirements.domain || ''}
                    onChange={(e) => updateRequirements({ domain: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-openai-green focus:border-transparent"
                  >
                    <option value="">Select your domain...</option>
                    <option value="healthcare">Healthcare & Medical</option>
                    <option value="legal">Legal & Compliance</option>
                    <option value="finance">Finance & Banking</option>
                    <option value="education">Education & Training</option>
                    <option value="research">Research & Academia</option>
                    <option value="creative">Creative & Design</option>
                    <option value="engineering">Engineering & Tech</option>
                    <option value="business">Business & Operations</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your specific use case
                  </label>
                  <textarea
                    value={requirements.useCase || ''}
                    onChange={(e) => updateRequirements({ useCase: e.target.value })}
                    rows={4}
                    placeholder="e.g., I need an AI assistant to help doctors analyze patient symptoms and suggest diagnoses..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-openai-green focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What types of data will your bot work with?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Text documents',
                      'PDF files',
                      'Images',
                      'Audio/Video',
                      'Databases',
                      'APIs',
                      'Spreadsheets',
                      'Email data'
                    ].map((dataType) => (
                      <label key={dataType} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={requirements.dataTypes?.includes(dataType) || false}
                          onChange={(e) => {
                            const current = requirements.dataTypes || [];
                            if (e.target.checked) {
                              updateRequirements({ dataTypes: [...current, dataType] });
                            } else {
                              updateRequirements({ dataTypes: current.filter(d => d !== dataType) });
                            }
                          }}
                          className="rounded border-gray-300 text-openai-green focus:ring-openai-green"
                        />
                        <span className="text-sm text-gray-700">{dataType}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How complex should this bot be?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'simple', label: 'Simple', desc: 'Basic automation' },
                      { value: 'moderate', label: 'Moderate', desc: 'Some AI features' },
                      { value: 'complex', label: 'Complex', desc: 'Advanced AI & integration' }
                    ].map((option) => (
                      <label key={option.value} className="relative">
                        <input
                          type="radio"
                          name="complexity"
                          value={option.value}
                          checked={requirements.complexity === option.value}
                          onChange={(e) => updateRequirements({ complexity: e.target.value as any })}
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          requirements.complexity === option.value
                            ? 'border-openai-green bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Timeline & Budget</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What's your preferred timeline?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'asap', label: 'ASAP', desc: 'Rush project' },
                      { value: '1-2weeks', label: '1-2 Weeks', desc: 'Standard delivery' },
                      { value: '1month', label: '1 Month', desc: 'Detailed development' },
                      { value: 'flexible', label: 'Flexible', desc: 'No rush' }
                    ].map((option) => (
                      <label key={option.value} className="relative">
                        <input
                          type="radio"
                          name="timeline"
                          value={option.value}
                          checked={requirements.timeline === option.value}
                          onChange={(e) => updateRequirements({ timeline: e.target.value as any })}
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          requirements.timeline === option.value
                            ? 'border-openai-green bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What's your budget range?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'under-5k', label: 'Under $5K', desc: 'Simple bot' },
                      { value: '5k-15k', label: '$5K - $15K', desc: 'Moderate complexity' },
                      { value: '15k-50k', label: '$15K - $50K', desc: 'Advanced features' },
                      { value: '50k-plus', label: '$50K+', desc: 'Enterprise solution' }
                    ].map((option) => (
                      <label key={option.value} className="relative">
                        <input
                          type="radio"
                          name="budget"
                          value={option.value}
                          checked={requirements.budget === option.value}
                          onChange={(e) => updateRequirements({ budget: e.target.value as any })}
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          requirements.budget === option.value
                            ? 'border-openai-green bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={requirements.contactInfo?.name || ''}
                      onChange={(e) => updateRequirements({
                        contactInfo: {
                          ...requirements.contactInfo,
                          name: e.target.value,
                          email: requirements.contactInfo?.email || ''
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-openai-green focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={requirements.contactInfo?.email || ''}
                      onChange={(e) => updateRequirements({
                        contactInfo: {
                          ...requirements.contactInfo,
                          email: e.target.value,
                          name: requirements.contactInfo?.name || ''
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-openai-green focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={requirements.contactInfo?.company || ''}
                    onChange={(e) => updateRequirements({
                      contactInfo: {
                        ...requirements.contactInfo,
                        company: e.target.value,
                        name: requirements.contactInfo?.name || '',
                        email: requirements.contactInfo?.email || ''
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-openai-green focus:border-transparent"
                  />
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">What happens next?</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• We'll review your requirements within 24 hours</li>
                    <li>• You'll receive a detailed proposal with timeline and pricing</li>
                    <li>• We'll schedule a call to discuss technical details</li>
                    <li>• Project kicks off once we agree on scope and terms</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center px-8 py-6 bg-gray-50 border-t border-gray-100">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:text-openai-green hover:bg-white'
              }`}
            >
              Previous
            </button>

            <div className="flex items-center space-x-2">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`w-2 h-2 rounded-full ${
                    currentStep >= step.number ? 'bg-openai-green' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-openai-green text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-openai-green text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Submit Requirements
              </button>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Questions? <Link href="/contact" className="text-openai-green hover:underline">Contact us directly</Link>
          </p>
          <p className="text-sm text-gray-500">
            All information is kept confidential and used only for your bot development project.
          </p>
        </div>
      </main>
    </div>
  );
}
