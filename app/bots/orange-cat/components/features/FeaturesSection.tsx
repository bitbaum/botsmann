'use client';

import React from 'react';

interface FeaturesSectionProps {
  features: string[];
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  const featureData = [
    {
      icon: '🔮',
      title: 'Wisdom Dispensary',
      description: 'Ancient cat proverbs adapted for modern human problems',
      details: 'From the sacred scrolls of cats past, Oscar translates timeless feline philosophy into actionable human advice.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: '😼',
      title: 'Judgmental Stare Analysis',
      description: 'Upload your situation, receive calibrated feline judgment',
      details: 'Oscar has perfected the art of the slow blink. Submit your life choices for an honest (but loving) assessment.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '😴',
      title: 'Nap Optimization',
      description: 'Science-backed recommendations for optimal rest',
      details: 'Based on 18+ hours of daily research, Oscar provides personalized nap schedules aligned with sunbeam patterns.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '💥',
      title: 'Chaos Theory',
      description: 'Embrace the art of knocking things off tables',
      details: 'Sometimes progress requires disruption. Learn when to push boundaries (and objects) to create positive change.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: '☀️',
      title: 'Sunbeam Therapy',
      description: 'Find inner peace through strategic positioning',
      details: 'Master the ancient art of finding and occupying the perfect warm spot. Location, timing, and commitment.',
      color: 'from-amber-500 to-yellow-500'
    },
    {
      icon: '🙀',
      title: 'The Art of Ignoring',
      description: 'Master selective attention for better focus',
      details: 'Not everything deserves your energy. Oscar teaches the fine art of knowing what to acknowledge and what to ignore.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 rounded-full text-sm font-medium mb-6">
          <span className="mr-2">✨</span>
          Feline Superpowers
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Ancient Wisdom. Modern Application.
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Oscar has spent countless hours observing humanity from windowsills and refrigerator tops.
          The insights are free. The judgment is included.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureData.map((feature, idx) => (
          <div
            key={idx}
            className="feature-card group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl"
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

      {/* The Nine Lives of Wisdom */}
      <div className="mt-16 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 lg:p-12 border border-orange-200">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Nine Lives of Wisdom</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              life: '1-3',
              title: 'The Learning Years',
              icon: '🐱',
              wisdom: 'Curiosity is not a flaw. Knock things over. Learn from the crash.'
            },
            {
              life: '4-6',
              title: 'The Growth Years',
              icon: '😸',
              wisdom: 'Find your sunny spot. Defend it fiercely. But know when to share warmth.'
            },
            {
              life: '7-9',
              title: 'The Wisdom Years',
              icon: '😺',
              wisdom: 'True power is knowing you could pounce... but choosing to nap instead.'
            }
          ].map((phase, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 border-2 border-orange-100 text-center">
              <div className="text-4xl mb-3">{phase.icon}</div>
              <div className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
                Lives {phase.life}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{phase.title}</h4>
              <p className="text-sm text-gray-600 italic">"{phase.wisdom}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Perfect For Section */}
      <div className="mt-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Oscar is For Everyone*</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Overthinkers',
              icon: '🧠',
              advice: 'Sometimes the answer is to simply... stop thinking and nap.',
              color: 'from-purple-500 to-indigo-500'
            },
            {
              title: 'Workaholics',
              icon: '💼',
              advice: 'Your laptop is warm. Perfect for sitting on. Take a break.',
              color: 'from-orange-500 to-red-500'
            },
            {
              title: 'Perfectionists',
              icon: '✨',
              advice: 'A hairball is never perfect, yet it is always expressed authentically.',
              color: 'from-pink-500 to-rose-500'
            },
            {
              title: 'Night Owls',
              icon: '🦉',
              advice: 'Running around at 3am is valid. Own your chaos hours.',
              color: 'from-blue-500 to-cyan-500'
            }
          ].map((type, idx) => (
            <div
              key={idx}
              className="wisdom-card bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-orange-200 group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center text-2xl text-white mb-4 group-hover:scale-110 transition-transform`}>
                {type.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{type.title}</h4>
              <p className="text-sm text-gray-600 italic">"{type.advice}"</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-400 mt-4">*Except dogs. Oscar reserves judgment.</p>
      </div>
    </section>
  );
};

export default FeaturesSection;
