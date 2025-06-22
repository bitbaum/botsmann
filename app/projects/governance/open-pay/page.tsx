"use client";

import React, { useState } from "react";
import Link from "next/link";
import DetailedComponentsNav from "../components/DetailedComponentsNav";
import TransactionDemo from "../components/TransactionDemo";

/**
 * Open Pay - Transparent government transactions with instant verification
 * Highlights the value of complete financial transparency in governance
 */

// Enhanced transaction type with social components and law traceability
type Transaction = {
  id: string;
  date: string;
  department: string;
  recipient: string;
  description: string;
  amount: number;
  status: string;
  documents: string[];
  approvals: string[];
  metrics: {
    timeToCompletion: string;
    costVsBudget: string;
    qualityScore: string;
  };
  // Social components
  socialInteraction?: {
    likes: number;
    dislikes: number;
    comments: number;
    shares: number;
    donations: number;
  };
  // Law traceability
  enablingLaw?: {
    id: string;
    name: string;
    date: string;
    sponsors: string[];
    link: string;
  };
  timeline?: { date: string; event: string }[];
};

export default function OpenPay() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Open Pay</h1>
              <p className="text-xl mb-8 text-blue-100">
                End financial opacity in government forever. A revolutionary
                transaction system that gives every taxpayer direct visibility
                into how their money is spent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={{ pathname: "#demo" }}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md bg-white text-blue-700 hover:bg-blue-50"
                >
                  See Live Transactions
                </Link>
                <Link
                  href={{ pathname: "#benefits" }}
                  className="inline-flex items-center justify-center px-5 py-3 border border-blue-400 text-base font-medium rounded-md text-white hover:bg-blue-700"
                >
                  Explore Benefits
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative p-6 bg-white rounded-lg shadow-xl">
                <div className="absolute -top-4 -right-4 bg-green-100 px-4 py-1 rounded-full text-green-800 text-sm font-medium">
                  LIVE
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Department of Transportation
                    </h3>
                    <p className="text-sm text-gray-500">
                      Transaction #TX-2023-06-15-001
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-gray-900">
                      $249,800
                    </p>
                    <p className="text-xs text-gray-500">June 15, 2023</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Highway Repair - Section 14A
                </p>
                <div className="mt-2 flex justify-between">
                  <div className="flex space-x-3">
                    <button className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200">
                      <span className="mr-1">👍</span> 87
                    </button>
                    <button className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200">
                      <span className="mr-1">👎</span> 21
                    </button>
                  </div>
                  <span className="inline-flex items-center text-xs text-gray-500">
                    <span className="mr-1">💬</span> 18 comments
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="benefits" className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Open Pay is Indispensable
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="text-blue-600 text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Eliminate Wasteful Spending
              </h3>
              <p className="text-gray-600">
                Research shows public scrutiny reduces unnecessary government
                spending by up to 18% while improving service quality. Open Pay
                provides the transparency needed to identify and eliminate
                waste.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="text-blue-600 text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Prevent Corruption Automatically
              </h3>
              <p className="text-gray-600">
                When every dollar is tracked publicly, corruption becomes nearly
                impossible. Open Pay's transaction verification system creates
                an environment where financial misconduct is immediately
                visible.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="text-blue-600 text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Restore Public Trust
              </h3>
              <p className="text-gray-600">
                In regions using similar systems, public trust in government
                increased by 41%. Open Pay bridges the gap between taxpayers and
                their government, creating unprecedented accountability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div id="demo" className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              See It In Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore, comment on, and verify real government transactions in
              real-time. This is what true financial transparency looks like.
            </p>
          </div>

          <TransactionDemo />
        </div>
      </div>

      {/* Implementation Section */}
      <div className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Implementation Without Disruption
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Open Pay can be implemented alongside existing financial systems
              with minimal operational changes, making the transition to
              transparency smooth and cost-effective.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <div className="flex-1 max-w-md bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                For Government Leaders
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Showcase your commitment to transparency</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Reduce audit costs by up to 35%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Improve public approval ratings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Reduce administrative overhead</span>
                </li>
              </ul>
            </div>

            <div className="flex-1 max-w-md bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                For Citizens
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>See exactly how your tax dollars are spent</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Provide direct feedback on government spending</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Hold elected officials accountable</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Participate in spending prioritization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready for True Financial Transparency?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Join the growing movement of governments and citizens embracing
            complete financial transparency. The future of public finance is
            open.
          </p>
          <div className="inline-flex rounded-md shadow">
            <Link
              href={{ pathname: "/projects/governance", hash: "request-demo" }}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
            >
              Request Implementation Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
