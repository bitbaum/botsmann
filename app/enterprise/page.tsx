import { type Metadata } from 'next';
import Link from 'next/link';
import { ConsultationFormLoader } from '@/components/ConsultationFormLoader';

export const metadata: Metadata = {
  title: 'Enterprise | Botsmann',
  description:
    'Deploy private AI professionals for your organization. On-premises deployment, team accounts, custom training, and enterprise-grade security.',
};

/**
 * Enterprise Landing Page
 * B2B focused page for law firms, medical practices, and businesses
 */
export default function EnterprisePage() {
  const useCases = [
    {
      icon: '⚖️',
      title: 'Law Firms',
      description:
        'AI legal research assistants for associates. Contract analysis, case law search, and document review at scale.',
      features: ['Contract analysis', 'Legal research', 'Document review', 'Case summarization'],
    },
    {
      icon: '⚕️',
      title: 'Medical Practices',
      description:
        'AI health assistants for patient education and triage support. Help patients understand their care.',
      features: ['Patient education', 'Symptom triage', 'Care explanations', 'Wellness guidance'],
    },
    {
      icon: '💼',
      title: 'Wealth Management',
      description:
        'AI business strategists for financial analysis, market research, and client reporting.',
      features: ['Market analysis', 'Research synthesis', 'Report generation', 'Data insights'],
    },
    {
      icon: '🏢',
      title: 'Enterprises',
      description:
        'Custom AI professionals trained on your internal knowledge base. Private, secure, and compliant.',
      features: ['Custom training', 'Knowledge base', 'Team collaboration', 'Usage analytics'],
    },
  ];

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      title: 'On-Premises Deployment',
      description:
        'Deploy Botsmann entirely on your infrastructure. Your data never leaves your network.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: 'Team Accounts',
      description:
        'Manage user access, set permissions, and monitor usage across your organization.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
      title: 'Custom Training',
      description:
        'Train AI professionals on your internal documents, procedures, and knowledge base.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: 'SSO Integration',
      description:
        'Single sign-on with your existing identity provider. Support for SAML, OAuth, and OIDC.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: 'Audit Logs',
      description: 'Complete activity logging for compliance. Track who accessed what and when.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: 'API Access',
      description:
        'Integrate AI professionals into your existing workflows and applications via REST API.',
    },
  ];

  const compliance = [
    { name: 'SOC 2 Type II', icon: '✓' },
    { name: 'HIPAA', icon: '✓' },
    { name: 'GDPR', icon: '✓' },
    { name: 'ISO 27001', icon: '✓' },
    { name: 'Data Residency', icon: '✓' },
    { name: 'BAA Available', icon: '✓' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-action-tint">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-action rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-action to-action-hover rounded-full opacity-10 blur-3xl" />
      </div>

      <main className="relative max-w-screen-xl mx-auto px-6 py-20">
        {/* Hero */}
        <section className="text-center mb-20 pt-8">
          <div className="inline-flex items-center gap-2 bg-action-tint text-action px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-action rounded-full" />
            <span>Enterprise-Grade AI Professionals</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="text-ink">AI Professionals for</span>
            <br />
            <span className="text-action">Your Organization</span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Deploy private AI assistants for your law firm, medical practice, or business. Full data
            sovereignty, custom training, and enterprise security.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact"
              className="group bg-action text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                Schedule a Demo
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </span>
            </a>
            <Link
              href="/professionals"
              className="group border-2 border-gray-300 hover:border-action px-8 py-4 rounded-xl text-lg font-semibold text-gray-700 hover:text-action transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                Try Our Professionals
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-ink">Built for Your Industry</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              AI professionals tailored to the specific needs of your organization
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.features.map((feature) => (
                    <span
                      key={feature}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-ink">Enterprise Features</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to deploy AI professionals at scale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
              >
                <div className="w-12 h-12 bg-action-tint rounded-xl flex items-center justify-center mb-4 text-action">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Security & Compliance */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Security & Compliance</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Enterprise-grade security with full compliance support for regulated industries
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {compliance.map((item) => (
                <div
                  key={item.name}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                >
                  <div className="text-2xl text-green-400 mb-2">{item.icon}</div>
                  <div className="text-sm font-medium">{item.name}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center text-gray-400 text-sm">
              Need a specific compliance certification? Contact us to discuss your requirements.
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-ink">Get in Touch</span>
            </h2>
            <p className="text-gray-600">
              Schedule a demo or discuss your specific requirements with our team
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-xl mx-auto">
            <ConsultationFormLoader />
          </div>
        </section>
      </main>
    </div>
  );
}

export const dynamic = 'force-static';
export const revalidate = 3600;
