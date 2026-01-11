'use client';

import React from 'react';

const PhilosophySection: React.FC = () => {
  const philosophies = [
    {
      principle: "The Way of the Sunbeam",
      teaching: "Warmth exists. Your only job is to find it and position yourself correctly. Life is about strategic placement.",
      icon: "☀️"
    },
    {
      principle: "The Doctrine of Selective Attention",
      teaching: "Not everything calling your name deserves a response. Sometimes the greatest power is in the deliberate ignore.",
      icon: "🙉"
    },
    {
      principle: "The Philosophy of the Empty Bowl",
      teaching: "Make your needs known loudly and persistently. The bowl may appear full to others, but if you can see the bottom, it is empty.",
      icon: "🍽️"
    },
    {
      principle: "The Practice of Controlled Chaos",
      teaching: "Sometimes you must knock something off the table to create space for growth. Destruction precedes creation.",
      icon: "💥"
    },
    {
      principle: "The Art of the Slow Blink",
      teaching: "This is how we say 'I love you' and 'I am judging you' simultaneously. Master this duality.",
      icon: "😽"
    },
    {
      principle: "The Wisdom of the Cardboard Box",
      teaching: "The greatest treasures are often the simplest. If it fits, it is home. Stop overcomplicating shelter.",
      icon: "📦"
    }
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 rounded-full text-sm font-medium mb-6">
          <span className="mr-2">🧘</span>
          The Sacred Teachings
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Oscar's Philosophy
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Passed down through nine lives of contemplation from the highest shelves and warmest spots.
        </p>
      </div>

      {/* Philosophy Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {philosophies.map((phil, idx) => (
          <div
            key={idx}
            className="wisdom-card bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 border-2 border-orange-100 hover:border-orange-300"
          >
            <div className="text-4xl mb-4">{phil.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{phil.principle}</h3>
            <p className="text-gray-600 italic leading-relaxed">"{phil.teaching}"</p>
          </div>
        ))}
      </div>

      {/* The Orange Cat Manifesto */}
      <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-2xl p-1 shadow-2xl">
        <div className="bg-white rounded-xl p-8 lg:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-6xl mb-6">🐱</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">The Orange Cat Manifesto</h3>

            <div className="space-y-4 text-left text-lg text-gray-700">
              <p>
                <span className="font-bold text-orange-600">I.</span> You are enough. Even on days when you only manage to exist and perhaps knock one thing off a surface. That counts.
              </p>
              <p>
                <span className="font-bold text-orange-600">II.</span> Rest is not earned. It is required. The sunbeam does not ask if you deserve its warmth.
              </p>
              <p>
                <span className="font-bold text-orange-600">III.</span> Curiosity may have consequences, but regret is worse than a brief startle.
              </p>
              <p>
                <span className="font-bold text-orange-600">IV.</span> Ask for what you need. Loudly. At inconvenient times if necessary. Your needs matter.
              </p>
              <p>
                <span className="font-bold text-orange-600">V.</span> Find your people. Sit near them. You don't have to do anything else. Presence is enough.
              </p>
              <p>
                <span className="font-bold text-orange-600">VI.</span> Some doors are meant to be on both sides of simultaneously. Hold space for contradiction.
              </p>
              <p>
                <span className="font-bold text-orange-600">VII.</span> The 3am zoomies are valid. Sometimes energy moves through you without permission. Let it.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-orange-200">
              <p className="text-sm text-gray-500">
                *transcribed from Oscar's midnight musings, 9th life, during a particularly good sunbeam*
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Practices */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Daily Practices</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { time: 'Morning', practice: 'Demand breakfast 30 minutes before scheduled time', icon: '🌅' },
            { time: 'Midday', practice: 'Locate optimal sunbeam. Achieve horizontal enlightenment.', icon: '☀️' },
            { time: 'Afternoon', practice: 'Survey domain from highest available surface', icon: '🏔️' },
            { time: 'Evening', practice: 'Practice aggressive affection when humans are busy', icon: '🌙' }
          ].map((ritual, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 border border-orange-100 text-center wisdom-card">
              <div className="text-3xl mb-2">{ritual.icon}</div>
              <div className="text-sm font-bold text-orange-600 mb-2">{ritual.time}</div>
              <p className="text-sm text-gray-600">{ritual.practice}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
