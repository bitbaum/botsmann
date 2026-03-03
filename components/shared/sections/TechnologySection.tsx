'use client';

import type { TechnologyContent } from '@/lib/config/bot-pages';
import type { BotAccentColor } from '@/types/bot';
import { getAccentClasses } from '@/lib/config/colors';

interface TechnologySectionProps {
  content: TechnologyContent;
  accentColor: BotAccentColor;
}

export function TechnologySection({ content, accentColor }: TechnologySectionProps) {
  const { badge, title, subtitle, categories, architecture, principles } = content;
  const accent = getAccentClasses(accentColor);

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

      {/* Tech Categories */}
      <div className="grid gap-8 md:grid-cols-3 mb-12">
        {categories.map((category, catIndex) => (
          <div key={catIndex}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.title}</h3>
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-white rounded-lg border border-gray-200 p-4">
                  {item.icon && <span className="text-xl mb-2 block">{item.icon}</span>}
                  <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Architecture */}
      {architecture && (
        <div className="bg-gray-50 rounded-xl p-8 mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {architecture.title}
          </h3>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            {architecture.layers.map((layer, index) => (
              <div
                key={index}
                className="flex-1 bg-white rounded-lg border border-gray-200 p-4 text-center"
              >
                <h4 className="font-medium text-gray-900 mb-1">{layer.title}</h4>
                <p className="text-sm text-gray-600">{layer.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Principles */}
      {principles && principles.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Principles</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {principles.map((principle, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className={`font-medium ${accent.text}`}>{principle.label}</span>
                <span className="text-gray-600">{principle.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
