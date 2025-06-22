"use client";

import React from "react";
import Image from "next/image";

/**
 * Hero section component for Solon Governance platform
 */
const HeroSection: React.FC = () => {
  return (
    <div className="pt-24 pb-12" id="overview">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1 animate-fadeIn">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              <span className="text-green-600">Solon</span> — Decentralized
              Direct Democracy
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Redefining governance through maximum transparency, direct citizen
              participation, and market-based efficiency. A revolution in
              democratic systems for the 21st century.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#components" className="btn-primary">
                Explore Features
              </a>
              <a href="/projects/governance/build" className="btn-secondary">
                Build With Us
              </a>
              <a href="#request-demo" className="btn-outline">
                Request a Demo
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    100% Transparent
                  </h3>
                  <p className="text-sm text-gray-500">
                    Public transactions & votes
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Citizen Powered
                  </h3>
                  <p className="text-sm text-gray-500">
                    Direct participation in decisions
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Data-Driven
                  </h3>
                  <p className="text-sm text-gray-500">
                    KPI-based governance models
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual content - replacing dark background with lighter design */}
          <div
            className="order-1 lg:order-2 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <div className="bg-white p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Empowering citizens with transparent, decentralized
                  decision-making
                </h2>

                <div className="space-y-6">
                  {/* Key Principle 1: Transparency */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-700 mr-2">
                        1
                      </span>
                      Transparency
                    </h3>
                    <ul className="text-gray-600 space-y-1 ml-8">
                      <li>• All government transactions</li>
                      <li>• All laws and regulations</li>
                      <li>• All contracts and contractors</li>
                      <li>• All decision-making processes</li>
                    </ul>
                  </div>

                  {/* Key Principle 2: Measurement */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-700 mr-2">
                        2
                      </span>
                      Outcome Measurement
                    </h3>
                    <p className="text-gray-600 ml-8">
                      Clear metrics about the purpose, origin, and effectiveness
                      of every law and regulation.
                    </p>
                  </div>

                  {/* Key Principle 3: Marketplace */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-700 mr-2">
                        3
                      </span>
                      Government Function Marketplace
                    </h3>
                    <p className="text-gray-600 ml-8">
                      Government functions are first considered for elimination,
                      automation, or outsourcing to the private sector. Only
                      when these options fail will the government perform the
                      function, with an open marketplace for competitive
                      bidding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
