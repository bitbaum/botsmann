import React, { useState } from "react";

interface FeaturesSectionProps {
  features: string[];
}

/**
 * Features Section Component
 *
 * This component displays the core features and capabilities of the Research Assistant bot.
 *
 * @module FeaturesSection
 */
const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  // Core features with detailed explanations
  const coreFeatures = [
    {
      title: "Research Systematization",
      shortDescription:
        "Organize your research into structured, accessible formats",
      icon: "📑",
      fullDescription:
        "Upload your PDFs, notes, and text files or manually enter data. We'll categorize everything by themes, relevance, or chronology in a searchable database.",
      benefit:
        "Find any research insight in seconds rather than hours spent digging through files and notes.",
    },
    {
      title: "Web Scraping",
      shortDescription: "Stay updated with the latest research in your field",
      icon: "🔍",
      fullDescription:
        "Automatically scrape trusted web sources like news sites, arXiv, and Google Scholar for the latest content based on your keywords.",
      benefit:
        "Never miss important developments in your field with daily or on-demand summarized reports.",
    },
    {
      title: "AI-Generated Drafts",
      shortDescription: "Transform your research into structured content",
      icon: "✍️",
      fullDescription:
        "Generate abstracts, literature reviews, and other structured content from your collected research with proper citations included.",
      benefit:
        "Cut draft creation time by 80% while ensuring all key points and sources are properly included.",
    },
    {
      title: "Daily Questions",
      shortDescription: "Challenge your thinking with insightful prompts",
      icon: "❓",
      fullDescription:
        "Receive 5 tailored, thought-provoking questions daily that match your research focus and challenge you to explore new angles.",
      benefit:
        "Break through research blocks and discover connections you may have overlooked.",
    },
    {
      title: "Discovery Mode",
      shortDescription: "Push the boundaries with novel connections",
      icon: "💡",
      fullDescription:
        "Our experimental 'big discovery' feature analyzes your research for patterns and missing links to suggest novel ideas and hypotheses.",
      benefit:
        "Accelerate breakthrough moments by identifying non-obvious connections across your research database.",
    },
    {
      title: "Team Collaboration",
      shortDescription: "Seamless integration with your research workflow",
      icon: "👥",
      fullDescription:
        "Share your research with team members, integrate with tools like Zotero, Notion, and Google Drive, and collaborate in real-time.",
      benefit:
        "Unite your research team with shared knowledge and coordinated insights regardless of location.",
    },
  ];

  const toggleFeature = (index: number) => {
    if (expandedFeature === index) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(index);
    }
  };

  return (
    <div className="my-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        Enhancing Your Research Workflow
      </h2>
      <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        Our AI Research Assistant combines powerful features to transform how
        you collect, organize, and generate insights from your research.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {coreFeatures.map((feature, index) => (
          <div
            key={index}
            className="feature-card cursor-pointer"
            onClick={() => toggleFeature(index)}
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">{feature.icon}</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.shortDescription}</p>

            {expandedFeature === index && (
              <div className="mt-4 pt-4 border-t border-indigo-100 animate-fadeIn">
                <p className="text-gray-700 mb-3">{feature.fullDescription}</p>
                <div className="bg-indigo-50 p-3 rounded-md">
                  <p className="text-gray-700 text-sm">
                    <strong>Key Benefit:</strong> {feature.benefit}
                  </p>
                </div>
              </div>
            )}

            <div className="text-indigo-600 text-sm mt-3 flex items-center">
              {expandedFeature === index ? "Show less" : "Learn more"}
              <svg
                className={`w-4 h-4 ml-1 transition-transform ${expandedFeature === index ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-6">
          Designed for researchers by researchers, our AI assistant adapts to
          your unique needs—whether you're an academic, journalist, student, or
          industry professional.
        </p>
        <a href="#research-system" className="btn-secondary">
          Explore Features In Detail
        </a>
      </div>
    </div>
  );
};

export default FeaturesSection;
