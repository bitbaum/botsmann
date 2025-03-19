'use client';

import React, { useState } from 'react';
import Link from 'next/link';

/**
 * Core Components section component for Solon Governance platform
 * Showcasing the four main technical components of the platform
 */
const CoreComponentsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('transparency');
  
  const components = [
    {
      id: 'transparency',
      name: 'Transparent Transaction System',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      description: 'Track and verify every government transaction with complete transparency. Our blockchain-based system ensures all financial activities are immutable, traceable, and publicly accessible.',
      features: [
        'Real-time transaction visibility',
        'Tamper-proof audit trail',
        'Automated verification',
        'Role-based access control',
        'Public dashboards and reports'
      ],
      stats: [
        { label: 'Corruption Reduction', value: '68%' },
        { label: 'Cost Savings', value: '$4.2M' },
        { label: 'Trust Increase', value: '+47%' }
      ],
      link: '/projects/governance/transparency' as const
    },
    {
      id: 'law',
      name: 'Law Transparency Framework',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      description: 'Measure and track the effectiveness of legislation with our innovative framework. Every law is tied to specific, measurable outcomes that can be monitored in real-time.',
      features: [
        'Outcome-based legislation',
        'Real-time effectiveness tracking',
        'Automated compliance monitoring',
        'Impact assessment tools',
        'Performance dashboards'
      ],
      stats: [
        { label: 'Policy Effectiveness', value: '82%' },
        { label: 'Compliance Rate', value: '94%' },
        { label: 'Cost Reduction', value: '$2.8M' }
      ],
      link: '/projects/governance/open-law' as const
    },
    {
      id: 'marketplace',
      name: 'Open Service Marketplace',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: 'A decentralized marketplace for government services. Connect citizens with service providers through smart contracts and automated verification.',
      features: [
        'Smart contract automation',
        'Service provider ratings',
        'Automated payments',
        'Quality assurance',
        'Performance tracking'
      ],
      stats: [
        { label: 'Service Delivery', value: '95%' },
        { label: 'Cost Efficiency', value: '45%' },
        { label: 'User Satisfaction', value: '92%' }
      ],
      link: '/projects/governance/open-service' as const
    },
    {
      id: 'voting',
      name: 'Open Vote System',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'Secure, verifiable, and accessible voting system for all government decisions. Built on blockchain technology for maximum transparency and trust.',
      features: [
        'Secure voting protocol',
        'Real-time results',
        'Vote verification',
        'Accessibility features',
        'Audit trail'
      ],
      stats: [
        { label: 'Voter Turnout', value: '78%' },
        { label: 'System Uptime', value: '99.9%' },
        { label: 'Trust Score', value: '95%' }
      ],
      link: '/projects/governance/open-vote' as const
    }
  ];
  
  const activeComponent = components.find(component => component.id === activeTab);
  
  return (
    <section id="components" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Core Technical Components
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Solon's platform combines four revolutionary technologies to enable transparent, 
            efficient, and citizen-centric governance.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-10">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {components.map((component) => (
              <button
                key={component.id}
                onClick={() => setActiveTab(component.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === component.id
                    ? `border-${component.id === 'transparency' ? 'green' : component.id === 'law' ? 'blue' : component.id === 'marketplace' ? 'orange' : 'purple'}-600 text-${component.id === 'transparency' ? 'green' : component.id === 'law' ? 'blue' : component.id === 'marketplace' ? 'orange' : 'purple'}-600`
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {component.name}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Component Details */}
        {activeComponent && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                {activeComponent.icon}
                <h3 className="ml-4 text-2xl font-bold text-gray-900">
                  {activeComponent.name}
                </h3>
              </div>
              
              <p className="text-lg text-gray-600 mb-6">
                {activeComponent.description}
              </p>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Key Features
              </h4>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                {activeComponent.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={activeComponent.link}
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-${activeComponent.id === 'transparency' ? 'green' : activeComponent.id === 'law' ? 'blue' : activeComponent.id === 'marketplace' ? 'orange' : 'purple'}-600 hover:bg-${activeComponent.id === 'transparency' ? 'green' : activeComponent.id === 'law' ? 'blue' : activeComponent.id === 'marketplace' ? 'orange' : 'purple'}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${activeComponent.id === 'transparency' ? 'green' : activeComponent.id === 'law' ? 'blue' : activeComponent.id === 'marketplace' ? 'orange' : 'purple'}-500`}
              >
                Learn More
                <svg className="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Right Column: Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Impact Metrics
              </h4>
              
              <div className="space-y-4">
                {activeComponent.stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-600">{stat.label}</span>
                    <span className={`text-xl font-bold text-${activeComponent.id === 'transparency' ? 'green' : activeComponent.id === 'law' ? 'blue' : activeComponent.id === 'marketplace' ? 'orange' : 'purple'}-600`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Example Applications
                </h4>
                
                <ul className="space-y-2 text-gray-600">
                  {activeComponent.id === 'transparency' && (
                    <>
                      <li>• Municipal budget transparency dashboards</li>
                      <li>• Infrastructure project expense tracking</li>
                      <li>• Public procurement verification</li>
                    </>
                  )}
                  
                  {activeComponent.id === 'law' && (
                    <>
                      <li>• Environmental protection effectiveness</li>
                      <li>• Education reform outcome measurement</li>
                      <li>• Economic development policy tracking</li>
                    </>
                  )}
                  
                  {activeComponent.id === 'marketplace' && (
                    <>
                      <li>• Municipal waste management services</li>
                      <li>• Building permit and inspection processes</li>
                      <li>• Public transportation route operations</li>
                    </>
                  )}
                  
                  {activeComponent.id === 'voting' && (
                    <>
                      <li>• Participatory budgeting decisions</li>
                      <li>• Infrastructure development priorities</li>
                      <li>• Local policy and regulation approval</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoreComponentsSection; 