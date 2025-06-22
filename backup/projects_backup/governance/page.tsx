"use client";

import React from "react";
import Link from "next/link";

export default function GovSpendingTracker() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-screen-xl px-6 py-16">
        <div className="mb-16">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900">
            Government Spending Tracker
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            A transparent, social platform for tracking and engaging with
            government spending in real-time.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Transaction Details
            </h2>
            <p className="mb-6 text-gray-600">
              Every government payment is tracked with comprehensive details:
            </p>
            <ul className="mb-6 space-y-3 text-gray-600">
              <li>• Unique transaction ID for each payment</li>
              <li>• Date and timestamp of transaction</li>
              <li>• Sender (government agency)</li>
              <li>• Receiver (individual/organization)</li>
              <li>• Payment amount and currency</li>
              <li>• Legal basis for the payment</li>
              <li>• Detailed purpose description</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Social Features
            </h2>
            <p className="mb-6 text-gray-600">
              Engage with government spending through social interactions:
            </p>
            <ul className="mb-6 space-y-3 text-gray-600">
              <li>• View transaction timelines</li>
              <li>• Like and react to transactions</li>
              <li>• Comment on spending decisions</li>
              <li>• Share transactions on social media</li>
              <li>• Donate to agencies or recipients</li>
              <li>• Follow specific agencies or programs</li>
              <li>• Receive notifications on spending patterns</li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">
            Demo Timeline
          </h2>
          <div className="space-y-6">
            {/* Example Transaction */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Transaction #A1B2C3</p>
                  <h3 className="text-lg font-medium text-gray-900">
                    Department of Education → Local School District
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-gray-900">$500,000</p>
                  <p className="text-sm text-gray-500">March 15, 2024</p>
                </div>
              </div>
              <p className="mb-4 text-gray-600">
                Annual funding for STEM education programs and equipment
                upgrades.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <button className="flex items-center text-sm text-gray-500 hover:text-openai-green">
                    <svg
                      className="mr-1.5 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    Like
                  </button>
                  <button className="flex items-center text-sm text-gray-500 hover:text-openai-green">
                    <svg
                      className="mr-1.5 h-4 w-4"
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
                    Comment
                  </button>
                  <button className="flex items-center text-sm text-gray-500 hover:text-openai-green">
                    <svg
                      className="mr-1.5 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Share
                  </button>
                </div>
                <button className="rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90">
                  Donate
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">
            Get Involved
          </h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="mb-6 text-lg text-gray-600">
              Help us promote government transparency and accountability.
              Contact us to learn more about implementing the Government
              Spending Tracker in your jurisdiction.
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
