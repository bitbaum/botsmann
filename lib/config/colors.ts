/**
 * Accent Colors Configuration - SSOT
 * @module lib/config/colors
 *
 * Single source of truth for all accent colors used throughout the app.
 * All color types, schemas, and Tailwind mappings should derive from here.
 */

import { z } from 'zod';

/**
 * All accent colors available in the system.
 * Used by bot templates and internal features.
 */
export const ACCENT_COLORS = [
  'blue',
  'green',
  'indigo',
  'red',
  'amber',
  'pink',
  'rose',
  'purple',
  'orange',
  'slate',
  'yellow',
  'sky',
  'stone',
  'violet',
  'cyan',
  'teal',
] as const;

/**
 * Accent colors available for custom bots (user-created).
 * Subset of ACCENT_COLORS - matches database CHECK constraint.
 */
export const CUSTOM_BOT_ACCENT_COLORS = ['blue', 'green', 'indigo', 'red', 'amber'] as const;

/**
 * Type for all accent colors in the system
 */
export type AccentColor = (typeof ACCENT_COLORS)[number];

/**
 * Type for custom bot accent colors (restricted set)
 */
export type CustomBotAccentColor = (typeof CUSTOM_BOT_ACCENT_COLORS)[number];

/**
 * Zod schema for all accent colors
 */
export const AccentColorSchema = z.enum(ACCENT_COLORS);

/**
 * Zod schema for custom bot accent colors (matches DB constraint)
 */
export const CustomBotAccentColorSchema = z.enum(CUSTOM_BOT_ACCENT_COLORS);

/**
 * Tailwind background color classes for each accent color (500 weight)
 */
export const ACCENT_COLOR_BG_CLASSES: Record<AccentColor, string> = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  indigo: 'bg-indigo-500',
  red: 'bg-red-500',
  amber: 'bg-amber-500',
  pink: 'bg-pink-500',
  rose: 'bg-rose-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  slate: 'bg-slate-500',
  yellow: 'bg-yellow-500',
  sky: 'bg-sky-500',
  stone: 'bg-stone-500',
  violet: 'bg-violet-500',
  cyan: 'bg-cyan-500',
  teal: 'bg-teal-500',
};

/**
 * Get the Tailwind bg class for an accent color
 * Falls back to purple if color not found
 */
export function getAccentColorBgClass(color: string): string {
  return ACCENT_COLOR_BG_CLASSES[color as AccentColor] || 'bg-purple-500';
}

/**
 * Color picker options with labels (for forms) - uses restricted set
 */
