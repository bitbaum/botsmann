'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { menuItems } from '@/data/menuItems';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-8">
        {menuItems.map((item) => {
          if (item.isButton) return null;
          const isActive = pathname === item.path;

          return (
            <div key={item.label} className="relative">
              {item.children ? (
                // Dropdown menu for items with children
                <div className="relative group">
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-all duration-200 ${
                      isActive ? 'text-openai-green' : 'text-gray-600'
                    } hover:text-openai-green`}
                  >
                    {item.label}
                    <svg
                      className="h-4 w-4 transition-transform group-hover:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Panel */}
                  <div className="absolute left-1/2 top-full mt-2 w-80 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                      {/* Header */}
                      {item.label === 'Bots' && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🤖</span>
                            <div>
                              <h3 className="font-semibold text-gray-900 text-sm">Specialized AI Bots</h3>
                              <p className="text-xs text-gray-600">Expert assistants for every domain</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Items Grid */}
                      <div className="p-3 grid gap-1 grid-cols-2">
                        {item.children?.map((child) => (
                          <Link
                            key={child.label}
                            href={child.path}
                            className="group flex items-start gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors"
                          >
                            {child.icon && (
                              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-lg group-hover:bg-openai-green group-hover:text-white transition-colors">
                                {child.icon}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 group-hover:text-openai-green transition-colors">
                                {child.label}
                              </p>
                              {child.description && (
                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                  {child.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Footer */}
                      {item.label === 'Bots' && (
                        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
                          <Link
                            href="/bots"
                            className="flex items-center justify-between text-sm font-medium text-gray-900 hover:text-openai-green transition-colors"
                          >
                            <span>View all bots</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // Regular menu item
                <Link
                  href={item.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-openai-green' : 'text-gray-600'
                  } hover:text-openai-green`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}

        {/* CTA Button */}
        <Link
          href="/contact"
          className="bg-openai-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm"
        >
          Contact Us
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        onClick={() => setMobileMenuOpen(true)}
      >
        <span className="sr-only">Open menu</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      <Transition.Root show={mobileMenuOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setMobileMenuOpen}>
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
                  <Dialog.Title className="text-lg font-medium text-gray-900">Menu</Dialog.Title>
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mt-8 flow-root px-4">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {menuItems.map((item) => (
                        <div key={item.label}>
                          <Link
                            href={item.path}
                            className={`block px-3 py-2 text-base font-medium transition-colors ${
                              pathname === item.path
                                ? 'text-openai-green bg-green-50'
                                : 'text-gray-900 hover:bg-gray-50'
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                          {item.children && (
                            <div className="ml-6 mt-2 space-y-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.path}
                                  className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
