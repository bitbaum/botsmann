'use client';

import React from 'react';
import Link from 'next/link';
import bots from '../../../data/bots';

export default function MedicalExpert() {
  const bot = bots.find(b => b.slug === 'medical-expert');

  if (!bot) {
    return <div>Bot not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-screen-xl px-6 py-16">
        <div className="mb-16">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900">{bot.title}</h1>
          <p className="mb-8 text-lg text-gray-600">{bot.overview}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Features</h2>
            <ul className="space-y-4">
              {bot.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="mr-3 h-5 w-5 flex-shrink-0 text-brand-500"
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
            <p className="mb-6 text-gray-600">{bot.details}</p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Ready to Enhance Your Medical Practice?</h2>
            <p className="mb-6 text-gray-600">
              Leverage our AI-powered medical expert assistant to stay current with research,
              analyze cases, and make informed decisions based on the latest medical evidence.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
