'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import type { ProductDropdownProps } from './types';

export function ProductDropdown({ isOpen, onToggle, item }: ProductDropdownProps) {
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

  const productLinks = [
    {
      id: 'voting',
      label: 'Open Vote',
      description: 'Participate in decentralized decision-making',
      path: '/projects/governance/open-vote',
      icon: '🗳️'
    },
    {
      id: 'proposals',
      label: 'Open Law',
      description: 'Create and manage governance proposals',
      path: '/projects/governance/open-law',
      icon: '📜'
    },
    {
      id: 'analytics',
      label: 'Open Analytics',
      description: 'Track governance metrics and insights',
      path: '/projects/governance/open-pay',
      icon: '📊'
    }
  ];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
        aria-expanded={isOpen}
      >
        <span>{item.label}</span>
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
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">Products</h3>
          </div>
          <div className="py-1">
            {productLinks.map((product) => (
              <Link
                key={product.id}
                href={product.path as Route}
                className="flex items-start px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl mr-3">{product.icon}</span>
                <div>
                  <div className="text-sm font-medium text-gray-900">{product.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{product.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 