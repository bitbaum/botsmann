'use client';

import React, { useState } from 'react';

const DemoSection: React.FC = () => {
  const [jurisdiction, setJurisdiction] = useState('EU');
  const [legalArea, setLegalArea] = useState('data-privacy');
  const [issue, setIssue] = useState('gdpr-compliance');
  const [showResult, setShowResult] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const jurisdictions = [
    { code: 'EU', name: '🇪🇺 European Union', flag: '🇪🇺' },
    { code: 'US', name: '🇺🇸 United States', flag: '🇺🇸' },
    { code: 'UK', name: '🇬🇧 United Kingdom', flag: '🇬🇧' },
    { code: 'CH', name: '🇨🇭 Switzerland', flag: '🇨🇭' },
    { code: 'DE', name: '🇩🇪 Germany', flag: '🇩🇪' }
  ];

  const legalAreas = [
    { id: 'data-privacy', name: 'Data Privacy & GDPR', icon: '🔒' },
    { id: 'employment', name: 'Employment Law', icon: '👔' },
    { id: 'intellectual-property', name: 'Intellectual Property', icon: '💡' },
    { id: 'contract', name: 'Contract Law', icon: '📄' },
    { id: 'corporate', name: 'Corporate Law', icon: '🏢' },
    { id: 'consumer', name: 'Consumer Protection', icon: '🛡️' }
  ];

  const issues = {
    'data-privacy': [
      { id: 'gdpr-compliance', name: 'GDPR Compliance Check' },
      { id: 'data-breach', name: 'Data Breach Response' },
      { id: 'consent-management', name: 'Consent Management' },
      { id: 'cross-border-transfer', name: 'Cross-Border Data Transfer' }
    ],
    'employment': [
      { id: 'wrongful-termination', name: 'Wrongful Termination' },
      { id: 'discrimination', name: 'Workplace Discrimination' },
      { id: 'contract-dispute', name: 'Employment Contract Dispute' }
    ],
    'intellectual-property': [
      { id: 'trademark', name: 'Trademark Infringement' },
      { id: 'patent', name: 'Patent Application' },
      { id: 'copyright', name: 'Copyright Violation' }
    ],
    'contract': [
      { id: 'breach', name: 'Contract Breach' },
      { id: 'review', name: 'Contract Review' },
      { id: 'negotiation', name: 'Contract Negotiation' }
    ],
    'corporate': [
      { id: 'formation', name: 'Company Formation' },
      { id: 'merger', name: 'Merger & Acquisition' },
      { id: 'compliance', name: 'Corporate Compliance' }
    ],
    'consumer': [
      { id: 'refund', name: 'Refund Dispute' },
      { id: 'warranty', name: 'Warranty Claims' },
      { id: 'fraud', name: 'Consumer Fraud' }
    ]
  };

  const sampleResponse = `**Legal Analysis Complete** ✓

**Jurisdiction:** ${jurisdictions.find(j => j.code === jurisdiction)?.name}
**Area of Law:** ${legalAreas.find(a => a.id === legalArea)?.name}
**Issue:** ${issues[legalArea as keyof typeof issues]?.find(i => i.id === issue)?.name}

---

**🎯 Quick Summary**
Based on current ${jurisdiction} law and regulations, here's what you need to know:

**📋 Key Points:**
• This case falls under ${legalAreas.find(a => a.id === legalArea)?.name}
• Applicable jurisdiction: ${jurisdictions.find(j => j.code === jurisdiction)?.name}
• Estimated complexity: Medium
• Recommended approach: Documented below

**⚖️ Legal Framework:**
• Primary Legislation: [Relevant Act/Regulation]
• Recent Case Law: 3 precedents identified
• Compliance Requirements: Standard procedures apply

**📊 Case Strength Analysis:**
Success Probability: ████████░░ 78%
Based on: Recent precedents, jurisdiction trends, case specifics

**🔍 Recommended Actions:**
1. Gather documentation (contracts, communications, evidence)
2. Review compliance with ${jurisdiction} regulations
3. Consider alternative dispute resolution
4. If proceeding: File within statute of limitations

**👥 Collaboration Options:**
✓ Share case privately with your lawyer (encrypted)
✓ Request peer review from verified attorneys
✓ Open to public defenders (if you need pro-bono support)

**⏱️ Timeline:**
• Initial consultation: 1-2 days
• Document review: 3-5 days
• Resolution estimate: 2-6 weeks

**💡 Next Steps:**
Would you like to:
[ ] Share this case with a law firm
[ ] Request public defender assistance
[ ] Export analysis as PDF
[ ] Schedule video consultation`;

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 2000);
  };

  const handleReset = () => {
    setShowResult(false);
    setJurisdiction('EU');
    setLegalArea('data-privacy');
    setIssue('gdpr-compliance');
  };

  return (
    <section className="mb-20" id="demo">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-full text-sm font-medium mb-6">
          <span className="mr-2">💻</span>
          Interactive Demo
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience Lex</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Select your jurisdiction, legal area, and issue to see how Lex analyzes your case in seconds
        </p>
      </div>

      {!showResult ? (
        <div className="max-w-4xl mx-auto">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tell Us About Your Case</h3>

            <div className="space-y-6">
              {/* Jurisdiction Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  1. Select Jurisdiction
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {jurisdictions.map((j) => (
                    <button
                      key={j.code}
                      onClick={() => setJurisdiction(j.code)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        jurisdiction === j.code
                          ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-3xl mb-1">{j.flag}</div>
                      <div className="text-xs font-medium text-gray-700">{j.code}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Legal Area Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  2. Choose Area of Law
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {legalAreas.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => {
                        setLegalArea(area.id);
                        setIssue(issues[area.id as keyof typeof issues][0].id);
                      }}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        legalArea === area.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{area.icon}</div>
                      <div className="text-sm font-medium text-gray-900">{area.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Issue Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  3. Specify Your Issue
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {issues[legalArea as keyof typeof issues]?.map((iss) => (
                    <button
                      key={iss.id}
                      onClick={() => setIssue(iss.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        issue === iss.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{iss.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Analyze Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Analyzing your case...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      ⚖️ Analyze My Case
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            ⚡ Analysis typically takes 2-5 seconds • 100% Private • No data stored
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          {/* Results Display */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 border-b border-slate-600 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-slate-300 text-sm font-mono">Lex Analysis Report</span>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Try Another Case
              </button>
            </div>

            <div className="p-8">
              <div className="bg-gradient-to-br from-slate-800 to-slate-750 rounded-lg p-6 border border-slate-600 shadow-xl">
                <div className="prose prose-invert max-w-none">
                  <pre className="text-slate-100 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                    {sampleResponse}
                  </pre>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Analysis completed in 2.1s
                  </span>
                  <span>•</span>
                  <span>Sources: 12 cases, 3 statutes, 5 articles</span>
                </div>
                <div className="flex gap-3">
                  <button className="hover:text-blue-400 transition-colors">📥 Export PDF</button>
                  <button className="hover:text-blue-400 transition-colors">📤 Share</button>
                </div>
              </div>
            </div>
          </div>

          {/* Collaboration Options */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-blue-300 transition-all">
              <div className="text-3xl mb-3">🏢</div>
              <h4 className="font-bold text-gray-900 mb-2">Share with Law Firm</h4>
              <p className="text-sm text-gray-600 mb-4">Securely transfer case to verified attorneys. End-to-end encrypted.</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Select Firm →
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-blue-300 transition-all">
              <div className="text-3xl mb-3">🤝</div>
              <h4 className="font-bold text-gray-900 mb-2">Open to Public Defenders</h4>
              <p className="text-sm text-gray-600 mb-4">Get pro-bono support from verified attorneys willing to help.</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Request Help →
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-blue-300 transition-all">
              <div className="text-3xl mb-3">🔒</div>
              <h4 className="font-bold text-gray-900 mb-2">Keep Private</h4>
              <p className="text-sm text-gray-600 mb-4">Run on your own hardware. Complete privacy and data sovereignty.</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Deploy Locally →
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl p-8 border border-blue-100">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Democratizing Access to Justice</h3>
          <p className="text-gray-700 mb-4">
            Whether you're a solo client, working with a law firm, or need public support—Lex adapts to your needs.
            Transfer cases seamlessly, maintain total privacy with self-hosted deployment, or open your case to verified
            public defenders who can step in and help.
          </p>
          <p className="text-sm text-gray-600">
            ⚡ Instant analysis • 🔒 Total privacy • 🤝 Community-powered defense
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
