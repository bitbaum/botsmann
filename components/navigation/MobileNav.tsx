'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import type { MobileNavProps } from '@/types/navigation';
import { useAuth } from '@/lib/auth';
import { Logo, UserAvatar } from '@/components/shared';
import { CloseIcon } from '@/components/icons';
import { AUTH_NAV_ITEMS, SIGN_OUT_ICON } from '@/lib/config/navigation';

/**
 * Mobile navigation drawer
 * Renders as slide-in panel from right side
 * Handles nested menu items with indentation
 */
export function MobileNav({ isOpen, onClose, items, currentPath }: MobileNavProps) {
  const { user, loading, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
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
          <div className="fixed inset-0 bg-gray-900/50 transition-opacity" />
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
                    <div className="flex items-center justify-between px-4 py-6 border-b border-edge bg-action-tint">
                      <div className="flex items-center gap-3">
                        <Logo href={null} showText={false} size="sm" />
                        <Dialog.Title className="text-lg font-semibold text-gray-900">
                          Menu
                        </Dialog.Title>
                      </div>
                      <button
                        type="button"
                        className="rounded-md p-2 text-gray-400 hover:bg-white/50"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close menu</span>
                        <CloseIcon className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Menu Items */}
                    <div className="flex-1 px-4 py-6">
                      <nav className="space-y-1">
                        {items.map((item) => (
                          <div key={item.label}>
                            {/* Parent Item */}
                            <Link
                              href={item.path}
                              className={`flex items-center px-3 py-2 rounded-btn text-base font-medium transition-colors ${
                                currentPath === item.path
                                  ? 'bg-action-tint text-action'
                                  : 'text-ink hover:bg-action-tint'
                              } ${item.isButton ? 'bg-action text-white hover:bg-action-hover' : ''}`}
                              onClick={onClose}
                            >
                              {item.label}
                            </Link>

                            {/* Child Items */}
                            {item.children && item.children.length > 0 && (
                              <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100 pl-4">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.label}
                                    href={child.path}
                                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                                    onClick={onClose}
                                  >
                                    {child.icon && <span className="text-lg">{child.icon}</span>}
                                    <span>{child.label}</span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </nav>
                    </div>

                    {/* Auth Section */}
                    <div className="border-t border-gray-200 px-4 py-6 bg-gray-50">
                      {loading ? (
                        <div className="h-10 bg-gray-200 rounded animate-pulse" />
                      ) : user ? (
                        <div className="space-y-4">
                          {/* User Info */}
                          <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                            <UserAvatar email={user.email} size="md" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>

                          {/* Quick Links */}
                          <div className="space-y-1">
                            {AUTH_NAV_ITEMS.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-white transition-colors"
                                onClick={onClose}
                              >
                                <item.icon className="w-5 h-5 text-gray-400" />
                                {item.label}
                              </Link>
                            ))}
                          </div>

                          {/* Sign Out */}
                          <button
                            onClick={handleSignOut}
                            className="flex items-center justify-center gap-2 w-full px-3 py-2.5 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <SIGN_OUT_ICON className="w-5 h-5" />
                            Sign Out
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <Link
                            href="/auth/signin"
                            className="flex-1 text-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                            onClick={onClose}
                          >
                            Login
                          </Link>
                          <Link
                            href="/auth/signup"
                            className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-action rounded-btn hover:bg-action-hover"
                            onClick={onClose}
                          >
                            Register
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
