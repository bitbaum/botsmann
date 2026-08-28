'use client';

import Link from 'next/link';
import type { GuideMetadata } from '@/types/knowledge';
import { DifficultyBadge } from './DifficultyBadge';
import { categoryConfig } from '@/types/knowledge';

interface GuideCardProps {
  guide: GuideMetadata;
}

/**
 * Card component for displaying guide preview in listings
 */
export function GuideCard({ guide }: GuideCardProps) {
  const category = categoryConfig[guide.category];

  return (
    <Link
      href={`/knowledge/guides/${guide.slug}`}
      className="group block rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-action hover:shadow-lg"
    >
      {/* Header with icon and difficulty */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xl group-hover:bg-action-tint transition-colors">
            {guide.icon || category.icon}
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {category.label}
            </span>
          </div>
        </div>
        <DifficultyBadge level={guide.difficulty} size="sm" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-action transition-colors mb-2">
        {guide.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{guide.description}</p>

      {/* Footer with metadata */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <ClockIcon />
            {guide.readTime}
          </span>
          {guide.prerequisites && guide.prerequisites.length > 0 && (
            <span className="flex items-center gap-1">
              <RequiresIcon />
              {guide.prerequisites.length} prereq
            </span>
          )}
        </div>
        <span className="text-action font-medium group-hover:underline">Read guide</span>
      </div>

      {/* Tags */}
      {guide.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-gray-100">
          {guide.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
              {tag}
            </span>
          ))}
          {guide.tags.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-gray-400">+{guide.tags.length - 3} more</span>
          )}
        </div>
      )}
    </Link>
  );
}

function ClockIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function RequiresIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  );
}
