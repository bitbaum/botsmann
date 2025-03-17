import React from 'react';
import { featureNumberBadge, featureNumberText } from '../../utils/constants';

const FutureVisionSection = () => {
  return (
    <section id="future-vision" className="py-12 bg-gray-50 rounded-xl mb-16">
      <div className="px-6">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-900">
          The Future of Swiss German Learning
        </h2>
        <p className="mb-6 text-lg text-gray-600">
          We're building Heidi to transform how people learn Swiss German and engage with Swiss culture. Our vision extends beyond language learning to create meaningful connections and authentic experiences.
        </p>
        
        <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-medium text-gray-900 mb-3">Help Us Build Heidi</h3>
          <p className="text-gray-600 mb-4">
            We're actively looking for Swiss German experts, linguists, and skilled engineers to join our team and help create the next generation of language learning technology.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">We're Looking For:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Swiss German native speakers and dialect experts</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Computational linguists with NLP experience</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Full-stack developers with AI experience</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Get Involved:</h4>
              <p className="text-gray-600 mb-3">Interested in contributing to Heidi's development? Let us know your expertise.</p>
              <a 
                href="mailto:join@botsmann.com" 
                className="inline-flex items-center text-green-600 font-medium hover:underline"
                aria-label="Contact our team about joining"
              >
                <span>Contact our team</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 text-center">Roadmap</h3>
          <p className="text-gray-600 text-center mb-6">
            Here's what we're planning to build in the coming months.
          </p>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start">
              <div className={featureNumberBadge}>1</div>
              <div className="ml-4">
                <h4 className={featureNumberText}>Personalized Learning Paths</h4>
                <p className="text-gray-600 mb-4">
                  Customized learning experiences that adapt to your goals, whether you're preparing for a job interview, planning to relocate, or simply interested in the culture.
                </p>
                <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Coming Q2 2025:</span> Initial assessment and personalized vocabulary modules based on your specific needs and Swiss region of interest.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start">
              <div className={featureNumberBadge}>2</div>
              <div className="ml-4">
                <h4 className={featureNumberText}>Cultural Insights Platform</h4>
                <p className="text-gray-600 mb-4">
                  Comprehensive guides to Swiss customs, traditions, social norms, history, and governance to help you navigate daily life and understand the culture.
                </p>
                <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Coming Q3 2025:</span> Interactive cultural guides covering social etiquette, local traditions, history, and the Swiss political system.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start">
              <div className={featureNumberBadge}>3</div>
              <div className="ml-4">
                <h4 className={featureNumberText}>Swiss Content Library</h4>
                <p className="text-gray-600 mb-4">
                  Authentic Swiss German content curated to match your proficiency level, including videos with subtitles, podcasts, and articles.
                </p>
                <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Coming Q4 2025:</span> Launch of the content library with subtitled videos and transcripts from Zürich, Bern, and Basel regions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start">
              <div className={featureNumberBadge}>4</div>
              <div className="ml-4">
                <h4 className={featureNumberText}>Audio Recognition & Feedback</h4>
                <p className="text-gray-600 mb-4">
                  Practice your pronunciation with our advanced speech recognition technology that provides instant feedback specific to Swiss German dialects.
                </p>
                <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Coming Q1 2026:</span> Record yourself and receive detailed feedback on your accent and pronunciation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureVisionSection; 