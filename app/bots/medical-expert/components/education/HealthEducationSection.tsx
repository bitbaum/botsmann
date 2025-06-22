import React from "react";
import HealthTopicsSection from "../health-topics/HealthTopicsSection";
import QuestionsSection from "../q-and-a/QuestionsSection";

interface HealthEducationSectionProps {
  getTryLink: () => string;
}

/**
 * Health Education Section Component
 *
 * This component displays health education resources,
 * common questions and answers, and educational features.
 *
 * @module HealthEducationSection
 */

/**
 * Combined education section that includes both health topics and common questions
 */
const HealthEducationSection: React.FC<HealthEducationSectionProps> = ({
  getTryLink,
}) => {
  return (
    <section
      id="health-education"
      className="my-16 scroll-mt-24 bg-gradient-to-r from-blue-50 to-green-50 py-16 px-6 rounded-2xl"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        Health Education Resources
      </h2>
      <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        Explore health topics and find answers to common questions with
        evidence-based information from Imhotep.
      </p>

      <div className="space-y-16 max-w-screen-xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Explore Health Topics
          </h3>
          <HealthTopicsSection getTryLink={getTryLink} />
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Common Health Questions
          </h3>
          <QuestionsSection getTryLink={getTryLink} />
        </div>
      </div>
    </section>
  );
};

export default HealthEducationSection;
