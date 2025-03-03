'use client';

import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure, Transition, Menu } from '@headlessui/react';
import { menuItems } from '@/data/menuItems';
import { createPortal } from 'react-dom';

export default function Navigation() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  
  // State to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  // Only enable portal on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-8">
        <div className="flex-1 flex items-center space-x-8">
          {menuItems.map((item, i) => {
            // Skip the button-style links - will handle separately
            if (item.isButton) return null;

            // Check if current path matches this menu item
            const isActive = pathname === item.path || 
                          (pathname?.startsWith(item.path) && item.path !== '/');

            // Items with children need dropdown handling
            if (item.children && item.children.length > 0) {
              return (
                <div 
                  key={i} 
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(i)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link 
                    href={item.path}
                    className={`text-sm font-medium ${isActive ? 'text-openai-green' : 'text-gray-600'} hover:text-openai-green transition-colors`}
                  >
                    {item.label}
                  </Link>
                  
                  <Transition
                    show={openDropdown === i}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <div className="absolute left-0 w-48 mt-2 origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="py-1">
                        {item.children.map((child, j) => {
                          const isChildActive = pathname === child.path;
                          return (
                            <Link 
                              key={j}
                              href={child.path}
                              className={`${
                                isChildActive ? 'bg-gray-100 text-openai-green' : 'text-gray-700'
                              } block px-4 py-2 text-sm hover:bg-gray-100 hover:text-openai-green`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </Transition>
                </div>
              );
            }

            // Regular menu items without children
            return (
              <Link 
                key={i}
                href={item.path}
                className={`text-sm font-medium ${isActive ? 'text-openai-green' : 'text-gray-600'} hover:text-openai-green transition-colors`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        
        {/* Call to Action Button - right aligned */}
        <div className="flex-shrink-0">
          {menuItems.map((item, i) => {
            if (item.isButton) {
              return (
                <Link 
                  key={i}
                  href={item.path}
                  className="rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-opacity"
                >
                  {item.label}
                </Link>
              );
            }
            return null;
          })}
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <Disclosure as="div" className="lg:hidden">
        {({ open, close }) => (
          <>
            <Disclosure.Button 
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-openai-green"
              aria-controls="mobile-menu"
              aria-expanded={open}
            >
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
            
            {/* Portal for menu and backdrop - renders directly to body */}
            {isMounted && open && createPortal(
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 bg-black/50 z-[999]" 
                  onClick={() => close()}
                  aria-hidden="true"
                />
                
                {/* Menu Panel */}
                <div 
                  className="fixed right-0 top-0 bottom-0 z-[1000] w-full max-w-sm bg-white shadow-lg overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button 
                      onClick={() => close()}
                      className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <nav className="p-4 space-y-4">
                    {menuItems.map((item, i) => (
                      <Link
                        key={i}
                        href={item.path}
                        className={`block px-3 py-2 rounded-md ${
                          pathname === item.path 
                            ? 'bg-gray-100 text-openai-green' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => close()}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </>,
              document.body
            )}
            
            {/* Body scroll lock */}
            <MobileMenuEffect isOpen={open} />
          </>
        )}
      </Disclosure>
    </>
  );
}

// Body scroll lock component
function MobileMenuEffect({ isOpen }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  return null;
}