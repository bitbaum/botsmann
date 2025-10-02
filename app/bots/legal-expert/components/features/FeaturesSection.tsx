'use client';

import React from 'react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: '💬',
      title: 'AI + Human Collaboration',
      description: 'Chat with AI 24/7, human lawyer joins when needed',
      details: 'No appointments required. AI handles routine work instantly while your lawyer provides expert guidance on strategic decisions.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🔐',
      title: 'Multi-Level Access Control',
      description: 'Granular permissions for your entire team',
      details: 'Control who sees what. Set different access levels for attorneys, paralegals, advisors, and family members.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '📁',
      title: 'Smart File Organization',
      description: 'AI auto-categorizes and analyzes documents',
      details: '8 intelligent categories: Evidence, Contracts, Correspondence, Court Filings, IDs, Financial, Medical, and Other.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🌍',
      title: '130+ Jurisdictions',
      description: 'Global coverage with local expertise',
      details: 'All 50 US states, 27 EU countries, 26 Swiss cantons, UAE, Singapore, Hong Kong, and more.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '📅',
      title: 'Complete Audit Trail',
      description: 'Every action logged and encrypted',
      details: 'Full transparency - track every message, file upload, permission change, and lawyer activity with timestamps.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: '⚡',
      title: 'Real-Time Collaboration',
      description: 'Work together seamlessly',
      details: 'Live chat, file sharing, annotations, and comments. Everyone stays in sync with push notifications.',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <section className="mb-20" id="features">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-full text-sm font-medium mb-6">
          <span className="mr-2">⚡</span>
          Platform Features
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Everything You Need in One Workspace
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Collaborative data rooms designed for modern legal work. Secure, transparent, and built for teams.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-gray-200 transition-all hover:shadow-xl"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl text-white mb-4 group-hover:scale-110 transition-transform`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 mb-3 font-medium">
              {feature.description}
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              {feature.details}
            </p>
          </div>
        ))}
      </div>

      {/* How it works - integrated */}
      <div className="mt-16 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 lg:p-12 border border-gray-200">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">How Lex Works</h3>
        <div className="grid lg:grid-cols-4 gap-6">
          {[
            {
              step: '1',
              icon: '📝',
              title: 'Describe Your Case',
              description: 'Select jurisdiction, legal area, upload files, and describe your situation in detail.'
            },
            {
              step: '2',
              icon: '🤝',
              title: 'Match with Lawyer',
              description: 'AI finds the perfect attorney based on expertise, jurisdiction, availability, and rates.'
            },
            {
              step: '3',
              icon: '🏗️',
              title: 'Workspace Created',
              description: 'Your private data room is set up with files organized, encrypted, and ready for collaboration.'
            },
            {
              step: '4',
              icon: '🚀',
              title: 'Start Collaborating',
              description: 'Chat with AI & lawyer, manage files, track timeline, and work together in real-time.'
            }
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold flex items-center justify-center text-lg">
                    {item.step}
                  </div>
                  <div className="text-3xl">{item.icon}</div>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              {item.step !== '4' && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Use cases - integrated */}
      <div className="mt-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Perfect For</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Individuals',
              icon: '👤',
              examples: 'Immigration, family law, employment disputes, tenant rights',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Small Businesses',
              icon: '🏢',
              examples: 'Contracts, compliance, IP protection, employment law',
              color: 'from-purple-500 to-pink-500'
            },
            {
              title: 'Law Firms',
              icon: '⚖️',
              examples: 'Case management, client collaboration, document workflow',
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Legal Teams',
              icon: '👥',
              examples: 'Corporate legal, compliance teams, in-house counsel',
              color: 'from-orange-500 to-red-500'
            }
          ].map((useCase, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-gray-200 transition-all hover:shadow-lg group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${useCase.color} flex items-center justify-center text-2xl text-white mb-4 group-hover:scale-110 transition-transform`}>
                {useCase.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{useCase.title}</h4>
              <p className="text-sm text-gray-600">{useCase.examples}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
