import React from "react";

const useCases = [
  {
    title: "Contract Review",
    description: "Identify potential issues in agreements before you sign.",
    icon: "document-text",
  },
  {
    title: "Legal Research",
    description: "Find precedents and regulations relevant to your question.",
    icon: "search",
  },
  {
    title: "Compliance Check",
    description: "Ensure business practices align with current regulations.",
    icon: "shield-check",
  },
];

const iconPaths: Record<string, string> = {
  "document-text":
    "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  "shield-check":
    "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
};

const UseCasesSection: React.FC = () => (
  <section className="mt-16 mb-16" id="use-cases">
    <h2 className="mb-8 text-3xl font-semibold text-gray-900 text-center">
      Common Use Cases
    </h2>
    <div className="grid gap-6 md:grid-cols-3">
      {useCases.map((u, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-4 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
            <svg
              className="h-6 w-6 text-openai-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={iconPaths[u.icon]}
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-medium text-gray-900">{u.title}</h3>
          <p className="text-gray-600">{u.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default UseCasesSection;
