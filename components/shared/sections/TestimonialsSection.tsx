'use client';

import type { TestimonialsContent } from '@/lib/config/bot-pages';
import { BRAND_ACCENT } from '@/lib/config/colors';

interface TestimonialsSectionProps {
  content: TestimonialsContent;
}

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  const { badge, title, subtitle, testimonials, cta } = content;
  const accent = BRAND_ACCENT;

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

      <h2 className="text-3xl font-bold text-center text-ink mb-4">{title}</h2>

      {subtitle && (
        <p className="text-lg text-ink-muted text-center max-w-3xl mx-auto mb-12">{subtitle}</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-surface rounded-xl border border-edge p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-paper flex items-center justify-center">
                <span className="text-ink-muted text-sm">
                  {testimonial.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <a href="#" className="text-sm font-medium text-ink hover:underline">
                  {testimonial.author}
                </a>
                <p className="text-xs text-ink-muted">{testimonial.role}</p>
                {testimonial.company && (
                  <p className="text-xs text-ink-muted">{testimonial.company}</p>
                )}
              </div>
            </div>

            <p className="text-ink-muted text-sm mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>

            {testimonial.tag && (
              <span className={`inline-block px-2 py-1 text-xs rounded ${accent.badge}`}>
                {testimonial.tag}
              </span>
            )}
          </div>
        ))}
      </div>

      {cta && (
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold text-ink mb-4">{cta.text}</h3>
          <a
            href={cta.href}
            className={`inline-block px-6 py-3 rounded-lg font-medium text-white ${accent.primary} hover:opacity-90 transition-opacity`}
          >
            Learn More
          </a>
        </div>
      )}
    </div>
  );
}
