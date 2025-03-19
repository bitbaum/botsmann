'use client';

import React, { useState } from 'react';

const ShowcaseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const showcaseItems = [
    {
      title: 'Feature Development',
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      content: (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Feature Planning & Development</h3>
          <p className="text-gray-600 mb-6">
            Trident helps product managers plan and execute feature development from ideation to release, ensuring all stakeholders are aligned.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-700 mb-2">Project Planning</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Feature requirement documentation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>User flow diagrams</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Sprint planning assistance</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-medium text-indigo-700 mb-2">Implementation</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Technical specification documents</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>API documentation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Progress tracking dashboards</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Results</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <span className="inline-block w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold flex items-center justify-center mr-3">
                  40%
                </span>
                <span>Reduction in feature development time</span>
              </li>
              <li className="flex items-center text-gray-700">
                <span className="inline-block w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold flex items-center justify-center mr-3">
                  90%
                </span>
                <span>Improved documentation accuracy</span>
              </li>
              <li className="flex items-center text-gray-700">
                <span className="inline-block w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold flex items-center justify-center mr-3">
                  65%
                </span>
                <span>Fewer clarification meetings required</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Technical Debt',
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      content: (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Debt Management</h3>
          <p className="text-gray-600 mb-6">
            Trident helps identify, prioritize, and tackle technical debt methodically to maintain code quality and performance.
          </p>
          
          <div className="grid gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-medium text-red-700 mb-2">Debt Identification</h4>
              <p className="text-sm text-gray-700 mb-3">
                AI-powered analysis identifies technical debt across your codebase with detailed reports on:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-white p-3 rounded border border-red-100">
                  <span className="block font-medium text-gray-900">Code Quality Issues</span>
                  <span className="text-gray-600">Pattern recognition identifies problematic code structures</span>
                </div>
                <div className="bg-white p-3 rounded border border-red-100">
                  <span className="block font-medium text-gray-900">Architecture Problems</span>
                  <span className="text-gray-600">System-level issues that impact scalability</span>
                </div>
                <div className="bg-white p-3 rounded border border-red-100">
                  <span className="block font-medium text-gray-900">Dependency Risks</span>
                  <span className="text-gray-600">Outdated libraries and security vulnerabilities</span>
                </div>
                <div className="bg-white p-3 rounded border border-red-100">
                  <span className="block font-medium text-gray-900">Performance Bottlenecks</span>
                  <span className="text-gray-600">Identification of slow or inefficient code</span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-700 mb-2">Strategic Remediation</h4>
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">Prioritized Action Plan</h5>
                  <p className="text-sm text-gray-600">
                    Trident creates a prioritized remediation plan based on risk, effort, and business impact.
                    This allows teams to methodically address technical debt while continuing feature development.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <div className="bg-white p-3 rounded border border-green-100 flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-red-100 text-red-800 font-bold flex items-center justify-center mr-3">
                    1
                  </span>
                  <span className="text-gray-700">Critical security vulnerabilities</span>
                </div>
                <div className="bg-white p-3 rounded border border-green-100 flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-orange-100 text-orange-800 font-bold flex items-center justify-center mr-3">
                    2
                  </span>
                  <span className="text-gray-700">Performance bottlenecks impacting users</span>
                </div>
                <div className="bg-white p-3 rounded border border-green-100 flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-yellow-100 text-yellow-800 font-bold flex items-center justify-center mr-3">
                    3
                  </span>
                  <span className="text-gray-700">Architecture improvements for scalability</span>
                </div>
                <div className="bg-white p-3 rounded border border-green-100 flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center mr-3">
                    4
                  </span>
                  <span className="text-gray-700">Code quality and maintainability refactoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Team Coordination',
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      content: (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Cross-Team Coordination</h3>
          <p className="text-gray-600 mb-6">
            Trident facilitates seamless communication and coordination between product, development, design, and QA teams.
          </p>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-around">
              <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                Product
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                Development
              </span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                Design
              </span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                QA
              </span>
            </div>
          </div>
          
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Unified Documentation</h4>
              <p className="text-sm text-gray-600 mb-4">
                Maintains a single source of truth for project artifacts, eliminating siloed information.
              </p>
              <div className="space-y-3">
                <div className="flex items-center bg-white p-3 rounded shadow-sm">
                  <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center mr-3">
                    <span className="text-indigo-700 text-sm font-bold">P</span>
                  </div>
                  <span className="text-sm text-gray-700">Requirements Document</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded shadow-sm">
                  <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-700 text-sm font-bold">D</span>
                  </div>
                  <span className="text-sm text-gray-700">Technical Specifications</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded shadow-sm">
                  <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center mr-3">
                    <span className="text-purple-700 text-sm font-bold">D</span>
                  </div>
                  <span className="text-sm text-gray-700">Design Systems</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded shadow-sm">
                  <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center mr-3">
                    <span className="text-green-700 text-sm font-bold">Q</span>
                  </div>
                  <span className="text-sm text-gray-700">Test Plans</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Automated Coordination</h4>
              <p className="text-sm text-gray-600 mb-4">
                Trident automatically keeps all stakeholders in sync through intelligent workflows.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">
                    <span className="font-medium">Automated Updates</span> - Teams are notified when relevant changes occur
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">
                    <span className="font-medium">Dependency Tracking</span> - Identifies cross-team dependencies
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">
                    <span className="font-medium">Status Dashboards</span> - Real-time project visibility for all teams
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">
                    <span className="font-medium">Meeting Summaries</span> - AI-generated meeting notes shared across teams
                  </span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
            <blockquote className="italic text-gray-700">
              "Trident has transformed how our product, development, design, and QA teams work together. Information silos are gone, and everyone stays in sync without excessive meetings."
              <footer className="mt-2 text-sm font-medium text-gray-900">
                — Sarah Chen, VP of Engineering at TechCorp
              </footer>
            </blockquote>
          </div>
        </div>
      )
    }
  ];
  
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Management Showcase</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          See how Trident transforms product management across different scenarios, 
          from feature development to team coordination and technical debt management.
        </p>
      </div>
      
      <div className="mb-8 flex justify-center">
        <div className="inline-flex p-1 bg-gray-100 rounded-lg">
          {showcaseItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === index 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              } transition-all`}
            >
              <span className={`mr-2 ${activeTab === index ? 'text-blue-500' : 'text-gray-500'}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8 transition-all duration-300">
        {showcaseItems[activeTab].content}
      </div>
    </div>
  );
};

export default ShowcaseSection; 