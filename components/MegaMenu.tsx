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
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel className="absolute left-1/2 z-50 mt-3 w-screen max-w-2xl -translate-x-1/2 transform px-4 sm:px-0">
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 border border-gray-100">
                {/* Header Section */}
                {item.label === 'Bots' && (
                  <div className="border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-openai-green to-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">🤖</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">Specialized AI Bots</h3>
                        <p className="mt-1 text-xs text-gray-600">
                          Ingest data → AI analysis → Actionable outputs
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Menu Items Grid */}
                <div className="relative grid gap-1 bg-white p-4 lg:grid-cols-2">
                  {item.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.path}
                      onClick={() => close()}
                      className="group flex items-start gap-4 rounded-xl p-4 transition-all hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 focus:outline-none focus:ring-2 focus:ring-openai-green focus:ring-offset-2"
                    >
                      {/* Icon */}
                      {child.icon && (
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white border-2 border-gray-200 shadow-sm text-2xl transition-all duration-200 group-hover:border-openai-green group-hover:bg-openai-green group-hover:text-white">
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
                        className="h-5 w-5 flex-shrink-0 text-gray-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-openai-green"
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
                  <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-green-50 px-6 py-4">
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
