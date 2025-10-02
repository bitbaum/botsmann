'use client';

import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import type { MenuItem } from '@/types/navigation';

interface MegaMenuProps {
  item: MenuItem;
  isActive?: boolean;
}

export default function MegaMenu({ item, isActive }: MegaMenuProps) {
  if (!item.children) return null;

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`group inline-flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none ${
              open || isActive ? 'text-openai-green' : 'text-gray-600'
            } hover:text-openai-green`}
          >
            {item.label}
            <svg
              className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-0 top-full z-50 mt-2 w-screen max-w-2xl transform px-4 sm:px-0">
              <div className="overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 border border-gray-100">
                {/* Header Section */}
                {item.label === 'Bots' && (
                  <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                    <h3 className="text-sm font-semibold text-gray-900">Specialized AI Bots</h3>
                    <p className="mt-1 text-xs text-gray-600">
                      Ingest data → AI analysis → Actionable outputs
                    </p>
                  </div>
                )}

                {/* Menu Items Grid */}
                <div className="relative grid gap-1 bg-white p-4 lg:grid-cols-2">
                  {item.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.path}
                      onClick={() => close()}
                      className="group flex items-start gap-3 rounded-lg p-3 transition-all hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 focus:outline-none focus:ring-2 focus:ring-openai-green focus:ring-offset-2"
                    >
                      {/* Icon */}
                      {child.icon && (
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xl transition-colors group-hover:bg-white">
                          {child.icon}
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-openai-green transition-colors">
                          {child.label}
                        </p>
                        {child.description && (
                          <p className="mt-1 text-xs leading-relaxed text-gray-600 line-clamp-2">
                            {child.description}
                          </p>
                        )}
                      </div>

                      {/* Arrow indicator */}
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-gray-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>

                {/* Footer CTA */}
                {item.label === 'Bots' && (
                  <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                    <Link
                      href="/bots"
                      onClick={() => close()}
                      className="group flex items-center justify-between text-sm font-medium text-gray-900 hover:text-openai-green transition-colors"
                    >
                      <span>View all bots</span>
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
