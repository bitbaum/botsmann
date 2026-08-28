'use client';

import { type FC, useState } from 'react';
import { PRIVACY_TIERS, type PrivacyTier } from '@/lib/config/privacy-tiers';

interface PrivacyTierInfoProps {
  /** Initially expanded state */
  defaultExpanded?: boolean;
}

/**
 * Expandable panel explaining privacy tiers (cloud vs self-hosted).
 * Shows comparison table with pros/cons and cost indicators.
 */
export const PrivacyTierInfo: FC<PrivacyTierInfoProps> = ({ defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const tiers = Object.values(PRIVACY_TIERS);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-medium text-gray-700">About AI Privacy Tiers</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="p-4 space-y-4">
          <p className="text-sm text-gray-600">
            Choose between cloud-based AI for convenience or self-hosted AI for maximum privacy.
            Each tier offers different tradeoffs.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {tiers.map((tier) => (
              <TierCard key={tier.id} tier={tier} />
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Comparison</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-medium text-gray-600">Feature</th>
                    {tiers.map((tier) => (
                      <th key={tier.id} className="text-left py-2 px-2 font-medium text-gray-600">
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Privacy</td>
                    <td className="py-2 px-2">Standard</td>
                    <td className="py-2 px-2 text-green-600 font-medium">Maximum</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Setup</td>
                    <td className="py-2 px-2 text-green-600 font-medium">None</td>
                    <td className="py-2 px-2">Required</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Cost</td>
                    <td className="py-2 px-2 text-green-600 font-medium">$</td>
                    <td className="py-2 px-2">$$$</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Data location</td>
                    <td className="py-2 px-2">Third-party servers</td>
                    <td className="py-2 px-2 text-green-600 font-medium">Your network</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Availability</td>
                    <td className="py-2 px-2 text-green-600 font-medium">Always</td>
                    <td className="py-2 px-2">Depends on your setup</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface TierCardProps {
  tier: PrivacyTier;
}

const TierCard: FC<TierCardProps> = ({ tier }) => {
  const isPrivate = tier.privacyLevel === 'maximum';

  return (
    <div
      className={`p-4 rounded-lg border ${
        isPrivate ? 'border-green-200 bg-green-50' : 'border-edge bg-action-tint'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{isPrivate ? '🔒' : '☁️'}</span>
        <h3 className="font-semibold text-gray-900">{tier.name}</h3>
        <span
          className={`px-2 py-0.5 rounded text-xs font-medium ${
            isPrivate ? 'bg-green-200 text-green-800' : 'bg-action-tint text-action'
          }`}
        >
          {tier.costIndicator}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{tier.description}</p>

      <div className="space-y-2">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">Pros</p>
          <ul className="space-y-1">
            {tier.pros.map((pro, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-1.5">
                <span className="text-green-500 mt-0.5">+</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">Cons</p>
          <ul className="space-y-1">
            {tier.cons.map((con, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-1.5">
                <span className="text-gray-400 mt-0.5">-</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
