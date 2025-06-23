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
      <Link
        href={item.path}
        className={`text-sm font-medium transition-colors ${
          isActive ? 'text-openai-green' : 'text-gray-600'
        } hover:text-openai-green`}
      >
        {item.label}
      </Link>
      <div className="absolute left-1/2 z-20 hidden group-hover:block mt-3 w-screen max-w-3xl -translate-x-1/2 px-4 sm:px-0">
        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="relative grid gap-6 bg-white p-6 sm:grid-cols-2 lg:grid-cols-3">
            {item.children?.map((child) => {
              const Icon = child.icon;
              return (
                <Link
                  key={child.label}
                  href={child.path}
                  className="flex items-start rounded-lg p-3 transition-colors hover:bg-gray-50"
                >
                  {Icon && <Icon className="h-6 w-6 text-openai-green" aria-hidden="true" />}
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium text-gray-900">{child.label}</p>
                    {child.description && (
                      <p className="mt-1 text-sm text-gray-500">{child.description}</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="bg-gray-50 p-4 text-right">
            <Link href={item.path} className="text-sm font-medium text-openai-green hover:underline">
              View all {item.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
