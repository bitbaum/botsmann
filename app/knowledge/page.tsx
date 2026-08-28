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
    question: 'What is Botsmann and how can it help my business?',
    answer:
      'Botsmann is an AI bot platform that provides specialized intelligent assistants for various domains including legal, medical, research, and language learning. We help businesses automate tasks, provide 24/7 customer support, and enhance productivity through custom AI solutions tailored to your specific industry needs.',
  },
  {
    category: 'Getting Started',
    question: 'Do I need technical expertise to use Botsmann bots?',
    answer:
      'No technical expertise is required to use our pre-built bots. Simply choose the bot that fits your needs and start interacting through natural conversation. For custom bot development or integrations, our consulting team can handle the technical aspects while you focus on your business goals.',
  },
  {
    category: 'Getting Started',
    question: 'How do I get started with a Botsmann bot?',
    answer:
      'Getting started is simple: 1) Browse our collection of specialized bots, 2) Select one that matches your needs, 3) Start interacting through natural language conversation. For enterprise solutions or custom bots, contact our consulting team for a personalized demo and implementation plan.',
  },
  // Building AI Bots
  {
    category: 'Building AI Bots',
    question: 'What technologies do you use to build AI bots?',
    answer:
      'We leverage cutting-edge AI technologies including large language models (LLMs) like GPT-4 and Claude, combined with custom fine-tuning, retrieval-augmented generation (RAG), and domain-specific knowledge bases. Our tech stack includes Next.js, TypeScript, and various AI/ML frameworks for robust, scalable solutions.',
  },
  {
    category: 'Building AI Bots',
    question: 'Can you build a custom bot for my specific industry?',
    answer:
      'Absolutely! Our consulting team specializes in building custom AI bots for any industry. We analyze your workflows, understand your unique requirements, and develop tailored solutions. From healthcare compliance to financial advisory, we have experience across diverse sectors.',
  },
  {
    category: 'Building AI Bots',
    question: 'How long does it take to develop a custom AI bot?',
    answer:
      'Development timelines vary based on complexity. Simple chatbots can be deployed in 2-4 weeks, while sophisticated enterprise solutions with custom integrations typically take 2-3 months. We provide detailed project timelines during our initial consultation.',
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
    question: 'Can Botsmann bots integrate with my existing systems?',
    answer:
      'Yes, our bots are designed for seamless integration. We support connections with CRMs (Salesforce, HubSpot), communication platforms (Slack, Teams, WhatsApp), helpdesk systems (Zendesk, Freshdesk), and custom APIs. Our team handles the technical integration process.',
  },
  {
    category: 'Integration & Deployment',
    question: 'What deployment options are available?',
    answer:
      'We offer flexible deployment options: cloud-hosted (managed by us), on-premise (for sensitive data requirements), and hybrid solutions. All deployments include monitoring, maintenance, and regular updates to ensure optimal performance.',
  },
  {
    category: 'Integration & Deployment',
    question: 'Is my data secure with Botsmann?',
    answer:
      'Security is our top priority. We implement enterprise-grade encryption, SOC 2 compliance standards, GDPR-compliant data handling, and offer data residency options. For sensitive industries, we provide on-premise deployment with complete data isolation.',
  },
  // Pricing & Support
  {
    category: 'Pricing & Support',
    question: 'How much does it cost to build a custom AI bot?',
    answer:
      'Pricing depends on complexity, integrations, and support requirements. We offer three tiers: Starter (pre-built bots), Professional (customized solutions), and Enterprise (full custom development with dedicated support). Contact us for a detailed quote based on your specific needs.',
  },
  {
    category: 'Pricing & Support',
    question: 'What kind of support do you provide?',
    answer:
      'We provide comprehensive support including: documentation and guides (free), email support (all tiers), priority support with SLAs (Professional+), and dedicated success managers (Enterprise). Our consulting packages also include training sessions for your team.',
  },
  {
    category: 'Pricing & Support',
    question: 'Do you offer training for our team?',
    answer:
      'Yes! Our consulting packages include training sessions covering bot management, conversation design best practices, and basic troubleshooting. We also provide documentation and video tutorials to help your team get the most out of your AI solution.',
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
    readTime: '25 min',
    icon: '📚',
    href: '/knowledge/guides/rag-implementation',
  },
  {
    title: 'Designing Effective Conversation Flows',
    description:
      'Best practices for designing intuitive, helpful conversation flows that delight users.',
    category: 'Beginner',
    readTime: '12 min',
    icon: '💬',
    href: '/knowledge/guides/conversation-design',
  },
  {
    title: 'Integrating AI Bots with Slack & Teams',
    description:
      'Step-by-step guide to deploying your AI assistant in popular workplace communication tools.',
    category: 'Intermediate',
    readTime: '20 min',
    icon: '🔗',
    href: '/knowledge/guides/slack-teams-integration',
  },
  {
    title: 'AI Bot Security Best Practices',
    description:
      'Ensure your AI bot implementation follows security best practices and compliance requirements.',
    category: 'Advanced',
    readTime: '30 min',
    icon: '🔒',
    href: '/knowledge/guides/security-best-practices',
  },
  {
    title: 'Measuring AI Bot Performance',
    description:
      'Key metrics and analytics to track the success and ROI of your AI bot implementation.',
    category: 'Intermediate',
    readTime: '18 min',
    icon: '📊',
    href: '/knowledge/guides/measuring-performance',
  },
];

const categories = [
  'All',
  'Getting Started',
  'Building AI Bots',
  'Integration & Deployment',
  'Pricing & Support',
];

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
            and answers to help you succeed with or without our consulting services.
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
              More guides coming soon. Have a topic request?{' '}
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
              Quick answers to common questions about AI bots, our platform, and consulting
              services.
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
            Our team is here to help. Whether you want to build it yourself or need expert
            assistance, we're happy to guide you in the right direction.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-action-hover text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Talk to an Expert</span>
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
