import React from 'react';
import ConsultationForm from '@/components/ConsultationForm';
import { NextSection } from '@/src/components/navigation/NextSection';

export default function About() {
  return (
    <div className="mx-auto max-w-prose px-6 py-12">
      <h1 className="mb-8 text-4xl font-semibold tracking-tight">About Botsmann</h1>
      
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">What is Botsmann?</h2>
        <p className="mb-6 text-lg text-gray-600">
          Botsmann is a <strong>platform for building domain-specific AI assistants</strong> for professional and personal use. We're developing specialized bots for legal, medical, research, education, creative arts, and business domains—each with custom workflows, knowledge bases, and integrations that generic chatbots can't match.
        </p>
        <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
          <p className="text-sm text-gray-700">
            <strong>Current Status:</strong> Proof of concept with interactive UI demos. Full AI implementation (vector search, embeddings, RAG pipelines) is under active development with target completion Q2-Q3 2026.
          </p>
        </div>
        <div className="mb-6 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">Our Bots</h3>
          <ul className="space-y-2 text-gray-700">
            <li><strong>⚖️ Lex</strong> – AI legal assistant with jurisdiction-specific expertise</li>
            <li><strong>⚕️ Imhotep</strong> – Medical information and wellness guidance</li>
            <li><strong>🧠 Nerd</strong> – Research automation and academic support</li>
            <li><strong>🇨🇭 Heidi</strong> – Swiss German language and cultural integration</li>
            <li><strong>🎨 Artr</strong> – Artistic guidance and creative exploration</li>
            <li><strong>🔱 Trident</strong> – Product management and technical documentation</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Our Technology</h2>
        <p className="mb-6 text-lg text-gray-600">
          We're building on cutting-edge AI and modern web technologies:
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="mb-2 font-semibold text-gray-900">AI & ML <span className="text-xs text-blue-600">(Planned)</span></h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• OpenAI GPT-4 API integration</li>
              <li>• RAG pipelines with vector search</li>
              <li>• Domain-specific embeddings (text-embedding-3)</li>
              <li>• Specialized knowledge bases per bot</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="mb-2 font-semibold text-gray-900">Platform</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Next.js 14 with TypeScript</li>
              <li>• MongoDB for flexible data storage</li>
              <li>• Vercel edge deployment (global CDN)</li>
              <li>• Docker containerization</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="mb-2 font-semibold text-gray-900">Security <span className="text-xs text-blue-600">(Planned)</span></h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• GDPR & HIPAA-aligned privacy design</li>
              <li>• End-to-end encryption for sensitive data</li>
              <li>• Automated security scanning (Gitleaks, Trivy)</li>
              <li>• SOC 2 compliance (for enterprise)</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="mb-2 font-semibold text-gray-900">Design</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Mobile-first responsive design</li>
              <li>• WCAG 2.1 AA accessibility</li>
              <li>• Tailwind CSS for styling</li>
              <li>• Domain-specific UI/UX per bot</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Our Philosophy</h2>
        <p className="mb-6 text-lg text-gray-600">
          We believe in the transformative power of <strong>transparency</strong> and <strong>automation</strong>. Our projects are driven by
          three core principles: making processes transparent, automating redundant tasks, and empowering
          individuals through technology.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 text-3xl">🔍</div>
            <h3 className="mb-2 font-semibold">Transparency</h3>
            <p className="text-sm text-gray-600">Every AI decision is traceable and explainable</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl">⚡</div>
            <h3 className="mb-2 font-semibold">Automation</h3>
            <p className="text-sm text-gray-600">Free people from repetitive, complex tasks</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl">🎯</div>
            <h3 className="mb-2 font-semibold">Specialization</h3>
            <p className="text-sm text-gray-600">Deep domain expertise, not generic AI</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Our Mission</h2>
        <p className="mb-6 text-lg text-gray-600">
          We aim to <strong>democratize access to expert-level assistance</strong> by making specialized AI accessible to everyone.
          Whether you need legal guidance, medical information, research support, or language learning—our bots provide
          professional-grade intelligence without the traditional barriers of cost, availability, or location.
        </p>
        <p className="text-lg text-gray-600">
          Unlike wrapping ChatGPT in a UI, we're building bots with:
        </p>
        <ul className="ml-6 mt-3 list-disc space-y-2 text-gray-600">
          <li><strong>Domain-specific knowledge bases</strong> – Curated, verified information per domain</li>
          <li><strong>Custom workflows and UIs</strong> – Tailored to each profession's needs</li>
          <li><strong>Specialized integrations</strong> – Industry-specific tools and data sources</li>
          <li><strong>Compliance and safety</strong> – HIPAA, GDPR, domain-specific regulations</li>
        </ul>
        <p className="text-sm text-gray-500 mt-4 italic">
          See each bot's README for detailed technical implementation plans.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Why Choose Botsmann?</h2>
        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
            <h3 className="mb-1 font-semibold text-gray-900">Not Just Another Chatbot</h3>
            <p className="text-gray-700">Each bot is a specialized expert in its domain, with curated knowledge and tailored workflows that generic AI can't match.</p>
          </div>
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
            <h3 className="mb-1 font-semibold text-gray-900">Built for Professionals</h3>
            <p className="text-gray-700">From lawyers to doctors, researchers to language learners—our bots understand the nuances and requirements of your field.</p>
          </div>
          <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 p-4">
            <h3 className="mb-1 font-semibold text-gray-900">Constantly Evolving</h3>
            <p className="text-gray-700">We update our bots with the latest domain knowledge, regulations, and best practices to keep you current.</p>
          </div>
        </div>
      </section>
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold">Get in Touch</h2>
        <div className="mx-auto max-w-md">
          <ConsultationForm />
        </div>
      </div>

      <NextSection
        nextPage="/solutions"
        title="Explore Our Solutions"
        description="Discover how our AI-powered solutions can help automate your workflows and transform your business."
      />
    </div>
  );
}
