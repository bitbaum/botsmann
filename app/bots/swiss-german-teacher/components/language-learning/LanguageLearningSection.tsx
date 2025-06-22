import React, { useState } from "react";
import VocabularyBuilder from "./VocabularyBuilder";
import ConversationPractice from "./ConversationPractice";
import GrammarPractice from "./GrammarPractice";
import { cardStyle } from "../../utils/constants";

interface LanguageLearningSectionProps {
  getTryLink: () => string;
}

const LanguageLearningSection = ({
  getTryLink,
}: LanguageLearningSectionProps) => {
  const [activeTab, setActiveTab] = useState("vocabulary");

  return (
    <section
      id="language-learning"
      className="mb-24 pb-6 pt-6 px-6 bg-green-50 rounded-xl border border-green-100"
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-semibold text-gray-900">
          Language Learning
        </h2>
      </div>
      <p className="text-lg text-gray-600 mb-8 ml-14">
        Learn to speak like a local with personalized Swiss German lessons
        focused on real-world communication.
      </p>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("vocabulary")}
          className={`px-4 py-2 font-medium text-sm rounded-t-md ${
            activeTab === "vocabulary"
              ? "bg-white text-green-600 border-t border-l border-r border-gray-200"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Vocabulary Builder
        </button>
        <button
          onClick={() => setActiveTab("conversation")}
          className={`px-4 py-2 font-medium text-sm rounded-t-md ${
            activeTab === "conversation"
              ? "bg-white text-green-600 border-t border-l border-r border-gray-200"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Conversation Practice
        </button>
        <button
          onClick={() => setActiveTab("grammar")}
          className={`px-4 py-2 font-medium text-sm rounded-t-md ${
            activeTab === "grammar"
              ? "bg-white text-green-600 border-t border-l border-r border-gray-200"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Grammar Explanations
        </button>
      </div>

      {/* Tab Content */}
      <div className={cardStyle}>
        {activeTab === "vocabulary" && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Vocabulary Builder</h3>
            <p className="text-gray-600 mb-6">
              Learn practical Swiss German words and phrases focusing on Zürich
              dialect with pronunciation guides.
            </p>
            <VocabularyBuilder getTryLink={getTryLink} />
          </div>
        )}

        {activeTab === "conversation" && (
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Conversation Practice
            </h3>
            <p className="text-gray-600 mb-6">
              Practice everyday conversations with examples showing both
              Standard and Swiss German versions.
            </p>
            <ConversationPractice getTryLink={getTryLink} />
          </div>
        )}

        {activeTab === "grammar" && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Grammar Explanations</h3>
            <p className="text-gray-600 mb-6">
              Understand Swiss German grammar through simple explanations
              focusing on the differences from Standard German.
            </p>
            <GrammarPractice getTryLink={getTryLink} />
          </div>
        )}
      </div>
    </section>
  );
};

export default LanguageLearningSection;
