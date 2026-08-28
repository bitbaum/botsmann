'use client';

import { Fragment, useRef } from 'react';
import Link from 'next/link';
import { Popover, Transition, Portal } from '@headlessui/react';
import type { NavItemProps } from '@/types/navigation';
import { MegaMenuPanel } from './MegaMenuPanel';
import { ChevronIcon } from '@/components/icons';

/**
 * Navigation item that renders as either:
 * - Simple link (no children)
 * - Megamenu dropdown (with children)
 * - CTA button (isButton: true)
 *
 * Uses Portal for proper overlay handling
 */
export function NavItem({ item, isActive, onNavigate }: NavItemProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Calculate position dynamically on each render for reliable positioning
  const getDropdownStyle = () => {
    if (!buttonRef.current) return {};
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      position: 'fixed' as const,
      top: rect.bottom + 8,
      left: rect.left,
      zIndex: 9999,
    };
  };

  // CTA Button variant
  if (item.isButton) {
    return (
      <Link
        href={item.path}
        className="rounded-btn bg-action px-4 py-2 text-sm font-medium text-white hover:bg-action-hover transition-colors"
      >
        {item.label}
      </Link>
    );
  }

  // Simple link (no children)
  if (!item.children || item.children.length === 0) {
    return (
      <Link
        href={item.path}
        className={`text-sm font-medium transition-colors ${
          isActive ? 'text-action' : 'text-gray-600'
        } hover:text-action`}
      >
        {item.label}
      </Link>
    );
  }

  // Megamenu dropdown
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            ref={buttonRef}
            className={`group inline-flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none ${
              open || isActive ? 'text-action' : 'text-gray-600'
            } hover:text-action`}
          >
            {item.label}
            <ChevronIcon open={open} className="h-4 w-4" />
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
              <Popover.Panel static style={getDropdownStyle()} className="w-screen max-w-2xl">
                <MegaMenuPanel
                  items={item.children!}
                  config={item.megaMenu}
                  onNavigate={() => {
                    close();
                    onNavigate?.();
                  }}
                />
              </Popover.Panel>
            </Transition>
          </Portal>
        </>
      )}
    </Popover>
  );
}
