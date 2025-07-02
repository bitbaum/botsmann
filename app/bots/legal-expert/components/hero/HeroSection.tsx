import React from 'react';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  overview: string;
  getTryLink: () => string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, overview, getTryLink }) => {
  return (
    <section className="mb-16 pt-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="mb-4 inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <span className="mr-1">⚖️</span> Private AI Node
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {title}: Your AI Legal Assistant
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            {overview}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={getTryLink()}
              className="btn-primary flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Chat with Lex</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 12h15" />
              </svg>
            </a>
            <a href="#features" className="btn-secondary">Explore Features</a>
          </div>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚖️</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Lex</h3>
              <p className="text-sm text-gray-600">AI Legal Assistant</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg shadow-sm ml-auto max-w-[80%]">
              <p className="text-gray-800">How can I help with your legal research today?</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg shadow-sm max-w-[80%]">
              <p className="text-gray-800">I need a summary of recent cases on data privacy in Europe.</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm ml-auto max-w-[80%]">
              <p className="text-gray-800">I'll search through the latest directives and case law to provide a concise overview.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
