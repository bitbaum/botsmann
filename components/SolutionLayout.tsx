import React from 'react';

export interface SolutionData {
  title: string;
  overview: string;
  features: string[];
  details: string;
  customSections?: {
    caseStudies?: string[];
    faq?: string[];
    testimonials?: string[];
    [key: string]: string[] | undefined;
  };
}

interface SolutionLayoutProps {
  data: SolutionData;
  renderCustomHeader?: () => React.ReactNode;
}

export default function SolutionLayout({ data, renderCustomHeader }: SolutionLayoutProps) {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      {/* Header Section */}
      {renderCustomHeader ? (
        renderCustomHeader()
      ) : (
        <h1 className="text-4xl font-bold mb-6">{data.title}</h1>
      )}

      {/* Overview Section */}
      <p className="text-lg text-gray-700 mb-6">{data.overview}</p>

      {/* Features Section */}
      {data.features && data.features.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {data.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {/* How It Works / Details Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p className="text-gray-600">{data.details}</p>
      </div>

      {/* Custom Sections: Case Studies */}
      {data.customSections?.caseStudies && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Case Studies</h2>
          {data.customSections.caseStudies.map((study, idx) => (
            <p key={idx} className="text-gray-600">{study}</p>
          ))}
        </div>
      )}

      {/* Custom Sections: FAQ */}
      {data.customSections?.faq && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
          {data.customSections.faq.map((question, idx) => (
            <p key={idx} className="text-gray-600">Q: {question}</p>
          ))}
        </div>
      )}

      {/* Custom Sections: Testimonials */}
      {data.customSections?.testimonials && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
          {data.customSections.testimonials.map((testimonial, idx) => (
            <p key={idx} className="italic text-gray-600">"{testimonial}"</p>
          ))}
        </div>
      )}
    </div>
  );
}
