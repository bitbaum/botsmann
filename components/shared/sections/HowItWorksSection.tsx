'use client';

import type { HowItWorksContent } from '@/lib/config/bot-pages';
import { BRAND_ACCENT } from '@/lib/config/colors';

interface HowItWorksSectionProps {
  content: HowItWorksContent;
}

export function HowItWorksSection({ content }: HowItWorksSectionProps) {
  const { title, subtitle, steps } = content;
  const accent = BRAND_ACCENT;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-ink mb-4">{title}</h2>

      {subtitle && (
        <p className="text-lg text-ink-muted text-center max-w-2xl mx-auto mb-12">{subtitle}</p>
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
            <h3 className="font-semibold text-ink mb-2">{step.title}</h3>
            <p className="text-ink-muted text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
