'use client';

import React, { useState } from 'react';

const TechSection: React.FC = () => {
  const [feedbackType, setFeedbackType] = useState<'general' | 'technical'>('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    feedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const techStack = [
    {
      category: 'AI & ML',
      technologies: [
        { name: 'Large Language Models', description: 'Claude, GPT-4, custom fine-tuned models', icon: '🤖' },
        { name: 'Vector Databases', description: 'Pinecone, Weaviate for semantic search', icon: '🔍' },
        { name: 'RAG Architecture', description: 'Retrieval-Augmented Generation for accuracy', icon: '📚' }
      ]
    },
    {
      category: 'Legal Data',
      technologies: [
        { name: 'Case Law APIs', description: 'Integration with legal databases', icon: '⚖️' },
        { name: 'Document Processing', description: 'OCR, NLP for contract analysis', icon: '📄' },
        { name: 'Knowledge Graphs', description: 'Structured legal relationships', icon: '🕸️' }
      ]
    },
    {
      category: 'Privacy & Security',
      technologies: [
        { name: 'End-to-End Encryption', description: 'Zero-knowledge architecture', icon: '🔒' },
        { name: 'On-Premise Deployment', description: 'Self-hosted for sensitive data', icon: '🏢' },
        { name: 'GDPR Compliance', description: 'Privacy-first by design', icon: '✅' }
      ]
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', role: '', feedback: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1000);
  };

  return (
    <section className="mb-20" id="technology">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium mb-6">
          <span className="mr-2">⚙️</span>
          Technology & Architecture
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Built on Cutting-Edge AI</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We combine state-of-the-art language models with legal domain expertise and privacy-first architecture
        </p>
      </div>

      {/* Tech Stack */}
      <div className="mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {techStack.map((stack, index) => (
            <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{stack.category}</h3>
              <div className="space-y-4">
                {stack.technologies.map((tech, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{tech.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{tech.name}</h4>
                        <p className="text-xs text-gray-600">{tech.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="mb-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">System Architecture</h3>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-6 mb-3 border-2 border-blue-300">
                <div className="text-3xl mb-2">💬</div>
                <h4 className="font-semibold text-gray-900">User Interface</h4>
                <p className="text-xs text-gray-600 mt-2">Chat, Document Upload, Dashboard</p>
              </div>
              <div className="text-sm text-gray-500">↓</div>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-lg p-6 mb-3 border-2 border-purple-300">
                <div className="text-3xl mb-2">🧠</div>
                <h4 className="font-semibold text-gray-900">AI Engine</h4>
                <p className="text-xs text-gray-600 mt-2">LLM, RAG, Reasoning Layer</p>
              </div>
              <div className="text-sm text-gray-500">↓</div>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-6 mb-3 border-2 border-green-300">
                <div className="text-3xl mb-2">📚</div>
                <h4 className="font-semibold text-gray-900">Legal Data</h4>
                <p className="text-xs text-gray-600 mt-2">Case Law, Statutes, Documents</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-slate-50 rounded-lg p-6 border border-slate-200">
            <h4 className="font-semibold text-gray-900 mb-3 text-center">Key Principles</h4>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700"><strong>Modular:</strong> Easy to update and improve</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700"><strong>Scalable:</strong> From single user to enterprise</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700"><strong>Private:</strong> Your data never leaves your infrastructure</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700"><strong>Auditable:</strong> Transparent reasoning and sources</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-3 text-center">We Want Your Feedback</h3>
          <p className="text-slate-300 text-center mb-8">
            Help us build better. Share your thoughts on our approach, tech stack, or general feedback.
          </p>

          <div className="flex gap-4 mb-6 justify-center">
            <button
              onClick={() => setFeedbackType('general')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                feedbackType === 'general'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              General Feedback
            </button>
            <button
              onClick={() => setFeedbackType('technical')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                feedbackType === 'technical'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Technical Feedback
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Role / Expertise</label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Software Engineer, Legal Professional, Researcher"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                {feedbackType === 'technical' ? 'Technical Feedback' : 'Your Feedback'}
              </label>
              <textarea
                required
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder={
                  feedbackType === 'technical'
                    ? 'Share your thoughts on our tech stack, architecture, or technical approach...'
                    : 'Share your thoughts, suggestions, or questions...'
                }
              />
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg">
                ✓ Thank you! Your feedback has been received.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TechSection;
