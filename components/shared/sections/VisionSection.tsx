'use client';

import type { VisionContent } from '@/lib/config/bot-pages';
import type { BotAccentColor } from '@/types/bot';
import { getAccentClasses, VISION_STATUS_CONFIG } from '@/lib/config/colors';

interface VisionSectionProps {
  content: VisionContent;
  accentColor: BotAccentColor;
}

export function VisionSection({ content, accentColor }: VisionSectionProps) {
  const { badge, title, subtitle, mission, principles, phases, benefits } = content;
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

      {/* Mission */}
      {mission && (
        <div className="bg-gray-50 rounded-xl p-8 mb-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{mission.title}</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">{mission.description}</p>
        </div>
      )}

      {/* Principles */}
      {principles && principles.length > 0 && (
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {principles.map((principle, index) => (
            <div key={index} className="text-center">
              {principle.icon && <span className="text-3xl mb-3 block">{principle.icon}</span>}
              <h4 className="font-semibold text-gray-900 mb-2">{principle.title}</h4>
              <p className="text-gray-600 text-sm">{principle.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Phases/Roadmap */}
      {phases && phases.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Development Roadmap</h3>
          <div className="space-y-6">
            {phases.map((phase, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-gray-500">{phase.phase}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded ${VISION_STATUS_CONFIG[phase.status]?.colors}`}
                  >
                    {VISION_STATUS_CONFIG[phase.status]?.label}
                  </span>
                </div>

                <h4 className="text-xl font-semibold text-gray-900 mb-2">{phase.title}</h4>

                {phase.timeline && (
                  <p className="text-sm text-gray-500 mb-3">Timeline: {phase.timeline}</p>
                )}

                <p className="text-gray-600 mb-4">{phase.description}</p>

                {phase.capabilities && phase.capabilities.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Key Capabilities:</h5>
                    <ul className="grid gap-2 md:grid-cols-2">
                      {phase.capabilities.map((cap, capIndex) => (
                        <li
                          key={capIndex}
                          className="text-sm text-gray-600 flex items-center gap-2"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${accent.primary}`}></span>
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benefits */}
      {benefits && benefits.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why This Vision Matters
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-4">
                <span className="text-3xl mb-3 block">{benefit.icon}</span>
                <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
