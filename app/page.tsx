import Link from 'next/link';
import dynamic from 'next/dynamic';

const CollaborationForm = dynamic(() => import('@/components/ConsultationForm'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>,
  ssr: false
});

export default function HomePage() {
  // Define which bots are ready (not coming soon)
  const readyBots = ['swiss-german-teacher'];
  
  return (
    <div className="min-h-screen">
      <main className="max-w-screen-xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 md:text-6xl">
            Transform Your Business with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Unlock the power of AI and robotics to streamline operations, boost efficiency, and drive innovation. Our intelligent solutions adapt to your unique business needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/bots"
              className="rounded-md bg-openai-green px-6 py-3 text-lg font-medium text-white hover:bg-opacity-90 transition-opacity"
            >
              Explore Our Bots
            </Link>
            <Link
              href="/how-it-works"
              className="rounded-md border-2 border-openai-green px-6 py-3 text-lg font-medium text-openai-green hover:bg-gray-50 transition-colors"
            >
              How It Works
            </Link>
          </div>
        </section>
        
        {/* Featured Bots Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Swiss German Teacher</h3>
                <p className="text-gray-600 mb-4">Master Swiss German with our AI-powered teacher that provides contextual learning and cultural insights for Switzerland.</p>
                <Link href="/bots/swiss-german-teacher" className="text-openai-green hover:text-opacity-80 font-medium">
                  Learn more →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
              <span className="absolute right-4 top-4 inline-block bg-openai-green text-white text-xs font-medium px-2 py-1 rounded">
                Coming Soon
              </span>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Research Assistant</h3>
                <p className="text-gray-600 mb-4">Enhance your research workflow with AI automation that organizes materials, provides updates, and sparks innovation.</p>
                <Link href="/bots/research-assistant" className="text-openai-green hover:text-opacity-80 font-medium">
                  Learn more →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
              <span className="absolute right-4 top-4 inline-block bg-openai-green text-white text-xs font-medium px-2 py-1 rounded">
                Coming Soon
              </span>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Legal Expert</h3>
                <p className="text-gray-600 mb-4">Get instant legal insights and document analysis powered by advanced AI technology.</p>
                <Link href="/bots/legal-expert" className="text-openai-green hover:text-opacity-80 font-medium">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Collaboration Section */}
        <section className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Collaborative Community
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            We're bringing together engineers and researchers to build the next generation of AI tools. Share your expertise and help shape the future of these technologies.
          </p>
          <div className="flex flex-col md:flex-row gap-6 max-w-3xl mx-auto mb-8 text-left">
            <div className="bg-white p-6 rounded-lg shadow-sm flex-1">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="text-2xl mr-2">👩‍💻</span>
                For Engineers
              </h3>
              <p className="text-gray-700">Contribute to cutting-edge AI projects, work with the latest technologies, and help build scalable solutions that solve real-world problems.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex-1">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="text-2xl mr-2">🧪</span>
                For Researchers
              </h3>
              <p className="text-gray-700">Apply your domain expertise, develop novel algorithms, and collaborate on publications while making direct impact on practical applications.</p>
            </div>
          </div>
          <CollaborationForm />
        </section>
      </main>
    </div>
  );
}
