'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useState } from 'react';

interface Guide {
  title: string;
  description: string;
  category: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  icon: string;
  href: string;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Getting Started
  {
    category: 'Getting Started',
    question: 'What is Botsmann?',
    answer:
      'Botsmann is a set of AI professionals, each specialised in one domain: legal, health, research, language, art, and business. You chat with them, and you can upload your own documents so their answers draw on what you gave them.',
  },
  {
    category: 'Getting Started',
    question: 'Do I need technical expertise to use Botsmann?',
    answer:
      'No. Choose a professional and start a conversation in plain language. Uploading documents or building your own professional takes a few clicks, no code.',
  },
  // Building AI Bots
  {
    category: 'Building AI Bots',
    question: 'Which AI models answer my questions?',
    answer:
      'Models served through Groq and OpenRouter, or a local Ollama model when one is running. If one model fails, the next one in the chain answers. You can also bring your own provider key in Settings.',
  },
  {
    category: 'Building AI Bots',
    question: 'Can I build my own professional?',
    answer:
      'Yes. The builder lets you set a personality, write its instructions, and give it its own knowledge from text you upload.',
  },
  {
    category: 'Building AI Bots',
    question: 'What is RAG and why is it important for AI bots?',
    answer:
      'RAG (Retrieval-Augmented Generation) combines the power of large language models with your specific knowledge base. This ensures your bot provides accurate, up-to-date information from your documents, databases, and proprietary content rather than generic responses.',
  },
  // Integration & Deployment
  {
    category: 'Integration & Deployment',
    question: 'Can I run Botsmann on my own servers?',
    answer:
      'Yes. Botsmann is MIT-licensed and its source is on GitHub, so you can self-host it with your own database and model providers, and your data stays on your network.',
  },
  {
    category: 'Integration & Deployment',
    question: 'Is my data secure with Botsmann?',
    answer:
      'Your documents and conversations are protected by row-level security in the database, so only your account can read them. API keys you save are sealed at rest. Botsmann does not train models on your data.',
  },
];

const guides: Guide[] = [
  {
    title: 'Building Your First AI Chatbot',
    description:
      'A comprehensive guide to creating a basic AI chatbot from scratch using modern tools and best practices.',
    category: 'Beginner',
    readTime: '15 min',
    icon: '🤖',
    href: '/knowledge/guides/first-chatbot',
  },
  {
    title: 'Implementing RAG for Custom Knowledge',
    description:
      'Learn how to enhance your AI bot with retrieval-augmented generation for domain-specific accuracy.',
    category: 'Intermediate',
    readTime: '30 min',
    icon: '📚',
    href: '/knowledge/guides/rag-implementation',
  },
  {
    title: 'Building a Slack Bot with AI',
    description:
      'Create an AI-powered Slack bot that can answer questions, summarize threads, and automate workflows.',
    category: 'Intermediate',
    readTime: '25 min',
    icon: '🔗',
    href: '/knowledge/guides/slack-integration',
  },
];

const categories = ['All', 'Getting Started', 'Building AI Bots', 'Integration & Deployment'];

export default function KnowledgeCenterPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const filteredFAQs =
    activeCategory === 'All' ? faqData : faqData.filter((faq) => faq.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400 to-action-hover rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <main className="relative max-w-screen-xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>📖</span>
            <span>Free Resources</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-ink">Knowledge</span>
            <span className="text-ink"> Center</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Everything you need to understand, build, and deploy AI bots. Free guides, tutorials,
            and answers to help you succeed.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#guides"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-action-hover text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Browse Guides</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
            <a
              href="#faq"
              className="inline-flex items-center gap-2 border-2 border-emerald-300 text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:border-emerald-500 transition-colors"
            >
              <span>View FAQ</span>
            </a>
          </div>
        </section>

        {/* Guides Section */}
        <section id="guides" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-ink">Step-by-Step</span>
              <span className="text-ink"> Guides</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Practical tutorials to help you build and deploy AI bots yourself. From beginner to
              advanced.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <Link
                key={index}
                href={guide.href as Route}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{guide.icon}</span>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      guide.category === 'Beginner'
                        ? 'bg-green-100 text-green-700'
                        : guide.category === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {guide.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{guide.readTime} read</span>
                  <span className="text-emerald-600 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read guide
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              <Link href="/knowledge/guides" className="text-emerald-600 hover:underline">
                Browse all guides
              </Link>
              . Have a topic request?{' '}
              <Link href="/contact" className="text-emerald-600 hover:underline">
                Let us know
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-ink">Frequently Asked</span>
              <span className="text-ink"> Questions</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about AI bots and Botsmann.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-xs font-medium text-emerald-600 mb-1 block">
                      {faq.category}
                    </span>
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-br from-emerald-50 to-action-tint rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Write to us. Whether you want to build it yourself or run Botsmann for your team, we're
            happy to point you in the right direction.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-action-hover text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Contact Us</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 border-2 border-emerald-300 text-emerald-700 px-8 py-4 rounded-xl font-semibold hover:border-emerald-500 transition-colors"
            >
              <span>Read Our Blog</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
