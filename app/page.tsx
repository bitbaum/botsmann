import Link from 'next/link';
import dynamic from 'next/dynamic';

const CollaborationForm = dynamic(() => import('@/components/ConsultationForm'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>,
  ssr: false
});

export default function HomePage() {
  const features = [
    {
      icon: '🔒',
      title: 'Truly Private',
      description: 'Your data stays yours. End-to-end encryption, no training on your conversations, full data sovereignty.'
    },
    {
      icon: '⚡',
      title: 'Deploy in Minutes',
      description: 'From idea to running AI node in under 5 minutes. No infrastructure headaches, no DevOps required.'
    },
    {
      icon: '🧠',
      title: 'Any Model',
      description: 'OpenAI, Anthropic, Mistral, or your own. Bring your API keys or use ours. Switch anytime.'
    },
    {
      icon: '📚',
      title: 'Your Knowledge',
      description: 'Upload documents, connect APIs, add databases. Your node learns what you teach it.'
    },
    {
      icon: '🎨',
      title: 'Fully Custom',
      description: 'Define personality, tone, capabilities, and appearance. Make it uniquely yours.'
    },
    {
      icon: '🌐',
      title: 'Share or Keep Private',
      description: 'Embed anywhere, share with team, or keep it completely private. You control access.'
    }
  ];

  const useCases = [
    {
      emoji: '🎧',
      title: 'Customer Support',
      description: 'Train on your docs, deploy as 24/7 support agent',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      emoji: '📖',
      title: 'Knowledge Base',
      description: 'Turn documentation into conversational assistant',
      color: 'from-purple-500 to-pink-500'
    },
    {
      emoji: '🔬',
      title: 'Research Assistant',
      description: 'Analyze papers, synthesize insights, track literature',
      color: 'from-green-500 to-emerald-500'
    },
    {
      emoji: '✍️',
      title: 'Writing Partner',
      description: 'Brainstorm, edit, and create with your style',
      color: 'from-orange-500 to-red-500'
    },
    {
      emoji: '💼',
      title: 'Business Analyst',
      description: 'Process reports, extract insights, generate summaries',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      emoji: '🤖',
      title: 'Anything You Dream',
      description: 'Your imagination is the only limit',
      color: 'from-gray-700 to-gray-900'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <main className="relative max-w-screen-xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="text-center mb-32">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white px-8 py-4 rounded-2xl shadow-2xl">
              <span className="text-2xl">⚡</span>
              <span className="ml-3 font-semibold">The Future of Personal AI</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Create Your Own
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Private AI Node
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Deploy custom AI assistants that know your business, respect your privacy, and work exactly how you want.
            <br />
            <span className="font-semibold text-gray-800">No code. No infrastructure. Just your AI, your way.</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <Link
              href="/nodes/create"
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-3">
                Create Your Node
                <span className="text-2xl">🚀</span>
              </span>
            </Link>
            <Link
              href="/bots/orange-cat"
              className="group relative border-2 border-gray-300 hover:border-orange-400 px-8 py-5 rounded-2xl text-lg font-semibold text-gray-700 hover:text-orange-600 transition-all duration-300 bg-white/50 backdrop-blur-sm"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-2xl">🐱</span>
                Meet Oscar (Demo)
              </span>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">5 min</div>
              <div className="text-gray-600 font-medium">To Deploy</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Private</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-cyan-600 mb-2">5+</div>
              <div className="text-gray-600 font-medium">AI Models</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">$0</div>
              <div className="text-gray-600 font-medium">To Start</div>
            </div>
          </div>
        </section>

        {/* What is a Private AI Node */}
        <section className="mb-32">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-3xl p-1 shadow-2xl">
            <div className="bg-white rounded-[22px] p-12 md:p-16">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                  What is a Private AI Node?
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  A <span className="font-bold text-blue-600">Private AI Node</span> is your personal AI assistant that lives on your terms.
                  Unlike generic chatbots, it's trained on YOUR knowledge, speaks in YOUR voice, and keeps YOUR data private.
                </p>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="text-5xl mb-4">🏠</div>
                    <h3 className="font-bold text-lg mb-2">It's Yours</h3>
                    <p className="text-gray-600 text-sm">Full ownership and control. Export anytime, delete anytime.</p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl mb-4">🧠</div>
                    <h3 className="font-bold text-lg mb-2">It Knows You</h3>
                    <p className="text-gray-600 text-sm">Trained on your docs, your style, your domain expertise.</p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl mb-4">🔐</div>
                    <h3 className="font-bold text-lg mb-2">It's Private</h3>
                    <p className="text-gray-600 text-sm">Your conversations never train public models. Ever.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Everything You Need,
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nothing You Don't
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Build Anything
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From customer support to research assistants, your private AI node adapts to any use case.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                <div className="relative">
                  <div className="text-5xl mb-4">{useCase.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-gray-600">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Three Steps to
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Your AI
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Define Personality</h3>
              <p className="text-gray-600">
                Choose a template or start fresh. Set the name, tone, and core instructions for your AI.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Add Knowledge</h3>
              <p className="text-gray-600">
                Upload documents, connect APIs, or paste text. Your node learns from what you provide.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Deploy & Share</h3>
              <p className="text-gray-600">
                Launch your node instantly. Embed it, share it, or keep it private. You're in control.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/nodes/create"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Start Building Now
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Explore Existing Bots */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Or Explore Our
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Pre-Built Bots
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Not ready to build? Try our specialized AI assistants.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/bots/legal-expert"
              className="group flex items-center gap-3 px-6 py-4 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <span className="text-3xl">⚖️</span>
              <div>
                <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Lex</div>
                <div className="text-sm text-gray-500">Legal Expert</div>
              </div>
            </Link>
            <Link
              href="/bots/swiss-german-teacher"
              className="group flex items-center gap-3 px-6 py-4 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <span className="text-3xl">🇨🇭</span>
              <div>
                <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Heidi</div>
                <div className="text-sm text-gray-500">Swiss German</div>
              </div>
            </Link>
            <Link
              href="/bots/orange-cat"
              className="group flex items-center gap-3 px-6 py-4 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <span className="text-3xl">🐱</span>
              <div>
                <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Oscar</div>
                <div className="text-sm text-gray-500">Cat Wisdom</div>
              </div>
            </Link>
            <Link
              href="/bots/medical-expert"
              className="group flex items-center gap-3 px-6 py-4 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <span className="text-3xl">⚕️</span>
              <div>
                <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Imhotep</div>
                <div className="text-sm text-gray-500">Medical</div>
              </div>
            </Link>
            <Link
              href="/bots"
              className="flex items-center gap-2 px-6 py-4 text-blue-600 font-semibold hover:bg-blue-50 rounded-xl transition-colors"
            >
              View All →
            </Link>
          </div>
        </section>

        {/* Collaboration Section */}
        <section className="relative mb-32">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 rounded-3xl"></div>

          <div className="relative text-center py-20 px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Want to Build
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Something Bigger?
                </span>
              </h2>

              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Enterprise deployments, custom integrations, or just want to chat about AI?
                We'd love to hear from you.
              </p>

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
