'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { Logo } from './shared';
import { isImmersivePage } from '@/lib/routes';

/**
 * Main site header component
 * Contains logo and navigation
 *
 * Note: Header is hidden on professional and bot detail pages for immersive experience
 */
export function Header() {
  const pathname = usePathname();

  if (isImmersivePage(pathname)) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-edge">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          <div className="flex items-center">
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
}
