"use client";

import React from "react";
import Image from "next/image";

const IntegrationSection: React.FC = () => {
  const integrations = [
    {
      name: "GitHub",
      description:
        "Connect with GitHub for seamless project tracking and code management",
      icon: "/images/github-logo.svg",
      features: [
        "Link tasks to pull requests",
        "Track project milestones",
        "Generate documentation directly from code",
        "Automate workflow based on repository events",
      ],
    },
    {
      name: "Jira",
      description: "Integrate with Jira for comprehensive project management",
      icon: "/images/jira-logo.svg",
      features: [
        "Sync project tasks with Jira tickets",
        "Import existing sprint structures",
        "Generate sprint reports",
        "Track development progress",
      ],
    },
    {
      name: "VS Code",
      description: "Connect your VS Code development environment with Trident",
      icon: "/images/vscode-logo.svg",
      features: [
        "Access documentation within your editor",
        "Receive project updates as you code",
        "Get contextual development guidance",
        "Validate implementations against specifications",
      ],
    },
    {
      name: "Slack",
      description: "Stay updated with project notifications through Slack",
      icon: "/images/slack-logo.svg",
      features: [
        "Receive milestone notifications",
        "Get daily development digests",
        "Ask questions about project status",
        "Share documentation with team members",
      ],
    },
  ];

  return (
    <div className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Tool Integrations
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          Trident is designed to work with your existing development tools,
          creating a seamless workflow that enhances productivity without
          disrupting your process.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {integrations.map((integration, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded-lg p-2 mr-4">
                  {/* Placeholder for icon, replace with actual images */}
                  <div className="w-full h-full bg-blue-100 rounded flex items-center justify-center text-blue-600 font-bold">
                    {integration.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {integration.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {integration.description}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Key Features:
                </h4>
                <ul className="space-y-2">
                  {integration.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <span className="inline-block bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">
                  {index < 2 ? "Available Now" : "Coming Soon"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Want to see a specific integration?
        </h3>
        <p className="text-gray-600 mb-6">
          We're constantly expanding our integration ecosystem. Let us know what
          tools you'd like to see Trident connect with.
        </p>
        <button
          onClick={() =>
            window.open("mailto:integrations@trident.ai", "_blank")
          }
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg inline-flex items-center transition-all"
        >
          <span>Request an Integration</span>
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5l7 7-7 7M5 12h15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default IntegrationSection;
