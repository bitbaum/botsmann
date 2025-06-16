import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Route } from 'next';
import solutions from '@/data/solutions.json';

export default function SolutionsPage() {
  const allSolutions = [
    ...solutions.individuals.map(s => ({ ...s, category: 'individuals' })),
    ...solutions.businesses.map(s => ({ ...s, category: 'businesses' })),
    ...solutions.governments.map(s => ({ ...s, category: 'governments' }))
  ];
  
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight">AI Solutions for Everyone</h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          At Kigott, we develop cutting-edge AI solutions tailored to the unique needs of individuals, 
          businesses, and governments. Our innovative technologies help automate tasks, enhance 
          productivity, and unlock new possibilities.
        </p>
      </div>

      {/* Customer Categories */}
      <div className="grid gap-10 md:grid-cols-3">
        {/* Individuals */}
        <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md relative">
          <div className="relative h-48 w-full overflow-hidden bg-gray-200">
            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 font-medium">Individuals</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">For Individuals</h2>
            <p className="mb-5 flex-1 text-gray-600">
              Enhance your personal life with AI assistants that help you shop smarter, 
              learn languages faster, and get expert advice on legal, medical, and creative matters.
            </p>
            <Link
              href="/solutions/individuals"
              className="mt-auto inline-flex items-center font-medium text-brand-500 hover:underline"
            >
              Learn more
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Businesses */}
        <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md relative">
          <span className="absolute right-4 top-4 z-10 inline-block bg-brand-500 text-white text-xs font-medium px-2 py-1 rounded">
            Coming Soon
          </span>
          <div className="relative h-48 w-full overflow-hidden bg-gray-200">
            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 font-medium">Businesses</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">For Businesses</h2>
            <p className="mb-5 flex-1 text-gray-600">
              Streamline operations, increase efficiency, and gain valuable insights with 
              our AI solutions designed specifically for businesses of all sizes.
            </p>
            <Link
              href="/solutions/businesses"
              className="mt-auto inline-flex items-center font-medium text-brand-500 hover:underline"
            >
              Learn more
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Governments */}
        <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md relative">
          <span className="absolute right-4 top-4 z-10 inline-block bg-brand-500 text-white text-xs font-medium px-2 py-1 rounded">
            Coming Soon
          </span>
          <div className="relative h-48 w-full overflow-hidden bg-gray-200">
            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 font-medium">Governments</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">For Governments</h2>
            <p className="mb-5 flex-1 text-gray-600">
              Enhance transparency, improve public services, and optimize resource allocation with our 
              specialized AI tools designed for government agencies and public institutions.
            </p>
            <Link
              href="/solutions/governments"
              className="mt-auto inline-flex items-center font-medium text-brand-500 hover:underline"
            >
              Learn more
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* All Solutions Section */}
      <div className="mt-16">
        <h2 className="mb-8 text-3xl font-semibold text-gray-900">All Solutions</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allSolutions.map((solution) => (
            <Link 
              key={`${solution.category}-${solution.slug}`} 
              href={`/solutions/${solution.category}/${solution.slug}` as Route}
              className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md relative"
            >
              {solution.slug !== 'swiss-german-teacher' && (
                <span className="absolute right-4 top-4 inline-block bg-brand-500 text-white text-xs font-medium px-2 py-1 rounded">
                  Coming Soon
                </span>
              )}
              <div>
                <h2 className="mb-2 text-xl font-semibold text-gray-900">{solution.title}</h2>
                <p className="mb-4 text-gray-600 min-h-[3rem]">{solution.overview}</p>
              </div>
              <span className="text-sm font-medium text-brand-500 group-hover:underline mt-auto">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="mt-16 rounded-xl bg-gray-50 p-8 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">Ready to Transform Your Experience?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-600">
          Contact us today to discuss how our AI solutions can be tailored to your specific needs and challenges.
        </p>
        <Link
          href="/contact"
          className="rounded-md bg-brand-500 px-6 py-3 text-base font-medium text-white hover:bg-opacity-90 transition-opacity"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}