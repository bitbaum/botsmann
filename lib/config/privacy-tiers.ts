/**
 * Privacy Tiers & Model Display Configuration - SSOT
 * @module lib/config/privacy-tiers
 *
 * Single source of truth for:
 * - Privacy tier definitions (cloud vs self-hosted)
 * - Model display info (labels, icons, provider names)
 * - Tier assignments for each provider
 */

import type { ModelProvider } from '@/lib/llm-client';

/**
 * Privacy tier identifiers
 */
export const PRIVACY_TIER_IDS = ['cloud', 'selfHosted'] as const;
export type PrivacyTierId = (typeof PRIVACY_TIER_IDS)[number];

/**
 * Privacy tier definition
 */
export interface PrivacyTier {
  id: PrivacyTierId;
  name: string;
  description: string;
  providers: ModelProvider[];
  pros: string[];
  cons: string[];
  costIndicator: string;
  privacyLevel: 'standard' | 'maximum';
}

/**
 * Privacy tiers configuration
 */
export const PRIVACY_TIERS: Record<PrivacyTierId, PrivacyTier> = {
  cloud: {
    id: 'cloud',
    name: 'Cloud AI',
    description: 'Fast, reliable, cost-effective',
    providers: ['groq', 'openrouter'],
    pros: ['No setup required', 'Always available', 'Lower cost'],
    cons: ['Data processed by third parties', 'Standard privacy policies'],
    costIndicator: '$',
    privacyLevel: 'standard',
  },
  selfHosted: {
    id: 'selfHosted',
    name: 'Self-Hosted AI Node',
    description: 'Maximum privacy, your infrastructure',
    providers: ['ollama'],
    pros: ['Data never leaves your network', 'Full control', 'No third-party access'],
    cons: ['Requires technical setup', 'Hardware costs', 'Maintenance responsibility'],
    costIndicator: '$$$',
    privacyLevel: 'maximum',
  },
} as const;

/**
 * Model display information for each provider
 */
export interface ModelDisplayInfo {
  label: string;
  provider: string;
  tier: PrivacyTierId;
  icon: string;
  description: string;
}

export const MODEL_DISPLAY_CONFIG: Record<ModelProvider, ModelDisplayInfo> = {
  groq: {
    label: 'Groq',
    provider: 'Groq',
    tier: 'cloud',
    icon: '⚡',
    description: 'Fast inference, free tier available',
  },
  openrouter: {
    label: 'OpenRouter',
    provider: 'OpenRouter',
    tier: 'cloud',
    icon: '🧠',
    description: 'Many models via OpenRouter',
  },
  ollama: {
    label: 'Local Model',
    provider: 'Ollama',
    tier: 'selfHosted',
    icon: '🔒',
    description: 'Runs on your own hardware',
  },
} as const;

/**
 * Get the display info for a provider
 */
export function getModelDisplayInfo(provider: ModelProvider): ModelDisplayInfo {
  return MODEL_DISPLAY_CONFIG[provider] ?? MODEL_DISPLAY_CONFIG.groq;
}

/**
 * Get the privacy tier for a provider
 */
export function getProviderTier(provider: ModelProvider): PrivacyTier {
  const displayInfo = getModelDisplayInfo(provider);
  return PRIVACY_TIERS[displayInfo.tier];
}

/**
 * Get all available providers grouped by tier
 */
export function getProvidersByTier(): Record<PrivacyTierId, ModelProvider[]> {
  return {
    cloud: PRIVACY_TIERS.cloud.providers,
    selfHosted: PRIVACY_TIERS.selfHosted.providers,
  };
}
