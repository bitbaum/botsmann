import React from 'react';
import MedBoxShowcase from '../features/MedBoxShowcase';
import RegimensShowcase from '../features/RegimensShowcase';

/**
 * Combined section for all upcoming products and features
 */
const FutureProductsSection: React.FC = () => {
  return (
    <div className="my-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Future Products</h2>
      <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        Explore our upcoming innovations that will revolutionize personal health management and preventative care.
      </p>
      
      <div className="space-y-24 max-w-screen-xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <MedBoxShowcase />
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <RegimensShowcase />
        </div>
      </div>
    </div>
  );
};

export default FutureProductsSection; 