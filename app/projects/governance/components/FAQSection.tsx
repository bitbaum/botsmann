'use client';

import React, { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  category: 'general' | 'technical' | 'implementation' | 'economic';
}

const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'technical' | 'implementation' | 'economic'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  const faqs: FAQItem[] = [
    {
      id: 'general-1',
      question: 'What is Solon and how does it change governance?',
      answer: (
        <p>
          Solon is a blockchain-based governance platform that revolutionizes how governments operate by introducing 
          unprecedented transparency, accountability, and citizen participation. It replaces opaque, inefficient traditional 
          governance systems with a technical framework that ensures every transaction is visible, every law has 
          measurable outcomes, government services are competitively provided, and citizens can directly participate 
          in decision-making.
        </p>
      ),
      category: 'general'
    },
    {
      id: 'general-2',
      question: 'Can Solon work with existing government institutions?',
      answer: (
        <p>
          Yes, Solon is designed to be adaptable and can be integrated with existing government structures. It can be 
          implemented gradually, with different components adopted at different paces based on readiness and need. 
          The platform can function alongside traditional systems during transition periods, and can be customized 
          to meet the specific requirements of different levels of government, from municipal to national.
        </p>
      ),
      category: 'general'
    },
    {
      id: 'technical-1',
      question: 'How does the blockchain ensure transaction security?',
      answer: (
        <div>
          <p className="mb-2">
            Solon's blockchain implementation ensures transaction security through multiple mechanisms:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Cryptographic validation: All transactions are cryptographically signed and validated</li>
            <li>Distributed consensus: Transactions are verified across multiple nodes in the network</li>
            <li>Immutable records: Once recorded, transactions cannot be altered or deleted</li>
            <li>Transparent audit trail: All changes are publicly visible and traceable</li>
            <li>Role-based access control: Only authorized entities can initiate certain transactions</li>
          </ul>
          <p className="mt-2">
            This approach prevents fraud, unauthorized spending, and provides real-time verification of all government financial activities.
          </p>
        </div>
      ),
      category: 'technical'
    },
    {
      id: 'technical-2',
      question: 'What technologies power the Solon platform?',
      answer: (
        <div>
          <p className="mb-2">
            Solon's platform is built on a modern technology stack including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Ethereum-compatible blockchain for smart contracts and transactions</li>
            <li>IPFS (InterPlanetary File System) for distributed data storage</li>
            <li>Zero-knowledge proofs for privacy-preserving verification</li>
            <li>React-based front-end for intuitive user interfaces</li>
            <li>GraphQL API layer for efficient data access</li>
            <li>AI-powered analytics for pattern recognition and anomaly detection</li>
          </ul>
          <p className="mt-2">
            This combination enables a secure, scalable, and user-friendly governance platform.
          </p>
        </div>
      ),
      category: 'technical'
    },
    {
      id: 'implementation-1',
      question: 'How long does it take to implement Solon in a municipality?',
      answer: (
        <p>
          Implementation timelines vary based on municipality size and complexity, but typically follow this pattern:
          <br /><br />
          <span className="font-medium">Small municipalities (under 50,000 residents):</span> 3-6 months for initial deployment, with full functionality within 12 months.
          <br /><br />
          <span className="font-medium">Medium municipalities (50,000-250,000):</span> 6-9 months for initial deployment, with full functionality within 18 months.
          <br /><br />
          <span className="font-medium">Large municipalities (over 250,000):</span> 9-12 months for initial deployment, with phased implementation over 24-36 months.
          <br /><br />
          Each implementation includes system setup, data migration, staff training, and a transition period where Solon runs parallel to existing systems.
        </p>
      ),
      category: 'implementation'
    },
    {
      id: 'implementation-2',
      question: 'What training is required for government staff?',
      answer: (
        <div>
          <p className="mb-2">
            Solon implementation includes comprehensive training programs tailored to different roles:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="font-medium">Administrative staff:</span> Basic platform navigation, transaction input, and reporting (1-2 days)</li>
            <li><span className="font-medium">Financial officers:</span> Advanced transaction management, budget oversight, and audit trails (2-3 days)</li>
            <li><span className="font-medium">IT personnel:</span> System maintenance, security protocols, and integration with existing systems (3-5 days)</li>
            <li><span className="font-medium">Department heads:</span> KPI management, performance tracking, and marketplace utilization (2 days)</li>
            <li><span className="font-medium">Elected officials:</span> Platform overview, policy implementation, and citizen engagement (1 day)</li>
          </ul>
          <p className="mt-2">
            We also provide ongoing support, regular refresher courses, and a comprehensive knowledge base.
          </p>
        </div>
      ),
      category: 'implementation'
    },
    {
      id: 'economic-1',
      question: 'What cost savings can governments expect?',
      answer: (
        <div>
          <p className="mb-2">
            Governments implementing Solon typically experience significant cost savings:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="font-medium">Procurement costs:</span> 20-30% reduction through increased competition and transparency</li>
            <li><span className="font-medium">Administrative overhead:</span> 15-25% reduction through automation and streamlined processes</li>
            <li><span className="font-medium">Fraud prevention:</span> 60-80% reduction in fraudulent transactions and misappropriation</li>
            <li><span className="font-medium">Service delivery:</span> 25-40% improved cost efficiency through marketplace competition</li>
            <li><span className="font-medium">Tax compliance:</span> 10-15% increase due to greater trust and transparency</li>
          </ul>
          <p className="mt-2">
            Most governments achieve ROI within 24-36 months of full implementation.
          </p>
        </div>
      ),
      category: 'economic'
    },
    {
      id: 'economic-2',
      question: 'How is the Solon platform licensed and priced?',
      answer: (
        <p>
          Solon offers flexible licensing models to accommodate different government needs:
          <br /><br />
          <span className="font-medium">SaaS subscription:</span> Annual subscription based on population size, starting at $0.50 per citizen annually for basic features, with premium features available.
          <br /><br />
          <span className="font-medium">Perpetual license:</span> One-time purchase with ongoing maintenance fees (approximately 20% of license cost annually). Pricing is tailored to government size and required functionality.
          <br /><br />
          <span className="font-medium">Open source community:</span> Core components are available under open source licenses for governments with technical expertise to self-implement and maintain.
          <br /><br />
          All options include initial implementation support, with additional consulting and customization services available at standard rates.
        </p>
      ),
      category: 'economic'
    }
  ];
  
  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);
    
  const categoryCount = {
    all: faqs.length,
    general: faqs.filter(faq => faq.category === 'general').length,
    technical: faqs.filter(faq => faq.category === 'technical').length,
    implementation: faqs.filter(faq => faq.category === 'implementation').length,
    economic: faqs.filter(faq => faq.category === 'economic').length,
  };
  
  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about the Solon governance platform
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2 font-medium text-sm rounded-full m-1
              ${activeCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            All ({categoryCount.all})
          </button>
          <button
            onClick={() => setActiveCategory('general')}
            className={`px-5 py-2 font-medium text-sm rounded-full m-1
              ${activeCategory === 'general' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            General ({categoryCount.general})
          </button>
          <button
            onClick={() => setActiveCategory('technical')}
            className={`px-5 py-2 font-medium text-sm rounded-full m-1
              ${activeCategory === 'technical' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            Technical ({categoryCount.technical})
          </button>
          <button
            onClick={() => setActiveCategory('implementation')}
            className={`px-5 py-2 font-medium text-sm rounded-full m-1
              ${activeCategory === 'implementation' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            Implementation ({categoryCount.implementation})
          </button>
          <button
            onClick={() => setActiveCategory('economic')}
            className={`px-5 py-2 font-medium text-sm rounded-full m-1
              ${activeCategory === 'economic' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            Economic ({categoryCount.economic})
          </button>
        </div>
        
        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div 
              key={faq.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 text-left focus:outline-none flex justify-between items-center"
              >
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <span className={`ml-4 flex-shrink-0 h-5 w-5 ${expandedId === faq.id ? 'text-blue-500' : 'text-gray-400'}`}>
                  <svg className={`transition-transform duration-200 ${expandedId === faq.id ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              {expandedId === faq.id && (
                <div className="px-6 pb-5 text-gray-600">
                  <div className="pt-3 border-t border-gray-200">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Still Have Questions */}
        <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg text-white p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
          <p className="mb-4">Our team is ready to assist you with any inquiries about the Solon platform.</p>
          <button className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 