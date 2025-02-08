'use client';

import React from 'react';
import Link from 'next/link';

export default function LiberTech() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-screen-xl px-6 py-16">
        <div className="mb-16">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900">LiberTech</h1>
          <p className="mb-8 text-lg text-gray-600">
            Technologies dedicated to maximizing human liberty and minimizing government power.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Government Spending Tracker</h2>
            <p className="mb-6 text-gray-600">
              A Venmo-like timeline for all government spending. Every payment includes:
            </p>
            <ul className="mb-6 space-y-3 text-gray-600">
              <li>• Unique transaction ID</li>
              <li>• Date and time</li>
              <li>• Sender (government agency)</li>
              <li>• Receiver (individual/organization)</li>
              <li>• Amount and currency</li>
              <li>• Legal basis for payment</li>
              <li>• Purpose and description</li>
            </ul>
            <p className="mb-6 text-gray-600">
              Users can view, like, comment, and share transactions. They can also donate to either
              the sender or receiver, promoting transparency and engagement in government spending.
            </p>
            <Link
              href="/projects/libertech/gov-spending"
              className="inline-flex items-center text-sm font-medium text-openai-green hover:text-opacity-80"
            >
              Learn more about Government Spending Tracker
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Future Initiatives</h2>
            <p className="mb-6 text-gray-600">
              We're constantly developing new technologies to enhance transparency and reduce
              government overreach. Our upcoming projects include:
            </p>
            <ul className="mb-6 space-y-3 text-gray-600">
              <li>• Blockchain-based voting systems</li>
              <li>• Decentralized identity verification</li>
              <li>• Smart contract government services</li>
              <li>• Public fund allocation transparency tools</li>
            </ul>
            <p className="text-gray-600">
              Join us in building a future where technology empowers individuals and ensures
              government accountability.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">Get Involved</h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="mb-6 text-lg text-gray-600">
              We're looking for developers, designers, and advocates who share our vision of
              using technology to promote liberty and transparency.
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
