'use client';

import React from 'react';
import { LawyerProfile } from './types';

interface LawyerMatcherProps {
  lawyers: LawyerProfile[];
  selectedLawyer: string | null;
  onSelectLawyer: (lawyerId: string) => void;
  legalArea: string;
}

const LawyerMatcher: React.FC<LawyerMatcherProps> = ({
  lawyers,
  selectedLawyer,
  onSelectLawyer,
  legalArea
}) => {
  // Filter lawyers by expertise matching the legal area
  const matchedLawyers = lawyers.filter(lawyer =>
    lawyer.expertise.some(exp =>
      exp.toLowerCase().includes(legalArea.toLowerCase()) ||
      legalArea.toLowerCase().includes(exp.toLowerCase().split(' ')[0])
    )
  );

  const displayLawyers = matchedLawyers.length > 0 ? matchedLawyers : lawyers.slice(0, 3);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900 text-base">
          {matchedLawyers.length > 0 ? '✨ Matched Lawyers' : '👨‍⚖️ Available Lawyers'}
        </h4>
        <span className="text-xs sm:text-sm text-gray-500">
          {displayLawyers.length} {matchedLawyers.length > 0 ? 'specialists' : 'available'}
        </span>
      </div>

      {displayLawyers.map((lawyer) => (
        <div
          key={lawyer.id}
          onClick={() => onSelectLawyer(lawyer.id)}
          className={`
            p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-98
            ${selectedLawyer === lawyer.id
              ? 'border-blue-500 bg-blue-50 shadow-md'
              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 active:border-blue-400'
            }
          `}
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl flex-shrink-0">
              {lawyer.avatar}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h5 className="font-semibold text-gray-900 text-sm">{lawyer.username}</h5>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm font-medium text-gray-700">{lawyer.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {lawyer.expertise.slice(0, 2).map((exp, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs"
                  >
                    {exp}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <span>📊</span>
                  <span className="truncate">{lawyer.casesHandled} cases</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>⏱️</span>
                  <span className="truncate">{lawyer.responseTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      lawyer.availability === 'available'
                        ? 'bg-green-500 animate-pulse'
                        : lawyer.availability === 'busy'
                        ? 'bg-yellow-500'
                        : 'bg-gray-400'
                    }`}
                  />
                  <span className="text-xs text-gray-600 capitalize">{lawyer.availability}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    🗣️ {lawyer.languages.slice(0, 2).join(', ')}
                  </span>
                </div>
                {lawyer.hourlyRate && (
                  <span className="text-sm font-bold text-gray-900">
                    ${lawyer.hourlyRate}/hr
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-700">
          <strong>💡 Smart Matching:</strong> Our AI analyzes your case and recommends the best lawyers
          based on expertise, success rate, and availability.
        </p>
      </div>
    </div>
  );
};

export default LawyerMatcher;
