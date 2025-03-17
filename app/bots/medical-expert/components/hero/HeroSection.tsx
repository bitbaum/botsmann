/**
 * HeroSection Component
 * 
 * This component renders the main hero section for Dr. Imhotep's landing page.
 * It includes an introduction, key benefits, a simulated chat interface,
 * and call-to-action buttons.
 * 
 * @component
 * @param {object} props - Component properties
 * @param {string} props.title - The main title for the hero section
 * @param {string} props.overview - A brief overview of the bot's capabilities
 * @param {Function} props.getTryLink - Function that returns the URL to the ChatGPT bot
 * 
 * @example
 * ```tsx
 * <HeroSection 
 *   title="Dr. Imhotep - Medical Expert"
 *   overview="Your AI health assistant for personalized medical information."
 *   getTryLink={() => 'https://chatgpt.com/g/g-oAUMruOWt-dr-imhotep'}
 * />
 * ```
 */
import React from 'react';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  overview: string;
  getTryLink: () => string;
}

/**
 * Hero section component with improved call-to-action and mobile responsiveness
 */
const HeroSection: React.FC<HeroSectionProps> = ({ title, overview, getTryLink }) => {
  return (
    <section className="mb-12 md:mb-16 pt-8 md:pt-12 px-4 md:px-0">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Dr. Imhotep - AI Health Assistant
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Your personal AI health companion, offering evidence-based guidance for a healthier life.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <a 
              href={getTryLink()} 
              className="btn-primary flex items-center px-5 py-3 text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Chat with Imhotep</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 12h15" />
              </svg>
            </a>
            <a 
              href="#features" 
              className="btn-secondary px-5 py-3 text-base"
            >
              Explore Features
            </a>
          </div>
          
          {/* Mobile-only key benefits */}
          <div className="mt-8 md:hidden">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Benefits:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">Evidence-based medical information</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">Personalized health guidance</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">Available 24/7 for health questions</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Chat interface */}
        <div className="bg-blue-50 p-4 md:p-6 rounded-xl border border-blue-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-xl md:text-2xl">👨‍⚕️</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Imhotep</h3>
              <p className="text-sm text-gray-600">AI Health Assistant</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg shadow-sm ml-auto max-w-[85%]">
              <p className="text-gray-800 text-sm md:text-base">I'm here to provide evidence-based health guidance. How can I assist with your health journey today?</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg shadow-sm max-w-[85%]">
              <p className="text-gray-800 text-sm md:text-base">I'd like to improve my energy levels during the day. Any suggestions?</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm ml-auto max-w-[85%]">
              <p className="text-gray-800 text-sm md:text-base">Improving energy levels involves several factors: optimizing sleep quality, balanced nutrition with steady blood sugar, regular physical activity, proper hydration, and stress management...</p>
            </div>
          </div>
          
          {/* Desktop-only key benefits */}
          <div className="mt-6 hidden md:block">
            <h4 className="font-medium text-gray-900 mb-2">Key Benefits:</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2 rounded-md flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm text-gray-700">Evidence-based guidance</span>
              </div>
              <div className="bg-white p-2 rounded-md flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm text-gray-700">Personalized advice</span>
              </div>
              <div className="bg-white p-2 rounded-md flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm text-gray-700">24/7 availability</span>
              </div>
              <div className="bg-white p-2 rounded-md flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm text-gray-700">Latest medical research</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 