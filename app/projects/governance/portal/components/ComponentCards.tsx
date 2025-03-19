'use client';

import React from 'react';
import Link from 'next/link';

interface ComponentCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  path: string;
}

interface ComponentCardsProps {
  cards: ComponentCard[];
}

/**
 * Displays a grid of cards for navigating to different Solon components
 */
const ComponentCards: React.FC<ComponentCardsProps> = ({ cards }) => {
  // Helper for dynamic color classes
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'amber':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'green':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'purple':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {cards.map((card) => (
        <Link 
          href={{ pathname: card.path }}
          key={card.id} 
          className={`group border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
            getColorClasses(card.color).split(' ')[2]
          }`}
        >
          <div className={`p-5 border-b ${getColorClasses(card.color)}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <span className="text-3xl">{card.icon}</span>
            </div>
          </div>
          <div className="bg-white p-5">
            <p className="text-sm text-gray-600 mb-4">{card.description}</p>
            <div className="flex justify-end">
              <span className="inline-flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700">
                Explore
                <svg className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ComponentCards; 