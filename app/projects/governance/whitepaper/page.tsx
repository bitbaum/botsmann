'use client';

import React from 'react';
import DetailedComponentsNav from '../components/DetailedComponentsNav';

/**
 * Solon Whitepaper Page
 * 
 * This page presents the full whitepaper for the Solon governance platform,
 * including all details about its theoretical foundations, technical implementation,
 * and potential impact.
 */
export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Component */}
      <DetailedComponentsNav />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Solon Whitepaper</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A Comprehensive Framework for Transparent, Decentralized Governance
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Download PDF
              <svg className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Print Version
            </button>
          </div>
        </div>
        
        {/* Table of Contents */}
        <div className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li><a href="#executive-summary" className="text-green-600 hover:text-green-800">Executive Summary</a></li>
            <li><a href="#introduction" className="text-green-600 hover:text-green-800">Introduction</a></li>
            <li><a href="#theoretical-foundation" className="text-green-600 hover:text-green-800">Theoretical Foundation</a></li>
            <li><a href="#core-components" className="text-green-600 hover:text-green-800">Core Components</a>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li><a href="#transparent-transactions" className="text-green-600 hover:text-green-800">Transparent Transaction System</a></li>
                <li><a href="#law-framework" className="text-green-600 hover:text-green-800">Law Transparency Framework</a></li>
                <li><a href="#marketplace" className="text-green-600 hover:text-green-800">Government Function Marketplace</a></li>
                <li><a href="#voting-system" className="text-green-600 hover:text-green-800">Direct Democracy Voting System</a></li>
              </ol>
            </li>
            <li><a href="#implementation" className="text-green-600 hover:text-green-800">Implementation Strategy</a></li>
            <li><a href="#case-studies" className="text-green-600 hover:text-green-800">Real-World Case Studies</a></li>
            <li><a href="#roadmap" className="text-green-600 hover:text-green-800">Development Roadmap</a></li>
            <li><a href="#conclusion" className="text-green-600 hover:text-green-800">Conclusion</a></li>
          </ol>
        </div>
        
        {/* Executive Summary */}
        <section id="executive-summary" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Executive Summary</h2>
          <p className="text-lg text-gray-700 mb-4">
            Solon is a comprehensive governance platform designed to transform how citizens interact with governments 
            and public institutions. Building on principles of radical transparency, direct citizen participation, 
            and market-based efficiency, Solon offers a practical framework for implementing next-generation governance 
            systems that address the fundamental challenges facing democracies today.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            This whitepaper presents the technical architecture, theoretical foundations, and practical implementation 
            strategy for Solon. Unlike theoretical governance models, Solon is designed for real-world adoption with 
            clear migration paths from existing systems, pragmatic compromise mechanisms, and scalable components that 
            can be implemented individually or as a complete solution.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The platform is built around four core components that work together to create a cohesive governance ecosystem:
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-2 text-lg text-gray-700">
            <li><strong>Transparent Transaction System</strong> - A blockchain-based platform that makes all government financial transactions visible, immutable, and traceable.</li>
            <li><strong>Law Transparency Framework</strong> - A system that ensures all laws and regulations have clear purposes, measurable outcomes, and automatic review triggers.</li>
            <li><strong>Government Function Marketplace</strong> - A competitive marketplace for government services that prioritizes efficiency and innovation.</li>
            <li><strong>Direct Democracy Voting System</strong> - A secure digital platform enabling citizens to directly participate in decision-making at all levels of government.</li>
          </ul>
          <p className="text-lg text-gray-700">
            Through case studies and real-world examples, this whitepaper demonstrates how Solon can reduce corruption, increase government efficiency, rebuild citizen trust, and create more responsive public institutions.
          </p>
        </section>
        
        {/* Introduction */}
        <section id="introduction" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
          <p className="text-lg text-gray-700 mb-4">
            Democracies worldwide face declining citizen trust, increasing corruption, and governance systems that have 
            failed to leverage modern technology to improve transparency and participation. While technological 
            advancements have transformed virtually every aspect of human society, governance structures remain largely 
            unchanged from those developed centuries ago.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Solon addresses these challenges by reimagining governance for the digital age. Named after the ancient 
            Athenian lawgiver and reformer who laid the foundations for Athenian democracy, our platform combines 
            cutting-edge technology with time-tested democratic principles to create a governance framework that is 
            more transparent, efficient, and responsive to citizen needs.
          </p>
          <div className="bg-green-50 p-6 rounded-lg border border-green-200 my-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Core Problems Addressed</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Opacity in Government Operations</strong> - Citizens cannot easily access information about how their tax money is spent or how decisions are made.</li>
              <li><strong>Limited Accountability</strong> - Laws and regulations lack clear success metrics or review mechanisms.</li>
              <li><strong>Inefficient Service Delivery</strong> - Government monopolies on services lead to high costs and low innovation.</li>
              <li><strong>Minimal Citizen Participation</strong> - Citizens have few opportunities for meaningful input beyond occasional elections.</li>
            </ul>
          </div>
          <p className="text-lg text-gray-700">
            This whitepaper presents not just a theoretical framework, but a practical roadmap for implementation, 
            with clear examples of how each component can be adapted to different contexts and governance levels from 
            local to national. It draws on real-world examples, case studies, and evidence-based research to demonstrate 
            the feasibility and impact of the Solon approach.
          </p>
        </section>
        
        {/* More sections would continue here */}
        {/* Theoretical Foundation */}
        <section id="theoretical-foundation" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Theoretical Foundation</h2>
          <p className="text-lg text-gray-700 mb-4">
            Solon's design is grounded in several theoretical frameworks and principles that inform its architecture and functionality.
          </p>
          
          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Principles of Radical Transparency</h3>
          <p className="text-lg text-gray-700 mb-4">
            At its core, Solon embraces the principle that in a democracy, citizens have a fundamental right to know how their government operates, how decisions are made, and how public resources are allocated. This transparency is not just about passive access to information, but active and accessible presentation of data that enables meaningful citizen oversight.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Research has consistently shown that transparency reduces corruption and increases government efficiency. For example, studies in municipalities that implemented open budget initiatives saw corruption decrease by up to 30% and citizen satisfaction with government services increase significantly.
          </p>
          
          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Direct Democracy and Delegative Systems</h3>
          <p className="text-lg text-gray-700 mb-4">
            Solon incorporates elements of both direct democracy and delegative (or liquid) democracy. While pure direct democracy can be impractical at scale, and representative democracy often disconnects citizens from decision-making, Solon provides a flexible middle ground where citizens can directly participate in decisions they care about while delegating their authority on other matters.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            This approach is supported by research showing that when citizens have meaningful opportunities to participate in governance, they develop greater political efficacy, knowledge, and commitment to democratic processes.
          </p>
          
          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Market-Based Efficiency</h3>
          <p className="text-lg text-gray-700 mb-4">
            Solon incorporates market principles to drive efficiency in public service delivery, drawing on extensive research showing that competitive provision of government services can reduce costs while maintaining or improving quality.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Unlike pure privatization, Solon's marketplace model maintains public oversight and accountability while introducing competition, transparency, and performance-based contracting to eliminate the inefficiencies of government monopolies.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Theoretical Influences</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Deliberative Democracy</strong> - Emphasis on informed citizen discussion and decision-making</li>
              <li><strong>Public Choice Theory</strong> - Understanding incentive structures in public institutions</li>
              <li><strong>Open Government Data Movement</strong> - Principles of accessibility and usability of public data</li>
              <li><strong>Blockchain Governance</strong> - Distributed consensus mechanisms and immutable record-keeping</li>
              <li><strong>Competitive Government</strong> - Market-based approaches to public service delivery</li>
            </ul>
          </div>
        </section>
        
        {/* Limited preview of other sections */}
        <div className="text-center my-16 py-12 border-t border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Continue Reading the Full Whitepaper</h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            The full whitepaper contains detailed explanations of all components, implementation strategies, case studies, and the complete development roadmap.
          </p>
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Download Complete Whitepaper
          </button>
        </div>
      </main>
    </div>
  );
} 