'use client';

import React from 'react';
import Link from 'next/link';
import bots from '../../../data/bots';
import BotNavigation from '../BotNavigation';

export default function LegalExpert() {
  const bot = bots.find(b => b.slug === 'legal-expert');

  // Menu items for navigation
  const menuItems = [
    { id: 'features', label: 'Features', icon: '⚖️', section: 'features' },
    { id: 'use-cases', label: 'Use Cases', icon: '📝', section: 'use-cases' },
    { id: 'limitations', label: 'Limitations', icon: '⚠️', section: 'limitations' },
    { id: 'legal-topics', label: 'Legal Topics', icon: '📚', section: 'legal-topics' },
    { id: 'get-started', label: 'Get Started', icon: '🚀', section: 'get-started' }
  ];

  // Function to get the chat link
  const getChatLink = () => {
    return bot?.chatLink || 'https://chat.openai.com/';
  };

  if (!bot) {
    return <div>Bot not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Bot-specific Navigation */}
      <BotNavigation
        botTitle="Lex"
        botEmoji="⚖️"
        botDescription="AI Legal Assistant"
        accentColor="blue"
        menuItems={menuItems}
        chatLink={getChatLink()}
      />
      
      <main className="mx-auto max-w-screen-xl px-6 pt-24">
        {/* Title and Overview */}
        <div className="mb-16" id="features">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900">Lex</h1>
          
          {/* Legal Disclaimer */}
          <div className="mb-8 rounded-xl bg-yellow-50 p-4 border border-yellow-200">
            <div className="flex">
              <svg className="h-6 w-6 text-yellow-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="font-medium text-yellow-800">Important Disclaimer</h3>
                <p className="text-yellow-700 text-sm mt-1">
                  Lex provides information of a general nature and is designed for informational purposes only. 
                  It is not a substitute for professional legal advice. Always consult with a qualified attorney for specific legal matters.
                </p>
              </div>
            </div>
          </div>
          
          <p className="mb-8 text-lg text-gray-600">{bot.overview}</p>
        </div>

        {/* Features Section */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Features</h2>
            <ul className="space-y-4">
              {bot.features.map((feature, index) => (
                <li key={index} className="flex items-start">
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
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">How It Works</h2>
            <ol className="space-y-4">
              <li className="flex items-start">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-openai-green text-white">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Ask a legal question</h3>
                  <p className="text-gray-600">Type your legal question or upload a document for analysis.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-openai-green text-white">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">AI Analysis</h3>
                  <p className="text-gray-600">Our AI analyzes your question using legal knowledge and resources.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-openai-green text-white">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Get Insights</h3>
                  <p className="text-gray-600">Receive clear explanations and insights to better understand your legal matter.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Interactive Demo Section */}
        <section className="mt-16 mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">Try Lex</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="mb-4 text-gray-600">Enter a legal question or upload a document for analysis.</p>
            
            <div className="mb-6">
              <textarea 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-openai-green focus:ring-openai-green"
                rows={4}
                placeholder="Example: What are the key elements of a non-disclosure agreement?"
              />
            </div>
            
            <div className="flex justify-center">
              <button className="rounded-md bg-openai-green px-6 py-3 text-white hover:bg-opacity-90 transition-opacity">
                Get Legal Insights
              </button>
            </div>
          </div>
        </section>
        
        {/* Use Cases Section */}
        <section className="mt-16 mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">Common Use Cases</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Contract Review",
                description: "Quickly identify potential issues in contracts and agreements before signing.",
                icon: "document-text"
              },
              {
                title: "Legal Research",
                description: "Find relevant precedents and regulations for your legal questions.",
                icon: "search"
              },
              {
                title: "Compliance Check",
                description: "Review business practices against relevant regulations and standards.",
                icon: "shield-check"
              }
            ].map((useCase, index) => (
              <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-openai-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {useCase.icon === "document-text" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    )}
                    {useCase.icon === "search" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    )}
                    {useCase.icon === "shield-check" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    )}
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-medium text-gray-900">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="mt-16 mb-16">
          <div className="rounded-xl bg-gray-50 p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of users who are already benefiting from our AI-powered legal assistant.
            </p>
            <div className="flex justify-center gap-4">
              <button className="rounded-md bg-openai-green px-6 py-3 text-lg font-medium text-white hover:bg-opacity-90 transition-opacity">
                Try Lex Now
              </button>
              <button className="rounded-md border-2 border-openai-green px-6 py-3 text-lg font-medium text-openai-green hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
