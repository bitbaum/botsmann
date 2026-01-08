'use client';

import React, { useState } from 'react';
import { CaseIntake } from '../workspace/types';
import { LEGAL_AREAS, JURISDICTIONS } from '../workspace/constants';

interface CaseIntakeFormProps {
  onSubmit: (intake: CaseIntake) => void;
  onCancel?: () => void;
}

const CaseIntakeForm: React.FC<CaseIntakeFormProps> = ({ onSubmit, onCancel }) => {
  const [intake, setIntake] = useState<CaseIntake>({
    caseType: 'personal',
    legalArea: 'immigration',
    description: '',
    jurisdiction: {
      country: 'CH',
      region: 'ZH' // Default to Zurich
    },
    urgency: 'standard',
    budget: 'consultation'
  });

  const canSubmit = intake.description.trim().length > 0;

  const handleSubmit = () => {
    if (canSubmit) {
      onSubmit(intake);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Describe Your Legal Case</h3>

      <div className="space-y-6">
        {/* Phase 1: Essential Fields (Always Visible) */}

        {/* Case Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Is this a personal or business matter?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setIntake({ ...intake, caseType: 'personal' })}
              className={`p-4 rounded-lg border-2 transition-all ${
                intake.caseType === 'personal'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="text-2xl mb-1">👤</div>
              <div className="text-sm font-medium text-gray-900">Personal</div>
              <div className="text-xs text-gray-600 mt-1">Individual matter</div>
            </button>
            <button
              type="button"
              onClick={() => setIntake({ ...intake, caseType: 'business' })}
              className={`p-4 rounded-lg border-2 transition-all ${
                intake.caseType === 'business'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="text-2xl mb-1">🏢</div>
              <div className="text-sm font-medium text-gray-900">Business</div>
              <div className="text-xs text-gray-600 mt-1">Company matter</div>
            </button>
          </div>
        </div>

        {/* Legal Area */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            What type of legal help do you need?
          </label>
          <select
            value={intake.legalArea}
            onChange={(e) => setIntake({ ...intake, legalArea: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
          >
            {LEGAL_AREAS.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name} - {area.description}
              </option>
            ))}
          </select>
        </div>

        {/* Case Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Describe your situation
          </label>
          <textarea
            value={intake.description}
            onChange={(e) => setIntake({ ...intake, description: e.target.value })}
            placeholder="Tell us about your legal situation. Include relevant dates, parties involved, and what you're seeking help with..."
            rows={6}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
          />
          {canSubmit && (
            <div className="mt-2">
              <span className="text-xs text-green-600 flex items-center gap-1">
                <span>✓</span> Ready to get AI analysis
              </span>
            </div>
          )}
        </div>

        {/* Jurisdiction, Urgency, Budget - Now immediately visible as next step */}
        <div className="space-y-6 pt-4 border-t border-gray-200">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-900 font-medium">
              📍 Next Step: Tell us about jurisdiction, timing, and budget
            </p>
            <p className="text-xs text-blue-700 mt-1">
              We're starting with Zürich (federal + cantonal law) and California. More jurisdictions coming soon!
            </p>
          </div>

          {/* Jurisdiction - Simplified MVP */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Where is this case located?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Zurich, Switzerland */}
              <button
                type="button"
                onClick={() =>
                  setIntake({
                    ...intake,
                    jurisdiction: { country: 'CH', region: 'ZH' }
                  })
                }
                className={`p-4 rounded-lg border-2 transition-all ${
                  intake.jurisdiction.country === 'CH'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-2xl mb-2">{JURISDICTIONS.CH.flag}</div>
                <div className="text-sm font-semibold text-gray-900 mb-1">
                  Zürich, Switzerland
                </div>
                <div className="text-xs text-gray-600">{JURISDICTIONS.CH.lawScope}</div>
              </button>

              {/* California, USA */}
              <button
                type="button"
                onClick={() =>
                  setIntake({
                    ...intake,
                    jurisdiction: { country: 'US', region: 'CA' }
                  })
                }
                className={`p-4 rounded-lg border-2 transition-all ${
                  intake.jurisdiction.country === 'US'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-2xl mb-2">{JURISDICTIONS.US.flag}</div>
                <div className="text-sm font-semibold text-gray-900 mb-1">
                  California, USA
                </div>
                <div className="text-xs text-gray-600">{JURISDICTIONS.US.lawScope}</div>
              </button>
            </div>

            {/* Request New Jurisdiction */}
            <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-lg">🌍</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">
                    Need a different location? We're expanding soon!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      // This would open a modal or redirect to request form
                      alert('Thank you! We\'ll prioritize your jurisdiction. Please email us at: support@botsmann.com');
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Request New Jurisdiction →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              How urgent is this matter?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIntake({ ...intake, urgency: 'standard' })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  intake.urgency === 'standard'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-sm font-medium text-gray-900">Standard</div>
                <div className="text-xs text-gray-600 mt-1">1-2 weeks is fine</div>
              </button>
              <button
                type="button"
                onClick={() => setIntake({ ...intake, urgency: 'urgent' })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  intake.urgency === 'urgent'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-sm font-medium text-gray-900">Urgent</div>
                <div className="text-xs text-gray-600 mt-1">Need help ASAP</div>
              </button>
            </div>
          </div>

          {/* Budget Preference */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Preferred billing arrangement?
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setIntake({ ...intake, budget: 'consultation' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  intake.budget === 'consultation'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-xs font-medium text-gray-900">Consultation</div>
                <div className="text-xs text-gray-600 mt-1">Start with advice</div>
              </button>
              <button
                type="button"
                onClick={() => setIntake({ ...intake, budget: 'hourly' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  intake.budget === 'hourly'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-xs font-medium text-gray-900">Hourly</div>
                <div className="text-xs text-gray-600 mt-1">Pay as you go</div>
              </button>
              <button
                type="button"
                onClick={() => setIntake({ ...intake, budget: 'fixed' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  intake.budget === 'fixed'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-xs font-medium text-gray-900">Fixed Fee</div>
                <div className="text-xs text-gray-600 mt-1">One price</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          Get AI Legal Analysis →
        </button>
      </div>
    </div>
  );
};

export default CaseIntakeForm;
