'use client';

import React, { useState } from 'react';
import { NextSection } from '../../../src/components/navigation/NextSection';

export default function TechnoCapital() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    
    // Simulating form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormSubmitted(true);
    } catch {
      setFormError('There was an error submitting the form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-screen-xl px-6 py-16">
        {/* Title and Overview */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block bg-openai-green text-white text-xs font-medium px-2 py-1 rounded">
              Coming Soon
            </span>
            <span className="text-sm text-gray-500">Investment fund launching 2025</span>
          </div>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900">
            Botsmann Techno-Capital (BTC)
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Accelerating humanity toward technological singularity through strategic investments in commodities, research, and subterranean development.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Investment Focus</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-openai-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">Strategic commodities: uranium, rare earths, copper, and other critical resources</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-openai-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">Advanced research funding for AI, fusion energy, and longevity science</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-openai-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">Subterranean and space-based real estate development via SubSpace Capital</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-openai-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">Long-term investment horizon (20+ years) focused on singularity acceleration</span>
              </li>
            </ul>
          </div>
          
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Our Vision</h2>
            <p className="mb-6 text-gray-600">
              Botsmann Techno-Capital is dedicated to accelerating humanity's progress toward technological singularity—when artificial intelligence surpasses human capabilities and leads to unprecedented growth and advancement.
            </p>
            <p className="mb-6 text-gray-600">
              Unlike traditional investment funds that focus on quarterly returns or existing companies, BTC strategically invests in the foundational resources, physical infrastructure, and breakthrough research needed to support this technological transformation.
            </p>
            <p className="text-gray-600">
              By focusing on commodities and physical infrastructure rather than companies, we ensure direct control of the critical resources required for technological advancement.
            </p>
          </div>
        </div>

        {/* SubSpace Capital Section */}
        <section className="mt-16 mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">SubSpace Capital</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-openai-green rounded-full flex items-center justify-center text-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Our Real Estate Division</h3>
            </div>
            <p className="text-gray-600 mb-6">
              SubSpace Capital is our specialized real estate division that invests in the most undervalued property class: subterranean real estate and extraterrestrial development. We focus on:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-xl border border-gray-200 p-6">
                <h4 className="font-medium text-gray-900 mb-3">Earth-Based Underground Properties</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="mr-3 h-5 w-5 flex-shrink-0 text-openai-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Climate-resilient bunkers and habitation facilities</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-3 h-5 w-5 flex-shrink-0 text-openai-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Subterranean data centers with natural cooling</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-3 h-5 w-5 flex-shrink-0 text-openai-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Underground transportation and logistics networks</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-xl border border-gray-200 p-6">
                <h4 className="font-medium text-gray-900 mb-3">Space-Based Development</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="mr-3 h-5 w-5 flex-shrink-0 text-openai-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Lunar and Martian subsurface habitat technologies</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-3 h-5 w-5 flex-shrink-0 text-openai-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Asteroid mining rights and extraction infrastructure</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-3 h-5 w-5 flex-shrink-0 text-openai-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Early claims on extraterrestrial real estate resources</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600 italic text-center">
                "The future of humanity may lie beneath the surface—of Earth and beyond. By developing subterranean and space-based habitats, we're creating the resilient infrastructure needed for the coming technological singularity."
              </p>
            </div>
          </div>
        </section>
        
        {/* Investment Approach */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">Investment Approach</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <ol className="space-y-4">
              <li className="flex items-start">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-openai-green text-white">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Strategic Resource Acquisition</h3>
                  <p className="text-gray-600">We identify and acquire commodities and physical assets that will become increasingly critical for technological advancement.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-openai-green text-white">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Research Integration</h3>
                  <p className="text-gray-600">We fund breakthrough research that enhances the value of our physical assets and accelerates singularity development.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-openai-green text-white">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Infrastructure Creation</h3>
                  <p className="text-gray-600">We develop the physical and digital infrastructure needed to support exponential technological growth.</p>
                </div>
              </li>
            </ol>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-md">
              <h3 className="font-medium text-gray-900 mb-3">Trading Strategy</h3>
              <p className="text-gray-600 mb-3">For commodity investments, we maintain a balanced portfolio approach:</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="mr-3 h-5 w-5 flex-shrink-0 text-openai-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Long positions (20–40%) for building strategic reserves</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-3 h-5 w-5 flex-shrink-0 text-openai-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Short positions (5–50%) to capitalize on market inefficiencies</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Waitlist Section */}
        <section id="waitlist" className="mb-16">
          <div className="rounded-xl bg-gray-50 p-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Join Our Investor Waitlist</h2>
            <p className="mb-8 text-lg text-gray-600 max-w-2xl mx-auto">
              Botsmann Techno-Capital is preparing to launch. Join our waitlist to be among the first to invest in humanity's technological future.
            </p>
            
            {formSubmitted ? (
              <div className="max-w-md mx-auto bg-green-50 border border-green-200 rounded-md p-4 text-center">
                <svg className="w-16 h-16 text-openai-green mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  You've been added to our waitlist. We'll notify you when Botsmann Techno-Capital launches.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="entity" className="block text-sm font-medium text-gray-700 mb-1">Investment Entity (Optional)</label>
                  <input
                    type="text"
                    id="entity"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Individual, Fund, or Institution"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Potential Investment Amount</label>
                  <select
                    id="amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select an amount</option>
                    <option value="25k-100k">$25,000 - $100,000</option>
                    <option value="100k-500k">$100,000 - $500,000</option>
                    <option value="500k-1m">$500,000 - $1 million</option>
                    <option value="1m-5m">$1 million - $5 million</option>
                    <option value="5m+">$5 million+</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full inline-flex items-center justify-center rounded-md bg-openai-green px-6 py-3 text-base font-medium text-white ${submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'} transition-opacity`}
                >
                  {submitting ? 'Submitting...' : 'Join Waitlist'}
                </button>
                {formError && <p className="mt-2 text-sm text-red-600">{formError}</p>}
              </form>
            )}
          </div>
        </section>

        <NextSection
          nextPage="/projects"
          title="Explore Our Other Projects"
          description="Discover our long-term initiatives that are reshaping industries and creating positive change."
        />
      </main>
    </div>
  );
} 