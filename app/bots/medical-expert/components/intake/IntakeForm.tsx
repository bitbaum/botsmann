import React from "react";

interface IntakeFormProps {
  getTryLink: () => string;
}

/**
 * Patient intake form component that allows users to input health information
 * and get personalized assessments.
 */
const IntakeForm: React.FC<IntakeFormProps> = ({ getTryLink }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">
          Start Your Health Assessment
        </h3>
        <p className="text-gray-600 mb-4">
          Answer a few questions about your health to get personalized
          recommendations.
        </p>
        <div className="text-center">
          <a
            href={getTryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Begin Assessment
          </a>
        </div>
      </div>
    </div>
  );
};

export default IntakeForm;
