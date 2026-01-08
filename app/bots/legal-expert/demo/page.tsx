'use client';

import React from 'react';
import Link from 'next/link';
import BotPageHeader from '../../../../components/BotPageHeader';
import DemoOrchestrator from '../components/demo/DemoOrchestrator';
import '../styles.css';

export default function LexDemo() {
  const menuItems = [
    { id: 'demo', label: 'Demo', icon: '🎯', section: 'demo' },
    { id: 'about', label: 'About Lex', icon: '⚖️', section: 'about' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <BotPageHeader
        botTitle="Lex"
        botEmoji="⚖️"
        botSlug="legal-expert"
        menuItems={menuItems}
        accentColor="blue"
      />

      <main className="mx-auto max-w-screen-xl px-6">
        {/* Hero Section */}
        <section className="pt-12 pb-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-full text-sm font-medium mb-6">
              <span className="mr-2">⚖️</span>
              Interactive Demo
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Try Lex - AI Legal Assistant
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience how Lex analyzes your legal case with AI, then connects you with the perfect lawyer.
              This is a fully interactive demo - no signup required.
            </p>

            {/* Back to Main Page */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Link
                href="/bots/legal-expert"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Lex Overview
              </Link>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="scroll-mt-24 pb-20">
          <DemoOrchestrator />
        </section>

        {/* About Section */}
        <section id="about" className="scroll-mt-24 py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How Lex Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Analysis First</h3>
                <p className="text-sm text-gray-600">
                  Get instant AI-powered legal analysis of your case before connecting with lawyers
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚖️</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Smart Matching</h3>
                <p className="text-sm text-gray-600">
                  Our AI matches you with lawyers based on your specific case and needs
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💼</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure Workspace</h3>
                <p className="text-sm text-gray-600">
                  Collaborate with your lawyer in a secure, encrypted data room
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">💡</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Why Lex?</h4>
                  <p className="text-sm text-gray-700 mb-4">
                    Lex democratizes access to legal services by combining AI-powered analysis with expert human lawyers.
                    Start with AI to understand your case, then connect with a lawyer only when you need one.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Instant Analysis:</strong> Get AI legal insights in minutes, not days</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Cost-Effective:</strong> Understand your case before spending on legal fees</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Perfect Match:</strong> AI finds lawyers specialized in your exact case type</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/bots/legal-expert"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-lg transition-all shadow-lg"
              >
                Learn More About Lex
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
