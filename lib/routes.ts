/**
 * Route Constants & Utilities
 *
 * SSOT for route paths and route-related helper functions.
 * Import from here instead of hardcoding path strings.
 */

import type { Route } from 'next';

/**
 * Application route paths (SSOT)
 */
export const ROUTES = {
  HOME: '/',
  // New primary routes
  PROFESSIONALS: '/professionals',
  ENTERPRISE: '/enterprise',
  MY_DATA: '/my-data',
  PERSONAL: '/personal',
  // Legacy routes (keep for redirects)
  BOTS: '/bots',
  DOCUMENTS: '/documents',
  // Content
  BLOG: '/blog',
  KNOWLEDGE: '/knowledge',
  CONTACT: '/contact',
  ABOUT: '/about',
  // User routes
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  INFRASTRUCTURE: '/infrastructure',
  // Other
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CALLBACK: '/auth/callback',
    VERIFY_EMAIL: '/auth/verify-email',
  },
} as const;

/**
 * Route patterns for matching
 */
export const ROUTE_PATTERNS = {
  /** Matches professional detail pages like /professionals/legal, /professionals/health */
  PROFESSIONAL_DETAIL: /^\/professionals\/[\w-]+$/,
  /** Matches bot detail pages like /bots/legal-expert, /bots/research-assistant */
  BOT_DETAIL: /^\/bots\/[\w-]+$/,
} as const;

/**
 * Check if a pathname is a professional detail page
 * Professional detail pages are immersive experiences that hide the main header
 *
 * @param pathname - Current route pathname
 * @returns true if on a professional detail page (e.g., /professionals/legal)
 */
export const isProfessionalDetailPage = (pathname: string | null): boolean => {
  if (!pathname) return false;
  return ROUTE_PATTERNS.PROFESSIONAL_DETAIL.test(pathname);
};

/**
 * Check if a pathname is a bot detail page (legacy)
 * Bot detail pages are immersive experiences that hide the main header
 *
 * @param pathname - Current route pathname
 * @returns true if on a bot detail page (e.g., /bots/legal-expert)
 */
export const isBotDetailPage = (pathname: string | null): boolean => {
  if (!pathname) return false;
  return ROUTE_PATTERNS.BOT_DETAIL.test(pathname);
};

/**
 * Check if a pathname is an immersive page (professional or bot detail)
 *
 * @param pathname - Current route pathname
 * @returns true if on an immersive detail page
 */
export const isImmersivePage = (pathname: string | null): boolean => {
  return isProfessionalDetailPage(pathname) || isBotDetailPage(pathname);
};

/**
 * Generate a professional detail page path
 *
 * @param slug - Professional slug identifier
 * @returns Full path to professional detail page (typed for Next.js Link)
 */
export const getProfessionalPath = (slug: string): Route => {
  return `${ROUTES.PROFESSIONALS}/${slug}` as Route;
};

/**
 * Generate a bot detail page path (legacy)
 *
 * @param slug - Bot slug identifier
 * @returns Full path to bot detail page (typed for Next.js Link)
 */
export const getBotPath = (slug: string): Route => {
  return `${ROUTES.BOTS}/${slug}` as Route;
};
