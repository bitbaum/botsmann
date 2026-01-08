'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import bots from '@/data/bots';

// Bot categories for filtering
const botCategories = [
  { id: 'all', label: 'All Bots', icon: '🤖' },
  { id: 'ready', label: 'Available Now', icon: '✅' },
  { id: 'coming-soon', label: 'Coming Soon', icon: '🚧' },
  { id: 'legal', label: 'Legal', icon: '⚖️' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'research', label: 'Research', icon: '🔬' },
  { id: 'medical', label: 'Medical', icon: '⚕️' },
  { id: 'creative', label: 'Creative', icon: '🎨' },
  { id: 'business', label: 'Business', icon: '💼' },
];

// Helper function to extract use cases from bot details
const getUseCases = (slug: string): string[] => {
  const useCaseMap: Record<string, string[]> = {
    'legal-expert': ['Immigration cases', 'Employment disputes', 'Real estate contracts', 'Business law'],
    'swiss-german-teacher': ['Moving to Switzerland', 'Work in Swiss companies', 'Connect with locals', 'Canton-specific dialects'],
    'research-assistant': ['Academic research', 'Market analysis', 'Patent research', 'Technical documentation'],
    'medical-expert': ['Second opinions', 'Research rare conditions', 'Treatment comparisons', 'Clinical studies'],
    'artistic-advisor': ['Style exploration', 'Concept development', 'Art history research', 'Portfolio review'],
    'product-manager': ['Feature prioritization', 'Market analysis', 'User research', 'Roadmap planning'],
  };
  return useCaseMap[slug] || [];
};

export default function BotsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter bots based on search and category
  const filteredBots = useMemo(() => {
    return bots.filter((bot) => {
      const matchesSearch = bot.shortName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bot.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' ||
                             (selectedCategory === 'ready' && bot.status === 'live') ||
                             (selectedCategory === 'coming-soon' && bot.status !== 'live') ||
                             bot.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <div className="mx-auto max-w-screen-xl px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Specialized AI Bots
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Each bot is an expert in its domain, trained to ingest your data and deliver exactly what you need
          </p>

          {/* Search and Filters */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                {/* Search */}
                <div className="relative flex-1 w-full lg:max-w-md">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search bots by name, type, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-openai-green focus:border-transparent outline-none text-sm"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {botCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-openai-green text-white shadow-md transform scale-105'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                      }`}
                    >
                      <span className="text-base">{category.icon}</span>
                      <span className="hidden sm:inline">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-gray-600">
            Showing {filteredBots.length} of {bots.length} bots
          </p>
        </div>

        {/* Bots Grid */}
        {filteredBots.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBots.map((bot) => {
              const isReady = bot.status === 'live';

              return (
                <Link
                  key={bot.slug}
                  href={`/bots/${bot.slug}`}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-green-200"
                >
                  {!isReady && (
                    <span className="absolute right-4 top-4 z-10 inline-block bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}

                  {/* Bot Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mr-4 bg-gradient-to-br from-green-100 to-emerald-200 group-hover:from-openai-green group-hover:to-green-600 transition-colors">
                        <span className="text-3xl group-hover:scale-110 transition-transform">{bot.emoji || '🤖'}</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-openai-green transition-colors">{bot.shortName || bot.title}</h2>
                        <p className="text-sm text-gray-500">{bot.category ? bot.category.charAt(0).toUpperCase() + bot.category.slice(1) : 'AI Assistant'}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic text-sm mb-4">"{bot.overview}"</p>
                  </div>

                  {/* What It Does */}
                  <div className="px-6 pb-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">What it does</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{bot.description}</p>
                  </div>

                  {/* Features Preview */}
                  <div className="px-6 pb-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100">
                      <h3 className="text-xs font-semibold text-gray-700 mb-2">✨ Key Features</h3>
                      <div className="text-xs text-gray-600 space-y-1">
                        {bot.features.slice(0, 2).map((feature, idx) => (
                          <div key={idx} className="line-clamp-1">• {feature}</div>
                        ))}
                        {bot.features.length > 2 && (
                          <div className="text-gray-500">+ {bot.features.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Use Cases */}
                  {getUseCases(bot.slug).length > 0 && (
                    <div className="px-6 pb-4">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Perfect for</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {getUseCases(bot.slug).slice(0, 3).map((useCase, idx) => (
                          <span key={idx} className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center text-openai-green font-semibold group-hover:gap-2 transition-all">
                      <span>{isReady ? 'Try Now' : 'Learn More'}</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No bots found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-openai-green text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Need a custom bot for your domain?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We build specialized AI bots for any field. From healthcare to finance, education to engineering -
            if you have data, we can build intelligence around it.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-6 py-3 bg-openai-green hover:bg-green-700 text-white font-semibold rounded-lg transition-all shadow-md"
          >
            Let's Build Together
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
