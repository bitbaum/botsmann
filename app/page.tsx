import Link from 'next/link';
import dynamic from 'next/dynamic';

const ConsultationForm = dynamic(() => import('@/components/ConsultationForm'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>,
  ssr: false
});

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-screen-xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Business with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Unlock the power of AI and robotics to streamline operations, boost efficiency, and drive innovation. Our intelligent solutions adapt to your unique business needs.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/bots"
              className="rounded-md bg-openai-green px-6 py-3 text-lg font-medium text-white hover:bg-opacity-90 transition-opacity"
            >
              Explore Our Bots
            </Link>
            <Link 
              href="/about"
              className="rounded-md border-2 border-openai-green px-6 py-3 text-lg font-medium text-openai-green hover:bg-gray-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </section>
        
        {/* Featured Bots Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Auto Shopper</h3>
                <p className="text-gray-600 mb-4">Automate your shopping experience with AI-powered price comparison and smart purchasing decisions.</p>
                <Link href="/bots/auto-shopper" className="text-openai-green hover:text-opacity-80 font-medium">
                  Learn more →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Legal Expert</h3>
                <p className="text-gray-600 mb-4">Get instant legal insights and document analysis powered by advanced AI technology.</p>
                <Link href="/bots/legal-expert" className="text-openai-green hover:text-opacity-80 font-medium">
                  Learn more →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Medical Expert</h3>
                <p className="text-gray-600 mb-4">Access medical knowledge and get preliminary assessments with our AI medical assistant.</p>
                <Link href="/bots/medical-expert" className="text-openai-green hover:text-opacity-80 font-medium">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact CTA Section */}
        <section className="bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact us today to learn how our AI solutions can revolutionize your business operations and drive growth.
          </p>
          <ConsultationForm />
        </section>
      </main>
    </div>
  );
}
