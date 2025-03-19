'use client';

import React, { useState } from 'react';
import { TransactionWithTraceability } from '../components/TransactionWithTraceability';
import AgencyProfile from '../components/AgencyProfile';
import CitizenProfile from '../components/CitizenProfile';
import sampleData from '../data/sampleData';

const TransparencyDemoPage = () => {
  const [activeDemo, setActiveDemo] = useState<'transaction' | 'agency' | 'citizen'>('transaction');
  
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Government Transparency Suite
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl">
            Explore the tools making government more transparent, accountable, and citizen-centric.
            See how citizens can track their contributions, how agencies report their operations,
            and how transactions are linked to enabling legislation.
          </p>
          <div className="mt-8">
            <div className="sm:flex sm:items-center sm:justify-start">
              <div className="mt-3 sm:mt-0 sm:ml-3 space-x-4">
                <button
                  onClick={() => setActiveDemo('transaction')}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    activeDemo === 'transaction'
                      ? 'text-white bg-blue-600 hover:bg-blue-700'
                      : 'text-blue-700 bg-blue-100 hover:bg-blue-200'
                  }`}
                >
                  Enhanced Transaction
                </button>
                <button
                  onClick={() => setActiveDemo('agency')}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    activeDemo === 'agency'
                      ? 'text-white bg-blue-600 hover:bg-blue-700'
                      : 'text-blue-700 bg-blue-100 hover:bg-blue-200'
                  }`}
                >
                  Agency Profile
                </button>
                <button
                  onClick={() => setActiveDemo('citizen')}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    activeDemo === 'citizen'
                      ? 'text-white bg-blue-600 hover:bg-blue-700'
                      : 'text-blue-700 bg-blue-100 hover:bg-blue-200'
                  }`}
                >
                  Citizen Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Feature Description */}
        <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            {activeDemo === 'transaction' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Enhanced Transaction Traceability</h2>
                <p className="mt-2 text-gray-600">
                  See how every government expenditure is linked to the laws that enabled it,
                  key performance indicators (KPIs), complete documentation, and a timeline showing
                  the entire process from approval to completion. Citizens can comment, like, or
                  raise concerns about any transaction.
                </p>
              </div>
            )}
            
            {activeDemo === 'agency' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Agency Transparency Profile</h2>
                <p className="mt-2 text-gray-600">
                  Comprehensive view of a government agency's operations, including budget allocation,
                  spending, key metrics, regulations, team members with transparency scores, and direct
                  citizen impact. This complete picture helps citizens understand what agencies do and
                  how effectively they serve the public.
                </p>
              </div>
            )}
            
            {activeDemo === 'citizen' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Citizen Contribution Tracking</h2>
                <p className="mt-2 text-gray-600">
                  Citizens can see exactly how their tax contributions are distributed across different
                  government agencies, set advisory preferences for future distributions, track benefits
                  they receive, and view their participation in governance. This creates a personalized
                  view of each citizen's relationship with their government.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Component Demo */}
        {activeDemo === 'transaction' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <TransactionWithTraceability transaction={sampleData.transactions[0]} />
            </div>
          </div>
        )}
        
        {activeDemo === 'agency' && (
          <AgencyProfile agency={sampleData.agencies[0]} />
        )}
        
        {activeDemo === 'citizen' && (
          <CitizenProfile citizen={sampleData.citizen} agencies={sampleData.agencies} />
        )}
      </div>
    </div>
  );
};

export default TransparencyDemoPage; 