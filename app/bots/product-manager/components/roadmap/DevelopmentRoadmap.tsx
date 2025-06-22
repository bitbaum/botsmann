"use client";

import React from "react";

const DevelopmentRoadmap: React.FC = () => {
  const roadmapItems = [
    {
      quarter: "Q1 2025",
      title: "Foundation & Core Features",
      description:
        "Establishing the foundational architecture and core project management capabilities",
      items: [
        "Multi-AI synthesis engine for producing comprehensive documentation",
        "Basic project management framework with task organization",
        "Technical specification generation for Cursor development",
        "Integration with Cursor workflows",
      ],
      status: "In Progress",
    },
    {
      quarter: "Q2 2025",
      title: "Expanded Capabilities",
      description:
        "Enhancing project management tools and documentation generation",
      items: [
        "Improved implementation planning with detailed roadmaps",
        "Enhanced technical guidance for developers",
        "Workflow optimization algorithms",
        "Integration with version control systems",
      ],
      status: "Planned",
    },
    {
      quarter: "Q3 2025",
      title: "Advanced Project Management",
      description: "Adding sophisticated project management features",
      items: [
        "Agile sprint planning assistance",
        "Risk assessment and mitigation strategies",
        "Resource allocation optimization",
        "Team collaboration tools",
      ],
      status: "Planned",
    },
    {
      quarter: "Q4 2025",
      title: "Enterprise & Ecosystem",
      description:
        "Expanding to enterprise needs and building a developer ecosystem",
      items: [
        "Enterprise-grade project management",
        "Multi-team coordination capabilities",
        "API integrations with third-party tools",
        "Custom workflow templates",
      ],
      status: "Future",
    },
  ];

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Trident Development Roadmap
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          Our vision for evolving Trident into the ultimate product management
          solution for Cursor development. Here's where we've been and where
          we're going.
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-100"></div>

        {/* Roadmap items */}
        <div className="relative z-10">
          {roadmapItems.map((item, index) => (
            <div key={index} className="mb-12 relative">
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 
                ${
                  item.status === "Completed"
                    ? "bg-green-500 border-green-200"
                    : item.status === "In Progress"
                      ? "bg-blue-500 border-blue-200"
                      : "bg-gray-200 border-gray-100"
                }`}
              ></div>

              <div
                className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="md:w-1/2 p-6 md:p-8">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3
                      ${item.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : item.status === 'In Progress' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'}"
                    >
                      {item.status}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <ul className="space-y-2">
                      {item.items.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg
                            className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="md:w-1/2 p-4 text-center">
                  <span className="inline-block bg-blue-50 text-blue-700 font-bold rounded-lg px-5 py-2">
                    {item.quarter}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600 italic">
          This roadmap is subject to change based on user feedback and market
          needs.
        </p>
        <button
          onClick={() => window.open("mailto:feedback@trident.ai", "_blank")}
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <span>Share feedback on our roadmap</span>
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DevelopmentRoadmap;
