"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const HeroSection: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleButtonHover = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 md:py-20">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="md:pr-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Meet{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                Trident
              </span>
              :
              <br />
              Your AI Product Manager for Cursor
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Trident streamlines your Cursor development with expert project
              management, technical guidance, and optimized workflows. Build
              better software, faster.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="#try-it"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all duration-150 ease-in-out transform hover:-translate-y-0.5"
              >
                Start Your Project Now
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all duration-150 ease-in-out"
              >
                Explore Features
              </Link>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-gray-900">
                    What Trident can do for you:
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-gray-500">
                    <li className="flex items-center">
                      <svg
                        className="mr-1.5 h-3 w-3 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Create comprehensive project plans for Cursor development
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-1.5 h-3 w-3 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Provide technical guidance optimized for Cursor's workflow
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-1.5 h-3 w-3 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Identify bottlenecks and streamline development processes
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-1.5 h-3 w-3 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Generate comprehensive technical documentation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Visual content */}
          <div className="relative">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-white font-bold">T</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">Trident PM</h3>
                    <p className="text-xs text-gray-500">
                      Project Management Assistant
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Active
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Feature Development Plan
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-3">
                      1
                    </div>
                    <div className="flex-1 h-2 bg-blue-500 rounded"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-3">
                      2
                    </div>
                    <div className="flex-1 h-2 bg-blue-500 rounded"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-3">
                      3
                    </div>
                    <div className="flex-1 h-2 bg-blue-500 rounded"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs mr-3">
                      4
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs mr-3">
                      5
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4 mb-4 border border-indigo-100">
                <h4 className="text-sm font-medium text-indigo-900 mb-2">
                  Technical Strategy
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <svg
                      className="mt-0.5 mr-2 h-4 w-4 text-indigo-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-indigo-800">
                      Component architecture defined
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="mt-0.5 mr-2 h-4 w-4 text-indigo-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-indigo-800">
                      API integration strategy outlined
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="mt-0.5 mr-2 h-4 w-4 text-indigo-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-indigo-800">
                      Performance optimizations identified
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">
                    Project completion
                  </span>
                  <span className="text-xs font-medium text-blue-600">60%</span>
                </div>
                <div className="mt-2 relative">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className={`absolute top-0 left-0 h-2 bg-blue-600 rounded-full ${isAnimating ? "animate-pulse" : ""}`}
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <button
                className="mt-4 w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium text-sm hover:from-blue-600 hover:to-indigo-700 transition-all duration-150 ease-in-out transform hover:scale-[1.01]"
                onMouseEnter={handleButtonHover}
              >
                Generate Next Phase Plan
              </button>
            </div>

            {/* Decorative elements for the right column */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-blue-200 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
