import React from "react";

const DisclaimerSection: React.FC = () => (
  <div
    className="bg-yellow-50 border-l-4 border-yellow-700 p-5 rounded-md mb-12 mt-6"
    id="disclaimer"
  >
    <p className="text-base mb-2 text-gray-800">
      Lex provides information for educational purposes only and is not a
      substitute for professional legal advice.
    </p>
    <p className="text-sm text-gray-600">
      Always consult a qualified attorney for specific legal matters. Use of Lex
      does not create an attorney-client relationship.
    </p>
  </div>
);

export default DisclaimerSection;
