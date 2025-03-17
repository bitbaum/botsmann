import React from 'react';
import { btnSecondary } from '../../utils/constants';

const SwissContentSection: React.FC = () => {
  return (
    <section id="swiss-content" className="mb-24 pb-6 pt-6 px-6 bg-amber-50 rounded-xl border border-amber-100">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
        </div>
        <h2 className="text-3xl font-semibold text-gray-900">Swiss Content</h2>
        <span className="ml-3 bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
          Coming Soon
        </span>
      </div>
      <p className="text-lg text-gray-600 mb-8 ml-14">
        Enhance your learning with authentic Swiss German content curated to match your proficiency level.
      </p>
      
      <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-200 relative">
        <p className="text-lg text-gray-600 mb-6">
          Our team is currently developing a rich library of content to help you immerse yourself in Swiss German language and culture.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-5 bg-white rounded-md text-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="font-medium text-gray-900 mb-2">Video Content</h3>
            <p className="text-sm text-gray-600">Short videos with subtitles in Standard and Swiss German</p>
          </div>
          
          <div className="p-5 bg-white rounded-md text-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <h3 className="font-medium text-gray-900 mb-2">Podcasts</h3>
            <p className="text-sm text-gray-600">Audio content with transcripts for listening practice</p>
          </div>
          
          <div className="p-5 bg-white rounded-md text-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="font-medium text-gray-900 mb-2">Articles</h3>
            <p className="text-sm text-gray-600">News articles and blog posts with vocabulary assistance</p>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
            className={btnSecondary}
            aria-label="Join waitlist for Swiss content"
          >
            Join Waitlist for Early Access
          </button>
        </div>
      </div>
    </section>
  );
};

export default SwissContentSection; 