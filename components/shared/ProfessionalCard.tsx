'use client';

import { type FC } from 'react';
import Link from 'next/link';
import {
  type Professional,
  getAccentColorClasses,
  getProfessionalPath,
} from '@/data/professionals';
import { ProfessionalAvatar } from './ProfessionalAvatar';

interface ProfessionalCardProps {
  professional: Professional;
  size?: 'default' | 'large';
}

/**
 * Card component displaying an AI Professional
 * Used on homepage grid and professionals overview page
 */
export const ProfessionalCard: FC<ProfessionalCardProps> = ({ professional, size = 'default' }) => {
  const { slug, name, title, tagline, accentColor } = professional;
  const colors = getAccentColorClasses(accentColor);
  const path = getProfessionalPath(slug);

  const isLarge = size === 'large';

  return (
    <Link
      href={path}
      className={`group relative bg-surface rounded-card shadow-card border border-edge overflow-hidden transition-all duration-200 hover:shadow-card-hover hover:border-action/40 hover:-translate-y-0.5 ${
        isLarge ? 'p-8' : 'p-6'
      }`}
    >
      {/* Content */}
      <div className="relative">
        {/* Monogram badge (replaces emoji) */}
        <ProfessionalAvatar
          professional={professional}
          className={isLarge ? 'w-20 h-20 mb-4' : 'w-14 h-14 mb-4'}
          textClassName={isLarge ? 'text-3xl' : 'text-xl'}
        />

        {/* Name & Role */}
        <h3
          className={`font-serif font-semibold text-ink mb-1 ${colors.groupHoverText} transition-colors ${
            isLarge ? 'text-xl' : 'text-lg'
          }`}
        >
          {name}
        </h3>
        <p className={`${colors.text} font-medium mb-3 ${isLarge ? 'text-base' : 'text-sm'}`}>
          {title}
        </p>

        {/* Tagline */}
        <p className={`text-ink-muted ${isLarge ? 'text-base' : 'text-sm'}`}>{tagline}</p>

        {/* CTA */}
        <div
          className={`mt-4 flex items-center gap-2 ${colors.text} font-medium ${
            isLarge ? 'text-base' : 'text-sm'
          }`}
        >
          <span>Chat with {name}</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};
