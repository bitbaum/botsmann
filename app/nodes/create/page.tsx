'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NODE_TEMPLATES, BUILT_IN_CAPABILITIES, type NodeTemplate, type NodeCapability } from '@/types/node';

// ============================================
// TYPES
// ============================================

interface NodeFormData {
  template: NodeTemplate | null;
  personality: {
    name: string;
    tagline: string;
    description: string;
    tone: string;
    avatar: string;
    accentColor: string;
    systemPrompt: string;
  };
  capabilities: string[];
  deployment: {
    provider: string;
    modelId: string;
    temperature: number;
  };
  privacy: {
    visibility: string;
    dataRetention: string;
  };
}

const STEPS = [
  { id: 'template', title: 'Choose Template', icon: '🎯' },
  { id: 'personality', title: 'Personality', icon: '✨' },
  { id: 'capabilities', title: 'Capabilities', icon: '⚡' },
  { id: 'deployment', title: 'Deployment', icon: '🚀' },
  { id: 'review', title: 'Review & Launch', icon: '🎉' }
];

const MODELS = [
  { provider: 'openai', id: 'gpt-4o', name: 'GPT-4o', description: 'Most capable OpenAI model' },
  { provider: 'openai', id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: 'Fast and affordable' },
  { provider: 'anthropic', id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', description: 'Excellent for complex tasks' },
  { provider: 'anthropic', id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku', description: 'Fast and efficient' },
  { provider: 'mistral', id: 'mistral-large-latest', name: 'Mistral Large', description: 'Powerful open-weight model' }
];

const AVATARS = ['🤖', '🧠', '💡', '🎯', '🔮', '⚡', '🌟', '🎨', '📚', '🔬', '💼', '🎧', '🐱', '🦊', '🐻', '🦁'];

// ============================================
// MAIN COMPONENT
// ============================================

export default function CreateNodePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdNode, setCreatedNode] = useState<{ slug: string } | null>(null);

  const [formData, setFormData] = useState<NodeFormData>({
    template: null,
    personality: {
      name: '',
      tagline: '',
      description: '',
      tone: 'professional',
      avatar: '🤖',
      accentColor: '#3B82F6',
      systemPrompt: ''
    },
    capabilities: ['chat', 'rag'],
    deployment: {
      provider: 'openai',
      modelId: 'gpt-4o',
      temperature: 0.7
    },
    privacy: {
      visibility: 'private',
      dataRetention: '30d'
    }
  });

  // ============================================
  // HANDLERS
  // ============================================

  const selectTemplate = (template: NodeTemplate) => {
    setFormData(prev => ({
      ...prev,
      template,
      personality: {
        ...prev.personality,
        name: template.id === 'blank' ? '' : template.name,
        tagline: template.description,
        tone: template.personality.tone || 'professional',
        avatar: template.icon,
        systemPrompt: template.personality.systemPrompt || ''
      },
      capabilities: template.capabilities
    }));
    setCurrentStep(1);
  };

  const updatePersonality = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personality: { ...prev.personality, [field]: value }
    }));
  };

  const toggleCapability = (capId: string) => {
    setFormData(prev => ({
      ...prev,
      capabilities: prev.capabilities.includes(capId)
        ? prev.capabilities.filter(c => c !== capId)
        : [...prev.capabilities, capId]
    }));
  };

  const updateDeployment = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      deployment: { ...prev.deployment, [field]: value }
    }));
  };

  const updatePrivacy = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [field]: value }
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/nodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personality: {
            ...formData.personality,
            accentColor: formData.personality.accentColor
          },
          deployment: {
            type: 'managed',
            provider: formData.deployment.provider,
            modelId: formData.deployment.modelId,
            temperature: formData.deployment.temperature,
            maxTokens: 4096
          },
          privacy: {
            visibility: formData.privacy.visibility,
            dataRetention: formData.privacy.dataRetention,
            requireAuth: formData.privacy.visibility === 'private',
            encryptionEnabled: true,
            auditLogging: true
          },
          enabledCapabilities: formData.capabilities
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create node');
      }

      setCreatedNode(result.data.node);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.template !== null;
      case 1: return formData.personality.name.length > 0 && formData.personality.systemPrompt.length > 0;
      case 2: return formData.capabilities.length > 0;
      case 3: return true;
      default: return true;
    }
  };

  // ============================================
  // SUCCESS STATE
  // ============================================

  if (createdNode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
            <div className="text-7xl mb-6">🎉</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Node is Ready!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              <span className="font-semibold text-blue-600">{formData.personality.name}</span> has been created and is ready to deploy.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
              <p className="text-sm text-gray-500 mb-1">Node URL</p>
              <code className="text-blue-600 font-mono">
                botsmann.com/n/{createdNode.slug}
              </code>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/nodes/${createdNode.slug}` as '/nodes/create'}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/nodes/create"
                onClick={() => {
                  setCreatedNode(null);
                  setCurrentStep(0);
                  setFormData({
                    template: null,
                    personality: {
                      name: '',
                      tagline: '',
                      description: '',
                      tone: 'professional',
                      avatar: '🤖',
                      accentColor: '#3B82F6',
                      systemPrompt: ''
                    },
                    capabilities: ['chat', 'rag'],
                    deployment: {
                      provider: 'openai',
                      modelId: 'gpt-4o',
                      temperature: 0.7
                    },
                    privacy: {
                      visibility: 'private',
                      dataRetention: '30d'
                    }
                  });
                }}
                className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                Create Another
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // WIZARD RENDER
  // ============================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="font-bold text-xl text-gray-900">Botsmann</span>
            </Link>
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Cancel
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => idx < currentStep && setCurrentStep(idx)}
                  disabled={idx > currentStep}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    idx === currentStep
                      ? 'bg-blue-600 text-white'
                      : idx < currentStep
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>{step.icon}</span>
                  <span className="hidden sm:inline font-medium">{step.title}</span>
                </button>
                {idx < STEPS.length - 1 && (
                  <div className={`w-8 lg:w-16 h-0.5 mx-2 ${idx < currentStep ? 'bg-blue-300' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Step 0: Template Selection */}
        {currentStep === 0 && (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Create Your Private AI Node
              </h1>
              <p className="text-xl text-gray-600">
                Start with a template or build from scratch
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {NODE_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => selectTemplate(template)}
                  className={`text-left p-6 rounded-xl border-2 transition-all hover:shadow-lg hover:scale-[1.02] ${
                    formData.template?.id === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="text-4xl mb-4">{template.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Personality */}
        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Define Your Node's Personality</h2>
              <p className="text-gray-600">Give your AI a unique identity</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
              {/* Name & Avatar */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.personality.name}
                    onChange={(e) => updatePersonality('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                    placeholder="My Assistant"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Avatar</label>
                  <div className="relative">
                    <select
                      value={formData.personality.avatar}
                      onChange={(e) => updatePersonality('avatar', e.target.value)}
                      className="appearance-none w-20 h-12 text-3xl text-center rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none cursor-pointer"
                    >
                      {AVATARS.map(emoji => (
                        <option key={emoji} value={emoji}>{emoji}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={formData.personality.tagline}
                  onChange={(e) => updatePersonality('tagline', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                  placeholder="Your AI companion for..."
                />
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tone</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {['professional', 'friendly', 'casual', 'formal', 'playful', 'custom'].map(tone => (
                    <button
                      key={tone}
                      onClick={() => updatePersonality('tone', tone)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                        formData.personality.tone === tone
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              {/* System Prompt */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  System Prompt * <span className="font-normal text-gray-400">(Core personality instructions)</span>
                </label>
                <textarea
                  value={formData.personality.systemPrompt}
                  onChange={(e) => updatePersonality('systemPrompt', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-none"
                  placeholder="You are a helpful AI assistant that..."
                />
                <p className="mt-2 text-sm text-gray-500">
                  {formData.personality.systemPrompt.length}/4000 characters
                </p>
              </div>

              {/* Accent Color */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Accent Color</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={formData.personality.accentColor}
                    onChange={(e) => updatePersonality('accentColor', e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200"
                  />
                  <span className="text-gray-600 font-mono">{formData.personality.accentColor}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Capabilities */}
        {currentStep === 2 && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Capabilities</h2>
              <p className="text-gray-600">What should your node be able to do?</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {BUILT_IN_CAPABILITIES.map((cap: NodeCapability) => (
                <button
                  key={cap.id}
                  onClick={() => toggleCapability(cap.id)}
                  className={`text-left p-5 rounded-xl border-2 transition-all ${
                    formData.capabilities.includes(cap.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{cap.name}</h3>
                      <p className="text-sm text-gray-600">{cap.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      formData.capabilities.includes(cap.id)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      {formData.capabilities.includes(cap.id) ? '✓' : ''}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Deployment */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Configure Deployment</h2>
              <p className="text-gray-600">Choose your AI model and settings</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
              {/* Model Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">AI Model</label>
                <div className="space-y-3">
                  {MODELS.map(model => (
                    <button
                      key={model.id}
                      onClick={() => {
                        updateDeployment('provider', model.provider);
                        updateDeployment('modelId', model.id);
                      }}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        formData.deployment.modelId === model.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-gray-900">{model.name}</span>
                          <span className="text-gray-500 text-sm ml-2">({model.provider})</span>
                          <p className="text-sm text-gray-600">{model.description}</p>
                        </div>
                        {formData.deployment.modelId === model.id && (
                          <span className="text-blue-600 text-xl">✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Temperature: {formData.deployment.temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={formData.deployment.temperature}
                  onChange={(e) => updateDeployment('temperature', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Precise</span>
                  <span>Balanced</span>
                  <span>Creative</span>
                </div>
              </div>

              {/* Privacy */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">Privacy</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'private', label: 'Private', desc: 'Only you' },
                    { value: 'unlisted', label: 'Unlisted', desc: 'Anyone with link' },
                    { value: 'public', label: 'Public', desc: 'Discoverable' }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => updatePrivacy('visibility', opt.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.privacy.visibility === opt.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{opt.label}</div>
                      <div className="text-xs text-gray-500">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Review & Launch</h2>
              <p className="text-gray-600">Make sure everything looks good</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {/* Preview Card */}
              <div className="flex items-start gap-4 mb-8 pb-8 border-b border-gray-200">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                  style={{ backgroundColor: formData.personality.accentColor + '20' }}
                >
                  {formData.personality.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{formData.personality.name}</h3>
                  <p className="text-gray-600">{formData.personality.tagline}</p>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Template</span>
                  <span className="font-medium">{formData.template?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tone</span>
                  <span className="font-medium capitalize">{formData.personality.tone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Model</span>
                  <span className="font-medium">{MODELS.find(m => m.id === formData.deployment.modelId)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Capabilities</span>
                  <span className="font-medium">{formData.capabilities.length} enabled</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Privacy</span>
                  <span className="font-medium capitalize">{formData.privacy.visibility}</span>
                </div>
              </div>

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 max-w-2xl mx-auto">
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            ← Back
          </button>

          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceed()}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                canProceed()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : '🚀 Launch Node'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
