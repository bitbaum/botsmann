'use client';

import { Fragment, useRef } from 'react';
import { Popover, Transition, Portal } from '@headlessui/react';
import Link from 'next/link';
import { menuItems } from '@/data/menuItems';

interface SiteMenuDropdownProps {
  className?: string;
}

export function SiteMenuDropdown({ className = '' }: SiteMenuDropdownProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Filter out button items (like "Contact Us" which is styled as CTA)
  const navItems = menuItems.filter((item) => !item.isButton);

  // Get button position for portal positioning
  const getDropdownStyle = () => {
    if (!buttonRef.current) return {};
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      position: 'fixed' as const,
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
      zIndex: 9999,
    };
  };

  return (
    <Popover className={className}>
      {({ open, close }) => (
        <>
          <Popover.Button
            ref={buttonRef}
            className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors focus:outline-none ${
              open
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            aria-label="Site navigation menu"
          >
            {/* Hamburger icon */}
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
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
          </Popover.Button>

          <Portal>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel static style={getDropdownStyle()} className="w-56">
                <div className="overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black/5 border border-gray-100">
                  {/* Header */}
                  <div className="border-b border-gray-100 bg-action-tint px-4 py-3">
                    <Link href="/" onClick={() => close()} className="flex items-center gap-2">
                      <div className="bg-action text-white font-bold text-sm px-2 py-1 rounded">
                        B
                      </div>
                      <span className="text-sm font-semibold text-gray-900">Botsmann</span>
                    </Link>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.path}
                        onClick={() => close()}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm font-medium text-gray-700 hover:text-gray-900">
                          {item.label}
                        </span>
                        {item.children && (
                          <svg
                            className="w-3 h-3 text-gray-400 ml-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        )}
                      </Link>
                    ))}
                  </div>

                  {/* Footer - Contact */}
                  <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
                    <Link
                      href="/contact"
                      onClick={() => close()}
                      className="flex items-center justify-center gap-2 rounded-lg bg-action px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Portal>
        </>
      )}
    </Popover>
  );
}
