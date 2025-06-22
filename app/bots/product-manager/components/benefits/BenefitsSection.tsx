"use client";

import React from "react";

const BenefitsSection: React.FC = () => {
  // Benefits data
  const benefits = [
    {
      title: "Accelerated Development",
      description:
        "Speed up your Cursor development process with AI-powered project management and technical guidance.",
      icon: "🚀",
    },
    {
      title: "Optimized Workflows",
      description:
        "Identify bottlenecks and streamline your team's processes for maximum productivity in Cursor projects.",
      icon: "⚡",
    },
    {
      title: "Technical Precision",
      description:
        "Receive expert development guidance with Cursor-specific best practices and implementation strategies.",
      icon: "🎯",
    },
    {
      title: "Better Planning",
      description:
        "Create detailed project roadmaps with realistic timelines, resource allocations, and clear deliverables.",
      icon: "📊",
    },
    {
      title: "Reduced Risk",
      description:
        "Identify potential challenges early and implement mitigation strategies before they become problems.",
      icon: "🛡️",
    },
    {
      title: "Comprehensive Documentation",
      description:
        "Get complete, well-structured documentation that serves both technical and business stakeholders.",
      icon: "📚",
    },
  ];

  return (
    <section id="benefits" className="scroll-mt-24 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Why Use Trident?
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Our AI product manager provides unique advantages that make your
          Cursor development process smoother, faster, and more reliable.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">{benefit.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Streamline Your Cursor Development Process
              </h3>
              <p className="text-gray-600 mb-6">
                Traditional project management and development is
                time-consuming, often inconsistent, and frequently misses
                important details. Trident changes that by combining AI project
                management with Cursor-specific development guidance to help you
                build better software, faster.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-gray-700">
                    Reduce development time by up to 40%
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-gray-700">
                    Improve code quality with Cursor-specific best practices
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-gray-700">
                    Identify and resolve potential issues before implementation
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-gray-700">
                    Maintain consistent project management across all
                    initiatives
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <div className="relative">
                <div className="absolute -top-4 -left-4 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-sm font-medium text-gray-500">
                    Development Time
                  </div>
                  <div className="flex items-end mt-1">
                    <span className="text-3xl font-bold text-gray-900">
                      40%
                    </span>
                    <span className="text-gray-600 ml-1 mb-1">faster</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                  <h4 className="font-semibold text-lg mb-2">
                    Before: Traditional Development
                  </h4>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <svg
                      className="mr-1 h-4 w-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Lengthy planning cycles</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <svg
                      className="mr-1 h-4 w-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Inconsistent implementation</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <svg
                      className="mr-1 h-4 w-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Disjointed workflows</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h4 className="font-semibold text-lg mb-2">
                    After: Trident-Powered Development
                  </h4>
                  <div className="space-y-2">
                    <div className="h-3 bg-blue-200 rounded w-full"></div>
                    <div className="h-3 bg-blue-200 rounded w-full"></div>
                    <div className="h-3 bg-blue-200 rounded w-full"></div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <svg
                      className="mr-1 h-4 w-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Rapid planning and execution</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <svg
                      className="mr-1 h-4 w-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Cursor-optimized guidance</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <svg
                      className="mr-1 h-4 w-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Integrated project management</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
