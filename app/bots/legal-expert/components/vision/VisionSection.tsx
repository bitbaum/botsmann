'use client';

import React from 'react';

const VisionSection: React.FC = () => {
  const roadmapPhases = [
    {
      phase: 'Phase 1',
      title: 'AI Legal Assistant',
      status: 'In Development',
      timeline: '2025',
      description: 'Lex assists lawyers with research, document analysis, and compliance checking',
      features: [
        'Legal research and case law analysis',
        'Contract review and risk assessment',
        'Regulatory compliance checking',
        'Document drafting assistance'
      ],
      icon: '⚖️',
      color: 'from-blue-500 to-cyan-500',
      statusColor: 'bg-blue-100 text-blue-700'
    },
    {
      phase: 'Phase 2',
      title: 'AI Legal Advisor',
      status: 'Research',
      timeline: '2026-2027',
      description: 'Advanced reasoning for legal strategy, case evaluation, and predictive analytics',
      features: [
        'Case outcome prediction',
        'Legal strategy recommendations',
        'Multi-jurisdictional analysis',
        'Expert witness support'
      ],
      icon: '🎯',
      color: 'from-purple-500 to-pink-500',
      statusColor: 'bg-purple-100 text-purple-700'
    },
    {
      phase: 'Phase 3',
      title: 'AI Judge',
      status: 'Vision',
      timeline: '2028+',
      description: 'Impartial adjudication for specific case types, with human oversight',
      features: [
        'Small claims adjudication',
        'Dispute resolution assistance',
        'Precedent-based ruling suggestions',
        'Bias detection and fairness analysis'
      ],
      icon: '⚖️',
      color: 'from-amber-500 to-orange-500',
      statusColor: 'bg-amber-100 text-amber-700'
    }
  ];

  return (
    <section className="mb-20" id="vision">
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium mb-6">
          <span className="mr-2">🚀</span>
          Our Vision
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">From Legal Assistant to AI Judge</h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          We're on a multi-year journey to transform legal services through AI. We believe in building responsibly,
          transparently, and with the legal community—not against it.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="mb-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 text-white shadow-2xl border border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-6 text-center">Our Mission</h3>
          <p className="text-lg leading-relaxed text-slate-100 mb-6">
            To democratize access to justice through AI while enhancing—not replacing—the expertise of legal professionals.
            We're building a future where AI handles routine legal tasks, freeing lawyers to focus on complex reasoning,
            client relationships, and strategic thinking.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-600">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-semibold mb-2">Transparent</h4>
              <p className="text-sm text-slate-300">Open about capabilities, limitations, and development progress</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-600">
              <div className="text-3xl mb-3">🤝</div>
              <h4 className="font-semibold mb-2">Collaborative</h4>
              <p className="text-sm text-slate-300">Built with input from legal professionals and researchers</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-600">
              <div className="text-3xl mb-3">🔒</div>
              <h4 className="font-semibold mb-2">Responsible</h4>
              <p className="text-sm text-slate-300">Privacy-first, bias-aware, and human-overseen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div>
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Development Roadmap</h3>
        <div className="space-y-8">
          {roadmapPhases.map((phase, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < roadmapPhases.length - 1 && (
                <div className="hidden md:block absolute left-12 top-24 w-1 h-16 bg-gradient-to-b from-gray-300 to-gray-200"></div>
              )}

              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
                <div className="md:flex">
                  {/* Icon Section */}
                  <div className={`md:w-24 bg-gradient-to-br ${phase.color} p-8 flex items-center justify-center`}>
                    <span className="text-5xl">{phase.icon}</span>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-semibold text-gray-500">{phase.phase}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${phase.statusColor}`}>
                            {phase.status}
                          </span>
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900">{phase.title}</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Timeline</div>
                        <div className="text-lg font-semibold text-gray-900">{phase.timeline}</div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6">{phase.description}</p>

                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Key Capabilities:</h5>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {phase.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why This Matters */}
      <div className="mt-16 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-10 border border-blue-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why This Vision Matters</h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Access to Justice
            </h4>
            <p className="text-gray-700 text-sm">
              Legal services are expensive and inaccessible to many. AI can help democratize legal assistance,
              making basic legal help available to everyone while keeping lawyers focused on complex cases.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              Enhanced Expertise
            </h4>
            <p className="text-gray-700 text-sm">
              Lawyers spend 30-40% of their time on routine tasks. AI assistance can free them to focus on
              strategy, negotiation, and client relationships—the truly human aspects of law.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚖️</span>
              Consistency & Fairness
            </h4>
            <p className="text-gray-700 text-sm">
              AI judges can help reduce bias and inconsistency in routine decisions, while humans maintain
              oversight for complex judgments requiring empathy and discretion.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🔬</span>
              Evidence-Based Law
            </h4>
            <p className="text-gray-700 text-sm">
              AI can analyze thousands of precedents instantly, ensuring decisions are grounded in
              comprehensive legal research rather than limited recall or availability bias.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
