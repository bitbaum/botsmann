/**
 * HeroSection Component
 *
 * This component renders the main hero section for the Nerd AI Research Assistant landing page.
 * It introduces the six core functions and value propositions with a call-to-action.
 *
 * @component
 * @param {object} props - Component properties
 * @param {string} props.title - The main title for the hero section
 * @param {string} props.overview - A brief overview of the tool's capabilities
 * @param {Function} props.getTryLink - Function that returns the URL to join the waitlist
 */
import React from "react";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  overview: string;
  getTryLink: () => string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  overview,
  getTryLink,
}) => {
  return (
    <section className="mb-16 pt-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="mb-4 inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
            <span className="mr-1">🧠</span> Launching in 2026
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nerd: Your AI Research Assistant
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Transform your research with an AI companion that organizes,
            updates, creates, engages, connects, and empowers your independent
            research journey.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={getTryLink()}
              className="btn-primary flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Join Waitlist</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5l7 7-7 7M5 12h15"
                />
              </svg>
            </a>
            <a href="#core-features" className="btn-secondary">
              Explore Features
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="flex items-start">
              <span className="text-indigo-600 mr-2">📚</span>
              <span className="text-sm">Research Organization</span>
            </div>
            <div className="flex items-start">
              <span className="text-indigo-600 mr-2">🔄</span>
              <span className="text-sm">Real-time Updates</span>
            </div>
            <div className="flex items-start">
              <span className="text-indigo-600 mr-2">✍️</span>
              <span className="text-sm">Content Creation</span>
            </div>
            <div className="flex items-start">
              <span className="text-indigo-600 mr-2">🔍</span>
              <span className="text-sm">Research Engagement</span>
            </div>
            <div className="flex items-start">
              <span className="text-indigo-600 mr-2">👥</span>
              <span className="text-sm">Research Collaboration</span>
            </div>
            <div className="flex items-start">
              <span className="text-indigo-600 mr-2">🔒</span>
              <span className="text-sm">Independent Research</span>
            </div>
          </div>
        </div>
        <div className="bg-research-gradient p-6 rounded-xl border border-indigo-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🧠</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Nerd</h3>
              <p className="text-sm text-gray-600">AI Research Assistant</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg shadow-sm ml-auto max-w-[80%]">
              <p className="text-gray-800">
                How can I transform your research experience today?
              </p>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg shadow-sm max-w-[80%]">
              <p className="text-gray-800">
                I need to organize my quantum computing research, stay updated
                on new papers, and create shareable content.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm ml-auto max-w-[80%]">
              <p className="text-gray-800">
                I'll organize your quantum research, set up real-time updates
                for new papers, and generate drafts for articles and social
                media. Would you like to connect with other quantum researchers
                too?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
