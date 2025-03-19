'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DetailedComponentsNav from '../components/DetailedComponentsNav';

/**
 * Law Transparency Framework Detailed Page
 * 
 * This page provides in-depth information about Solon's Law Transparency Framework,
 * including how it works, why it's important, use cases, and examples.
 */

// Define types for law data structures
type LawGoal = {
  goal: string;
  metric: string;
  target: string;
  current: string;
  status: 'achieved' | 'near-target' | 'in-progress' | 'needs-attention';
};

type LawAmendment = {
  id: string;
  title: string;
  date: string;
  sponsor: string;
  status: 'approved' | 'pending';
};

type LawCostBenefit = {
  implementation: string;
  maintenanceAnnual: string;
  economicBenefit: string;
  returnOnInvestment: string;
};

type LawPublicFeedback = {
  sentiment: string;
  supportPercentage: number;
  commentVolume: number;
  keyThemes: string[];
};

type LawData = {
  title: string;
  status: string;
  enactedDate: string;
  goals: LawGoal[];
  amendments: LawAmendment[];
  costBenefit: LawCostBenefit;
  publicFeedback: LawPublicFeedback;
};

type Laws = {
  [key: string]: LawData;
};

export default function LawFrameworkPage() {
  // State for the interactive law effectiveness tracker demo
  const [selectedLaw, setSelectedLaw] = useState<string>('env-protection-act');
  
  // Mock data for laws
  const laws: Laws = {
    'env-protection-act': {
      title: 'Environmental Protection Act 2023',
      status: 'active',
      enactedDate: '2023-03-15',
      goals: [
        { goal: 'Reduce carbon emissions by 30%', metric: 'CO2 emissions', target: '30% reduction', current: '12% reduction', status: 'in-progress' },
        { goal: 'Increase renewable energy usage', metric: 'Renewable energy %', target: '40% of grid', current: '28% of grid', status: 'in-progress' },
        { goal: 'Protect 5000 acres of forest', metric: 'Protected land', target: '5000 acres', current: '4200 acres', status: 'near-target' }
      ],
      amendments: [
        { id: 'EPA-A1', title: 'Solar Incentives Amendment', date: '2023-06-10', sponsor: 'Rep. Johnson', status: 'approved' },
        { id: 'EPA-A2', title: 'Corporate Emissions Reporting', date: '2023-07-22', sponsor: 'Rep. Garcia', status: 'pending' }
      ],
      costBenefit: {
        implementation: '$3.2M',
        maintenanceAnnual: '$1.1M',
        economicBenefit: '$12.4M',
        returnOnInvestment: '387%'
      },
      publicFeedback: {
        sentiment: 'positive',
        supportPercentage: 72,
        commentVolume: 1542,
        keyThemes: ['Economic impact', 'Implementation speed', 'Enforcement concerns']
      }
    },
    'digital-privacy-act': {
      title: 'Digital Privacy Act 2022',
      status: 'active',
      enactedDate: '2022-11-05',
      goals: [
        { goal: 'Secure personal data protection', metric: 'Data breach incidents', target: '50% reduction', current: '32% reduction', status: 'in-progress' },
        { goal: 'Increase transparency in data collection', metric: 'Compliance rate', target: '95% of companies', current: '78% of companies', status: 'in-progress' },
        { goal: 'Enforce right to be forgotten', metric: 'Request fulfillment rate', target: '99% fulfilled', current: '94% fulfilled', status: 'near-target' }
      ],
      amendments: [
        { id: 'DPA-A1', title: "Minor's Data Protection", date: '2023-02-18', sponsor: 'Rep. Williams', status: 'approved' },
        { id: 'DPA-A2', title: 'Breach Notification Requirements', date: '2023-05-03', sponsor: 'Rep. Chen', status: 'approved' }
      ],
      costBenefit: {
        implementation: '$4.5M',
        maintenanceAnnual: '$2.3M',
        economicBenefit: '$18.7M',
        returnOnInvestment: '415%'
      },
      publicFeedback: {
        sentiment: 'very positive',
        supportPercentage: 84,
        commentVolume: 2371,
        keyThemes: ['Corporate compliance', 'Penalties adequacy', 'Consumer education']
      }
    },
    'small-business-act': {
      title: 'Small Business Support Act 2023',
      status: 'active',
      enactedDate: '2023-01-20',
      goals: [
        { goal: 'Increase small business formation', metric: 'New business registrations', target: '25% increase', current: '13% increase', status: 'in-progress' },
        { goal: 'Improve access to capital', metric: 'Loan approval rate', target: '40% increase', current: '22% increase', status: 'in-progress' },
        { goal: 'Reduce regulatory burden', metric: 'Compliance time', target: '50% reduction', current: '15% reduction', status: 'needs-attention' }
      ],
      amendments: [
        { id: 'SBA-A1', title: 'Minority Business Focus', date: '2023-04-12', sponsor: 'Rep. Washington', status: 'approved' },
        { id: 'SBA-A2', title: 'Rural Enterprise Incentives', date: '2023-08-05', sponsor: 'Rep. Miller', status: 'pending' }
      ],
      costBenefit: {
        implementation: '$5.8M',
        maintenanceAnnual: '$2.7M',
        economicBenefit: '$47.3M',
        returnOnInvestment: '815%'
      },
      publicFeedback: {
        sentiment: 'positive',
        supportPercentage: 68,
        commentVolume: 1837,
        keyThemes: ['Application process', 'Distribution equity', 'Administrative overhead']
      }
    }
  };
  
  const selectedLawData = laws[selectedLaw];
  
  // Function to determine goal status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'achieved':
        return 'bg-green-50 text-green-800';
      case 'near-target':
        return 'bg-blue-50 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-50 text-yellow-800';
      case 'needs-attention':
        return 'bg-red-50 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      {/* Hero Section */}
      <div className="bg-amber-600 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Open Law</h1>
              <p className="text-xl mb-8 text-amber-100">End the era of unaccountable legislation. Every law now has clear problem statements, measurable KPIs, and defined accountability timelines.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={{ pathname: "#demo" }} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md bg-white text-amber-700 hover:bg-amber-50">
                  Explore Active Laws
                </Link>
                <Link href={{ pathname: "#benefits" }} className="inline-flex items-center justify-center px-5 py-3 border border-amber-400 text-base font-medium rounded-md text-white hover:bg-amber-700">
                  See the Impact
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative p-6 bg-white rounded-lg shadow-xl">
                <div className="absolute -top-4 -right-4 bg-green-100 px-4 py-1 rounded-full text-green-800 text-sm font-medium">ACTIVE</div>
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Street Safety Enhancement Act</h3>
                  <p className="text-sm text-gray-500">Enacted: March 12, 2023 • Status: In Progress</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-amber-700">PROBLEM STATEMENT</h4>
                    <p className="text-sm text-gray-600">Pedestrian injuries at intersections have increased 14% in the last two years.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-amber-700">KEY METRICS</h4>
                    <div className="mt-1 bg-gray-100 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Target: 50% reduction in accidents</span>
                      <span>Current: 42%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-amber-700">ACCOUNTABILITY</h4>
                    <p className="text-sm text-gray-600">Lead: Transportation Safety Board</p>
                    <p className="text-sm text-gray-600">Timeline: Complete by Dec 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div id="benefits" className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Open Law Transforms Governance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
              <div className="text-amber-600 text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Measure Real Results</h3>
              <p className="text-gray-600">Studies show that laws with clearly defined metrics are 3.7x more likely to achieve their intended outcomes. Open Law ensures every piece of legislation has measurable targets and accountability.</p>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
              <div className="text-amber-600 text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">True Political Accountability</h3>
              <p className="text-gray-600">When politicians sponsor laws, they become directly accountable for results. Open Law creates a permanent record of promises made versus results delivered.</p>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
              <div className="text-amber-600 text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Citizen Participation</h3>
              <p className="text-gray-600">Open Law transforms citizens from passive subjects into active participants. Comment directly on laws, suggest improvements, and help measure outcomes in your community.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">How Open Law Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A revolutionary framework for legislation that brings clarity, measurability, and accountability to every law.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 font-bold text-xl mb-4">1</div>
              <h3 className="text-lg font-medium mb-3 text-gray-900">Problem Definition</h3>
              <p className="text-gray-600">Every law starts with a clearly articulated problem statement backed by data. No more vague objectives or hidden agendas.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 font-bold text-xl mb-4">2</div>
              <h3 className="text-lg font-medium mb-3 text-gray-900">KPI Definition</h3>
              <p className="text-gray-600">Each law includes specific, measurable Key Performance Indicators that define success. You'll know exactly if a law is working.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 font-bold text-xl mb-4">3</div>
              <h3 className="text-lg font-medium mb-3 text-gray-900">Timeline Setting</h3>
              <p className="text-gray-600">Clear timeframes for implementation and evaluation prevent laws from lingering in limbo. Automatic evaluation at predetermined milestones.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 font-bold text-xl mb-4">4</div>
              <h3 className="text-lg font-medium mb-3 text-gray-900">Accountability Assignment</h3>
              <p className="text-gray-600">Specific individuals and departments are assigned responsibility. If a law fails, citizens know exactly who to hold accountable.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Demo Section */}
      <div id="demo" className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Explore Active Legislation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In a full implementation, this section would contain real-time data on all active laws, their KPIs, and current progress.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Community Health Initiative</h3>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-500">Enacted: January 2023</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">On Track</span>
                </div>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">PROBLEM</h4>
                  <p className="text-sm text-gray-600">Rising obesity rates across all demographics and limited access to preventative care.</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">METRICS</h4>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-xs text-gray-500">Obesity Rate Reduction</p>
                      <div className="mt-1 bg-gray-100 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Target: 15%</span>
                        <span>Current: 5.2%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Preventative Care Access</p>
                      <div className="mt-1 bg-gray-100 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Target: 95%</span>
                        <span>Current: 57%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-600">Lead: Health Department</p>
                    <p className="text-xs text-gray-500">Timeline: 2023-2025</p>
                  </div>
                  <Link href={{ pathname: "#" }} className="text-sm text-amber-600 hover:text-amber-700">
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-yellow-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Clean Energy Transition Act</h3>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-500">Enacted: October 2022</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">At Risk</span>
                </div>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">PROBLEM</h4>
                  <p className="text-sm text-gray-600">High carbon emissions from municipal operations and aging energy infrastructure.</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">METRICS</h4>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-xs text-gray-500">Carbon Reduction</p>
                      <div className="mt-1 bg-gray-100 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Target: 40%</span>
                        <span>Current: 8.8%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Renewable Usage</p>
                      <div className="mt-1 bg-gray-100 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Target: 50%</span>
                        <span>Current: 22.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-600">Lead: Energy Commission</p>
                    <p className="text-xs text-gray-500">Timeline: 2022-2024</p>
                  </div>
                  <Link href={{ pathname: "#" }} className="text-sm text-amber-600 hover:text-amber-700">
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link href={{ pathname: "#" }} className="inline-flex items-center px-4 py-2 text-sm font-medium text-amber-700 hover:text-amber-900">
              View All Active Laws
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Testimonial Section */}
      <div className="bg-amber-600 text-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">The Results Speak for Themselves</h2>
            
            <div className="bg-white text-gray-900 rounded-lg p-8 shadow-lg">
              <div className="flex justify-center mb-6">
                <div className="flex -space-x-2">
                  <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" alt="" />
                  <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" alt="" />
                  <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" alt="" />
                </div>
              </div>
              <blockquote className="text-xl italic font-medium text-gray-900 mb-4">
                "Cities that have implemented the Open Law framework have seen a 43% increase in successful policy outcomes. Laws that don't work get fixed or removed. Accountability is no longer optional."
              </blockquote>
              <p className="text-sm text-gray-500">Independent Policy Research Institute</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Transform Your Legislative Process</h2>
          <p className="text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
            Join the growing movement of accountable, measurable, and transparent legislation. The future of law-making is here.
          </p>
          <div className="inline-flex rounded-md shadow">
            <Link href={{ pathname: "/projects/governance", hash: "request-demo" }} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700">
              Request Implementation Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 