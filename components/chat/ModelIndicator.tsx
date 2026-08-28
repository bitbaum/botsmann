'use client';

import { type FC } from 'react';
import {
  getModelDisplayInfo,
  getProviderTier,
  type ModelDisplayInfo,
} from '@/lib/config/privacy-tiers';
import type { ModelProvider } from '@/lib/llm-client';

interface ModelIndicatorProps {
  provider: ModelProvider;
  /** Compact mode for inline display */
  compact?: boolean;
  /** Show tier badge */
  showTier?: boolean;
}

/**
 * Displays the current AI model with icon and privacy tier badge.
 * Used in chat headers to show which model is responding.
 */
export const ModelIndicator: FC<ModelIndicatorProps> = ({
  provider,
  compact = false,
  showTier = true,
}) => {
  const displayInfo: ModelDisplayInfo = getModelDisplayInfo(provider);
  const tier = getProviderTier(provider);

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-gray-500">
        <span>{displayInfo.icon}</span>
        <span>{displayInfo.label}</span>
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm">
      <span className="text-base">{displayInfo.icon}</span>
      <span className="font-medium text-gray-700">{displayInfo.label}</span>
      <span className="text-gray-400">via {displayInfo.provider}</span>
      {showTier && (
        <span
          className={`px-2 py-0.5 rounded text-xs font-medium ${
            tier.privacyLevel === 'maximum'
              ? 'bg-green-100 text-green-700'
              : 'bg-action-tint text-action'
          }`}
        >
          {tier.privacyLevel === 'maximum' ? 'Private' : 'Cloud'}
        </span>
      )}
    </div>
  );
};
