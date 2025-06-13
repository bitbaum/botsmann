import Link from 'next/link';

export default function FeaturedBots() {
  const readyBots = ['swiss-german-teacher'];
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Solutions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Swiss German Teacher</h3>
            <p className="text-gray-600 mb-4">Master Swiss German with contextual learning and cultural insights.</p>
            <Link href="/bots/swiss-german-teacher" className="text-openai-green hover:text-opacity-80 font-medium">
              Learn more →
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
          {!readyBots.includes('research-assistant') && (
            <span className="absolute right-4 top-4 inline-block bg-openai-green text-white text-xs font-medium px-2 py-1 rounded">
              Coming Soon
            </span>
          )}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Research Assistant</h3>
            <p className="text-gray-600 mb-4">Organize materials and spark innovation with AI automation.</p>
            <Link href="/bots/research-assistant" className="text-openai-green hover:text-opacity-80 font-medium">
              Learn more →
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
          {!readyBots.includes('legal-expert') && (
            <span className="absolute right-4 top-4 inline-block bg-openai-green text-white text-xs font-medium px-2 py-1 rounded">
              Coming Soon
            </span>
          )}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Legal Expert</h3>
            <p className="text-gray-600 mb-4">Get instant legal insights and document analysis.</p>
            <Link href="/bots/legal-expert" className="text-openai-green hover:text-opacity-80 font-medium">
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
