'use client';

import React from 'react';
import Link from 'next/link';
import type { MenuItem } from '@/types/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
}

export default function MobileMenu({ isOpen, onClose, menuItems }: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-start bg-white overflow-y-auto transition-transform duration-300 lg:hidden ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Botsmann
        </Link>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="px-6 py-4 space-y-1 overflow-y-auto flex-1">
        {menuItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <div className="space-y-1">
                <div className="px-3 py-2 text-sm font-medium text-gray-500">{item.label}</div>
                {item.children.map((sub) => (
                  <Link
                    key={sub.label}
                    href={sub.path}
                    className="block px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={onClose}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                href={item.path}
                className={`block px-3 py-2 text-sm rounded-md ${item.isButton ? 'bg-openai-green text-white text-center' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
