import Link from 'next/link';
import dynamic from 'next/dynamic';

const CollaborationForm = dynamic(() => import('@/components/ConsultationForm'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>,
  ssr: false
});

export default function HomePage() {
  const featuredBots = [
    {
      id: 'legal-expert',
      title: 'Lex',
      subtitle: 'Legal Assistant',
      emoji: '⚖️',
      description: 'Swiss legal assistant with AI + human lawyer collaboration, secure data room, and jurisdiction-specific expertise.',
      href: '/bots/legal-expert',
      status: 'live',
      gradient: 'from-openai-green via-green-600 to-emerald-500'
    },
    {
      id: 'swiss-german-teacher',
      title: 'Schwyzerdütsch Lehrer',
      subtitle: 'Language Learning',
      emoji: '🇨🇭',
      description: 'Master Swiss German with AI-powered contextual learning and cultural insights for all 26 cantons.',
      href: '/bots/swiss-german-teacher',
      status: 'live',
      gradient: 'from-green-500 via-emerald-500 to-green-600'
    },
    {
      id: 'research-assistant',
      title: 'Research Assistant',
      subtitle: 'Academic Tools',
      emoji: '🔬',
      description: 'Enhance research workflow with AI automation that organizes materials, provides updates, and sparks innovation.',
      href: '/bots/research-assistant',
      status: 'soon',
      gradient: 'from-emerald-500 via-green-500 to-openai-green'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-400 to-green-600 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <main className="relative max-w-screen-xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="text-center mb-32">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-openai-green via-green-600 to-emerald-600 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-openai-green via-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl">
              <span className="text-2xl">🚀</span>
              <span className="ml-3 font-semibold">Next-Generation AI Bots</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-green-900 to-openai-green bg-clip-text text-transparent">
              Collaborative
            </span>
            <br />
            <span className="bg-gradient-to-r from-openai-green via-green-600 to-emerald-600 bg-clip-text text-transparent">
              AI Workspaces
            </span>
            <br />
            <span className="text-4xl md:text-5xl font-normal text-gray-600 mt-4 block">
              Where AI Does 80%, Experts Do 20%
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Private workspaces where you, AI, and human experts collaborate to solve complex problems in legal, medical, financial, research, and creative domains. You own the data. AI handles routine work. Experts manage liability.
          </p>

          <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-50 to-green-50 p-6 max-w-3xl mx-auto border border-blue-100">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚧</span>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Development Status</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Currently in <strong>proof-of-concept stage</strong> with interactive demos and UI prototypes.
                  Full AI integration with vector search, embeddings, and real-time inference planned for <strong>Q2-Q3 2026</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12 flex flex-wrap justify-center gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-1 rounded-full bg-white/60 px-4 py-2 backdrop-blur-sm">
              <span className="text-green-600">✓</span> Next.js 14 + TypeScript
            </div>
            <div className="flex items-center gap-1 rounded-full bg-white/60 px-4 py-2 backdrop-blur-sm">
              <span className="text-blue-500">○</span> AI Integration (Planned)
            </div>
            <div className="flex items-center gap-1 rounded-full bg-white/60 px-4 py-2 backdrop-blur-sm">
              <span className="text-blue-500">○</span> Vector Search (Planned)
            </div>
            <div className="flex items-center gap-1 rounded-full bg-white/60 px-4 py-2 backdrop-blur-sm">
              <span className="text-green-600">✓</span> Domain Workflows
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <Link
              href="/bots"
              className="group relative bg-openai-green text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:bg-green-700"
            >
              <span className="flex items-center justify-center gap-2">
              Explore All Bots
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link
              href="#featured-bots"
              className="group relative border-2 border-gray-300 hover:border-openai-green px-8 py-4 rounded-2xl text-lg font-semibold text-gray-700 hover:text-openai-green transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                View Featured Bots
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-openai-green mb-2">7</div>
              <div className="text-gray-600 font-medium">Expert Workspaces</div>
              <div className="text-sm text-gray-500">Legal, Medical, Financial +4</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-openai-green mb-2">80%</div>
              <div className="text-gray-600 font-medium">Cost Reduction</div>
              <div className="text-sm text-gray-500">AI does routine work</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-openai-green mb-2">100%</div>
              <div className="text-gray-600 font-medium">Data Ownership</div>
              <div className="text-sm text-gray-500">You own everything</div>
            </div>
          </div>
        </section>

        {/* Featured Bots Section */}
        <section id="featured-bots" className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Featured
              </span>
              <span className="bg-gradient-to-r from-openai-green to-green-600 bg-clip-text text-transparent">
                {" "}AI Bots
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our most advanced AI assistants, each specialized for specific domains and designed to revolutionize how you work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {featuredBots.map((bot) => (
              <Link
                key={bot.id}
                href={{ pathname: bot.href }}
                className="group relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50"
              >
                {bot.status === 'soon' && (
                  <div className="absolute right-6 top-6 z-10">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                    Coming Soon
                  </span>
                  </div>
                )}

                {/* Enhanced Gradient Header */}
                <div className={`relative h-48 bg-gradient-to-br ${bot.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>

                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
                  </div>

                  {/* Floating emoji */}
                  <div className="absolute bottom-8 left-8 text-7xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                    {bot.emoji}
                  </div>

                  {/* Status indicator */}
                  {bot.status === 'live' && (
                    <div className="absolute top-6 right-6">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                    </div>
                  )}
                </div>

                {/* Enhanced Content */}
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-openai-green transition-colors">
                      {bot.title}
                    </h3>
                    <p className="text-sm font-medium text-openai-green bg-green-50 px-3 py-1 rounded-full inline-block">
                      {bot.subtitle}
                    </p>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                    {bot.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-openai-green font-semibold group-hover:gap-3 transition-all">
                      <span>Explore Bot</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    </div>

                    {/* Hover effect indicator */}
                    <div className="w-12 h-1 bg-gradient-to-r from-openai-green to-green-400 rounded-full transform group-hover:w-16 transition-all duration-300"></div>
                  </div>
                </div>

                {/* Subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-openai-green/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/bots"
              className="group inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-openai-green px-8 py-4 rounded-2xl text-lg font-semibold text-gray-700 hover:text-openai-green transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>View All Bots</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Workspace Value Proposition Section */}
        <section className="mb-32 relative">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 md:p-16 text-white shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                The Workspace is the Product
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Individual owns data. AI does 80% of work. Human experts do 20% (liability management). Simple, secure collaboration for everyone.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Why Traditional Expert Services Fail</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">✗</span>
                    <span>Experts waste 60-80% of time on routine work AI can do</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">✗</span>
                    <span>Individuals can't afford ongoing expert help ($200-500/hr)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">✗</span>
                    <span>Experts can't scale to serve everyone</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">The Botsmann Workspace Solution</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>AI handles routine work (analysis, research, documentation)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Experts focus on judgment (liability, complex decisions)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>90% cost reduction for individuals, 3x more clients for experts</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center">
              <div className="text-3xl font-bold mb-2">79% Average Cost Savings</div>
              <div className="text-lg text-green-100">AI speed + Human judgment = Better outcomes for everyone</div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-32 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                How It
              </span>
              <span className="bg-gradient-to-r from-openai-green to-green-600 bg-clip-text text-transparent">
                {" "}Works
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Three phases of collaboration: Start with AI, add human experts when needed, continue working together in your private workspace.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
              <div className="flex justify-between items-center">
                <div className="w-8 h-0.5 bg-gradient-to-r from-openai-green to-transparent"></div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
                <div className="w-8 h-0.5 bg-gradient-to-l from-emerald-400 to-transparent"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Phase 1 */}
              <div className="relative text-center group">
                <div className="relative mb-8 mx-auto w-32 h-32">
                  <div className="absolute inset-0 bg-gradient-to-br from-openai-green to-green-600 rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                  <div className="absolute inset-2 bg-white rounded-2xl shadow-xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-openai-green to-green-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      1
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Individual + AI</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create your private workspace. Upload documents and data. AI analyzes with domain expertise and provides expert-level guidance. Most cases stay here.
                </p>
              </div>

              {/* Phase 2 */}
              <div className="relative text-center group">
                <div className="relative mb-8 mx-auto w-32 h-32">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl transform -rotate-6 group-hover:rotate-6 transition-transform duration-300"></div>
                  <div className="absolute inset-2 bg-white rounded-2xl shadow-xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      2
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Add Expert (When Needed)</h3>
                <p className="text-gray-600 leading-relaxed">
                  AI identifies when human expert needed. Invite lawyer, doctor, advisor to workspace. Expert sees all context. Focuses on complex judgment.
                </p>
            </div>

              {/* Phase 3 */}
              <div className="relative text-center group">
                <div className="relative mb-8 mx-auto w-32 h-32">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl transform rotate-6 group-hover:-rotate-12 transition-transform duration-300"></div>
                  <div className="absolute inset-2 bg-white rounded-2xl shadow-xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      3
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ongoing Collaboration</h3>
                <p className="text-gray-600 leading-relaxed">
                  Upload updates. AI re-analyzes. Expert reviews changes. All communication in one secure workspace. You own everything.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Enhanced Collaboration Section */}
        <section className="relative mb-32">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 rounded-4xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,163,127,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(5,150,105,0.1)_0%,transparent_50%)]"></div>

          <div className="relative text-center py-20 px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Join Our
                </span>
                <br />
                <span className="bg-gradient-to-r from-openai-green to-green-600 bg-clip-text text-transparent">
                  Collaborative Community
                </span>
          </h2>

              <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed">
                We're building the future of AI together. Connect with brilliant minds, contribute to groundbreaking projects,
                and shape the next generation of intelligent technologies.
              </p>

              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-300">
                  <div className="text-5xl mb-6">👩‍💻</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-openai-green transition-colors">
                For Engineers
              </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Work with cutting-edge AI technologies, contribute to scalable solutions, and collaborate on projects
                    that push the boundaries of what's possible in artificial intelligence.
                  </p>
            </div>

                <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-300">
                  <div className="text-5xl mb-6">🧪</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-openai-green transition-colors">
                For Researchers
              </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Apply your expertise to real-world challenges, develop novel algorithms, and publish groundbreaking
                    research while making immediate impact on practical AI applications.
                  </p>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100/50 max-w-2xl mx-auto">
                <CollaborationForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
