'use client';

import React, { useState } from 'react';

interface Props {
  getTryLink: () => string;
}

const CallToActionSection: React.FC<Props> = ({ getTryLink }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    catName: '',
    problem: ''
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
      setFormData({ email: '', name: '', catName: '', problem: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1000);
  };

  return (
    <section className="mt-16 mb-16">
      <div className="rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-1 shadow-2xl">
        <div className="bg-white rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🐱</div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Oscar's Inner Circle</h2>
              <p className="text-lg text-gray-600">
                Be among the first to receive Oscar's wisdom directly in your inbox. No spam, only enlightenment (and occasional judgment).
              </p>
            </div>

            {submitStatus === 'success' ? (
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-400 rounded-xl p-8 text-center">
                <div className="text-5xl mb-4">😺</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Oscar Approves</h3>
                <p className="text-gray-700 mb-6">
                  *slow blink of acceptance*
                  <br />
                  You have been judged worthy. Watch your inbox for wisdom.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Offer another soul to Oscar →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Human Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="Jane"
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
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Cat's Name (if blessed with one)
                  </label>
                  <input
                    type="text"
                    value={formData.catName}
                    onChange={(e) => setFormData({ ...formData, catName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="Sir Whiskers III"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    What brings you to Oscar? *
                  </label>
                  <select
                    required
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select your burden...</option>
                    <option value="work">Work is consuming my soul</option>
                    <option value="stress">Stress has become my personality</option>
                    <option value="life">Seeking meaning in the void</option>
                    <option value="rest">I have forgotten how to rest</option>
                    <option value="chaos">My life needs more controlled chaos</option>
                    <option value="cat-curious">I'm just curious about cats</option>
                    <option value="vibes">Here for the vibes</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="paw-cursor w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Oscar is considering...
                    </span>
                  ) : (
                    "Submit to Oscar's Wisdom"
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By joining, you consent to occasional wisdom and infrequent but judgmental emails. Oscar respects your privacy (but is always watching).
                </p>
              </form>
            )}

            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Want wisdom now? No waiting required.</p>
                <a
                  href={getTryLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paw-cursor inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-lg transition-all shadow-md"
                >
                  Chat with Oscar Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <p className="text-xs text-gray-500 mt-3">Free • No signup • Instant wisdom</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fun Stats */}
      <div className="mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-200 wisdom-card">
            <div className="text-2xl font-bold text-orange-600 mb-1">9</div>
            <div className="text-xs text-gray-600">Lives Lived</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-200 wisdom-card">
            <div className="text-2xl font-bold text-orange-600 mb-1">∞</div>
            <div className="text-xs text-gray-600">Wisdoms Available</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-200 wisdom-card">
            <div className="text-2xl font-bold text-orange-600 mb-1">18+</div>
            <div className="text-xs text-gray-600">Hours Daily Napping</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-200 wisdom-card">
            <div className="text-2xl font-bold text-orange-600 mb-1">100%</div>
            <div className="text-xs text-gray-600">Honest Judgment</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
