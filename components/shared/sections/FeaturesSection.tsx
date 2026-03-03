'use client';

import type { FeaturesContent } from '@/lib/config/bot-pages';
import type { BotAccentColor } from '@/types/bot';
import { getAccentClasses } from '@/lib/config/colors';

interface FeaturesSectionProps {
  content: FeaturesContent;
  accentColor: BotAccentColor;
}

export function FeaturesSection({ content, accentColor }: FeaturesSectionProps) {
  const { badge, title, subtitle, features, columns = 3 } = content;
  const accent = getAccentClasses(accentColor);

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div className="max-w-6xl mx-auto">
      {badge && (
        <div className="text-center mb-4">
          <span
            className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${accent.badge}`}
          >
            {badge}
          </span>
        </div>
      )}

      <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">{title}</h2>

      {subtitle && (
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">{subtitle}</p>
      )}

      <div className={`grid gap-6 ${gridCols}`}>
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-3xl mb-4 block">{feature.icon}</span>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
