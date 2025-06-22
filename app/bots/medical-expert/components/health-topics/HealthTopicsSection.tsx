import React from "react";

interface HealthTopicsSectionProps {
  getTryLink: () => string;
}

/**
 * Health topics component that displays a grid of common health categories
 * that users can explore with Dr. Imhotep.
 */
const HealthTopicsSection: React.FC<HealthTopicsSectionProps> = ({
  getTryLink,
}) => {
  const topics = [
    { name: "Heart Health", icon: "❤️" },
    { name: "Mental Wellness", icon: "🧠" },
    { name: "Nutrition", icon: "🥗" },
    { name: "Exercise", icon: "🏃‍♂️" },
    { name: "Sleep", icon: "😴" },
    { name: "Diabetes", icon: "📊" },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {topics.map((topic, index) => (
        <a
          key={index}
          href={getTryLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{topic.icon}</span>
            <h4 className="font-semibold">{topic.name}</h4>
          </div>
        </a>
      ))}
    </div>
  );
};

export default HealthTopicsSection;
