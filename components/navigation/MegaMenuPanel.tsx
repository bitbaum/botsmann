'use client';

import Link from 'next/link';
import type { MenuChildItem, MegaMenuConfig } from '@/types/navigation';
import { MegaMenuItem } from './MegaMenuItem';

interface MegaMenuPanelProps {
  items: MenuChildItem[];
  config?: MegaMenuConfig;
  onNavigate?: () => void;
}

/**
 * Megamenu dropdown panel with configurable header, grid, and footer
 * Supports 1-3 column layouts based on config
 */
export function MegaMenuPanel({ items, config, onNavigate }: MegaMenuPanelProps) {
  const columns = config?.columns ?? 2;

  const gridCols = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
  }[columns];

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 border border-gray-100">
      {/* Optional Header */}
      {config?.header && (
        <div
          className={`border-b border-gray-100 px-6 py-4 ${config.header.gradient ?? 'bg-action-tint'}`}
        >
          <h3 className="text-sm font-semibold text-gray-900">{config.header.title}</h3>
          {config.header.subtitle && (
            <p className="mt-1 text-xs text-gray-600">{config.header.subtitle}</p>
          )}
        </div>
      )}

      {/* Menu Items Grid */}
      <div className={`relative grid gap-1 bg-white p-4 ${gridCols}`}>
        {items.map((item) => (
          <MegaMenuItem key={item.label} item={item} onNavigate={onNavigate} />
        ))}
      </div>

      {/* Optional Footer CTA */}
      {config?.footer && (
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
          <Link
            href={config.footer.href}
            onClick={onNavigate}
            className="group flex items-center justify-between text-sm font-medium text-gray-900 hover:text-action transition-colors"
          >
            <span>{config.footer.label}</span>
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
