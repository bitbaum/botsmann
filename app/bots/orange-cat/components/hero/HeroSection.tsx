'use client';

import React from 'react';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  overview: string;
  getTryLink: () => string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, overview, getTryLink }) => {
  return (
    <section className="mb-12 sm:mb-16 pt-8 sm:pt-12">
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
        <div>
          <div className="mb-3 sm:mb-4 inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs sm:text-sm font-medium">
            <span className="mr-1">9</span> Lives of Experience
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Oscar: The Orange Cat Philosopher
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6">
            {overview}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={getTryLink()}
              className="paw-cursor inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Seek Oscar's Wisdom</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 12h15" />
              </svg>
            </a>
            <a
              href="#wisdom"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-orange-700 font-semibold rounded-lg border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50 transition-all"
            >
              Try Demo
            </a>
          </div>
        </div>

        {/* Oscar's Avatar & Chat Preview */}
        <div className="oscar-gradient p-6 rounded-xl border border-orange-200 shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center float-gentle orange-glow">
              <span className="text-4xl">🐱</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Oscar</h3>
              <p className="text-sm text-orange-700">Currently: Judging you lovingly</p>
            </div>
          </div>

          {/* Chat bubbles */}
          <div className="space-y-3">
            <div className="bg-white/80 backdrop-blur p-3 rounded-lg shadow-sm ml-auto max-w-[85%]">
              <p className="text-gray-800 text-sm">
                *stretches majestically*
                <br />
                Ah, another human seeking wisdom. What troubles your simple mind today?
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg shadow-sm max-w-[85%]">
              <p className="text-gray-800 text-sm">I'm stressed about work deadlines...</p>
            </div>
            <div className="bg-white/80 backdrop-blur p-3 rounded-lg shadow-sm ml-auto max-w-[85%]">
              <p className="text-gray-800 text-sm">
                *slow blink*
                <br />
                Have you considered... a nap? The deadline will still be there after, but you'll face it rested.
                <br />
                <span className="text-orange-600 italic">This is the way.</span>
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-2 right-2 text-2xl tail-swish">🐾</div>
        </div>
      </div>

      {/* Fun stats bar */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[
          { value: '9', label: 'Lives', icon: '💫' },
          { value: '∞', label: 'Naps Taken', icon: '😴' },
          { value: '0', label: 'Regrets', icon: '😼' },
          { value: '100%', label: 'Judgment Accuracy', icon: '👁️' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 border border-orange-100 shadow-sm wisdom-card">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold text-orange-600">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
