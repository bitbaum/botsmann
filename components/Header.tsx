'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

export default function Header() {
  const pathname = usePathname();
  
  // Check if current page is any bot detail page
  // This will match patterns like /bots/research-assistant, /bots/product-manager, etc.
  const isBotDetailPage = pathname && pathname.match(/^\/bots\/[\w-]+$/);
  
  // Don't render the header at all on bot detail pages
  if (isBotDetailPage) return null;
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-b border-gray-100/50 shadow-sm">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl px-4 py-2 rounded-lg shadow-lg">
                  B
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Botsmann
              </span>
        </Link>
          </div>
        
          {/* Navigation - Fixed positioning */}
          <div className="flex items-center">
          <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
}