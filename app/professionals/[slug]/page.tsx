import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  professionals,
  getProfessionalBySlug,
  getAllProfessionalSlugs,
  getAccentColorClasses,
} from '@/data/professionals';
import { ProfessionalDemo } from '@/components/shared/ProfessionalDemo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all professionals
export function generateStaticParams() {
  return getAllProfessionalSlugs().map((slug) => ({ slug }));
}

// Generate metadata for each professional
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const professional = getProfessionalBySlug(slug);

  if (!professional) {
    return { title: 'Professional Not Found | Botsmann' };
  }

  return {
    title: `${professional.name} - ${professional.title} | Botsmann`,
    description: professional.description,
  };
}

/**
 * Individual Professional Page
 * Interactive page where users can chat with the AI professional
 */
export default async function ProfessionalPage({ params }: PageProps) {
  const { slug } = await params;
  const professional = getProfessionalBySlug(slug);

  if (!professional) {
    notFound();
  }

  const colors = getAccentColorClasses(professional.accentColor);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-b border-gray-100/50 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Botsmann
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/professionals"
              className="text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              All Professionals
            </Link>
            <Link
              href="/auth/signup"
              className={`${colors.bg} text-white px-4 py-2 rounded-lg font-medium text-sm ${colors.hover} transition-colors`}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <section className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Info */}
            <div className="flex flex-col justify-center">
              <div
                className={`${colors.bgLight} w-20 h-20 rounded-2xl flex items-center justify-center text-5xl mb-6`}
              >
                {professional.emoji}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {professional.name}
                </span>
              </h1>

              <p className={`text-xl ${colors.text} font-semibold mb-4`}>{professional.title}</p>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {professional.description}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="#demo"
                  className={`inline-flex items-center justify-center gap-2 ${colors.bg} text-white px-8 py-4 rounded-xl font-semibold text-lg ${colors.hover} transition-all shadow-lg hover:shadow-xl`}
                >
                  Start Conversation
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </a>
                <Link
                  href={`/bots/${professional.botSlug}`}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 px-4 py-4 font-medium transition-colors"
                >
                  Learn more about {professional.name}
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
            </div>

            {/* Right: Demo */}
            <div id="demo" className="scroll-mt-24">
              <ProfessionalDemo professional={professional} />
            </div>
          </section>

          {/* Capabilities Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">
              What {professional.name} Can Help With
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {professional.capabilities.map((capability, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-start gap-3"
                >
                  <div
                    className={`${colors.bgLight} w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <svg
                      className={`w-4 h-4 ${colors.text}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">{capability}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Example Questions */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Example Questions</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {professional.exampleQuestions.map((question, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-3"
                >
                  <div
                    className={`${colors.bgLight} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-lg">{professional.emoji}</span>
                  </div>
                  <span className="text-gray-700 italic">"{question}"</span>
                </div>
              ))}
            </div>
          </section>

          {/* How to Get the Most */}
          <section className="mb-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Get the Most Out of {professional.name}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="text-2xl mb-3">💬</div>
                <h3 className="font-bold text-gray-900 mb-2">Be Specific</h3>
                <p className="text-sm text-gray-600">
                  The more context you provide, the more tailored and helpful the guidance will be.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="text-2xl mb-3">📄</div>
                <h3 className="font-bold text-gray-900 mb-2">Upload Documents</h3>
                <p className="text-sm text-gray-600">
                  Share relevant files for personalized analysis and more accurate recommendations.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="text-2xl mb-3">🔄</div>
                <h3 className="font-bold text-gray-900 mb-2">Ask Follow-ups</h3>
                <p className="text-sm text-gray-600">
                  Don't hesitate to ask clarifying questions or explore topics deeper.
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-amber-800 mb-1">Important Disclaimer</h3>
                <p className="text-sm text-amber-700">{professional.disclaimerText}</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 text-center">
            <div className={`bg-gradient-to-r ${colors.bgGradient} rounded-2xl p-8 text-white`}>
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg opacity-90 mb-6">
                Create a free account to save conversations and personalize {professional.name} with
                your documents.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Create Free Account
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link
                  href={`/bots/${professional.botSlug}`}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors"
                >
                  Explore {professional.name} in depth
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* Other Professionals */}
          <section className="mt-16">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Meet Other Professionals</h2>
            <div className="flex flex-wrap gap-3">
              {professionals
                .filter((p) => p.slug !== professional.slug)
                .map((p) => (
                  <Link
                    key={p.slug}
                    href={`/professionals/${p.slug}`}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all"
                  >
                    <span className="text-xl">{p.emoji}</span>
                    <span className="font-medium text-gray-700">{p.name}</span>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
