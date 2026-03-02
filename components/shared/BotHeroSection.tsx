'use client';

import { type FC, type ReactNode } from 'react';
import type { BotAccentColor } from '@/types/bot';
import { ACCENT_HERO_CLASSES } from '@/lib/config/colors';

/**
 * Chat message for the hero preview
 */
export interface HeroChatMessage {
  role: 'bot' | 'user';
  content: string;
}

/**
 * Badge/label configuration for hero section
 */
export interface HeroBadge {
  text: string;
  emoji?: string;
}

/**
 * Key benefit/feature displayed in hero
 */
export interface HeroKeyBenefit {
  emoji: string;
  text: string;
}

/**
 * CTA button configuration
 */
export interface HeroCTA {
  text: string;
  href: string;
  external?: boolean;
}

/**
 * Configuration for the hero section
 */
export interface BotHeroConfig {
  /** Badge shown above the title */
  badge?: HeroBadge;
  /** Main title (bot name will be added automatically if titleSuffix is provided) */
  title: string;
  /** Optional suffix added after title (e.g., "- AI Legal Assistant") */
  titleSuffix?: string;
  /** Subtitle/overview text */
  subtitle: string;
  /** Primary CTA button */
  primaryCTA: HeroCTA;
  /** Secondary CTA button */
  secondaryCTA?: HeroCTA;
  /** Bot info for chat preview */
  botInfo: {
    name: string;
    emoji: string;
    description: string;
  };
  /** Chat messages to display in preview */
  chatMessages: HeroChatMessage[];
  /** Key benefits to display (optional) */
  keyBenefits?: HeroKeyBenefit[];
  /** Whether to show key benefits on mobile separately */
  showMobileBenefits?: boolean;
}

interface BotHeroSectionProps {
  config: BotHeroConfig;
  accentColor: BotAccentColor;
  /** Optional custom content for the right panel instead of chat preview */
  rightPanel?: ReactNode;
}

/**
 * Shared Hero Section component for bot pages
 *
 * @example
 * ```tsx
 * <BotHeroSection
 *   config={{
 *     badge: { emoji: '⚖️', text: 'Private AI Node' },
 *     title: 'Lex',
 *     titleSuffix: 'Your AI Legal Assistant',
 *     subtitle: 'Comprehensive legal research and analysis support.',
 *     primaryCTA: { text: 'Chat with Lex', href: tryLink, external: true },
 *     secondaryCTA: { text: 'Try Demo', href: '#demo' },
 *     botInfo: { name: 'Lex', emoji: '⚖️', description: 'AI Legal Assistant' },
 *     chatMessages: [
 *       { role: 'bot', content: 'How can I help with your legal research today?' },
 *       { role: 'user', content: 'I need a summary of recent data privacy cases.' },
 *     ],
 *   }}
 *   accentColor="blue"
 * />
 * ```
 */
export const BotHeroSection: FC<BotHeroSectionProps> = ({ config, accentColor, rightPanel }) => {
  const colors = ACCENT_HERO_CLASSES[accentColor];
  const {
    badge,
    title,
    titleSuffix,
    subtitle,
    primaryCTA,
    secondaryCTA,
    botInfo,
    chatMessages,
    keyBenefits,
    showMobileBenefits = false,
  } = config;

  return (
    <section className="mb-12 sm:mb-16 pt-8 sm:pt-12">
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
        {/* Left side - Content */}
        <div>
          {badge && (
            <div
              className={`mb-3 sm:mb-4 inline-flex items-center px-3 py-1 ${colors.badge} rounded-full text-xs sm:text-sm font-medium`}
            >
              {badge.emoji && <span className="mr-1">{badge.emoji}</span>}
              {badge.text}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            {title}
            {titleSuffix && (
              <>
                {title.endsWith(':') ? ' ' : ': '}
                {titleSuffix}
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6">{subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={primaryCTA.href}
              className="btn-primary flex items-center justify-center px-5 py-3 text-base"
              {...(primaryCTA.external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <span>{primaryCTA.text}</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5l7 7-7 7M5 12h15"
                />
              </svg>
            </a>
            {secondaryCTA && (
              <a
                href={secondaryCTA.href}
                className="btn-secondary flex items-center justify-center px-5 py-3 text-base"
              >
                {secondaryCTA.text}
              </a>
            )}
          </div>

          {/* Mobile key benefits */}
          {showMobileBenefits && keyBenefits && keyBenefits.length > 0 && (
            <div className="mt-8 md:hidden">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Benefits:</h3>
              <ul className="space-y-2">
                {keyBenefits.slice(0, 3).map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Desktop key benefits (when not showing mobile separately) */}
          {!showMobileBenefits && keyBenefits && keyBenefits.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-3">
              {keyBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start">
                  <span className={`${colors.benefitIcon} mr-2`}>{benefit.emoji}</span>
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right side - Chat preview or custom content */}
        {rightPanel || (
          <div
            className={`${colors.chatBg} p-4 md:p-6 rounded-xl border ${colors.chatBorder} shadow-sm`}
          >
            {/* Bot header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 ${colors.iconBg} rounded-full flex items-center justify-center`}
              >
                <span className="text-xl md:text-2xl">{botInfo.emoji}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{botInfo.name}</h3>
                <p className="text-sm text-gray-600">{botInfo.description}</p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="space-y-3">
              {chatMessages.map((message, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg shadow-sm ${
                    message.role === 'bot'
                      ? 'bg-white ml-auto max-w-[85%]'
                      : `${colors.userBubble} max-w-[85%]`
                  }`}
                >
                  <p className="text-gray-800 text-sm md:text-base">{message.content}</p>
                </div>
              ))}
            </div>

            {/* Desktop key benefits inside chat panel */}
            {showMobileBenefits && keyBenefits && keyBenefits.length > 0 && (
              <div className="mt-6 hidden md:block">
                <h4 className="font-medium text-gray-900 mb-2">Key Benefits:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {keyBenefits.slice(0, 4).map((benefit, idx) => (
                    <div key={idx} className="bg-white p-2 rounded-md flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-sm text-gray-700">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
