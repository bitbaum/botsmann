'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { NavItem, MobileNav, AuthNav } from './navigation';
import { MenuIcon } from './icons';
import { menuItems, getNavItems, getButtonItems } from '@/data/menuItems';

/**
 * Main site navigation component
 * Renders desktop megamenu navigation and mobile drawer
 *
 * Architecture:
 * - NavItem: Handles individual nav items (links, dropdowns, buttons)
 * - MobileNav: Handles mobile drawer navigation
 * - menuItems: SSOT for navigation structure
 */
export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = getNavItems();
  const buttonItems = getButtonItems();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-8">
        <div className="flex-1 flex items-center space-x-8">
          {navItems.map((item) => (
            <NavItem key={item.label} item={item} isActive={pathname === item.path} />
          ))}
        </div>
        <div className="flex-shrink-0 flex items-center gap-4">
          {buttonItems.map((item) => (
            <NavItem key={item.label} item={item} isActive={pathname === item.path} />
          ))}
          <div className="h-6 w-px bg-gray-200" />
          <AuthNav />
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="lg:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-action"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open menu"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={menuItems}
        currentPath={pathname ?? ''}
      />
    </>
  );
}
