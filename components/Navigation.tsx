'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { menuItems } from '@/data/menuItems';
import MegaMenu from '@/apps/web/components/nav/MegaMenu';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden lg:flex items-center space-x-8">
        <div className="flex-1 flex items-center space-x-8">
          {menuItems.map((item) => {
            if (item.isButton) return null;
            if (item.children) {
              return <MegaMenu key={item.label} item={item} />;
            }
            return (
              <Link
                key={item.label}
                href={item.path}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.path ? 'text-openai-green' : 'text-gray-600'
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

      <Disclosure as="div" className="lg:hidden">
        {({ open, close }) => (
          <>
            <Disclosure.Button className="rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-openai-green">
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              {open ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Disclosure.Button>
            <Disclosure.Panel className="space-y-2 pt-2 pb-3">
              {menuItems.map((item) => (
                item.children ? (
                  <Disclosure key={item.label} as="div" className="px-4">
                    {({ open: subOpen }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between py-2 text-gray-700">
                          <span>{item.label}</span>
                          <svg
                            className={`h-4 w-4 transform transition-transform ${subOpen ? 'rotate-180' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Disclosure.Button>
                        <Disclosure.Panel className="space-y-1 pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.path}
                              className="block py-1 text-gray-600 text-sm"
                              onClick={() => close()}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ) : (
                  <div key={item.label} className="px-4">
                    <Link href={item.path} className="block py-2 text-gray-700" onClick={() => close()}>
                      {item.label}
                    </Link>
                  </div>
                )
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
