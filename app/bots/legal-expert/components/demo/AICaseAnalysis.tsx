'use client';

import React, { useState, useEffect } from 'react';
import { CaseIntake } from '../workspace/types';
import { LEGAL_AREAS } from '../workspace/constants';

interface AICaseAnalysisProps {
  intake: CaseIntake;
  onContinue: () => void;
  onBack: () => void;
}

interface AnalysisResult {
  summary: {
    type: string;
    jurisdiction: string;
    complexity: 'Low' | 'Medium' | 'High';
  };
  legalAssessment: {
    relevantLaws: string[];
    keyConsiderations: Array<{ text: string; type: 'success' | 'info' | 'warning' }>;
    successProbability: number;
  };
  expectations: {
    timeline: string;
    estimatedCost: string;
    requiredDocuments: string[];
    nextSteps: string[];
  };
  recommendations: string[];
}

const AICaseAnalysis: React.FC<AICaseAnalysisProps> = ({ intake: _intake, onContinue, onBack }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    // Simulate AI analysis with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          performAnalysis();
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const performAnalysis = () => {
    // Mock AI analysis based on intake data
    const legalAreaName = LEGAL_AREAS.find(a => a.id === intake.legalArea)?.name || intake.legalArea;
    const jurisdictionName = intake.jurisdiction.country === 'CH'
      ? 'Zürich, Switzerland'
      : 'California, United States';

    const mockAnalysis: AnalysisResult = {
      summary: {
        type: `${intake.caseType === 'personal' ? 'Personal' : 'Business'} - ${legalAreaName}`,
        jurisdiction: jurisdictionName,
        complexity: intake.description.length > 200 ? 'High' : intake.description.length > 100 ? 'Medium' : 'Low'
      },
      legalAssessment: {
        relevantLaws: getLaws(intake),
        keyConsiderations: getConsiderations(intake),
        successProbability: Math.floor(Math.random() * 20) + 75 // 75-95%
      },
      expectations: {
        timeline: getTimeline(intake),
        estimatedCost: getCost(intake),
        requiredDocuments: getDocuments(intake),
        nextSteps: getNextSteps(intake)
      },
      recommendations: getRecommendations(intake)
    };

    setTimeout(() => {
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 500);
  };

  const getLaws = (intake: CaseIntake): string[] => {
    // Focus on FEDERAL laws only - no local ordinances
    if (intake.jurisdiction.country === 'CH') {
      if (intake.legalArea === 'immigration') return ['Swiss Federal Act on Foreign Nationals (FNA)', 'Federal Ordinance on Admission (OASA)'];
      if (intake.legalArea === 'employment') return ['Swiss Federal Code of Obligations (CO Art. 319-362)', 'Federal Act on Work (ArG)'];
      if (intake.legalArea === 'real-estate') return ['Swiss Civil Code (ZGB - Federal)', 'Federal Act on Data Protection (FADP)'];
      if (intake.legalArea === 'family') return ['Swiss Civil Code (Family Law - ZGB)', 'Federal Act on Registered Partnerships'];
      if (intake.legalArea === 'business') return ['Swiss Code of Obligations (CO)', 'Federal Act on Unfair Competition'];
      return ['Swiss Civil Code (Federal)', 'Swiss Code of Obligations (Federal)'];
    } else {
      // US Federal + California State (no local ordinances)
      if (intake.legalArea === 'immigration') return ['Immigration and Nationality Act (INA - Federal)', 'California TRUTH Act'];
      if (intake.legalArea === 'employment') return ['Fair Labor Standards Act (FLSA - Federal)', 'California Labor Code'];
      if (intake.legalArea === 'real-estate') return ['Federal Fair Housing Act', 'California Civil Code (Property)'];
      if (intake.legalArea === 'family') return ['Uniform Parentage Act', 'California Family Code'];
      if (intake.legalArea === 'business') return ['Federal Securities Laws', 'California Corporations Code'];
      if (intake.legalArea === 'intellectual-property') return ['US Patent Act (Federal)', 'Lanham Act (Federal Trademark)'];
      return ['Relevant Federal Laws', 'California State Law'];
    }
  };

  const getConsiderations = (intake: CaseIntake) => {
    const base: Array<{ text: string; type: 'success' | 'info' }> = [
      { text: 'Case eligibility confirmed based on provided details', type: 'success' }
    ];

    if (intake.urgency === 'urgent') {
      base.push({ text: 'Expedited process may be available', type: 'info' });
    }

    if (!intake.files || intake.files.length === 0) {
      base.push({ text: 'Additional documentation will be required', type: 'info' });
    }

    return base;
  };

  const getTimeline = (intake: CaseIntake): string => {
    if (intake.legalArea === 'immigration') return '2-4 months';
    if (intake.legalArea === 'employment') return '4-8 weeks';
    if (intake.legalArea === 'real-estate') return '6-12 weeks';
    if (intake.legalArea === 'family') return '3-6 months';
    return '2-3 months';
  };

  const getCost = (intake: CaseIntake): string => {
    if (intake.jurisdiction.country === 'CH') {
      if (intake.budget === 'fixed') return 'CHF 2,000 - 4,000 (fixed fee)';
      if (intake.budget === 'hourly') return 'CHF 250-400/hour (est. 10-15 hours)';
      return 'CHF 500 (initial consultation)';
    } else {
      if (intake.budget === 'fixed') return '$3,000 - $6,000 (fixed fee)';
      if (intake.budget === 'hourly') return '$200-350/hour (est. 12-20 hours)';
      return '$300 (initial consultation)';
    }
  };

  const getDocuments = (intake: CaseIntake): string[] => {
    if (intake.legalArea === 'immigration') {
      return ['Valid passport', 'Employment contract', 'Proof of qualifications', 'Financial statements', 'Housing documentation'];
    }
    if (intake.legalArea === 'employment') {
      return ['Employment contract', 'Communication records', 'Performance reviews', 'Company policies', 'Termination letter (if applicable)'];
    }
    if (intake.legalArea === 'real-estate') {
      return ['Property deed', 'Purchase agreement', 'Inspection reports', 'Title insurance', 'Financial documents'];
    }
    return ['Identification documents', 'Relevant contracts', 'Supporting evidence', 'Financial records'];
  };

  const getNextSteps = (_intake: CaseIntake): string[] => {
    return [
      'Review and gather all required documentation',
      'Schedule consultation with matched lawyer',
      'Prepare detailed timeline and action plan'
    ];
  };

  const getRecommendations = (intake: CaseIntake): string[] => {
    const recs = ['Start gathering required documents now to expedite the process'];

    if (intake.urgency === 'urgent') {
      recs.push('Request expedited processing if available for your case type');
    }

    if (intake.caseType === 'business') {
      recs.push('Consider involving company legal counsel or compliance officer');
    }

    recs.push(`Consult with a ${LEGAL_AREAS.find(a => a.id === intake.legalArea)?.name.toLowerCase()} specialist`);

    return recs;
  };

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 mb-6">
              <div className="text-4xl animate-pulse">🤖</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Analyzing Your Case...</h3>
            <p className="text-gray-600">
              Reviewing jurisdiction-specific laws, analyzing case complexity, and preparing your personalized report
            </p>
          </div>

          <div className="mb-6">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">{progress}% complete</p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div className={`transition-opacity ${progress > 30 ? 'opacity-100' : 'opacity-30'}`}>
              ✓ Analyzing jurisdiction
            </div>
            <div className={`transition-opacity ${progress > 60 ? 'opacity-100' : 'opacity-30'}`}>
              ✓ Reviewing case law
            </div>
            <div className={`transition-opacity ${progress > 90 ? 'opacity-100' : 'opacity-30'}`}>
              ✓ Generating report
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="text-4xl">✨</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Analysis Complete!
            </h3>
            <p className="text-gray-700">
              Great news! Your case has strong merit. Here's your personalized AI analysis:
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Report */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <span>🤖</span> AI Case Analysis Report
          </h3>
        </div>

        <div className="p-8 space-y-8">
          {/* Case Summary */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📋</span> Case Summary
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Type</div>
                <div className="font-semibold text-gray-900">{analysis.summary.type}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Jurisdiction</div>
                <div className="font-semibold text-gray-900">{analysis.summary.jurisdiction}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Complexity</div>
                <div className={`font-semibold ${
                  analysis.summary.complexity === 'Low' ? 'text-green-600' :
                  analysis.summary.complexity === 'Medium' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {analysis.summary.complexity}
                </div>
              </div>
            </div>
          </div>

          {/* Legal Assessment */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>⚖️</span> Legal Assessment
            </h4>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">Relevant Laws:</div>
                <ul className="space-y-1">
                  {analysis.legalAssessment.relevantLaws.map((law, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{law}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">Key Considerations:</div>
                <div className="space-y-2">
                  {analysis.legalAssessment.keyConsiderations.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className={`mt-0.5 ${
                        item.type === 'success' ? 'text-green-600' :
                        item.type === 'warning' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`}>
                        {item.type === 'success' ? '✓' : item.type === 'warning' ? '⚠️' : 'ℹ️'}
                      </span>
                      <span className="text-sm text-gray-600">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <div className="text-sm font-semibold text-gray-700 mb-1">Success Probability:</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                      style={{ width: `${analysis.legalAssessment.successProbability}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    {analysis.legalAssessment.successProbability}%
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {analysis.legalAssessment.successProbability >= 80 ? 'High probability of favorable outcome' :
                   analysis.legalAssessment.successProbability >= 60 ? 'Good chances with proper legal representation' :
                   'Moderate probability, requires strategic approach'}
                </p>
              </div>
            </div>
          </div>

          {/* What to Expect */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📊</span> What to Expect
            </h4>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm font-semibold text-gray-700 mb-1">Timeline</div>
                <div className="text-lg font-bold text-blue-600">{analysis.expectations.timeline}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm font-semibold text-gray-700 mb-1">Estimated Cost</div>
                <div className="text-lg font-bold text-blue-600">{analysis.expectations.estimatedCost}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">Required Documents ({analysis.expectations.requiredDocuments.length}):</div>
                <ul className="space-y-1">
                  {analysis.expectations.requiredDocuments.map((doc, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">📄</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">Next Steps:</div>
                <ol className="space-y-1">
                  {analysis.expectations.nextSteps.map((step, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>💡</span> AI Recommendations
            </h4>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-white transition-colors"
            >
              ← Back
            </button>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
                Download PDF
              </button>
              <button
                onClick={onContinue}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-lg transition-all shadow-lg"
              >
                Find Perfect Lawyer →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Value Props */}
      <div className="grid md:grid-cols-3 gap-4 text-center">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl mb-2">✓</div>
          <div className="font-semibold text-gray-900 text-sm mb-1">Clear Understanding</div>
          <div className="text-xs text-gray-600">Know exactly what your case involves</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl mb-2">✓</div>
          <div className="font-semibold text-gray-900 text-sm mb-1">Realistic Expectations</div>
          <div className="text-xs text-gray-600">Timeline, costs, and outcomes explained</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl mb-2">✓</div>
          <div className="font-semibold text-gray-900 text-sm mb-1">Better Prepared</div>
          <div className="text-xs text-gray-600">Ready for lawyer consultation</div>
        </div>
      </div>
    </div>
  );
};

export default AICaseAnalysis;
