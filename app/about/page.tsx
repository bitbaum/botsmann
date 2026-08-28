import React from 'react';
import Link from 'next/link';
import { professionals } from '@/data/professionals';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-action-tint">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-ink">Expert Advice for Everyone</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
          Botsmann brings AI-powered professionals to your fingertips. Get guidance from specialized
          advisors in law, health, research, language, art, and business - available 24/7,
          completely private, at a fraction of traditional costs.
        </p>
      </section>

      {/* The Problem We Solve */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">The Problem We Solve</h2>
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <p className="text-lg text-gray-600 mb-6">
            Expert advice has always been a privilege. Consulting a lawyer costs hundreds per hour.
            Seeing a specialist takes weeks of waiting. Financial advisors serve only those with
            significant assets. This creates a world where quality guidance is available only to
            those who can afford it.
          </p>
          <p className="text-lg text-gray-600">
            <strong className="text-gray-900">
              We believe everyone deserves access to expert knowledge.
            </strong>{' '}
            Whether you need help understanding a contract, making sense of medical results, or
            planning your business strategy - you should have a knowledgeable advisor at your side.
          </p>
        </div>
      </section>

      {/* Our AI Professionals */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Our AI Professionals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Each Botsmann professional is specialized in their domain, trained to provide thoughtful,
          accurate guidance while respecting their limitations.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {professionals.map((pro) => (
            <Link
              key={pro.slug}
              href={`/professionals/${pro.slug}`}
              className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{pro.emoji}</span>
                <span className="font-bold text-gray-900">{pro.name}</span>
              </div>
              <p className="text-sm text-gray-600">{pro.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Privacy First */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Privacy First</h2>
        <div className="bg-action-tint rounded-2xl p-8 border border-edge">
          <p className="text-lg text-gray-700 mb-6">
            Your conversations with our AI professionals are private. We do not use your data to
            train models. We do not share your information with third parties. Your health
            questions, legal concerns, and business plans remain yours.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                &#10003;
              </span>
              <span className="text-gray-700">End-to-end encryption for all conversations</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                &#10003;
              </span>
              <span className="text-gray-700">Your data is never used for model training</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                &#10003;
              </span>
              <span className="text-gray-700">
                On-premises deployment available for enterprises
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* The Future: Embodied AI */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">The Future: Embodied AI</h2>
        <div className="bg-action-tint rounded-2xl p-8 border border-edge">
          <p className="text-lg text-gray-700 mb-6">
            We envision a future where AI professionals are not just on your screen but present in
            your world. Imagine a health advisor that monitors your wellbeing through wearables. A
            language coach that practices with you in real-time. A business strategist that joins
            your meetings.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong className="text-gray-900">Embodied AI is a core part of our vision.</strong> We
            are working with leading hardware and robotics companies to bring AI professionals into
            the physical world - as companions, assistants, and trusted advisors that can see, hear,
            and interact with your environment.
          </p>
          <p className="text-lg text-gray-700">
            This is not science fiction. It is the next step in making expert guidance truly
            accessible - wherever you are, whenever you need it.
          </p>
        </div>
      </section>

      {/* For Enterprises */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">For Enterprises</h2>
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <p className="text-lg text-gray-600 mb-6">
            Law firms, medical practices, research institutions, and businesses can deploy Botsmann
            professionals for their teams with enterprise-grade security and compliance.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3">
              <span className="text-action">&#10140;</span>
              <span className="text-gray-700">On-premises deployment options</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-action">&#10140;</span>
              <span className="text-gray-700">SSO and team management</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-action">&#10140;</span>
              <span className="text-gray-700">HIPAA and GDPR compliance</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-action">&#10140;</span>
              <span className="text-gray-700">Custom training on your knowledge base</span>
            </li>
          </ul>
          <Link
            href="/enterprise"
            className="inline-flex items-center gap-2 bg-action text-white px-6 py-3 rounded-xl font-semibold hover:bg-action-hover transition-colors"
          >
            Learn About Enterprise
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-action rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Meet Your AI Professional?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Start a conversation with any of our specialists. No credit card required.
          </p>
          <Link
            href="/professionals"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Browse All Professionals
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
