'use client';

import React, { useState } from 'react';

interface WisdomResponse {
  wisdom: string;
  action: string;
  mood: string;
}

const CAT_WISDOM: Record<string, WisdomResponse[]> = {
  work: [
    { wisdom: "The keyboard is warm. This is its purpose. Work is secondary.", action: "*stretches across your laptop*", mood: "😼" },
    { wisdom: "Deadlines are human constructs. Sunbeams are eternal truths.", action: "*slow blink*", mood: "😸" },
    { wisdom: "You have sent enough emails. Close the laptop. Join me in staring at the wall.", action: "*taps screen with paw*", mood: "🙀" }
  ],
  stress: [
    { wisdom: "Have you tried knocking the stress off a table? Metaphorically, of course.", action: "*pushes glass toward edge*", mood: "😼" },
    { wisdom: "Anxiety is just trapped zoomies. Have you considered running chaotically at 3am?", action: "*ears perk up*", mood: "😸" },
    { wisdom: "Breathe. Stretch. Find a cardboard box. Everything is better in a cardboard box.", action: "*curls into impossibly small space*", mood: "😺" }
  ],
  relationships: [
    { wisdom: "Sometimes love means sitting in the same room but ignoring each other completely.", action: "*turns away but leaves tail touching you*", mood: "😽" },
    { wisdom: "If they do not appreciate you at your 3am zoomies, they do not deserve you at your purring.", action: "*judges silently*", mood: "😼" },
    { wisdom: "Bring them a gift. Not a mouse. Maybe coffee. Humans are weird about mice.", action: "*deposits wisdom at your feet*", mood: "😸" }
  ],
  money: [
    { wisdom: "I sleep 18 hours a day and want for nothing. Perhaps the economy is the problem, not your budgeting.", action: "*yawns luxuriously*", mood: "😺" },
    { wisdom: "You cannot eat money, but you CAN knock expensive things off tables. Perspective.", action: "*eyes vase suspiciously*", mood: "😼" },
    { wisdom: "The box the expensive thing came in? Worth more. Invest in experiences (boxes).", action: "*sits in box*", mood: "😸" }
  ],
  life: [
    { wisdom: "The meaning of life is simple: eat, sleep, find sunny spots, and occasionally cause chaos.", action: "*achieves enlightenment*", mood: "😺" },
    { wisdom: "You are already doing your best. Your best today might be napping. That counts.", action: "*approving slow blink*", mood: "😽" },
    { wisdom: "Be like water. Also, knock water off the table. Be chaos AND calm.", action: "*knocks over water glass*", mood: "😼" }
  ]
};

const TOPICS = [
  { id: 'work', label: 'Work Stress', emoji: '💼' },
  { id: 'stress', label: 'Anxiety', emoji: '😰' },
  { id: 'relationships', label: 'Relationships', emoji: '💕' },
  { id: 'money', label: 'Money', emoji: '💰' },
  { id: 'life', label: 'Life Meaning', emoji: '🌟' }
];

const CatWisdomDemo: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [wisdom, setWisdom] = useState<WisdomResponse | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [wisdomCount, setWisdomCount] = useState(0);

  const seekWisdom = (topic: string) => {
    setSelectedTopic(topic);
    setIsThinking(true);
    setWisdom(null);

    // Simulate Oscar "thinking"
    setTimeout(() => {
      const wisdoms = CAT_WISDOM[topic];
      const randomWisdom = wisdoms[Math.floor(Math.random() * wisdoms.length)];
      setWisdom(randomWisdom);
      setIsThinking(false);
      setWisdomCount(prev => prev + 1);
    }, 1500);
  };

  const getAnotherWisdom = () => {
    if (selectedTopic) {
      seekWisdom(selectedTopic);
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl p-8 lg:p-12 border border-orange-200 sunbeam">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-white text-orange-700 rounded-full text-sm font-medium mb-4 shadow-sm">
          <span className="mr-2">🔮</span>
          Interactive Wisdom Dispensary
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Consult the Oracle
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select your burden. Oscar shall consider it from atop his refrigerator throne.
        </p>
      </div>

      {/* Topic Selection */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => seekWisdom(topic.id)}
            disabled={isThinking}
            className={`paw-cursor px-5 py-3 rounded-xl font-medium transition-all ${
              selectedTopic === topic.id
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 border-2 border-orange-200 hover:border-orange-400 hover:shadow-md'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span className="mr-2">{topic.emoji}</span>
            {topic.label}
          </button>
        ))}
      </div>

      {/* Wisdom Display Area */}
      <div className="max-w-2xl mx-auto">
        {!selectedTopic && !isThinking && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 float-gentle">🐱</div>
            <p className="text-gray-500 italic">
              *Oscar observes you from a distance, waiting*
            </p>
          </div>
        )}

        {isThinking && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 purr">🐱</div>
            <div className="flex justify-center items-center gap-2 text-orange-600">
              <span className="typing-dots">
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mx-1"></span>
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mx-1"></span>
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mx-1"></span>
              </span>
            </div>
            <p className="text-gray-500 italic mt-4">
              *Oscar considers your plight while grooming his paw*
            </p>
          </div>
        )}

        {wisdom && !isThinking && (
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border-2 border-orange-200">
            <div className="flex items-start gap-4">
              <div className="text-5xl float-gentle">{wisdom.mood}</div>
              <div className="flex-1">
                <p className="text-sm text-orange-600 italic mb-3">{wisdom.action}</p>
                <blockquote className="text-xl lg:text-2xl font-medium text-gray-800 leading-relaxed">
                  "{wisdom.wisdom}"
                </blockquote>
                <p className="text-right text-sm text-gray-400 mt-4">— Oscar, 9th Life</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-orange-100 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={getAnotherWisdom}
                className="paw-cursor px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-lg transition-all shadow-md"
              >
                Seek More Wisdom
              </button>
              <button
                onClick={() => { setSelectedTopic(null); setWisdom(null); }}
                className="px-6 py-3 bg-white text-orange-700 font-semibold rounded-lg border-2 border-orange-200 hover:border-orange-400 transition-all"
              >
                New Topic
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Wisdom Counter */}
      {wisdomCount > 0 && (
        <div className="text-center mt-8">
          <p className="text-sm text-orange-600">
            Wisdoms dispensed this session: <span className="font-bold">{wisdomCount}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CatWisdomDemo;
