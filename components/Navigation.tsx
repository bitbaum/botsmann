'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItems } from '@/data/menuItems';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="hidden lg:flex items-center space-x-8">
        <div className="flex-1 flex items-center space-x-8">
          {menuItems.map((item) => {
            if (item.isButton) return null;
            const isActive = pathname === item.path;
            if (item.children) {
              return <MegaMenu key={item.label} item={item} isActive={isActive} />;
            }
            return (
              <Link
                key={item.label}
                href={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActive ? 'text-openai-green' : 'text-gray-600'
                } hover:text-openai-green`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="flex-shrink-0">
          {menuItems.map(
            (item) =>
              item.isButton && (
                <Link
                  key={item.label}
                  href={item.path}
                  className="rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-opacity"
                >
                  {item.label}
                </Link>
              )
          )}
        </div>
      </nav>

      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-openai-green"
        aria-label="Open menu"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} items={menuItems} />
    </>
  );
}
