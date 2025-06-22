import React from "react";

/**
 * Research Systematization Section
 *
 * This component showcases the automated research systematization feature
 * which helps users organize their research materials efficiently.
 */
const ResearchSystemSection: React.FC = () => {
  // Sample organization categories
  const organizationCategories = [
    {
      name: "By Theme",
      description: "Group research by topics and subtopics",
      icon: "🏷️",
    },
    {
      name: "By Relevance",
      description: "Prioritize based on importance to your core research",
      icon: "⭐",
    },
    {
      name: "By Chronology",
      description: "Organize materials along a timeline",
      icon: "📅",
    },
    {
      name: "By Source Type",
      description: "Group by papers, books, interviews, etc.",
      icon: "📚",
    },
    {
      name: "By Methodology",
      description: "Categorize by research methods used",
      icon: "🧪",
    },
    {
      name: "By Author",
      description: "Group research by key contributors",
      icon: "👩‍🔬",
    },
  ];

  // Data formats that can be processed
  const acceptedFormats = [
    { format: "PDFs", icon: "📄" },
    { format: "Word Documents", icon: "📝" },
    { format: "Text Files", icon: "📋" },
    { format: "Web Articles", icon: "🌐" },
    { format: "Notes", icon: "📓" },
    { format: "Images (OCR)", icon: "🖼️" },
    { format: "Audio Transcripts", icon: "🎙️" },
  ];

  return (
    <div className="my-24 bg-research-gradient p-10 rounded-2xl">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Automated Research Systematization
        </h2>
        <p className="text-gray-700 text-lg mb-8">
          Transform your scattered research materials into a well-organized,
          searchable knowledge base that helps you find exactly what you need,
          when you need it.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Upload Once, Organize Automatically
            </h3>
            <p className="text-gray-700 mb-4">
              Simply upload your research materials in any format. Our AI system
              will automatically extract key information, identify themes, tag
              content, and create a structured database tailored to your
              research needs.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-indigo-100">
              <h4 className="font-medium text-indigo-800 mb-2">
                Process Any Research Material
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {acceptedFormats.map((item, index) => (
                  <div key={index} className="text-center p-2">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-xs text-gray-600">{item.format}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-100">
            <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
              <div className="flex items-center">
                <span className="text-xl mr-2">📑</span>
                <h4 className="font-medium">Research Database</h4>
              </div>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <div className="h-60 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent z-10 bottom-0 h-20"></div>
              <div className="space-y-3">
                <div className="p-2 border-l-4 border-blue-400 bg-blue-50">
                  <div className="text-xs text-blue-700">
                    QUANTUM COMPUTING / ALGORITHMS
                  </div>
                  <div className="text-sm font-medium">
                    Grover's Algorithm: Applications in Database Search
                  </div>
                  <div className="text-xs text-gray-500">
                    Source: arXiv:2103.12345 • Added: Mar 15, 2023
                  </div>
                </div>
                <div className="p-2 border-l-4 border-purple-400 bg-purple-50">
                  <div className="text-xs text-purple-700">
                    QUANTUM COMPUTING / THEORY
                  </div>
                  <div className="text-sm font-medium">
                    Quantum Supremacy: Theoretical Foundations
                  </div>
                  <div className="text-xs text-gray-500">
                    Source: Science Journal • Added: Feb 28, 2023
                  </div>
                </div>
                <div className="p-2 border-l-4 border-green-400 bg-green-50">
                  <div className="text-xs text-green-700">
                    QUANTUM COMPUTING / HARDWARE
                  </div>
                  <div className="text-sm font-medium">
                    Superconducting Qubits: Recent Advances
                  </div>
                  <div className="text-xs text-gray-500">
                    Source: Nature Physics • Added: Apr 10, 2023
                  </div>
                </div>
                <div className="p-2 border-l-4 border-red-400 bg-red-50">
                  <div className="text-xs text-red-700">
                    QUANTUM COMPUTING / ERROR CORRECTION
                  </div>
                  <div className="text-sm font-medium">
                    Topological Quantum Error Correction Codes
                  </div>
                  <div className="text-xs text-gray-500">
                    Source: Personal Notes • Added: May 5, 2023
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex">
              <input
                type="text"
                placeholder="Search your research..."
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <button className="bg-indigo-600 text-white px-3 py-2 rounded-r-md">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Multiple Organization Systems
          </h3>
          <p className="text-gray-700 mb-6">
            View your research through different lenses to gain new insights and
            find exactly what you're looking for.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {organizationCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100"
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h4 className="font-medium text-gray-900 mb-1">
                  {category.name}
                </h4>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Key Features
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-indigo-800 mb-2">
                Automatic Organization
              </h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
                <li>Smart categorization based on content analysis</li>
                <li>Automated tagging with research-specific keywords</li>
                <li>Cross-referencing between related materials</li>
                <li>Citation extraction and formatting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-indigo-800 mb-2">
                Powerful Search & Retrieval
              </h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
                <li>Full-text semantic search across all materials</li>
                <li>Filter by categories, dates, sources, or custom tags</li>
                <li>Save complex search queries for repeated use</li>
                <li>Export organized collections in multiple formats</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Focus on your research, not on managing files. Our system handles
            the organization so you can concentrate on generating insights and
            making discoveries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResearchSystemSection;
