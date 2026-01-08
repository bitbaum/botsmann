'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';

interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  section?: string;
}

interface BotPageHeaderProps {
  botTitle: string;
  botEmoji: string;
  botSlug: string;
  menuItems: MenuItem[];
  accentColor?: 'blue' | 'green' | 'indigo' | 'red' | 'amber';
}

const BotPageHeader: React.FC<BotPageHeaderProps> = ({
  botTitle,
  botEmoji,
  botSlug,
  menuItems,
  accentColor = 'green',
}) => {
  const _pathname = usePathname();
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll events to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently in view
      const sectionIds = menuItems
        .filter(item => item.section)
        .map(item => item.section as string);

      const sectionElements = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.getBoundingClientRect().top <= 100) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems]);

  // Handle smooth scrolling when clicking a menu item
  const scrollToSection = (sectionId: string | undefined) => {
    if (!sectionId) return;

    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const colorClasses = {
    blue: {
      logo: 'bg-blue-100',
      title: 'text-blue-900',
      active: 'text-blue-700 bg-blue-50',
      hover: 'hover:text-blue-700 hover:bg-blue-50',
      accent: 'bg-blue-600 hover:bg-blue-700',
      border: 'border-blue-300',
    },
    green: {
      logo: 'bg-green-100',
      title: 'text-green-900',
      active: 'text-green-700 bg-green-50',
      hover: 'hover:text-green-700 hover:bg-green-50',
      accent: 'bg-green-600 hover:bg-green-700',
      border: 'border-green-300',
    },
    indigo: {
      logo: 'bg-indigo-100',
      title: 'text-indigo-900',
      active: 'text-indigo-700 bg-indigo-50',
      hover: 'hover:text-indigo-700 hover:bg-indigo-50',
      accent: 'bg-indigo-600 hover:bg-indigo-700',
      border: 'border-indigo-300',
    },
    red: {
      logo: 'bg-red-100',
      title: 'text-red-900',
      active: 'text-red-700 bg-red-50',
      hover: 'hover:text-red-700 hover:bg-red-50',
      accent: 'bg-red-600 hover:bg-red-700',
      border: 'border-red-300',
    },
    amber: {
      logo: 'bg-amber-100',
      title: 'text-amber-900',
      active: 'text-amber-700 bg-amber-50',
      hover: 'hover:text-amber-700 hover:bg-amber-50',
      accent: 'bg-amber-600 hover:bg-amber-700',
      border: 'border-amber-300',
    },
  };

  const colors = colorClasses[accentColor as keyof typeof colorClasses] || colorClasses.green;

  return (
    <>
      {/* Bot Page Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-2xl border-b border-gray-100/50 shadow-sm">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex h-16 items-center justify-between px-6">
            {/* Left: Botsmann Logo + Bot Info */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="group flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-openai-green to-green-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-openai-green to-green-600 text-white font-bold text-lg px-3 py-1.5 rounded-lg shadow-lg">
                    B
                  </div>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent hidden sm:block">
                  Botsmann
                </span>
              </Link>

              {/* Divider */}
              <div className="w-px h-6 bg-gray-300 hidden md:block" />

              {/* Bot Info */}
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${colors.logo} rounded-full flex items-center justify-center`}>
                  <span className="text-lg">{botEmoji}</span>
                </div>
                <div>
                  <h1 className={`text-lg font-bold ${colors.title} hidden sm:block`}>
                    {botTitle}
                  </h1>
                  <p className="text-xs text-gray-500 hidden md:block">
                    AI-Powered Assistant
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Navigation & Actions */}
            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.section)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
                      activeSection === item.section
                        ? `${colors.active} border ${colors.border}`
                        : `text-gray-600 ${colors.hover}`
                    }`}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* CTA Button */}
              <Link
                href={botSlug === 'legal-expert' ? `/bots/${botSlug}/demo` : `/bots/${botSlug}`}
                className={`px-4 py-2 ${colors.accent} text-white text-sm font-medium rounded-lg transition-colors shadow-sm`}
              >
                {botSlug === 'legal-expert' ? 'Try Demo' : `Try ${botTitle}`}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <Transition.Root show={isMobileMenuOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setIsMobileMenuOpen}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={React.Fragment}
              enter="ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    {botTitle} Menu
                  </Dialog.Title>
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mt-8 px-4">
                  <nav className="space-y-2">
                    {/* All Bots link */}
                    <Link
                      href="/bots"
                      className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      All Bots
                    </Link>

                    <hr className="border-gray-200" />

                    {/* Section links */}
                    {menuItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.section)}
                        className={`w-full text-left flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                          activeSection === item.section
                            ? `${colors.active}`
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {item.icon && <span className="mr-3 text-lg">{item.icon}</span>}
                        <span>{item.label}</span>
                      </button>
                    ))}

                    <hr className="border-gray-200" />

                    <Link
                      href={botSlug === 'legal-expert' ? `/bots/${botSlug}/demo` : `/bots/${botSlug}`}
                      className={`w-full flex items-center justify-center px-4 py-3 ${colors.accent} text-white text-base font-medium rounded-lg transition-colors`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {botSlug === 'legal-expert' ? 'Try Demo' : `Try ${botTitle}`}
                    </Link>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default BotPageHeader;


