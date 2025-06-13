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
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl transition-all duration-300">
      <div className="relative mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900">Botsmann</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Navigation />
        </div>
      </div>
    </header>
  );
}