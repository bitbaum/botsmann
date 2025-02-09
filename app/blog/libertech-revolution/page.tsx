'use client';

import React from 'react';
import Link from 'next/link';

export default function LibertechRevolutionPost() {
  return (
    <article className="prose prose-gray mx-auto">
      <h1 className="mb-8 text-4xl font-semibold tracking-tight text-gray-900">
        The LiberTech Revolution: Transparency Through Technology
      </h1>

      <p className="mb-4 text-gray-600">
        In an age where government accountability is more crucial than ever, we're proud to introduce
        LiberTech - our initiative to maximize human liberty through technological innovation. At the
        heart of this revolution is our government spending tracker, a tool that brings unprecedented
        transparency to public finance.
      </p>

      <h2 className="mb-4 text-2xl font-semibold text-gray-900">The Power of Public Oversight</h2>
      <p className="mb-4 text-gray-600">
        Our government spending tracker transforms how citizens interact with public finance by creating
        a Venmo-like social experience around government transactions. Every payment made by government
        entities is:
      </p>
      <ul className="mb-6 list-disc pl-6 text-gray-600">
        <li>Assigned a unique transaction ID</li>
        <li>Timestamped and dated</li>
        <li>Tagged with sender (government agency) and receiver information</li>
        <li>Documented with amount and currency</li>
        <li>Linked to its legal basis</li>
        <li>Described with a clear purpose</li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold text-gray-900">Social Features for Civic Engagement</h2>
      <p className="mb-4 text-gray-600">What makes our platform revolutionary is its social aspect. Users can:</p>
      <ul className="mb-6 list-disc pl-6 text-gray-600">
        <li>View a chronological timeline of government spending</li>
        <li>Like and react to transactions</li>
        <li>Comment on spending decisions</li>
        <li>Share transactions on social media</li>
        <li>Donate directly to either the government agency or recipient</li>
        <li>Follow specific agencies or spending categories</li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold text-gray-900">Impact on Democracy</h2>
      <p className="mb-4 text-gray-600">This level of transparency and engagement has far-reaching implications:</p>
      <ol className="mb-6 list-decimal pl-6 text-gray-600">
        <li>Officials know their spending decisions are visible to all</li>
        <li>Citizens gain insight into how their tax money is used</li>
        <li>The ability to comment and donate creates a new form of civic engagement</li>
        <li>Patterns in spending become visible and analyzable</li>
      </ol>

      <h2 className="mb-4 text-2xl font-semibold text-gray-900">Looking Forward</h2>
      <p className="mb-4 text-gray-600">
        The government spending tracker is just the beginning. We're developing additional tools to:
      </p>
      <ul className="mb-6 list-disc pl-6 text-gray-600">
        <li>Track legislative processes in real-time</li>
        <li>Monitor regulatory compliance</li>
        <li>Analyze policy impacts</li>
        <li>Enable citizen feedback on proposed legislation</li>
      </ul>

      <div className="mt-8">
        <Link
          href="/about"
          className="inline-flex items-center justify-center rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
        >
          Contact Us
        </Link>
      </div>
    </article>
  );
}
