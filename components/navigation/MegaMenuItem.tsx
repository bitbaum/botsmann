'use client';

import Link from 'next/link';
import type { MenuChildItem } from '@/types/navigation';

interface MegaMenuItemProps {
  item: MenuChildItem;
  onNavigate?: () => void;
}

/**
 * Individual item within a megamenu dropdown
 * Displays icon, label, description with hover effects
 */
export function MegaMenuItem({ item, onNavigate }: MegaMenuItemProps) {
  return (
    <Link
      href={item.path}
      onClick={onNavigate}
      className="group flex items-start gap-3 rounded-lg p-3 transition-all hover:bg-gradient-to-r hover:from-gray-50 hover:to-action-tint focus:outline-none focus:ring-2 focus:ring-action focus:ring-offset-2"
    >
      {/* Icon */}
      {item.icon && (
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xl transition-colors group-hover:bg-white">
          {item.icon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 group-hover:text-action transition-colors">
          {item.label}
        </p>
        {item.description && (
          <p className="mt-1 text-xs leading-relaxed text-gray-600 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>

      {/* Arrow indicator */}
      <svg
        className="h-5 w-5 flex-shrink-0 text-gray-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
