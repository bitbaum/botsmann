'use client';

import React, { useState, useEffect, type MouseEventHandler } from 'react';
import Link from 'next/link';
import { Fragment } from 'react';

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('#mobile-menu')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <Fragment>
      <button
        type="button"
        onClick={toggleMenu}
        className="lg:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-openai-green focus:outline-none focus:ring-2 focus:ring-openai-green"
        aria-controls="mobile-menu"
        aria-expanded={isMenuOpen}
      >
        <span className="sr-only">Open main menu</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
          />
        </svg>
      </button>

      <div
        className={`${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } fixed inset-0 top-16 z-50 transform bg-white transition-all duration-300 ease-in-out lg:hidden`}
      >
        <nav className="h-full overflow-y-auto px-6 py-6">
          <div className="flex flex-col space-y-4">
            {/* Mobile menu content */}
            <div className="space-y-4">
              <Link href="/bots" className="flex items-center min-h-[44px] text-lg font-medium text-gray-900 hover:text-openai-green active:text-openai-green transition-colors">
                Bots
              </Link>
              <div className="flex flex-col space-y-4 pl-4">
                <Link href="/bots/artistic-advisor" className="flex items-center min-h-[44px] text-base text-gray-600 hover:text-openai-green active:text-openai-green transition-colors">
                  Artistic Advisor
                </Link>
                <Link href="/bots/auto-shopper" className="flex items-center min-h-[44px] text-base text-gray-600 hover:text-openai-green active:text-openai-green transition-colors">
                  Auto Shopper
                </Link>
                <Link href="/bots/gov-spending-tracker" className="flex items-center min-h-[44px] text-base text-gray-600 hover:text-openai-green active:text-openai-green transition-colors">
                  Gov Spending Tracker
                </Link>
                <Link href="/bots/legal-expert" className="flex items-center min-h-[44px] text-base text-gray-600 hover:text-openai-green active:text-openai-green transition-colors">
                  Legal Expert
                </Link>
                <Link href="/bots/medical-expert" className="flex items-center min-h-[44px] text-base text-gray-600 hover:text-openai-green active:text-openai-green transition-colors">
                  Medical Expert
                </Link>
                <Link href="/bots/swiss-german-teacher" className="flex items-center min-h-[44px] text-base text-gray-600 hover:text-openai-green active:text-openai-green transition-colors">
                  Swiss German Teacher
                </Link>
              </div>
            </div>
            
            {/* Other Navigation Items */}
            <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-openai-green">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-openai-green">
              About
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-opacity"
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </Fragment>
  );
}
