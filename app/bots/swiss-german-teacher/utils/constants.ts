/**
 * Shared UI constants
 * 
 * This file centralizes UI string constants to:
 * - Maintain visual consistency across components
 * - Simplify future UI updates (change in one place)
 * - Reduce duplication of lengthy Tailwind class strings
 */

// Button styles
export const btnPrimary = "px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2";
export const btnSecondary = "px-6 py-3 bg-white text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2";

// Card styles
export const cardStyle = "p-6 bg-white rounded-xl shadow-sm border border-gray-200 relative";

// Badge styles
export const comingSoonBadge = "absolute top-4 right-4 bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-200";

// Feature number styles
export const featureNumberBadge = "flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold";
export const featureNumberText = "text-lg font-medium text-gray-900 mb-2";

// Section styles
export const sectionHeading = "text-3xl font-semibold text-gray-900 mb-4";
export const sectionSubheading = "text-lg text-gray-600 mb-8";

// Common CSS classes
export const cardHeading = "text-xl font-semibold mb-2";
export const cardText = "text-gray-600 mb-4"; 