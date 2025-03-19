'use client';

import React from 'react';
import Link from 'next/link';

interface ComponentPreviewProps {
  icon: string;
  title: string;
  description: string;
  ctaText: string;
  path: string;
  color: string;
}

/**
 * Preview component for Solon modules with a CTA button
 */
const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  icon,
  title,
  description,
  ctaText,
  path,
  color,
}) => {
  // Get color classes based on component
  const getColorClasses = () => {
    switch (color) {
      case 'amber':
        return {
          bg: 'bg-amber-100',
          text: 'text-amber-600',
          button: 'bg-amber-600 hover:bg-amber-700',
        };
      case 'green':
        return {
          bg: 'bg-green-100',
          text: 'text-green-600',
          button: 'bg-green-600 hover:bg-green-700',
        };
      case 'purple':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-600',
          button: 'bg-purple-600 hover:bg-purple-700',
        };
      default:
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700',
        };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <div className="text-center py-12">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colorClasses.bg} ${colorClasses.text} mb-4`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6">
        {description}
      </p>
      <Link
        href={{ pathname: path }}
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${colorClasses.button}`}
      >
        {ctaText}
        <svg className="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};

export default ComponentPreview; 