'use client';

import React from 'react';
import Link from 'next/link';

const WhitepaperSection: React.FC = () => {
  return (
    <section id="whitepaper" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-2">
            Documentation
          </span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Solon Governance Whitepaper
          </h2>
          <p className="mt-2 text-xl text-gray-600 max-w-3xl mx-auto">
            Detailed technical documentation and theoretical foundations of our revolutionary governance platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Column: Whitepaper Cover */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="w-full max-w-sm relative">
              {/* Document Cover */}
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-600 to-indigo-800 rounded-lg shadow-xl p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">WHITEPAPER</h3>
                  <h4 className="text-white text-3xl font-bold">Solon Platform</h4>
                  <p className="text-blue-100 mt-2">A New Vision for Transparent Governance</p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Version 1.2 - 2024</p>
                  <div className="h-2 w-24 bg-white/30 rounded-full mt-2"></div>
                </div>
              </div>
              
              {/* Corner fold effect */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-bl-lg transform -rotate-90 z-10"></div>
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-indigo-700 to-blue-900 rounded-bl-lg"></div>
            </div>
          </div>
          
          {/* Right Column: Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Comprehensive Documentation
                </h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                      <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Sections Included
                    </h4>
                    <ul className="ml-8 list-disc text-gray-600 space-y-1">
                      <li>Executive Summary</li>
                      <li>Theoretical Foundation</li>
                      <li>Technical Architecture</li>
                      <li>Implementation Strategy</li>
                      <li>Security & Governance</li>
                      <li>Economic Model</li>
                      <li>Use Cases & Case Studies</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                      <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Key Highlights
                    </h4>
                    <ul className="ml-8 list-disc text-gray-600 space-y-1">
                      <li>Detailed explanation of the four core components</li>
                      <li>Security and privacy considerations</li>
                      <li>Implementation roadmap and timeline</li>
                      <li>Governance token economics and incentives</li>
                      <li>Case studies and success metrics</li>
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="mb-4 sm:mb-0">
                        <span className="text-sm text-gray-500">Last updated: May 15, 2024</span>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-500 mr-2">Format:</span>
                          <span className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded">PDF</span>
                          <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded ml-2">EPUB</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Link
                          href="/projects/governance/whitepaper"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Download
                          <svg className="ml-2 -mr-0.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </Link>
                        <Link
                          href="/projects/governance/whitepaper"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View Online
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional resources */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Video Explanations</h3>
                    <p className="mt-1 text-sm text-gray-600">Watch our detailed explainer videos about the platform.</p>
                    <Link href="/projects/governance/whitepaper" className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500">
                      View Videos →
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Research Papers</h3>
                    <p className="mt-1 text-sm text-gray-600">Access academic research supporting our governance model.</p>
                    <Link href="/projects/governance/whitepaper" className="mt-2 text-sm font-medium text-green-600 hover:text-green-500">
                      Read Research →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhitepaperSection; 