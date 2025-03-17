import React from 'react';

/**
 * Medical Disclaimer Component
 * 
 * This component renders a prominent medical disclaimer for the health bot.
 * It informs users about the limitations of the AI health assistant and 
 * emphasizes that it is not a replacement for professional medical care.
 * 
 * @module DisclaimerSection
 */

export default function DisclaimerSection() {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-700 p-5 rounded-md mb-12 mt-6">
      <p className="text-base mb-2 text-gray-800">
        Imhotep provides information for educational purposes only and is not a substitute for professional medical advice.
      </p>
      <p className="text-sm text-gray-600">
        Always consult with qualified healthcare providers for diagnosis and treatment. In emergencies, call your local emergency services immediately.
      </p>
    </div>
  );
} 