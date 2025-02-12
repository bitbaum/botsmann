'use client';

import React from 'react';
import Link from 'next/link';

export default function Roboshop() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-screen-xl px-6 py-16">
        <div className="mb-16">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900">Roboshop</h1>
          <p className="mb-8 text-lg text-gray-600">
            AI-powered shopping assistant that finds exactly what you need with just one word.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">One-Word Query System</h2>
            <p className="mb-6 text-gray-600">
              Simply input a single word and let our advanced AI understand and fulfill your shopping needs:
            </p>
            <ul className="mb-6 space-y-3 text-gray-600">
              <li>• Natural Language Processing for accurate interpretation</li>
              <li>• Context-aware product matching</li>
              <li>• Multi-platform product search</li>
              <li>• Price comparison and optimization</li>
              <li>• Personalized recommendations</li>
            </ul>
            <p className="text-gray-600">
              Our system leverages cutting-edge AI to understand your needs and find the perfect products
              across multiple e-commerce platforms.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Platform Integration</h2>
            <p className="mb-6 text-gray-600">
              We search across multiple e-commerce platforms to find the best options:
            </p>
            <ul className="mb-6 space-y-3 text-gray-600">
              <li>• Amazon marketplace integration</li>
              <li>• Ricardo platform connectivity</li>
              <li>• Real-time price tracking</li>
              <li>• Automated price comparison</li>
              <li>• Secure transaction processing</li>
            </ul>
            <p className="text-gray-600">
              Get the best deals from multiple sources with our comprehensive platform integration.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">Try It Now</h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-8">
              <label htmlFor="query" className="mb-2 block text-sm font-medium text-gray-700">
                Enter your query
              </label>
              <input
                type="text"
                id="query"
                className="block w-full rounded-md border-gray-200 px-4 py-2 text-gray-900 shadow-sm focus:border-openai-green focus:ring-openai-green sm:text-sm"
                placeholder="Type a single word (e.g., 'laptop')"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
            >
              Search Products
            </button>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">Get Started</h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="mb-6 text-lg text-gray-600">
              Ready to revolutionize your shopping experience? Contact us to learn more about
              implementing Roboshop in your business.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
