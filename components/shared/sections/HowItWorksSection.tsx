'use client';

import type { HowItWorksContent } from '@/lib/config/bot-pages';
import type { BotAccentColor } from '@/types/bot';
import { getAccentClasses } from '@/lib/config/colors';

interface HowItWorksSectionProps {
  content: HowItWorksContent;
  accentColor: BotAccentColor;
}

export function HowItWorksSection({ content, accentColor }: HowItWorksSectionProps) {
  const { title, subtitle, steps } = content;
  const accent = getAccentClasses(accentColor);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">{title}</h2>

      {subtitle && (
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">{subtitle}</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div key={index} className="text-center">
            <div
              className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${accent.lightBg}`}
            >
              {step.icon ? (
                <span className="text-2xl">{step.icon}</span>
              ) : (
                <span className={`text-xl font-bold ${accent.text}`}>
                  {step.number ?? index + 1}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
