import React, { useState } from 'react';

interface QuestionsSectionProps {
  getTryLink: () => string;
}

/**
 * Common health questions component that displays frequently asked health questions
 * with expandable answers.
 */
const QuestionsSection: React.FC<QuestionsSectionProps> = ({ getTryLink }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  const questions = [
    { q: "How much water should I drink daily?", a: "Most adults need about 8 cups (64 ounces) of water per day, but needs vary based on activity level, climate, and other factors." },
    { q: "How can I improve my sleep?", a: "Maintain a regular sleep schedule, avoid screens before bed, create a comfortable sleep environment, and limit caffeine and alcohol." },
    { q: "What exercises are best for beginners?", a: "Walking, swimming, and beginner yoga are excellent low-impact options for those new to exercise." }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {questions.map((item, index) => (
        <div key={index} className="mb-4 border-b border-gray-200 pb-4 last:border-b-0">
          <button 
            className="w-full text-left font-medium text-gray-900 flex justify-between items-center"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            {item.q}
            <span>{expandedIndex === index ? '−' : '+'}</span>
          </button>
          {expandedIndex === index && (
            <div className="mt-2 text-gray-600">{item.a}</div>
          )}
        </div>
      ))}
      <div className="text-center mt-6">
        <a 
          href={getTryLink()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-green-600 hover:underline font-medium"
        >
          Ask Your Own Questions
        </a>
      </div>
    </div>
  );
};

export default QuestionsSection; 