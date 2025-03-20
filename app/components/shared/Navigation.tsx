'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { Logo } from './navigation/Logo';
import { ProductDropdown } from './navigation/ProductDropdown';
import { ProfileDropdown } from './navigation/ProfileDropdown';
import { MobileMenu } from './navigation/MobileMenu';
import type { MenuItem } from './navigation/types';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setActiveSection(hash || null);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: 'portal',
      label: 'Portal',
      path: '/projects/governance/portal' as Route,
      section: 'portal'
    },
    {
      id: 'products',
      label: 'Products',
      path: '/projects/governance/products' as Route,
      section: 'products',
      dropdown: {
        items: [
          {
            id: 'voting',
            label: 'Open Vote',
            path: '/projects/governance/products/voting' as Route,
            section: 'voting'
          },
          {
            id: 'proposals',
            label: 'Open Law',
            path: '/projects/governance/products/proposals' as Route,
            section: 'proposals'
          },
          {
            id: 'analytics',
            label: 'Open Analytics',
            path: '/projects/governance/products/analytics' as Route,
            section: 'analytics'
          }
        ]
      }
    },
    {
      id: 'build',
      label: 'Build',
      path: '/projects/governance/build' as Route,
      section: 'build'
    },
    {
      id: 'whitepaper',
      label: 'Whitepaper',
      path: '/projects/governance/whitepaper' as Route,
      section: 'whitepaper'
    }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.dropdown ? (
                  <ProductDropdown
                    isOpen={activeDropdown === item.id}
                    onToggle={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                    item={item}
                  />
                ) : (
                  <Link
                    href={item.path}
                    className={`text-sm font-medium transition-colors ${
                      activeSection === item.section
                        ? 'text-green-600'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <ProfileDropdown
              isOpen={activeDropdown === 'profile'}
              onToggle={() => setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')}
            />
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={menuItems}
        activeSection={activeSection}
      />
    </header>
  );
} 