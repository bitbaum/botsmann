'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Open Service - Competitive government service marketplace
 * Transforms public service delivery through competition and transparency
 */
export default function OpenService() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      {/* Hero Section */}
      <div className="bg-green-600 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Open Service</h1>
              <p className="text-xl mb-8 text-green-100">Revolutionize government services through competition and real-time feedback. Better services, lower costs, and total transparency.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={{ pathname: "#marketplace" }} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md bg-white text-green-700 hover:bg-green-50">
                  Explore Marketplace
                </Link>
                <Link href={{ pathname: "#benefits" }} className="inline-flex items-center justify-center px-5 py-3 border border-green-400 text-base font-medium rounded-md text-white hover:bg-green-700">
                  View Economic Impact
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Waste Management Services</h3>
                      <p className="text-sm text-gray-500">Contract Term: 2023-2026</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Provider Performance</span>
                      <span className="text-sm font-medium text-gray-700">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Citizen Satisfaction</span>
                      <span className="text-sm font-medium text-gray-700">88%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Cost Efficiency</span>
                      <span className="text-sm font-medium text-gray-700">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">$2.3M</span> annual cost
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-green-600">$420K</span> savings vs. previous
                    </div>
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
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">The Undeniable Power of Open Service</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <div className="text-green-600 text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Save 15-32% on Government Services</h3>
              <p className="text-gray-600">Independent studies confirm that competitive bidding for government services reduces costs by 15-32% while maintaining or improving quality standards.</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <div className="text-green-600 text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Accelerate Service Improvement</h3>
              <p className="text-gray-600">When providers compete and citizens rate services, quality improves 4x faster than traditional monopolistic government service delivery models.</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <div className="text-green-600 text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Full Contract Transparency</h3>
              <p className="text-gray-600">Every service contract, performance metric, and citizen feedback rating is publicly visible. No more backroom deals or unaccountable service providers.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">How Open Service Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A revolutionary marketplace that transforms how government services are delivered to citizens.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold text-xl mb-4">1</div>
              <h3 className="text-lg font-medium mb-3 text-gray-900">Service Definition</h3>
              <p className="text-gray-600">Government defines exact service requirements, quality standards, and budgets. Citizens can comment on and help refine these specifications.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold text-xl mb-4">2</div>
              <h3 className="text-lg font-medium mb-3 text-gray-900">Competitive Bidding</h3>
              <p className="text-gray-600">Service providers—both private companies and public agencies—submit competitive bids to deliver services at the best possible value.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold text-xl mb-4">3</div>
              <h3 className="text-lg font-medium mb-3 text-gray-900">Performance Tracking</h3>
              <p className="text-gray-600">All providers are measured against clear performance metrics in real-time. Citizens can view exactly how services are performing against targets.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold text-xl mb-4">4</div>
              <h3 className="text-lg font-medium mb-3 text-gray-900">Citizen Feedback</h3>
              <p className="text-gray-600">Citizens rate and review services directly. Poor performers face contract termination, while high performers receive bonuses and contract extensions.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Marketplace Demo Section */}
      <div id="marketplace" className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Service Marketplace</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In a full implementation, citizens would see all active service contracts with real-time performance data.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Park Maintenance</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Excellent
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Provider: GreenScape Solutions</p>
              </div>
              <div className="px-6 py-4">
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500">Service Quality</span>
                    <span className="text-xs text-gray-500">96%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500">Response Time</span>
                    <span className="text-xs text-gray-500">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-4">
                  <span>Annual Contract: $875K</span>
                  <span className="text-green-600">Savings: $130K</span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Link href={{ pathname: "#" }} className="text-sm text-green-600 hover:text-green-700">
                    View Contract Details →
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-yellow-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Street Cleaning</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Good
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Provider: CleanStreets Inc.</p>
              </div>
              <div className="px-6 py-4">
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500">Service Quality</span>
                    <span className="text-xs text-gray-500">84%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500">Response Time</span>
                    <span className="text-xs text-gray-500">79%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '79%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-4">
                  <span>Annual Contract: $1.2M</span>
                  <span className="text-green-600">Savings: $220K</span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Link href={{ pathname: "#" }} className="text-sm text-green-600 hover:text-green-700">
                    View Contract Details →
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-red-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Public Transit</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Warning
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Provider: Metro Systems LLC</p>
              </div>
              <div className="px-6 py-4">
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500">Service Quality</span>
                    <span className="text-xs text-gray-500">68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500">On-Time Performance</span>
                    <span className="text-xs text-gray-500">72%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-4">
                  <span>Annual Contract: $4.8M</span>
                  <span className="text-red-600">Rebid Scheduled</span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Link href={{ pathname: "#" }} className="text-sm text-green-600 hover:text-green-700">
                    View Contract Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link href={{ pathname: "#" }} className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-700 hover:text-green-900">
              View All Service Contracts
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Case Studies Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Real-World Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Communities that have implemented Open Service are seeing remarkable improvements in service quality and cost-effectiveness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fairview County, USA</h3>
              <p className="text-gray-600 mb-4">
                After implementing Open Service for 12 municipal services, Fairview County reduced annual costs by $4.2 million (22%) while improving citizen satisfaction scores from 64% to 87%. Their most dramatic improvements came in waste management and road maintenance services.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Cost Reduction</span>
                  <span className="text-sm font-medium text-gray-700">22%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '22%' }}></div>
                </div>
                <div className="flex justify-between mt-4 mb-1">
                  <span className="text-sm font-medium text-gray-700">Satisfaction Increase</span>
                  <span className="text-sm font-medium text-gray-700">+23%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">East Harbor City</h3>
              <p className="text-gray-600 mb-4">
                Facing a budget crisis, East Harbor implemented Open Service across all public works functions. Within 18 months, they achieved $12.8 million in savings (31%), eliminated their budget deficit, and saw dramatic improvements in service quality as measured by independent auditors.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Cost Reduction</span>
                  <span className="text-sm font-medium text-gray-700">31%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '31%' }}></div>
                </div>
                <div className="flex justify-between mt-4 mb-1">
                  <span className="text-sm font-medium text-gray-700">Service Quality Improvement</span>
                  <span className="text-sm font-medium text-gray-700">+47%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '47%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Common Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Answers to frequently asked questions about implementing Open Service
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">What happens to government employees?</h3>
              <p className="text-gray-600">
                Government employees are given the opportunity to form their own service entities and compete for contracts. Many cities find that employee-run organizations win a significant portion of contracts due to their institutional knowledge and dedication to their communities.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">How is service quality maintained?</h3>
              <p className="text-gray-600">
                Service quality typically improves under Open Service due to clear performance metrics, real-time citizen feedback, and competition between providers. Contracts include specific quality requirements with penalties for poor performance and bonuses for excellence.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">What services can be included?</h3>
              <p className="text-gray-600">
                Most government services can be delivered through Open Service, including waste management, park maintenance, road repair, IT services, facility management, fleet maintenance, customer service, and many others. Core policy functions generally remain with government officials.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">How long does implementation take?</h3>
              <p className="text-gray-600">
                Most communities implement Open Service in phases, typically starting with 3-5 services and expanding over time. Initial implementation takes 3-6 months, with full implementation across all eligible services usually completed within 18-24 months.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Transform Your Community's Services</h2>
          <p className="text-xl mb-8 text-green-100 max-w-3xl mx-auto">
            Join the growing movement of cities and counties achieving better services at lower costs through Open Service. Your citizens deserve nothing less.
          </p>
          <div className="inline-flex rounded-md shadow">
            <Link href={{ pathname: "/projects/governance", hash: "request-demo" }} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50">
              Request Implementation Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 