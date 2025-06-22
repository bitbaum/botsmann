import React from "react";

const steps = [
  {
    title: "Ask a question or upload documents",
    description:
      "Provide a legal query or drag and drop your files for analysis.",
  },
  {
    title: "AI analysis on your private node",
    description:
      "Lex processes information using your dedicated model without exposing data to third parties.",
  },
  {
    title: "Receive structured insights",
    description:
      "Get clear explanations, references, and next steps for your legal matter.",
  },
];

const HowItWorksSection: React.FC = () => (
  <div
    className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
    id="how-it-works"
  >
    <h2 className="mb-4 text-2xl font-semibold text-gray-900">How It Works</h2>
    <ol className="space-y-4">
      {steps.map((step, idx) => (
        <li className="flex items-start" key={idx}>
          <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-openai-green text-white">
            {idx + 1}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  </div>
);

export default HowItWorksSection;
