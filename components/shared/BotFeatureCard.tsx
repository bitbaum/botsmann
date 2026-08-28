'use client';

import { type FC, type ReactNode } from 'react';

/**
 * Feature configuration for bot feature cards
 */
export interface BotFeature {
  icon: string;
  title: string;
  description: string;
  /** Optional detailed description shown below main description */
  details?: string;
  /** Gradient color for icon background (Tailwind gradient classes) */
  color?: string;
}

interface BotFeatureCardProps {
  feature: BotFeature;
  /** Optional variant for different styling */
  variant?: 'default' | 'gradient' | 'simple';
  /** Optional click handler for interactive cards */
  onClick?: () => void;
  /** Whether the card is in selected/expanded state */
  isSelected?: boolean;
  /** Optional children for expanded content */
  children?: ReactNode;
}

/**
 * Shared Feature Card component for bot pages
 *
 * Provides consistent styling for feature cards across all bot pages
 * while allowing customization through variants and optional expanded content.
 *
 * @example
 * ```tsx
 * // Simple feature card
 * <BotFeatureCard
 *   feature={{
 *     icon: '🔐',
 *     title: 'Secure',
 *     description: 'End-to-end encryption',
 *     color: 'from-action to-action-hover'
 *   }}
 *   variant="gradient"
 * />
 *
 * // Interactive card with expanded content
 * <BotFeatureCard
 *   feature={feature}
 *   variant="simple"
 *   onClick={() => setExpanded(!expanded)}
 *   isSelected={expanded}
 * >
 *   <div>Expanded content here</div>
 * </BotFeatureCard>
 * ```
 */
export const BotFeatureCard: FC<BotFeatureCardProps> = ({
  feature,
  variant = 'default',
  onClick,
  isSelected = false,
  children,
}) => {
  const { icon, title, description, details, color = 'from-gray-500 to-gray-600' } = feature;

  const baseClasses = 'relative bg-white rounded-2xl p-6 transition-all';
  const interactiveClasses = onClick ? 'cursor-pointer' : '';

  const variantClasses = {
    default: `${baseClasses} border-2 border-gray-100 hover:border-gray-200 hover:shadow-xl`,
    gradient: `${baseClasses} border-2 border-gray-100 hover:border-gray-200 hover:shadow-xl group`,
    simple: `${baseClasses} border ${
      isSelected
        ? 'border-action shadow-md'
        : 'border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300'
    }`,
  };

  const iconClasses = {
    default: `w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4`,
    gradient: `w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl text-white mb-4 group-hover:scale-110 transition-transform`,
    simple: `w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4`,
  };

  const CardWrapper = onClick ? 'button' : 'div';
  const wrapperProps = onClick
    ? {
        onClick,
        type: 'button' as const,
        className: `${variantClasses[variant]} ${interactiveClasses} w-full text-left`,
      }
    : { className: variantClasses[variant] };

  return (
    <CardWrapper {...wrapperProps}>
      <div className={iconClasses[variant]}>
        <span className={variant === 'gradient' ? '' : 'text-2xl'}>{icon}</span>
      </div>
      <h3
        className={`font-${variant === 'gradient' ? 'bold' : 'semibold'} text-${variant === 'gradient' ? 'xl' : 'lg'} text-gray-900 mb-2`}
      >
        {title}
      </h3>
      <p className={`text-gray-600 ${details ? 'mb-3 font-medium' : ''}`}>{description}</p>
      {details && <p className="text-sm text-gray-500 leading-relaxed">{details}</p>}
      {children}
    </CardWrapper>
  );
};

/**
 * Props for the feature grid component
 */
interface BotFeatureGridProps {
  /** Array of features to display */
  features: BotFeature[];
  /** Card variant for all cards in the grid */
  variant?: 'default' | 'gradient' | 'simple';
  /** Number of columns (responsive) */
  columns?: 2 | 3 | 4;
  /** Optional section header */
  header?: {
    badge?: { emoji?: string; text: string };
    title: string;
    subtitle?: string;
  };
}

/**
 * Grid layout for multiple feature cards
 *
 * @example
 * ```tsx
 * <BotFeatureGrid
 *   features={features}
 *   variant="gradient"
 *   columns={3}
 *   header={{
 *     badge: { emoji: '⚡', text: 'Platform Features' },
 *     title: 'Everything You Need',
 *     subtitle: 'Comprehensive tools for your workflow'
 *   }}
 * />
 * ```
 */
export const BotFeatureGrid: FC<BotFeatureGridProps> = ({
  features,
  variant = 'default',
  columns = 3,
  header,
}) => {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div>
      {header && (
        <div className="text-center mb-12">
          {header.badge && (
            <div className="inline-flex items-center px-4 py-2 bg-action-tint text-action rounded-full text-sm font-medium mb-6">
              {header.badge.emoji && <span className="mr-2">{header.badge.emoji}</span>}
              {header.badge.text}
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{header.title}</h2>
          {header.subtitle && (
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">{header.subtitle}</p>
          )}
        </div>
      )}
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {features.map((feature, idx) => (
          <BotFeatureCard key={idx} feature={feature} variant={variant} />
        ))}
      </div>
    </div>
  );
};
