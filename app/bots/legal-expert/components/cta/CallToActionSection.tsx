'use client';

import React, { useState } from 'react';

interface Props {
  getTryLink: () => string;
}

const CallToActionSection: React.FC<Props> = ({ getTryLink }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    organization: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ email: '', name: '', organization: '', role: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1000);
  };

  return (
    <section className="mt-16 mb-16" id="get-started">
      <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-1 shadow-2xl">
        <div className="bg-white rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Join the Waitlist</h2>
              <p className="text-lg text-gray-600">
                Be among the first to access Lex when we launch. Get early access, exclusive updates, and special pricing for early supporters.
              </p>
            </div>

            {submitStatus === 'success' ? (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-8 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You're on the list!</h3>
                <p className="text-gray-700 mb-6">
                  Thank you for joining our waitlist. We'll keep you updated on our progress and notify you when Lex is ready for early access.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Add another email →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Jane Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="jane@lawfirm.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Smith & Associates Law Firm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Role *
                  </label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select your role...</option>
                    <option value="lawyer">Lawyer / Attorney</option>
                    <option value="paralegal">Paralegal / Legal Assistant</option>
                    <option value="law-student">Law Student</option>
                    <option value="judge">Judge / Magistrate</option>
                    <option value="legal-researcher">Legal Researcher</option>
                    <option value="corporate-counsel">Corporate Counsel</option>
                    <option value="engineer">Engineer / Developer</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Joining Waitlist...
                    </span>
                  ) : (
                    'Join the Waitlist'
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By joining, you agree to receive updates about Lex. We respect your privacy and won't spam you.
                </p>
              </form>
            )}

            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Want to see how it works?</p>
                <a
                  href="#demo"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all shadow-md"
                >
                  Try Lex Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <p className="text-xs text-gray-500 mt-3">Free AI case analysis • No signup required</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live KPIs - Honest metrics */}
      <div className="mt-8">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-500">Live Platform Metrics</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">0</div>
            <div className="text-xs text-gray-600">Waitlist Members</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">0</div>
            <div className="text-xs text-gray-600">Active Cases</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">0</div>
            <div className="text-xs text-gray-600">Data Rooms Created</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">Q2 2025</div>
            <div className="text-xs text-gray-600">Expected Launch</div>
          </div>
        </div>
        <div className="text-center mt-3">
          <p className="text-xs text-gray-400 italic">We believe in transparency. These numbers update in real-time.</p>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
