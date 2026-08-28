'use client';

import type { CTAContent } from '@/lib/config/bot-pages';
import { BRAND_ACCENT } from '@/lib/config/colors';

interface CTASectionProps {
  content: CTAContent;
  tryLink: string;
}

export function CTASection({ content, tryLink }: CTASectionProps) {
  const { title, subtitle, primaryButton, secondaryButton, metrics, note } = content;
  const accent = BRAND_ACCENT;

  const primaryHref = primaryButton.useTryLink ? tryLink : (primaryButton.href ?? '#');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-paper rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-ink mb-4">{title}</h2>

        {subtitle && <p className="text-lg text-ink-muted max-w-2xl mx-auto mb-8">{subtitle}</p>}

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
              className={`px-8 py-3 rounded-lg font-medium border-2 ${accent.border} ${accent.text} hover:bg-paper transition-colors`}
            >
              {secondaryButton.text}
            </a>
          )}
        </div>

        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-ink">
                  {metric.dynamic ? '—' : metric.value}
                </div>
                <div className="text-sm text-ink-muted">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {note && <p className="text-sm text-ink-muted">{note}</p>}
      </div>
    </div>
  );
}
