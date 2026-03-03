'use client';

import { type FC, useState, useRef, useEffect } from 'react';
import {
  MODEL_DISPLAY_CONFIG,
  getModelDisplayInfo,
  getProviderTier,
} from '@/lib/config/privacy-tiers';
import type { ModelProvider } from '@/lib/llm-client';

interface ModelSelectorProps {
  currentProvider: ModelProvider;
  onProviderChange: (provider: ModelProvider) => void;
  /** Whether user is authenticated (required for switching) */
  isAuthenticated: boolean;
  /** Available providers (defaults to all) */
  availableProviders?: ModelProvider[];
  /** Disabled state */
  disabled?: boolean;
}

const ALL_PROVIDERS: ModelProvider[] = ['groq', 'openrouter', 'ollama'];

/**
 * Dropdown selector for switching between AI models.
 * Requires authentication to switch (shows locked state for guests).
 */
export const ModelSelector: FC<ModelSelectorProps> = ({
  currentProvider,
  onProviderChange,
  isAuthenticated,
  availableProviders = ALL_PROVIDERS,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentDisplay = getModelDisplayInfo(currentProvider);
  const currentTier = getProviderTier(currentProvider);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (provider: ModelProvider) => {
    if (!isAuthenticated || disabled) return;
    onProviderChange(provider);
    setIsOpen(false);
  };

  const canInteract = isAuthenticated && !disabled;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => canInteract && setIsOpen(!isOpen)}
        disabled={!canInteract}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors
          ${
            canInteract
              ? 'bg-white border-gray-200 hover:border-gray-300 cursor-pointer'
              : 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-75'
          }
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-base">{currentDisplay.icon}</span>
        <span className="font-medium text-gray-700 text-sm">{currentDisplay.label}</span>
        <span
          className={`px-1.5 py-0.5 rounded text-xs ${
            currentTier.privacyLevel === 'maximum'
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {currentTier.privacyLevel === 'maximum' ? 'Private' : 'Cloud'}
        </span>
        {canInteract ? (
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        )}
      </button>

      {!isAuthenticated && <p className="text-xs text-gray-500 mt-1">Sign in to switch models</p>}

      {isOpen && canInteract && (
        <div
          className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          role="listbox"
        >
          {availableProviders.map((provider) => {
            const display = MODEL_DISPLAY_CONFIG[provider];
            const tier = getProviderTier(provider);
            const isSelected = provider === currentProvider;

            return (
              <button
                key={provider}
                type="button"
                onClick={() => handleSelect(provider)}
                className={`
                  w-full flex items-start gap-3 px-4 py-3 text-left transition-colors
                  ${isSelected ? 'bg-gray-50' : 'hover:bg-gray-50'}
                  first:rounded-t-lg last:rounded-b-lg
                `}
                role="option"
                aria-selected={isSelected}
              >
                <span className="text-xl">{display.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{display.label}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-xs ${
                        tier.privacyLevel === 'maximum'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {tier.privacyLevel === 'maximum' ? 'Private' : 'Cloud'}
                    </span>
                    {isSelected && (
                      <svg
                        className="w-4 h-4 text-green-600 ml-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    via {display.provider} · {display.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
