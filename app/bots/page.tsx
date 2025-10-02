import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { Bot } from '@/data/bots';
import bots from '@/data/bots';

// Bot display data with detailed explanations
const botDetails: Record<string, {
  name: string;
  type: string;
  emoji: string;
  tagline: string;
  whatItDoes: string;
  inputData: string;
  output: string;
  useCases: string[];
}> = {
  'legal-expert': {
    name: 'Lex',
    type: 'Legal Assistant',
    emoji: '⚖️',
    tagline: 'Your AI-powered legal companion',
    whatItDoes: 'Analyzes legal cases, matches you with expert lawyers, and provides secure collaborative workspaces',
    inputData: 'Legal documents, case descriptions, jurisdiction info',
    output: 'AI case analysis, lawyer matches, secure data room',
    useCases: ['Immigration cases', 'Employment disputes', 'Real estate contracts', 'Business law']
  },
  'swiss-german-teacher': {
    name: 'Heidi',
    type: 'Swiss German Teacher',
    emoji: '🇨🇭',
    tagline: 'Master Schwyzerdütsch naturally',
    whatItDoes: 'Provides contextual Swiss German learning with cultural insights and canton-specific variations',
    inputData: 'Your German level, target canton, learning goals',
    output: 'Personalized lessons, pronunciation guides, cultural context',
    useCases: ['Moving to Switzerland', 'Work in Swiss companies', 'Connect with locals', 'Canton-specific dialects']
  },
  'research-assistant': {
    name: 'Nerd',
    type: 'Research Assistant',
    emoji: '🧠',
    tagline: 'Accelerate your research workflow',
    whatItDoes: 'Organizes research materials, tracks citations, finds relevant papers, and synthesizes findings',
    inputData: 'Research papers, notes, queries, data sets',
    output: 'Literature reviews, citation networks, summaries, insights',
    useCases: ['Academic research', 'Market analysis', 'Patent research', 'Technical documentation']
  },
  'medical-expert': {
    name: 'Imhotep',
    type: 'Medical Expert',
    emoji: '⚕️',
    tagline: 'Evidence-based health insights',
    whatItDoes: 'Analyzes medical literature, symptoms, and data to provide evidence-based health information',
    inputData: 'Symptoms, medical history, lab results, research papers',
    output: 'Evidence-based insights, specialist recommendations, treatment options',
    useCases: ['Second opinions', 'Research rare conditions', 'Treatment comparisons', 'Clinical studies']
  },
  'artistic-advisor': {
    name: 'Artr',
    type: 'Creative Assistant',
    emoji: '🎨',
    tagline: 'Your creative co-pilot',
    whatItDoes: 'Analyzes art styles, generates creative concepts, and provides artistic feedback and guidance',
    inputData: 'Art references, style preferences, project briefs',
    output: 'Style analysis, creative concepts, technical feedback',
    useCases: ['Style exploration', 'Concept development', 'Art history research', 'Portfolio review']
  },
  'product-manager': {
    name: 'Trident',
    type: 'Product Manager',
    emoji: '🔱',
    tagline: 'Strategic product development',
    whatItDoes: 'Analyzes market data, user feedback, and competitive landscape to guide product strategy',
    inputData: 'User feedback, market data, feature requests, analytics',
    output: 'Product roadmaps, prioritization, competitive analysis',
    useCases: ['Feature prioritization', 'Market analysis', 'User research', 'Roadmap planning']
  }
};

export default function BotsList() {
  const readyBots = ['swiss-german-teacher', 'legal-expert'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="mx-auto max-w-screen-xl px-6 py-16">
        {/* Header with Core Concept */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Specialized AI Bots
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Each bot is an expert in its domain, trained to ingest your data and deliver exactly what you need
          </p>

          {/* Core Concept Visualization */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📥</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Ingest Data</h3>
                <p className="text-sm text-gray-600">
                  Law, health records, research papers, creative briefs - whatever your domain
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">2. AI Processing</h3>
                <p className="text-sm text-gray-600">
                  Domain-specific AI analyzes, synthesizes, and generates insights
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📤</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Deliver Output</h3>
                <p className="text-sm text-gray-600">
                  Actionable insights, expert matches, recommendations tailored to you
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bots Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {bots.map((bot) => {
            const details = botDetails[bot.slug] || {
              name: bot.title,
              type: bot.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
              emoji: '🤖',
              tagline: 'AI-powered assistant',
              whatItDoes: 'Helps with various tasks',
              inputData: 'Your data',
              output: 'Helpful insights',
              useCases: []
            };

            const isReady = readyBots.includes(bot.slug);

            return (
              <Link
                key={bot.slug}
                href={`/bots/${bot.slug}`}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-blue-200"
              >
                {!isReady && (
                  <span className="absolute right-4 top-4 z-10 inline-block bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}

                {/* Bot Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center mb-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mr-4 bg-gradient-to-br from-gray-100 to-gray-200">
                      <span className="text-3xl">{details.emoji}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{details.name}</h2>
                      <p className="text-sm text-gray-500">{details.type}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic text-sm mb-4">"{details.tagline}"</p>
                </div>

                {/* What It Does */}
                <div className="px-6 pb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">What it does</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{details.whatItDoes}</p>
                </div>

                {/* Data Flow */}
                <div className="px-6 pb-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="font-semibold text-gray-700 mb-1">📥 Input</div>
                        <div className="text-gray-600">{details.inputData}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-700 mb-1">📤 Output</div>
                        <div className="text-gray-600">{details.output}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Use Cases */}
                {details.useCases && details.useCases.length > 0 && (
                  <div className="px-6 pb-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Perfect for</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {details.useCases.slice(0, 3).map((useCase, idx) => (
                        <span key={idx} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="px-6 pb-6">
                  <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
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
            href="/#collaboration"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all shadow-md"
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
