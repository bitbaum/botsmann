import React, { useState } from "react";
import { btnPrimary } from "../../utils/constants";

interface VocabularyBuilderProps {
  getTryLink: () => string;
}

const VocabularyBuilder = ({ getTryLink }: VocabularyBuilderProps) => {
  const [activeExample, setActiveExample] = useState(0);

  // Example vocabulary words to showcase
  const examples = [
    {
      standard: "guten Tag",
      swiss: "grüezi",
      pronunciation: "GROO-eh-tsee",
      notes:
        "Formal greeting, singular form. Use 'grüezi mitenand' for greeting multiple people.",
    },
    {
      standard: "auf Wiedersehen",
      swiss: "uf widerluege",
      pronunciation: "oof VEE-der-loo-eh-geh",
      notes:
        "More formal goodbye. For casual situations use 'tschüss' or 'tschau'.",
    },
    {
      standard: "danke",
      swiss: "merci",
      pronunciation: "MER-see",
      notes:
        "Swiss German often uses French-derived words for common expressions.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto pb-2 -mx-2">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setActiveExample(index)}
            className={`px-4 py-2 rounded-md text-sm font-medium mr-2 flex-shrink-0 transition-colors ${
              activeExample === index
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
            }`}
          >
            {example.swiss}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-1">
              <h4 className="font-medium text-lg text-gray-900">
                {examples[activeExample].swiss}
              </h4>
              <span className="ml-2 text-sm text-gray-500">
                ({examples[activeExample].standard})
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Pronunciation: {examples[activeExample].pronunciation}
            </p>
          </div>
          <div className="flex items-center">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded border border-blue-200 flex-shrink-0">
              Common
            </span>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-md mb-2">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Context:</span>{" "}
            {examples[activeExample].notes}
          </p>
        </div>

        <div className="flex flex-wrap items-center mt-4 pt-3 border-t border-gray-100">
          <button
            onClick={() => {
              if (activeExample < examples.length - 1) {
                setActiveExample(activeExample + 1);
              } else {
                setActiveExample(0);
              }
            }}
            className="text-sm flex items-center text-green-600 hover:text-green-700 mr-4"
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
            Next word
          </button>

          <a
            href={`${getTryLink()}?q=Teach%20me%20common%20Swiss%20German%20vocabulary`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm flex items-center text-blue-600 hover:text-blue-700"
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            See more vocabulary
          </a>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-2">
          Build your vocabulary
        </h4>
        <p className="text-sm text-gray-600 mb-3">
          Enter any English or German word to get the Swiss German equivalent
          with context and examples.
        </p>
        <div className="flex justify-center">
          <a
            href={getTryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={btnPrimary}
          >
            Start Building Vocabulary
          </a>
        </div>
      </div>
    </div>
  );
};

export default VocabularyBuilder;
