import React from 'react';
import { btnPrimary, btnSecondary } from '../../utils/constants';
import { openHeidiBot } from '../../utils/navigation';

interface HeroSectionProps {
  getTryLink: () => string;
}

const HeroSection = ({ getTryLink }: HeroSectionProps) => {
  return (
    <section className="relative mb-16 overflow-hidden">
      {/* Hero Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 z-0">
        <svg className="absolute right-0 top-0 h-full w-full opacity-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_104_39)">
            <path d="M375.374 111.208L389.856 125.69" stroke="#047857" strokeWidth="0.5" strokeLinecap="round"></path>
            <path d="M361.64 125.69L389.856 153.905" stroke="#047857" strokeWidth="0.5" strokeLinecap="round"></path>
            <path d="M346.409 140.173L389.856 183.62" stroke="#047857" strokeWidth="0.5" strokeLinecap="round"></path>
            <path d="M332.675 155.402L389.856 212.582" stroke="#047857" strokeWidth="0.5" strokeLinecap="round"></path>
          </g>
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12 max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <div className="md:w-1/2 flex-shrink-0">
            <div className="flex items-center mb-2">
              <svg className="w-6 h-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full border border-green-200">
                Made in Zürich, Switzerland
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Heidi, Your Swiss German Teacher
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-6">
              A personalized AI language tutor that helps you learn Swiss German naturally and authentically.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-700">Learn <strong>real</strong> Swiss German as it's actually spoken</p>
              </div>
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-700">Focus on practical vocabulary and expressions</p>
              </div>
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-700">Cultural context to understand the Swiss way of life</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => openHeidiBot()}
                className={`${btnPrimary} flex-1 text-center`}
                aria-label="Start chatting with Heidi"
              >
                Chat with Heidi Now
              </button>
              <button 
                onClick={() => document.getElementById('language-learning')?.scrollIntoView({ behavior: 'smooth' })}
                className={`${btnSecondary} flex-1`}
                aria-label="See Heidi's features"
              >
                Explore Features
              </button>
            </div>
          </div>
          
          {/* Right Column - Demo Images */}
          <div className="md:w-1/2 flex-shrink-0 relative">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 p-3 border-b border-gray-200 flex items-center">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-center flex-grow font-medium text-gray-600 text-sm">
                  Chat with Heidi - Your Swiss German Teacher
                </div>
              </div>
              <div className="p-4 max-h-[500px] overflow-y-auto">
                <div className="flex mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-semibold text-green-800">H</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[90%]">
                    <p className="text-gray-800">
                      Grüezi! I'm Heidi, your Swiss German teacher. How can I help you today?
                    </p>
                  </div>
                </div>
                <div className="flex justify-end mb-4">
                  <div className="bg-green-100 rounded-lg p-3 max-w-[90%] mr-3">
                    <p className="text-gray-800">
                      I'm planning a trip to Zürich and want to learn some basic Swiss German phrases.
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold text-blue-800">U</span>
                  </div>
                </div>
                <div className="flex mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-semibold text-green-800">H</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[90%]">
                    <p className="text-gray-800 mb-2">
                      That's exciting! Here are some useful everyday phrases in Swiss German (Zürich dialect):
                    </p>
                    <ul className="space-y-2 text-gray-800">
                      <li><strong>Grüezi</strong> - Hello (formal)</li>
                      <li><strong>Hoi</strong> - Hi (informal)</li>
                      <li><strong>Merci vilmal</strong> - Thank you very much</li>
                      <li><strong>Uf Widerluege</strong> - Goodbye</li>
                      <li><strong>Wie gaht's?</strong> - How are you?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial Bubble */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-md border border-gray-200 max-w-[220px]">
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-sm font-medium text-gray-700">5.0</span>
              </div>
              <p className="text-sm text-gray-600">
                "Heidi helped me learn Swiss German when standard German courses weren't working for me. So practical!"
              </p>
              <p className="text-xs font-medium text-gray-900 mt-2">
                – Michael T., Expat in Zürich
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 