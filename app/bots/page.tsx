import React from 'react';
import Link from 'next/link';
import bots from '@/data/bots';
import { getChatPathFromBotSlug } from '@/data/professionals';

export default function BotsList() {
  // Only mark bots as "ready" if they have actual working try links
  // Currently only Heidi (swiss-german-teacher) has a GPT link
  const readyBots = bots.filter((b) => b.tryLink).map((b) => b.slug);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-action-tint">
      <div className="mx-auto max-w-screen-xl px-6 py-16">
        {/* Header with Core Concept */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Specialized AI Bots</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Each bot is an expert in its domain, trained to ingest your data and deliver exactly
            what you need
          </p>

          {/* Core Concept Visualization */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-action-tint rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📥</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Ingest Data</h3>
                <p className="text-sm text-gray-600">
                  Law, health records, research papers, creative briefs - whatever your domain
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-action-tint rounded-full flex items-center justify-center mx-auto mb-3">
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
            // Derive display data from bot.display with sensible fallbacks
            const display = bot.display || {
              tagline: bot.description,
              whatItDoes: bot.overview,
              inputData: 'Your data',
              output: 'AI insights',
              useCases: bot.features.slice(0, 4),
            };

            // Derive name/type/emoji from nav or fallback
            const name = bot.nav?.navTitle || bot.title;
            const type =
              bot.nav?.navDescription?.replace(/^AI\s+/, '') ||
              bot.slug
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            const emoji = bot.nav?.emoji || '🤖';

            const isReady = readyBots.includes(bot.slug);

            return (
              <Link
                key={bot.slug}
                href={getChatPathFromBotSlug(bot.slug)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-action"
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
                      <span className="text-3xl">{emoji}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                      <p className="text-sm text-gray-500">{type}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic text-sm mb-4">"{display.tagline}"</p>
                </div>

                {/* What It Does */}
                <div className="px-6 pb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    What it does
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{display.whatItDoes}</p>
                </div>

                {/* Data Flow */}
                <div className="px-6 pb-4">
                  <div className="bg-action-tint rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="font-semibold text-gray-700 mb-1">📥 Input</div>
                        <div className="text-gray-600">{display.inputData}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-700 mb-1">📤 Output</div>
                        <div className="text-gray-600">{display.output}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Use Cases */}
                {display.useCases && display.useCases.length > 0 && (
                  <div className="px-6 pb-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      Perfect for
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {display.useCases.slice(0, 3).map((useCase, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="px-6 pb-6">
                  <div className="flex items-center text-action font-semibold group-hover:gap-2 transition-all">
                    <span>Chat Now</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
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
            We build specialized AI bots for any field. From healthcare to finance, education to
            engineering - if you have data, we can build intelligence around it.
          </p>
          <Link
            href="/#collaboration"
            className="inline-flex items-center gap-2 px-6 py-3 bg-action hover:bg-action-hover text-white font-semibold rounded-lg transition-all shadow-md"
          >
            Let's Build Together
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
