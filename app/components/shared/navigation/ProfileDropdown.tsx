'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import type { ProfileDropdownProps } from './types';

export function ProfileDropdown({ isOpen, onToggle }: ProfileDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onToggle();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const profileLinks = [
    {
      id: 'portal',
      label: 'Portal',
      path: '/projects/governance/portal'
    }
  ];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
        aria-expanded={isOpen}
      >
        <span>Profile</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">Account</h3>
          </div>
          <div className="py-1">
            {profileLinks.map((link) => (
              <Link
                key={link.id}
                href={link.path as Route}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 