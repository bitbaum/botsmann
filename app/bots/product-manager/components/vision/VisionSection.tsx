'use client';

import React from 'react';

const VisionSection: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          Building the future of AI-powered product management, optimized for Cursor.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left column */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Challenge</h3>
              <p className="text-gray-600 mb-4">
                As software development grows increasingly complex, traditional product management 
                approaches struggle to keep pace. Projects suffer from unclear specifications, 
                technical debt, and communication gaps between stakeholders.
              </p>
              <p className="text-gray-600">
                Cursor represents a new era of AI-augmented development, but its potential is 
                only fully realized when paired with equally advanced product management practices.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Approach</h3>
              <p className="text-gray-600 mb-4">
                Trident combines multiple specialized AI models, domain expertise, and proven 
                product management methodologies to create a comprehensive solution. Each AI 
                contributes its unique strengths, resulting in balanced, actionable guidance.
              </p>
              <p className="text-gray-600">
                We focus on contextual understanding, technical precision, and adaptability to 
                different development styles and team structures.
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Long-term Vision</h3>
              <p className="text-gray-600 mb-4">
                We envision Trident becoming an indispensable co-pilot for product managers and 
                developers working in Cursor. Beyond documentation, Trident will evolve into a 
                strategic partner that anticipates needs, identifies optimization opportunities, 
                and helps teams ship better products faster.
              </p>
              <p className="text-gray-600">
                Our goal is to establish a new standard for AI-assisted product management, 
                where machines handle the repetitive tasks while humans focus on creative 
                problem-solving and strategic decision-making.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Measuring Success</h3>
              <p className="text-gray-600 mb-4">
                Success for Trident means significantly reduced development cycles, fewer 
                misunderstandings between stakeholders, less technical debt, and more predictable 
                project outcomes. 
              </p>
              <p className="text-gray-600">
                We'll track metrics like implementation time, code quality, documentation 
                completeness, and team satisfaction to ensure we're delivering real value to 
                the Cursor community.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-800 font-medium text-lg">
            Join us as we redefine what's possible in AI-powered product management
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisionSection; 