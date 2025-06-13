'use client';

import Link from 'next/link';
import type { MenuItem } from '@/types/navigation';

interface MegaMenuProps {
  item: MenuItem;
  isActive?: boolean;
}

export default function MegaMenu({ item, isActive }: MegaMenuProps) {

  if (!item.children) return null;

  return (
    <div className="relative group">
      <button
        className={`text-sm font-medium transition-colors ${
          isActive ? 'text-openai-green' : 'text-gray-600'
        } group-hover:text-openai-green group-focus-within:text-openai-green`}
      >
        {item.label}
      </button>
      <div className="absolute inset-x-0 top-full z-20 hidden group-hover:block group-focus-within:block">
        <div className="mx-auto mt-4 w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="grid gap-6 p-8 md:grid-cols-2 lg:grid-cols-3">
            {item.children.map((child) => (
              <Link
                key={child.label}
                href={child.path}
                className="flex items-start space-x-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
              >
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{child.label}</p>
                  {child.description && (
                    <p className="mt-1 text-sm text-gray-500">{child.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
