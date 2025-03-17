import React from 'react';
import FeaturesSection from '../features/FeaturesSection';
import InteractiveDemo from '../interactive/InteractiveDemo';
import IntakeForm from '../intake/IntakeForm';

interface PatientFeaturesSectionProps {
  features: string[];
  getTryLink: () => string;
}

/**
 * Patient Features Section
 * 
 * This component showcases the main features and benefits
 * for patients using the Imhotep health assistant.
 * 
 * @module PatientFeaturesSection
 */

/**
 * Combined section for patient-focused features and try-it functionality
 */
const PatientFeaturesSection: React.FC<PatientFeaturesSectionProps> = ({ features, getTryLink }) => {
  return (
    <div className="my-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">For Patients: AI-Powered Health Guidance</h2>
      <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        Imhotep provides personalized health information, advice, and tools to help you achieve your optimal health.
      </p>
      
      <div className="space-y-16">
        <FeaturesSection features={features} />
        
        <div className="bg-green-50 p-8 rounded-xl border border-green-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Try Imhotep</h3>
          <InteractiveDemo getTryLink={getTryLink} />
        </div>
        
        <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Personal Health Assessment</h3>
          <IntakeForm getTryLink={getTryLink} />
        </div>
      </div>
    </div>
  );
};

export default PatientFeaturesSection; 