"use client";

import React from "react";

/**
 * Roadmap section component for Solon Governance platform
 * Showing the implementation timeline with phases
 */
const RoadmapSection: React.FC = () => {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Core Platform Development",
      description:
        "Development of the basic transaction transparency system, law documentation framework, and secure authentication.",
      timeline: "Q1-Q2 2024",
      current: true,
    },
    {
      phase: "Phase 2",
      title: "Marketplace Development",
      description:
        "Building the bidding system for government functions, KPI tracking infrastructure, and contract management system.",
      timeline: "Q3-Q4 2024",
    },
    {
      phase: "Phase 3",
      title: "Advanced Features",
      description:
        "Integration of AI-powered analytics for corruption detection, predictive modeling, and existing government systems.",
      timeline: "Q1-Q2 2025",
    },
    {
      phase: "Phase 4",
      title: "Scale and Expand",
      description:
        "Adding multi-language support, customization for different levels of government, and third-party API ecosystem.",
      timeline: "Q3 2025 onwards",
    },
  ];

  return (
    <section id="roadmap" className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Implementation Roadmap
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our strategic plan for bringing Solon to communities worldwide in
            four key phases.
          </p>
        </div>

        <div className="relative pb-12">
          {/* Vertical Line */}
          <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 bg-gray-200"></div>

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div key={index} className="relative">
                {/* Circle indicator */}
                <div
                  className={`absolute left-1/2 h-8 w-8 -translate-x-1/2 transform rounded-full border-4 border-white ${
                    item.current ? "bg-green-600" : "bg-gray-300"
                  }`}
                ></div>

                {/* Content */}
                <div className="ml-12 pt-1 pb-8">
                  <div className="flex items-center mb-2">
                    <span className="mr-3 rounded bg-green-600 bg-opacity-10 px-3 py-1 text-sm font-medium text-green-600">
                      {item.phase}
                    </span>
                    <span className="text-sm text-gray-500">
                      {item.timeline}
                    </span>
                    {item.current && (
                      <span className="ml-3 rounded-full bg-green-600 bg-opacity-10 px-3 py-1 text-xs font-medium text-green-600">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <img
                src="/images/placeholder-chart.svg"
                alt="Implementation Progress Chart"
                className="w-full h-48 bg-gray-100 rounded-xl"
              />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Adoption Metrics
              </h3>
              <p className="text-gray-700 mb-4">
                Our implementation strategy focuses on measurable adoption
                metrics in partner communities:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      Citizen Participation
                    </h4>
                    <p className="text-gray-600">
                      Target: 40% of eligible citizens actively voting within
                      first year
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                    <svg
                      className="h-5 w-5"
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
                    <h4 className="text-lg font-medium text-gray-900">
                      Cost Efficiency
                    </h4>
                    <p className="text-gray-600">
                      Target: 15-20% reduction in administrative costs in first
                      2 years
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      Trust in Government
                    </h4>
                    <p className="text-gray-600">
                      Target: 60% approval rating within communities (up from
                      average 35%)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      Law Effectiveness
                    </h4>
                    <p className="text-gray-600">
                      Target: 75% of laws meeting defined KPIs by year 3
                    </p>
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

export default RoadmapSection;
