'use client';

import { useState, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import type { MenuItem } from '@/types/navigation';

interface MegaMenuProps {
  item: MenuItem;
  isActive?: boolean;
}

export default function MegaMenu({ item, isActive }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  if (!item.children) return null;
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`text-sm font-medium transition-colors ${
          open || isActive ? 'text-openai-green' : 'text-gray-600'
        } hover:text-openai-green`}
      >
        {item.label}
      </button>
      <Transition
        as={Fragment}
        show={open}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 translate-y-1"
        enterTo="transform opacity-100 translate-y-0"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 translate-y-0"
        leaveTo="transform opacity-0 translate-y-1"
      >
        <div className="absolute left-1/2 z-20 mt-3 w-screen max-w-md -translate-x-1/2 px-4 sm:px-0">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
            <div className="relative grid gap-6 p-6 lg:grid-cols-2">
              {item.children?.map((child) => (
                <Link
                  key={child.label}
                  href={child.path}
                  className="flex rounded-lg p-3 transition-colors hover:bg-gray-50"
                >
                  <div className="ml-2 text-left">
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
      </Transition>
    </div>
  );
}
