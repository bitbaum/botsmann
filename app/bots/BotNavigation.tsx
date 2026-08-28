'use client';

import React, { useState, Fragment } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { Dialog, Transition } from '@headlessui/react';
import { BotSwitcher, SiteMenuDropdown } from '@/components/navigation';
import { Logo } from '@/components/shared/Logo';
import { menuItems } from '@/data/menuItems';
import { useScrollNavigation, getNavColors } from '@/lib/hooks';
import type { BotMenuItem } from '@/types/bot';

interface BotNavigationProps {
  botSlug: string;
  botTitle: string;
  botEmoji: string;
  botDescription?: string;
  accentColor?: string;
  menuItems: BotMenuItem[];
  chatLink?: string;
  sections?: boolean;
}

/**
 * Reusable navigation component for bot detail pages
 * Uses shared scroll navigation hook and centralized color config
 */
export const BotNavigation: React.FC<BotNavigationProps> = ({
  botSlug,
  botTitle,
  botEmoji,
  botDescription: _botDescription = '',
  accentColor = 'blue',
  menuItems: sectionMenuItems,
  chatLink,
  sections = true,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Use shared scroll navigation hook
  const { activeSection, isScrolled, scrollToSection } = useScrollNavigation({
    menuItems: sectionMenuItems,
    scrollOffset: 300,
    enabled: sections,
  });

  // Filter site nav items (exclude button items like "Contact Us")
  const siteNavItems = menuItems.filter((item) => !item.isButton);

  // Handle scroll to section with mobile menu close
  const handleScrollToSection = (sectionId: string | undefined) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  // Get color classes from centralized config
  const colors = getNavColors();

  const navClasses = isScrolled
    ? 'bg-surface shadow-md border-b border-edge'
    : 'bg-surface border-b border-edge';

  return (
    <nav
      className={`transition-all duration-300 w-full py-3 fixed top-0 left-0 right-0 z-50 ${navClasses}`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-12">
          {/* Left side: Botsmann logo + divider + Bot Switcher */}
          <div className="flex items-center h-full">
            {/* Botsmann 'B' mark — the shared Logo, so it cannot drift again */}
            <Logo href="/" showText={false} size="sm" />

            {/* Vertical divider */}
            <div className="h-6 w-px bg-edge mx-3" />

            {/* Bot Switcher dropdown */}
            <BotSwitcher
              currentBotSlug={botSlug}
              currentBotTitle={botTitle}
              currentBotEmoji={botEmoji}
              accentColor={accentColor}
            />
          </div>

          {/* Center: Desktop section navigation */}
          <div className="hidden md:flex md:space-x-1 items-center overflow-x-auto no-scrollbar">
            {sectionMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollToSection(item.section)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex items-center ${
                  activeSection === item.section ? colors.active : `text-ink-muted ${colors.hover}`
                } ${item.id === 'roadmap' ? `border ${colors.border}` : ''}`}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right side: Site menu + Chat button */}
          <div className="flex items-center gap-2">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-ink-muted hover:text-ink hover:bg-paper focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Desktop: Site menu dropdown */}
            <SiteMenuDropdown className="hidden md:block" />

            {/* Call-to-action button */}
            {chatLink && (
              <Link
                href={chatLink as Route}
                className={`px-4 py-2 ${colors.accent} text-white text-sm font-medium rounded-md transition-colors shadow-sm whitespace-nowrap`}
              >
                Open Chat
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu slide-in overlay */}
      <Transition.Root show={isMobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setIsMobileMenuOpen}>
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-surface shadow-xl">
                      {/* Header with Botsmann branding */}
                      <div className="flex items-center justify-between px-4 py-6 border-b border-edge bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm rounded-lg">
                            B
                          </div>
                          <Dialog.Title className="text-lg font-semibold text-ink">
                            Botsmann
                          </Dialog.Title>
                        </div>
                        <button
                          type="button"
                          className="rounded-md p-2 text-ink-muted hover:bg-surface/50"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Menu Items */}
                      <div className="flex-1 px-4 py-6">
                        <nav className="space-y-1">
                          {/* Home link */}
                          <Link
                            href="/"
                            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-ink hover:bg-paper"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <svg
                              className="w-5 h-5 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                              />
                            </svg>
                            Home
                          </Link>

                          {/* All Bots link */}
                          <Link
                            href="/bots"
                            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-ink hover:bg-paper"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <svg
                              className="w-5 h-5 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            All Bots
                          </Link>

                          <hr className="my-4 border-edge" />

                          {/* Site Navigation */}
                          <p className="px-3 text-xs font-medium text-ink-muted uppercase tracking-wider mb-2">
                            Botsmann
                          </p>
                          {siteNavItems.map((item) => (
                            <Link
                              key={item.label}
                              href={item.path}
                              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-ink hover:bg-paper"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span>{item.label}</span>
                            </Link>
                          ))}

                          <hr className="my-4 border-edge" />

                          {/* Bot Section links */}
                          <p className="px-3 text-xs font-medium text-ink-muted uppercase tracking-wider mb-2">
                            {botTitle} Sections
                          </p>
                          {sectionMenuItems.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleScrollToSection(item.section)}
                              className={`w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                activeSection === item.section
                                  ? colors.active
                                  : `text-ink hover:bg-paper`
                              }`}
                            >
                              {item.icon && <span className="mr-3 text-lg">{item.icon}</span>}
                              <span>{item.label}</span>
                            </button>
                          ))}

                          {chatLink && (
                            <>
                              <hr className="my-4 border-edge" />
                              <Link
                                href={chatLink as Route}
                                className={`w-full flex items-center justify-center px-4 py-3 ${colors.accent} text-white text-base font-medium rounded-md transition-colors`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                Open Chat
                              </Link>
                            </>
                          )}
                        </nav>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </nav>
  );
};

// Named export for consistency with best practices
// Default export kept for backwards compatibility with existing imports
export default BotNavigation;
