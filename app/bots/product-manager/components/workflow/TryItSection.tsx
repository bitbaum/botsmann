"use client";

import React, { useState } from "react";

// Example project management queries
const exampleQueries = [
  {
    title: "Feature Development",
    description: "Manage the development of a user authentication system",
    query:
      "Plan and manage the development of a user authentication system with OAuth support and role-based access control for our Cursor project.",
  },
  {
    title: "Technical Implementation",
    description: "Guide the implementation of a payment processing system",
    query:
      "Provide development guidance for implementing a secure payment processing system that handles credit cards and digital wallets in our Cursor application.",
  },
  {
    title: "Workflow Optimization",
    description: "Optimize the development workflow for a real-time feature",
    query:
      "Analyze and optimize our Cursor development workflow for building a real-time messaging system with WebSocket support and offline message queueing.",
  },
  {
    title: "Migration Strategy",
    description: "Plan a database migration process",
    query:
      "Create a complete project plan for migrating from MongoDB to PostgreSQL while maintaining application functionality in our Cursor project.",
  },
];

const TryItSection: React.FC = () => {
  // State for the query input
  const [query, setQuery] = useState("");
  // State to track loading state (for UI demonstration)
  const [loading, setLoading] = useState(false);

  // For demonstration purposes - would be replaced with actual API call
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    // Simulate processing time
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <section id="try-it" className="scroll-mt-24 my-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        Start Your Cursor Project
      </h2>
      <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        Describe the feature or project you need to build, and Trident will
        create a comprehensive management plan with development guidance
        optimized for your Cursor workflow.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="mb-4">
                <label
                  htmlFor="query"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Project Request
                </label>
                <textarea
                  id="query"
                  rows={6}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Describe the feature or project you need to build with Cursor..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      PM
                    </div>
                    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      DE
                    </div>
                    <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      AR
                    </div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">
                    Powered by multi-AI collaboration
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={!query.trim() || loading}
                  className={`inline-flex items-center rounded-lg ${
                    !query.trim() || loading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Generate Project Plan"
                  )}
                </button>
              </div>
            </form>

            <div>
              <h3 className="mb-3 text-lg font-medium text-gray-900">
                Example Requests
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {exampleQueries.map((example, index) => (
                  <div
                    key={index}
                    onClick={() => setQuery(example.query)}
                    className="cursor-pointer rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                  >
                    <h4 className="mb-1 font-medium text-gray-900">
                      {example.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {example.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              Project Planning Approach
            </h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">
                  1. Project Analysis
                </h4>
                <p className="text-sm text-gray-600">
                  Requirements gathering and scope definition
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">
                  2. Technical Strategy
                </h4>
                <p className="text-sm text-gray-600">
                  Architecture planning and technology selection
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">
                  3. Development Roadmap
                </h4>
                <p className="text-sm text-gray-600">
                  Milestones, tasks, and resource allocation
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">
                  4. Implementation Guidance
                </h4>
                <p className="text-sm text-gray-600">
                  Technical recommendations and code approaches
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">
                  5. Quality Assurance
                </h4>
                <p className="text-sm text-gray-600">
                  Testing strategies and validation criteria
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">
                  6. Deployment Plan
                </h4>
                <p className="text-sm text-gray-600">
                  Release strategy and post-launch monitoring
                </p>
              </div>
            </div>
          </div>

          {/* Balance Section */}
          <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Trident's Approach</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg
                  className="mr-2 h-5 w-5 flex-shrink-0 text-green-500 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-sm text-gray-600">
                  Comprehensive project planning with clear deliverables
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="mr-2 h-5 w-5 flex-shrink-0 text-green-500 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-sm text-gray-600">
                  Cursor-specific technical guidance and best practices
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="mr-2 h-5 w-5 flex-shrink-0 text-green-500 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-sm text-gray-600">
                  Optimization of workflows tailored to your team's needs
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="mr-2 h-5 w-5 flex-shrink-0 text-red-500 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm1-8a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-sm text-gray-600">
                  No overly prescriptive development mandates
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TryItSection;
