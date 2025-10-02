'use client';

import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { menuItems } from '@/data/menuItems';
import MegaMenu from './MegaMenu';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="hidden lg:flex items-center space-x-8">
        <div className="flex-1 flex items-center space-x-8">
          {menuItems.map((item) => {
            if (item.isButton) return null;
            const isActive = pathname === item.path;
            if (item.children) {
              return <MegaMenu key={item.label} item={item} isActive={isActive} />;
            }
            return (
              <Link
                key={item.label}
                href={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActive ? 'text-openai-green' : 'text-gray-600'
                } hover:text-openai-green`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="flex-shrink-0">
          {menuItems.map(
            (item) =>
              item.isButton && (
                <Link
                  key={item.label}
                  href={item.path}
                  className="rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-opacity"
                >
                  {item.label}
                </Link>
              )
          )}
        </div>
      </nav>

      {/* Mobile menu button */}
      <button
        type="button"
        className="lg:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-openai-green"
        onClick={() => setMobileMenuOpen(true)}
      >
        <span className="sr-only">Open menu</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile menu slide-in overlay */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setMobileMenuOpen}>
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
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      {/* Header */}
                      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                        <Dialog.Title className="text-lg font-semibold text-gray-900">
                          Menu
                        </Dialog.Title>
                        <button
                          type="button"
                          className="rounded-md p-2 text-gray-400 hover:bg-gray-100"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Menu Items */}
                      <div className="flex-1 px-4 py-6">
                        <nav className="space-y-1">
                          {menuItems.map((item) => (
                            <div key={item.label}>
                              <Link
                                href={item.path}
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                  pathname === item.path
                                    ? 'bg-openai-green bg-opacity-10 text-openai-green'
                                    : 'text-gray-700 hover:bg-gray-100'
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
                                      className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {child.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
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
    </>
  );
}
