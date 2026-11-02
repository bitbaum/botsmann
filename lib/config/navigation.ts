/**
 * Navigation Configuration - SSOT
 * @module lib/config/navigation
 *
 * Shared navigation items for authenticated users.
 * Used by AuthNav (desktop dropdown) and MobileNav (mobile drawer).
 */

import type { FC, SVGProps } from 'react';
import type { Route } from 'next';
import {
  DashboardIcon,
  NavDocumentIcon,
  BotIcon,
  ProfileIcon,
  NavSettingsIcon,
  SignOutIcon,
} from '@/components/icons';

type IconComponent = FC<SVGProps<SVGSVGElement>>;

export interface AuthNavItem {
  label: string;
  href: Route;
  icon: IconComponent;
  section: 'main' | 'account';
}

export const AUTH_NAV_ITEMS: AuthNavItem[] = [
  { label: 'Dashboard', href: '/dashboard' as Route, icon: DashboardIcon, section: 'main' },
  { label: 'My Documents', href: '/documents' as Route, icon: NavDocumentIcon, section: 'main' },
  { label: 'My Bots', href: '/bots/create' as Route, icon: BotIcon, section: 'main' },
  { label: 'Profile', href: '/profile' as Route, icon: ProfileIcon, section: 'account' },
  { label: 'Settings', href: '/settings' as Route, icon: NavSettingsIcon, section: 'account' },
  // Password, passkeys, second factor, linked sign-ins, deletion (AccountKit).
  {
    label: 'Sign-in and security',
    href: '/account' as Route,
    icon: ProfileIcon,
    section: 'account',
  },
];

export const SIGN_OUT_ICON = SignOutIcon;
