'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Open Vote - Direct citizen participation in democracy
 * Transparent and secure voting for modern digital governance
 */
export default function OpenVote() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Open Vote</h1>
              <p className="text-xl mb-8 text-blue-100">Democracy reimagined. Secure, transparent, and auditable voting for the digital age. Every voice heard, every vote counted.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={{ pathname: "#active-votes" }} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md bg-white text-blue-700 hover:bg-blue-50">
                  View Active Votes
                </Link>
                <Link href={{ pathname: "#benefits" }} className="inline-flex items-center justify-center px-5 py-3 border border-blue-400 text-base font-medium rounded-md text-white hover:bg-blue-700">
                  Explore Benefits
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Community Budget Allocation</h3>
                        <p className="text-sm text-gray-500">Active until: June 15, 2023</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">How should we allocate the $2.5M community improvement budget?</p>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">Park Renovations</span>
                        <span className="text-sm text-gray-700">42%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">Road Improvements</span>
                        <span className="text-sm text-gray-700">28%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">Community Center</span>
                        <span className="text-sm text-gray-700">18%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">Public Safety</span>
                        <span className="text-sm text-gray-700">12%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">4,218</span> votes cast
                    </div>
                    <Link href={{ pathname: "#" }} className="text-sm text-blue-600 hover:text-blue-700">
                      Cast Your Vote →
                    </Link>
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
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Open Vote Transforms Democracy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="text-blue-600 text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Uncompromising Security</h3>
              <p className="text-gray-600">Military-grade encryption, blockchain verification, and decentralized storage ensure every vote is secure, tamper-proof, and auditable by independent validators.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="text-blue-600 text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Universal Accessibility</h3>
              <p className="text-gray-600">Multiple voting options (mobile, web, kiosk, paper) ensure every citizen can participate, regardless of technical ability, physical limitations, or location.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="text-blue-600 text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Unprecedented Participation</h3>
              <p className="text-gray-600">Communities using Open Vote experience 3-5x higher participation rates in local decision-making, creating more representative outcomes and stronger community buy-in.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">How Open Vote Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A secure, transparent voting platform for anything from community budgets to major policy decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold text-xl mb-4">1</div>
              <h3 className="text-lg font-medium mb-3 text-gray-900">Issue Submission</h3>
              <p className="text-gray-600">Officials or citizens (through petition) can create proposals for community vote, complete with clear options and supporting documentation.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold text-xl mb-4">2</div>
              <h3 className="text-lg font-medium mb-3 text-gray-900">Secure Authentication</h3>
              <p className="text-gray-600">Voters verify their identity through secure multi-factor authentication, with privacy-preserving protocols that separate identity from votes.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold text-xl mb-4">3</div>
              <h3 className="text-lg font-medium mb-3 text-gray-900">Vote Casting</h3>
              <p className="text-gray-600">Citizens vote through their preferred method (app, web, kiosk), receiving a unique receipt code to verify their vote was properly recorded.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold text-xl mb-4">4</div>
              <h3 className="text-lg font-medium mb-3 text-gray-900">Transparent Results</h3>
              <p className="text-gray-600">Results are tallied in real-time and cryptographically verified, with full audit trails available to independent validators and the public.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Active Votes Section */}
      <div id="active-votes" className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Active Votes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In a full implementation, citizens would see all current voting opportunities, with real-time results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Community Budget Allocation</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Ends in: 3 days, 8 hours</p>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-600 mb-4">How should we allocate the $2.5M community improvement budget?</p>
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">Park Renovations</span>
                      <span className="text-xs text-gray-500">42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">Road Improvements</span>
                      <span className="text-xs text-gray-500">28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-4">
                  <span>4,218 votes cast</span>
                  <span className="text-blue-600">7,500 eligible voters</span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Link href={{ pathname: "#" }} className="text-sm text-blue-600 hover:text-blue-700">
                    Cast Your Vote →
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Downtown Development Plan</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Ends in: 5 days, 12 hours</p>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-600 mb-4">Which development option should be pursued for the vacant downtown lot?</p>
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">Mixed-use with affordable housing</span>
                      <span className="text-xs text-gray-500">57%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '57%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">Commercial development</span>
                      <span className="text-xs text-gray-500">26%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '26%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">Public plaza and park</span>
                      <span className="text-xs text-gray-500">17%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '17%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-4">
                  <span>3,542 votes cast</span>
                  <span className="text-blue-600">12,000 eligible voters</span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Link href={{ pathname: "#" }} className="text-sm text-blue-600 hover:text-blue-700">
                    Cast Your Vote →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link href={{ pathname: "#" }} className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-900">
              View All Active Votes
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
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Communities that have implemented Open Vote are experiencing unprecedented levels of civic engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Westlake City</h3>
              <p className="text-gray-600 mb-4">
                After implementing Open Vote for local decisions, Westlake City saw citizen participation increase from 8% to 42% within six months. The city successfully resolved long-standing disputes about infrastructure priorities and passed their first balanced budget in a decade with 78% approval.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Participation Increase</span>
                  <span className="text-sm font-medium text-gray-700">+425%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42.5%' }}></div>
                </div>
                <div className="flex justify-between mt-4 mb-1">
                  <span className="text-sm font-medium text-gray-700">Policy Implementation Speed</span>
                  <span className="text-sm font-medium text-gray-700">3.2× faster</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Riverside County</h3>
              <p className="text-gray-600 mb-4">
                Riverside County implemented Open Vote for their participatory budgeting process, allowing citizens to directly allocate 15% of discretionary spending. The result was a 62% reduction in spending disputes, unprecedented unity across political parties, and measurably higher satisfaction with county services.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Budget Dispute Reduction</span>
                  <span className="text-sm font-medium text-gray-700">-62%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
                <div className="flex justify-between mt-4 mb-1">
                  <span className="text-sm font-medium text-gray-700">Citizen Satisfaction</span>
                  <span className="text-sm font-medium text-gray-700">+47%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '47%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Security Section */}
      <div className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Uncompromising Security</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Open Vote meets the highest security standards, exceeding requirements for national elections.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-blue-50 rounded-lg p-6 flex items-start">
              <div className="text-blue-600 text-3xl mr-4">🔒</div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">End-to-End Encryption</h3>
                <p className="text-gray-600">
                  Military-grade encryption protects every vote from casting through counting. Even system administrators cannot view individual votes or manipulate results.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 flex items-start">
              <div className="text-blue-600 text-3xl mr-4">🔗</div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Blockchain Verification</h3>
                <p className="text-gray-600">
                  Every vote is recorded on an immutable blockchain, creating a permanent, tamper-proof record that can be independently verified without compromising voter privacy.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 flex items-start">
              <div className="text-blue-600 text-3xl mr-4">👁️</div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Independent Auditing</h3>
                <p className="text-gray-600">
                  Multiple independent auditors have access to monitor the voting system in real-time, ensuring compliance with security protocols and verifying accurate vote tallying.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 flex items-start">
              <div className="text-blue-600 text-3xl mr-4">🔄</div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Voter Verification</h3>
                <p className="text-gray-600">
                  Each voter can verify their vote was correctly recorded and counted using a unique receipt code, without revealing their voting choices to others.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Transform Your Community's Decision-Making</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Join the growing movement of communities embracing direct democracy through secure digital voting. When citizens participate, everyone wins.
          </p>
          <div className="inline-flex rounded-md shadow">
            <Link href={{ pathname: "/projects/governance", hash: "request-demo" }} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50">
              Request Implementation Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 