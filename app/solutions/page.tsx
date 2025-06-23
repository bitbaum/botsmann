"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import solutions from '@/data/solutions.json';

const projectSolutions = [
  {
    slug: 'credit',
    title: 'Credit',
    overview: 'Automated venture credit operations.',
    category: 'projects',
    path: '/projects/credit'
  },
  {
    slug: 'finance',
    title: 'Project Finance',
    overview: 'Open project finance management.',
    category: 'projects',
    path: '/projects/finance'
  },
  {
    slug: 'governance',
    title: 'Governance',
    overview: 'Transparent, accountable government tech.',
    category: 'projects',
    path: '/projects/governance'
  },
  {
    slug: 'shopping',
    title: 'Recurring Fulfillment',
    overview: 'Manage subscriptions and inventory.',
    category: 'projects',
    path: '/projects/shopping'
  },
  {
    slug: 'techno-capital',
    title: 'Techno-Capital',
    overview: 'Investment fund for technological progress.',
    category: 'projects',
    path: '/projects/techno-capital'
  }
];

export default function SolutionsPage() {
  const allSolutions = [
    ...solutions.individuals.map(s => ({
      ...s,
      category: 'individuals',
      path: `/solutions/individuals/${s.slug}`
    })),
    ...solutions.businesses.map(s => ({
      ...s,
      category: 'businesses',
      path: `/solutions/businesses/${s.slug}`
    })),
    ...solutions.governments.map(s => ({
      ...s,
      category: 'governments',
      path: `/solutions/governments/${s.slug}`
    })),
    ...projectSolutions
  ];
  
  const [filter, setFilter] = useState<'all' | 'individuals' | 'businesses' | 'governments' | 'projects'>('all');
  const filteredSolutions = filter === 'all' ? allSolutions : allSolutions.filter(s => s.category === filter);

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight">AI Solutions for Everyone</h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          At Botsmann, we develop cutting-edge AI solutions tailored to the unique needs of individuals, 
          businesses, and governments. Our innovative technologies help automate tasks, enhance 
          productivity, and unlock new possibilities.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {[
          { key: 'all', label: 'All' },
          { key: 'individuals', label: 'Individuals' },
          { key: 'businesses', label: 'Organizations' },
          { key: 'governments', label: 'Governments' },
          { key: 'projects', label: 'Projects' }
        ].map(btn => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === btn.key ? 'bg-openai-green text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* All Solutions Section */}
      <div className="mt-16">
        <h2 className="mb-8 text-3xl font-semibold text-gray-900">All Solutions</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSolutions.map((solution) => (
            <Link
              key={`${solution.category}-${solution.slug}`}
              href={solution.path as Route}
              className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md relative"
            >
              {solution.slug !== 'swiss-german-teacher' && (
                <span className="absolute right-4 top-4 inline-block bg-openai-green text-white text-xs font-medium px-2 py-1 rounded">
                  Coming Soon
                </span>
              )}
              <div>
                <h2 className="mb-2 text-xl font-semibold text-gray-900">{solution.title}</h2>
                <p className="mb-4 text-gray-600 min-h-[3rem]">{solution.overview}</p>
              </div>
              <span className="text-sm font-medium text-openai-green group-hover:underline mt-auto">
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
          className="rounded-md bg-openai-green px-6 py-3 text-base font-medium text-white hover:bg-opacity-90 transition-opacity"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}