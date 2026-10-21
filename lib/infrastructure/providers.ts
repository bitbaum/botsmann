// AI Providers - Single Source of Truth for provider definitions
// Pattern follows data/professionals.ts

import type { AIProvider, ProviderColor, ProviderColorClasses, ProviderId } from './types';

export const providers: AIProvider[] = [
  {
    id: 'groq',
    name: 'Groq',
    tagline: 'Lightning Fast',
    description: 'Free tier included. Blazing fast inference with no setup required.',
    features: ['Free tier (14,400 req/day)', 'Ultra-fast responses', 'No API key needed'],
    color: 'orange',
    keyRequired: false,
    keyPlaceholder: 'gsk_...',
    helpUrl: 'https://console.groq.com/keys',
    logo: '⚡',
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    tagline: 'All Models, One Key',
    description: 'Access many models, including Claude, GPT, Gemini and Llama, with one API key.',
    features: ['Claude, GPT, Gemini, Grok', '100+ models available', 'Pay-as-you-go'],
    color: 'green',
    keyRequired: true,
    keyPlaceholder: 'sk-or-...',
    helpUrl: 'https://openrouter.ai/keys',
    logo: '🌐',
  },
  {
    id: 'ollama',
    name: 'Ollama',
    tagline: 'Local & Private',
    description:
      'Run AI models locally on your machine. Complete privacy, no data leaves your device.',
    features: ['100% private', 'No internet needed', 'Self-hosted'],
    color: 'purple',
    keyRequired: true,
    keyPlaceholder: 'http://localhost:11434',
    helpUrl: 'https://ollama.ai/download',
    logo: '🏠',
  },
];

// Helper function to get provider by ID
export const getProviderById = (id: ProviderId | string): AIProvider | undefined =>
  providers.find((p) => p.id === id);

// Helper function to get all provider IDs
export const getAllProviderIds = (): ProviderId[] => providers.map((p) => p.id);

// Color classes for providers - follows ProfessionalCard pattern
export const getProviderColorClasses = (color: ProviderColor): ProviderColorClasses => {
  const colors: Record<ProviderColor, ProviderColorClasses> = {
    orange: {
      bg: 'bg-orange-500',
      bgLight: 'bg-orange-100',
      bgGradient: 'from-orange-500 to-orange-600',
      text: 'text-orange-600',
      border: 'border-orange-500',
      hover: 'hover:bg-orange-600',
      ring: 'ring-orange-500',
      focusRing: 'focus:ring-orange-500',
    },
    green: {
      bg: 'bg-green-500',
      bgLight: 'bg-green-100',
      bgGradient: 'from-green-500 to-green-600',
      text: 'text-green-600',
      border: 'border-green-500',
      hover: 'hover:bg-green-600',
      ring: 'ring-green-500',
      focusRing: 'focus:ring-green-500',
    },
    purple: {
      bg: 'bg-purple-500',
      bgLight: 'bg-purple-100',
      bgGradient: 'from-purple-500 to-purple-600',
      text: 'text-purple-600',
      border: 'border-purple-500',
      hover: 'hover:bg-purple-600',
      ring: 'ring-purple-500',
      focusRing: 'focus:ring-purple-500',
    },
    blue: {
      bg: 'bg-blue-500',
      bgLight: 'bg-blue-100',
      bgGradient: 'from-blue-500 to-blue-600',
      text: 'text-blue-600',
      border: 'border-blue-500',
      hover: 'hover:bg-blue-600',
      ring: 'ring-blue-500',
      focusRing: 'focus:ring-blue-500',
    },
  };
  return colors[color];
};

// Get default provider (Groq - free tier)
export const getDefaultProvider = (): AIProvider => providers[0];