export const ACCENT_COLOR_OPTIONS = [
  { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
  { value: 'green', label: 'Green', class: 'bg-green-500' },
  { value: 'indigo', label: 'Indigo', class: 'bg-indigo-500' },
  { value: 'red', label: 'Red', class: 'bg-red-500' },
  { value: 'amber', label: 'Amber', class: 'bg-amber-500' },
] as const;

/**
 * Composite color classes for themed UI (supports all accent colors)
 */
export const COLOR_CLASSES: Record<AccentColor, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200' },
  green: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-200' },
  indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600', border: 'border-indigo-200' },
  red: { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-200' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-200' },
  pink: { bg: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-200' },
  rose: { bg: 'bg-rose-500', text: 'text-rose-600', border: 'border-rose-200' },
  purple: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-200' },
  orange: { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-200' },
  slate: { bg: 'bg-slate-500', text: 'text-slate-600', border: 'border-slate-200' },
  yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-yellow-200' },
  sky: { bg: 'bg-sky-500', text: 'text-sky-600', border: 'border-sky-200' },
  stone: { bg: 'bg-stone-500', text: 'text-stone-600', border: 'border-stone-200' },
  violet: { bg: 'bg-violet-500', text: 'text-violet-600', border: 'border-violet-200' },
  cyan: { bg: 'bg-cyan-500', text: 'text-cyan-600', border: 'border-cyan-200' },
  teal: { bg: 'bg-teal-500', text: 'text-teal-600', border: 'border-teal-200' },
};

/**
 * Border color classes (for restricted color set)
 */
export const ACCENT_BORDER_CLASSES: Record<CustomBotAccentColor, string> = {
  blue: 'border-blue-200 hover:border-blue-300',
  green: 'border-green-200 hover:border-green-300',
  indigo: 'border-indigo-200 hover:border-indigo-300',
  red: 'border-red-200 hover:border-red-300',
  amber: 'border-amber-200 hover:border-amber-300',
} as const;

/**
 * Light background color classes (for restricted color set)
 */
export const ACCENT_BG_CLASSES: Record<CustomBotAccentColor, string> = {
  blue: 'bg-blue-100',
  green: 'bg-green-100',
  indigo: 'bg-indigo-100',
  red: 'bg-red-100',
  amber: 'bg-amber-100',
} as const;

/**
 * Text color classes (for restricted color set)
 */
export const ACCENT_TEXT_CLASSES: Record<CustomBotAccentColor, string> = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  indigo: 'text-indigo-600',
  red: 'text-red-600',
  amber: 'text-amber-600',
} as const;

/**
 * Get border class for an accent color with fallback
 */
export function getAccentBorderClass(color: string | null | undefined): string {
  return ACCENT_BORDER_CLASSES[color as CustomBotAccentColor] || ACCENT_BORDER_CLASSES.blue;
}

/**
 * Get light background class for an accent color with fallback
 */
export function getAccentBgClass(color: string | null | undefined): string {
  return ACCENT_BG_CLASSES[color as CustomBotAccentColor] || ACCENT_BG_CLASSES.blue;
}

/**
 * Get text class for an accent color with fallback
 */
export function getAccentTextClass(color: string | null | undefined): string {
  return ACCENT_TEXT_CLASSES[color as CustomBotAccentColor] || ACCENT_TEXT_CLASSES.blue;
}

/**
 * Starter question hover classes for professional demos
 * Uses ProfessionalAccentColor set (includes 'purple')
 */
export const ACCENT_STARTER_HOVER_CLASSES: Record<string, string> = {
  blue: 'hover:border-blue-300 hover:bg-blue-50',
  green: 'hover:border-green-300 hover:bg-green-50',
  indigo: 'hover:border-indigo-300 hover:bg-indigo-50',
  red: 'hover:border-red-300 hover:bg-red-50',
  amber: 'hover:border-amber-300 hover:bg-amber-50',
  purple: 'hover:border-purple-300 hover:bg-purple-50',
};

/**
 * Focus border classes for professional demo inputs
 * Uses ProfessionalAccentColor set (includes 'purple')
 */
export const ACCENT_FOCUS_BORDER_CLASSES: Record<string, string> = {
  blue: 'focus:border-blue-500',
  green: 'focus:border-green-500',
  indigo: 'focus:border-indigo-500',
  red: 'focus:border-red-500',
  amber: 'focus:border-amber-500',
  purple: 'focus:border-purple-500',
};

/**
 * Button classes for themed submit buttons (restricted set)
 */
export const ACCENT_BUTTON_CLASSES: Record<CustomBotAccentColor, string> = {
  blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
  green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
  indigo: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
  red: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  amber: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
};

/**
 * Focus ring + border classes for form inputs (restricted set)
 */
export const ACCENT_FOCUS_RING_CLASSES: Record<CustomBotAccentColor, string> = {
  blue: 'focus:border-blue-500 focus:ring-blue-500',
  green: 'focus:border-green-500 focus:ring-green-500',
  indigo: 'focus:border-indigo-500 focus:ring-indigo-500',
  red: 'focus:border-red-500 focus:ring-red-500',
  amber: 'focus:border-amber-500 focus:ring-amber-500',
};

/**
 * Checkbox accent classes (restricted set)
 */
export const ACCENT_CHECKBOX_CLASSES: Record<CustomBotAccentColor, string> = {
  blue: 'text-blue-600 focus:ring-blue-500',
  green: 'text-green-600 focus:ring-green-500',
  indigo: 'text-indigo-600 focus:ring-indigo-500',
  red: 'text-red-600 focus:ring-red-500',
  amber: 'text-amber-600 focus:ring-amber-500',
};

/**
 * Starter question classes for chat demos (restricted set)
 */
export const ACCENT_STARTER_CLASSES: Record<CustomBotAccentColor, string> = {
  blue: 'border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-blue-700',
  green: 'border-green-200 hover:border-green-400 hover:bg-green-50 text-green-700',
  indigo: 'border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-700',
  red: 'border-red-200 hover:border-red-400 hover:bg-red-50 text-red-700',
  amber: 'border-amber-200 hover:border-amber-400 hover:bg-amber-50 text-amber-700',
};

/**
 * Message bubble classes for bot messages (restricted set)
 */
export const ACCENT_MESSAGE_CLASSES: Record<CustomBotAccentColor, { bg: string; border: string }> =
  {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200' },
    green: { bg: 'bg-green-50', border: 'border-green-200' },
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200' },
    red: { bg: 'bg-red-50', border: 'border-red-200' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200' },
  };

/**
 * Dropzone classes for file upload areas (restricted set)
 */
export const ACCENT_DROPZONE_CLASSES: Record<
  CustomBotAccentColor,
  { border: string; bg: string; text: string }
> = {
  blue: { border: 'border-blue-300', bg: 'bg-blue-50', text: 'text-blue-600' },
  green: { border: 'border-green-300', bg: 'bg-green-50', text: 'text-green-600' },
  indigo: { border: 'border-indigo-300', bg: 'bg-indigo-50', text: 'text-indigo-600' },
  red: { border: 'border-red-300', bg: 'bg-red-50', text: 'text-red-600' },
  amber: { border: 'border-amber-300', bg: 'bg-amber-50', text: 'text-amber-600' },
};

/**
 * Progress step indicator classes (restricted set)
 */
export const ACCENT_PROGRESS_CLASSES: Record<
  CustomBotAccentColor,
  { active: string; completed: string; text: string }
> = {
  blue: {
    active: 'border-blue-500 bg-blue-50',
    completed: 'bg-blue-500 border-blue-500',
    text: 'text-blue-600',
  },
  green: {
    active: 'border-green-500 bg-green-50',
    completed: 'bg-green-500 border-green-500',
    text: 'text-green-600',
  },
  indigo: {
    active: 'border-indigo-500 bg-indigo-50',
    completed: 'bg-indigo-500 border-indigo-500',
    text: 'text-indigo-600',
  },
  red: {
    active: 'border-red-500 bg-red-50',
    completed: 'bg-red-500 border-red-500',
    text: 'text-red-600',
  },
  amber: {
    active: 'border-amber-500 bg-amber-50',
    completed: 'bg-amber-500 border-amber-500',
    text: 'text-amber-600',
  },
};

/**
 * Context panel classes (restricted set)
 */
export const ACCENT_CONTEXT_PANEL_CLASSES: Record<
  CustomBotAccentColor,
  { bg: string; text: string; border: string }
> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
};

/**
 * Hero section color scheme (restricted set)
 */
export const ACCENT_HERO_CLASSES: Record<
  CustomBotAccentColor,
  {
    badge: string;
    chatBg: string;
    chatBorder: string;
    userBubble: string;
    iconBg: string;
    benefitIcon: string;
  }
> = {
  blue: {
    badge: 'bg-blue-100 text-blue-800',
    chatBg: 'bg-blue-50',
    chatBorder: 'border-blue-100',
    userBubble: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    benefitIcon: 'text-blue-600',
  },
  green: {
    badge: 'bg-green-100 text-green-800',
    chatBg: 'bg-blue-50',
    chatBorder: 'border-blue-100',
    userBubble: 'bg-green-50',
    iconBg: 'bg-green-100',
    benefitIcon: 'text-green-600',
  },
  indigo: {
    badge: 'bg-indigo-100 text-indigo-800',
    chatBg: 'bg-research-gradient',
    chatBorder: 'border-indigo-100',
    userBubble: 'bg-indigo-50',
    iconBg: 'bg-indigo-100',
    benefitIcon: 'text-indigo-600',
  },
  red: {
    badge: 'bg-red-100 text-red-800',
    chatBg: 'bg-red-50',
    chatBorder: 'border-red-100',
    userBubble: 'bg-red-50',
    iconBg: 'bg-red-100',
    benefitIcon: 'text-red-600',
  },
  amber: {
    badge: 'bg-amber-100 text-amber-800',
    chatBg: 'bg-amber-50',
    chatBorder: 'border-amber-100',
    userBubble: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    benefitIcon: 'text-amber-600',
  },
};

/**
 * Template picker hover classes (full accent color set)
 */
export const ACCENT_TEMPLATE_HOVER_CLASSES: Record<AccentColor, string> = {
  blue: 'hover:border-blue-400 hover:bg-blue-50',
  green: 'hover:border-green-400 hover:bg-green-50',
  indigo: 'hover:border-indigo-400 hover:bg-indigo-50',
  red: 'hover:border-red-400 hover:bg-red-50',
  amber: 'hover:border-amber-400 hover:bg-amber-50',
  pink: 'hover:border-pink-400 hover:bg-pink-50',
  rose: 'hover:border-rose-400 hover:bg-rose-50',
  purple: 'hover:border-purple-400 hover:bg-purple-50',
  orange: 'hover:border-orange-400 hover:bg-orange-50',
  slate: 'hover:border-slate-400 hover:bg-slate-50',
  yellow: 'hover:border-yellow-400 hover:bg-yellow-50',
  sky: 'hover:border-sky-400 hover:bg-sky-50',
  stone: 'hover:border-stone-400 hover:bg-stone-50',
  violet: 'hover:border-violet-400 hover:bg-violet-50',
  cyan: 'hover:border-cyan-400 hover:bg-cyan-50',
  teal: 'hover:border-teal-400 hover:bg-teal-50',
};

/**
 * Vision/roadmap status colors and labels
 */
export const VISION_STATUS_CONFIG: Record<string, { colors: string; label: string }> = {
  completed: { colors: 'bg-green-100 text-green-800', label: 'Completed' },
  'in-progress': { colors: 'bg-blue-100 text-blue-800', label: 'In Development' },
  planned: { colors: 'bg-amber-100 text-amber-800', label: 'Research' },
  vision: { colors: 'bg-purple-100 text-purple-800', label: 'Vision' },
};

/**
 * Bot switcher color classes (button hover + active state)
 */
export const BOT_SWITCHER_COLORS: Record<CustomBotAccentColor, { button: string; active: string }> =
  {
    blue: { button: 'hover:bg-blue-50', active: 'bg-blue-50 text-blue-700' },
    green: { button: 'hover:bg-green-50', active: 'bg-green-50 text-green-700' },
    indigo: { button: 'hover:bg-indigo-50', active: 'bg-indigo-50 text-indigo-700' },
    red: { button: 'hover:bg-red-50', active: 'bg-red-50 text-red-700' },
    amber: { button: 'hover:bg-amber-50', active: 'bg-amber-50 text-amber-700' },
  };

/**
 * Step color schemes for BotStepsSection gradients
 */
export const STEP_COLOR_SCHEMES: Record<
  CustomBotAccentColor,
  { numberBg: string; bgGradient: string; connector: string }
> = {
  blue: {
    numberBg: 'bg-gradient-to-br from-blue-600 to-cyan-600',
    bgGradient: 'from-slate-50 to-blue-50',
    connector: 'from-blue-400 to-cyan-400',
  },
  green: {
    numberBg: 'bg-gradient-to-br from-green-600 to-emerald-600',
    bgGradient: 'from-slate-50 to-green-50',
    connector: 'from-green-400 to-emerald-400',
  },
  indigo: {
    numberBg: 'bg-gradient-to-br from-indigo-600 to-purple-600',
    bgGradient: 'from-slate-50 to-indigo-50',
    connector: 'from-indigo-400 to-purple-400',
  },
  red: {
    numberBg: 'bg-gradient-to-br from-red-600 to-rose-600',
    bgGradient: 'from-slate-50 to-red-50',
    connector: 'from-red-400 to-rose-400',
  },
  amber: {
    numberBg: 'bg-gradient-to-br from-amber-600 to-orange-600',
    bgGradient: 'from-slate-50 to-amber-50',
    connector: 'from-amber-400 to-orange-400',
  },
};

/**
 * Default accent color
 */
export const DEFAULT_ACCENT_COLOR: CustomBotAccentColor = 'blue';

/**
 * Comprehensive accent class set for themed components
 */
export interface AccentClasses {
  primary: string;
  text: string;
  border: string;
  lightBg: string;
  badge: string;
}

const ACCENT_CLASS_SETS: Record<CustomBotAccentColor, AccentClasses> = {
  blue: {
    primary: 'bg-blue-500',
    text: 'text-blue-600',
    border: 'border-blue-500',
    lightBg: 'bg-blue-100',
    badge: 'bg-blue-100 text-blue-800',
  },
  green: {
    primary: 'bg-green-500',
    text: 'text-green-600',
    border: 'border-green-500',
    lightBg: 'bg-green-100',
    badge: 'bg-green-100 text-green-800',
  },
  indigo: {
    primary: 'bg-indigo-500',
    text: 'text-indigo-600',
    border: 'border-indigo-500',
    lightBg: 'bg-indigo-100',
    badge: 'bg-indigo-100 text-indigo-800',
  },
  red: {
    primary: 'bg-red-500',
    text: 'text-red-600',
    border: 'border-red-500',
    lightBg: 'bg-red-100',
    badge: 'bg-red-100 text-red-800',
  },
  amber: {
    primary: 'bg-amber-500',
    text: 'text-amber-600',
    border: 'border-amber-500',
    lightBg: 'bg-amber-100',
    badge: 'bg-amber-100 text-amber-800',
  },
};

/**
 * Get comprehensive accent classes for a color
 */
export function getAccentClasses(color: string | null | undefined): AccentClasses {
  return ACCENT_CLASS_SETS[color as CustomBotAccentColor] || ACCENT_CLASS_SETS.blue;
}
