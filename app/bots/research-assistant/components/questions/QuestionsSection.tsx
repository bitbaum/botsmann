/**
 * QuestionsSection.tsx
 *
 * This component serves as a wrapper for the DailyQuestionsSection,
 * adding a call-to-action and additional context about the feature.
 */

import React from "react";
import DailyQuestionsSection from "./DailyQuestionsSection";
import styles from "../../styles.module.css";

interface QuestionsSectionProps {
  getTryLink: () => string;
}

const QuestionsSection: React.FC<QuestionsSectionProps> = ({ getTryLink }) => {
  return (
    <div className="my-24">
      <DailyQuestionsSection />

      <div className="mt-16 py-8 px-6 bg-indigo-50 rounded-xl text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Transform Your Research Process
        </h3>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Nerd generates questions that challenge your assumptions, connect
          disparate ideas, and help you explore unexplored aspects of your
          research area.
        </p>
        <a
          href={getTryLink()}
          className={styles.primaryButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore Research Rabbit Holes
        </a>
      </div>
    </div>
  );
};

export default QuestionsSection;
