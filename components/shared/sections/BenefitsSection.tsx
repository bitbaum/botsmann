'use client';

import type { BenefitsContent } from '@/lib/config/bot-pages';
import type { BotAccentColor } from '@/types/bot';
import { getAccentClasses } from '@/lib/config/colors';

interface BenefitsSectionProps {
  content: BenefitsContent;
  accentColor: BotAccentColor;
}

export function BenefitsSection({ content, accentColor }: BenefitsSectionProps) {
  const { badge, title, subtitle, benefits, columns = 3 } = content;
  const accent = getAccentClasses(accentColor);

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
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
        {benefits.map((benefit, index) => (
          <div key={index} className="text-center p-6">
            <span className="text-4xl mb-4 block">{benefit.icon}</span>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
            <p className="text-gray-600 text-sm">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
