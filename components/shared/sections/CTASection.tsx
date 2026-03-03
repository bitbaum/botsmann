'use client';

import type { CTAContent } from '@/lib/config/bot-pages';
import type { BotAccentColor } from '@/types/bot';
import { getAccentClasses } from '@/lib/config/colors';

interface CTASectionProps {
  content: CTAContent;
  accentColor: BotAccentColor;
  tryLink: string;
}

export function CTASection({ content, accentColor, tryLink }: CTASectionProps) {
  const { title, subtitle, primaryButton, secondaryButton, metrics, note } = content;
  const accent = getAccentClasses(accentColor);

  const primaryHref = primaryButton.useTryLink ? tryLink : (primaryButton.href ?? '#');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>

        {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{subtitle}</p>}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <a
            href={primaryHref}
            target={primaryButton.useTryLink ? '_blank' : undefined}
            rel={primaryButton.useTryLink ? 'noopener noreferrer' : undefined}
            className={`px-8 py-3 rounded-lg font-medium text-white ${accent.primary} hover:opacity-90 transition-opacity`}
          >
            {primaryButton.text}
          </a>

          {secondaryButton && (
            <a
              href={secondaryButton.href}
              className={`px-8 py-3 rounded-lg font-medium border-2 ${accent.border} ${accent.text} hover:bg-gray-50 transition-colors`}
            >
              {secondaryButton.text}
            </a>
          )}
        </div>

        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {metric.dynamic ? '—' : metric.value}
                </div>
                <div className="text-sm text-gray-500">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {note && <p className="text-sm text-gray-500">{note}</p>}
      </div>
    </div>
  );
}
