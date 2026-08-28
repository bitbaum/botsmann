'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { UserAvatar } from '@/components/shared';
import { ChevronIcon } from '@/components/icons';
import { AUTH_NAV_ITEMS, SIGN_OUT_ICON } from '@/lib/config/navigation';

const SignOutIcon = SIGN_OUT_ICON;

/**
 * Authentication navigation component
 * Shows login/register for guests, profile dropdown for authenticated users
 */
export function AuthNav() {
  const { user, loading, signOut, displayName, avatarUrl } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-8 w-16 bg-gray-100 rounded animate-pulse" />
      </div>
    );
  }

  // Guest state - show login/register
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/auth/signin"
          className="text-sm font-medium text-gray-700 hover:text-action transition-colors"
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          Register
        </Link>
      </div>
    );
  }

  const closeDropdown = () => setDropdownOpen(false);

  const mainItems = AUTH_NAV_ITEMS.filter((item) => item.section === 'main');
  const accountItems = AUTH_NAV_ITEMS.filter((item) => item.section === 'account');

  // Authenticated state - show profile dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-action transition-colors"
      >
        <UserAvatar email={user.email} initial={displayName?.[0]} avatarUrl={avatarUrl} size="sm" />
        <ChevronIcon open={dropdownOpen} className="w-4 h-4" />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {displayName || 'Welcome!'}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          {/* Main Navigation */}
          <div className="py-1">
            {mainItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={closeDropdown}
              >
                <item.icon className="w-5 h-5 text-gray-400" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Account Section */}
          <div className="border-t border-gray-100 py-1">
            {accountItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={closeDropdown}
              >
                <item.icon className="w-5 h-5 text-gray-400" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Sign Out */}
          <div className="border-t border-gray-100 py-1">
            <button
              onClick={() => {
                signOut();
                closeDropdown();
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <SignOutIcon className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
