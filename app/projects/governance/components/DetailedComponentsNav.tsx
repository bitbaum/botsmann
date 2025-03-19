'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Navigation component for detailed core components pages
 * This component allows users to navigate between the detailed pages for each Solon core component
 */
const DetailedComponentsNav: React.FC = () => {
  const pathname = usePathname();
  
  // Define the core components and their routes
  const components = [
    {
      id: 'transparent-transactions',
      name: 'Transparent Transaction System',
      path: '/projects/governance/transparent-transactions',
      description: 'Blockchain-based transaction tracking system',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 'law-framework',
      name: 'Law Transparency Framework',
      path: '/projects/governance/law-framework',
      description: 'Measurable outcomes for all legislation',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
    {
      id: 'marketplace',
      name: 'Government Function Marketplace',
      path: '/projects/governance/marketplace',
      description: 'Competitive service delivery platform',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 'voting-system',
      name: 'Direct Democracy Voting System',
      path: '/projects/governance/voting-system',
      description: 'Secure digital voting platform',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
    },
  ];

  // Return to main governance page link
  const backToMainLink = '/projects/governance';
  
  return (
    <div className="bg-white border-b border-gray-200 py-4 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link 
            href="/projects/governance" 
            className="text-gray-500 hover:text-gray-700 flex items-center"
          >
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Governance Overview
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {components.map((component) => {
            const isActive = pathname === component.path;
            
            return (
              <Link 
                key={component.id}
                href={component.path as any}
                className={`
                  flex items-center p-4 rounded-lg border transition-colors
                  ${isActive 
                    ? `border-${component.id === 'transparent-transactions' ? 'green' : component.id === 'law-framework' ? 'blue' : component.id === 'marketplace' ? 'orange' : 'purple'}-500 bg-${component.id === 'transparent-transactions' ? 'green' : component.id === 'law-framework' ? 'blue' : component.id === 'marketplace' ? 'orange' : 'purple'}-50 shadow-sm`
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className={`
                  p-2 rounded-full mr-3
                  ${isActive 
                    ? `text-${component.id === 'transparent-transactions' ? 'green' : component.id === 'law-framework' ? 'blue' : component.id === 'marketplace' ? 'orange' : 'purple'}-600 bg-${component.id === 'transparent-transactions' ? 'green' : component.id === 'law-framework' ? 'blue' : component.id === 'marketplace' ? 'orange' : 'purple'}-100`
                    : 'text-gray-500 bg-gray-100'
                  }
                `}>
                  {component.icon}
                </div>
                <div>
                  <h3 className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                    {component.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {component.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailedComponentsNav; 