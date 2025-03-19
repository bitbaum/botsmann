'use client';

import React from 'react';

/**
 * Vision section component for Solon Governance platform
 * Showcasing the three core principles of the platform
 */
const VisionSection: React.FC = () => {
  return (
    <section id="vision" className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solon is built on three core principles that transform how citizens interact with governance systems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vision Card 1 */}
          <div className="vision-card rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 bg-opacity-10 mb-4">
              <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Maximum Transparency</h3>
            <p className="text-gray-600">
              A governance system where every transaction, vote, and decision is publicly visible and traceable, making corruption virtually impossible.
            </p>
          </div>
          
          {/* Vision Card 2 */}
          <div className="vision-card rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 bg-opacity-10 mb-4">
              <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Direct Democracy</h3>
            <p className="text-gray-600">
              Citizens directly participate in decision-making, from budgeting to lawmaking, with verified voting systems and clear accountability mechanisms.
            </p>
          </div>
          
          {/* Vision Card 3 */}
          <div className="vision-card rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 bg-opacity-10 mb-4">
              <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Market-Based Governance</h3>
            <p className="text-gray-600">
              Government functions operate in a competitive marketplace, with clear KPIs, data-driven evaluations, and continuous improvement mechanisms.
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-green-50 rounded-2xl p-8 border border-green-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 md:pr-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Philosophy: Solon's Approach</h3>
              <p className="text-gray-700 mb-4">
                Named after the ancient Athenian lawmaker and reformer, Solon represents a return to the core principles of democracy—rule by the people—enhanced with modern technology and data-driven systems.
              </p>
              <p className="text-gray-700">
                Our approach combines the best of direct democracy, market efficiency, and technological transparency to create governance systems that are more responsive, accountable, and effective than traditional models.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center mt-8 md:mt-0">
              <div className="h-32 w-32 rounded-full bg-white border-4 border-green-200 flex items-center justify-center shadow-lg">
                <span className="text-5xl">🏛️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection; 