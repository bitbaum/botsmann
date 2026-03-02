'use client';

import { type FC } from 'react';
import {
  type AIProvider,
  getProviderColorClasses,
  type ConnectionStatus,
} from '@/lib/infrastructure';
import { CONNECTION_STATUS_CONFIG } from '@/lib/config/connection-status';

interface ProviderCardProps {
  provider: AIProvider;
  isSelected?: boolean;
  isConfigured?: boolean;
  status?: ConnectionStatus;
  size?: 'sm' | 'md' | 'lg';
  onSelect?: () => void;
  showFeatures?: boolean;
  disabled?: boolean;
}

/**
 * Card component displaying an AI Provider
 * Used on infrastructure page, settings widget, and onboarding
 */
export const ProviderCard: FC<ProviderCardProps> = ({
  provider,
  isSelected = false,
  isConfigured = false,
  status,
  size = 'md',
  onSelect,
  showFeatures = false,
  disabled = false,
}) => {
  const { name, tagline, description, features, logo, color } = provider;
  const colors = getProviderColorClasses(color);

  const sizeClasses = {
    sm: {
      container: 'p-4',
      logo: 'w-10 h-10 text-2xl',
      title: 'text-base',
      tagline: 'text-xs',
      description: 'text-xs',
      feature: 'text-xs',
    },
    md: {
      container: 'p-5',
      logo: 'w-12 h-12 text-2xl',
      title: 'text-lg',
      tagline: 'text-sm',
      description: 'text-sm',
      feature: 'text-xs',
    },
    lg: {
      container: 'p-6',
      logo: 'w-16 h-16 text-3xl',
      title: 'text-xl',
      tagline: 'text-base',
      description: 'text-sm',
      feature: 'text-sm',
    },
  };

  const s = sizeClasses[size];

  const selectedRing = isSelected ? `ring-2 ${colors.ring} ring-offset-2` : '';
  const hoverClasses = disabled
    ? 'cursor-not-allowed opacity-60'
    : 'cursor-pointer hover:shadow-xl hover:border-gray-200 hover:-translate-y-1';

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onSelect}
      disabled={disabled}
      className={`group relative w-full text-left bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 ${s.container} ${selectedRing} ${hoverClasses}`}
    >
      {/* Accent gradient on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.bgGradient} opacity-0 ${
          !disabled ? 'group-hover:opacity-5' : ''
        } transition-opacity duration-300`}
      />

      {/* Selection indicator */}
      {isSelected && (
        <div className={`absolute top-3 right-3 ${colors.bg} rounded-full p-1`}>
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* Content */}
      <div className="relative">
        {/* Logo/Emoji */}
        <div
          className={`${colors.bgLight} rounded-2xl flex items-center justify-center mb-3 ${s.logo}`}
        >
          {logo}
        </div>

        {/* Name & Tagline */}
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`font-bold text-gray-900 ${s.title}`}>{name}</h3>
          {status && <StatusIndicator status={status} />}
        </div>
        <p className={`${colors.text} font-medium mb-2 ${s.tagline}`}>{tagline}</p>

        {/* Description */}
        <p className={`text-gray-600 ${s.description}`}>{description}</p>

        {/* Features (optional) */}
        {showFeatures && features.length > 0 && (
          <ul className="mt-3 space-y-1">
            {features.map((feature, index) => (
              <li key={index} className={`flex items-center gap-2 text-gray-500 ${s.feature}`}>
                <svg
                  className={`w-3 h-3 ${colors.text} flex-shrink-0`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Configured badge */}
        {isConfigured && !isSelected && (
          <div className="mt-3">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Configured
            </span>
          </div>
        )}
      </div>
    </button>
  );
};

// Internal status indicator component
const StatusIndicator: FC<{ status: ConnectionStatus }> = ({ status }) => {
  const config = CONNECTION_STATUS_CONFIG[status];

  return (
    <span className="flex items-center gap-1" title={config.label}>
      <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
    </span>
  );
};
