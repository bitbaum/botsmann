import React from 'react';

const TechSection: React.FC = () => {
  return (
    <section id="tech" className="scroll-mt-24 my-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
        Technical Architecture
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Knowledge Base</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-mono text-emerald-600 mr-2">→</span>
              <span><strong>5M Embeddings:</strong> Tax regulations, investment guides, estate planning</span>
            </li>
            <li className="flex items-start">
              <span className="font-mono text-emerald-600 mr-2">→</span>
              <span><strong>Qdrant Vector DB:</strong> Open-source, self-hostable, fast retrieval</span>
            </li>
            <li className="flex items-start">
              <span className="font-mono text-emerald-600 mr-2">→</span>
              <span><strong>Jurisdiction-Aware:</strong> US, EU, CH tax codes with metadata filtering</span>
            </li>
            <li className="flex items-start">
              <span className="font-mono text-emerald-600 mr-2">→</span>
              <span><strong>CFP-Reviewed:</strong> Professional validation of financial knowledge</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Portfolio Analysis Engine</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-mono text-blue-600 mr-2">→</span>
              <span><strong>Multi-Asset Support:</strong> Stocks, bonds, crypto, real estate, cash</span>
            </li>
            <li className="flex items-start">
              <span className="font-mono text-blue-600 mr-2">→</span>
              <span><strong>Risk Metrics:</strong> Sharpe ratio, VaR, correlation matrices</span>
            </li>
            <li className="flex items-start">
              <span className="font-mono text-blue-600 mr-2">→</span>
              <span><strong>Monte Carlo:</strong> 10,000 simulations for retirement projections</span>
            </li>
            <li className="flex items-start">
              <span className="font-mono text-blue-600 mr-2">→</span>
              <span><strong>Tax Optimization:</strong> Loss harvesting, asset location, Roth conversion</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Privacy Architecture */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-white">
        <h3 className="text-2xl font-semibold mb-6">Privacy-First Architecture</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-3">
              <h4 className="font-semibold mb-2">Self-Hosted</h4>
              <p className="text-sm text-gray-300">
                Run on your hardware with Ollama/Llama.cpp. Data never leaves your machine. Docker compose deployment.
              </p>
            </div>
            <div className="text-xs text-gray-400 font-mono">
              docker-compose up -d
            </div>
          </div>

          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-3">
              <h4 className="font-semibold mb-2">Cloud Encrypted</h4>
              <p className="text-sm text-gray-300">
                AES-256 encryption, you control keys. Data encrypted before leaving browser. Zero-knowledge architecture.
              </p>
            </div>
            <div className="text-xs text-gray-400 font-mono">
              E2E encrypted
            </div>
          </div>

          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-3">
              <h4 className="font-semibold mb-2">Enterprise VPC</h4>
              <p className="text-sm text-gray-300">
                AWS/Azure/GCP deployment with VPC isolation. SOC 2, ISO 27001 compliance. Multi-tenant architecture.
              </p>
            </div>
            <div className="text-xs text-gray-400 font-mono">
              Compliance-ready
            </div>
          </div>
        </div>
      </div>

      {/* Human-AI Collaboration */}
      <div className="mt-12 border-2 border-emerald-200 rounded-xl p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Human-AI Collaboration</h3>
        <div className="prose max-w-none text-gray-700">
          <p className="mb-4">
            RichCat doesn't replace financial advisors—it makes them <strong>more efficient and accessible</strong>.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">AI Does (80% of work):</h4>
              <ul className="space-y-1 text-sm">
                <li>✓ Portfolio analysis and risk assessment</li>
                <li>✓ Tax optimization strategies</li>
                <li>✓ Retirement projections (Monte Carlo)</li>
                <li>✓ Rebalancing recommendations</li>
                <li>✓ Documentation and calculations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Human Advisors Do (20% of work):</h4>
              <ul className="space-y-1 text-sm">
                <li>✓ Complex estate planning structures</li>
                <li>✓ International tax optimization</li>
                <li>✓ Business succession planning</li>
                <li>✓ Life event guidance and empathy</li>
                <li>✓ Final judgment on major decisions</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <strong>Result:</strong> Advisors can serve 2x more clients with better outcomes. Clients get AI speed + human judgment. Everyone wins.
          </p>
        </div>
      </div>

      {/* Technical Roadmap */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Development Roadmap</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-24 text-sm font-semibold text-emerald-600">Q1 2025</div>
            <div className="flex-1">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  Foundation: Vector DB setup, knowledge base ingestion (5M embeddings), basic RAG pipeline, Plaid integration, portfolio analysis
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-24 text-sm font-semibold text-blue-600">Q2 2025</div>
            <div className="flex-1">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  Core Features: Tax optimization (loss harvesting, asset location), Monte Carlo simulations, advisor matching, collaborative workspace
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-24 text-sm font-semibold text-purple-600">Q3 2025</div>
            <div className="flex-1">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  Advanced: Multi-asset support (crypto, real estate), estate planning, international tax, scenario modeling, enterprise white-label
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-24 text-sm font-semibold text-amber-600">Q4 2025</div>
            <div className="flex-1">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  Scale & Compliance: Regulatory compliance (FINRA, SEC), audit trails, insurance integrations, advanced AI features
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Link to full technical specs */}
      <div className="mt-12 text-center">
        <a
          href="https://github.com/g-but/botsmann/blob/main/app/bots/financial-advisor/README.md"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors"
        >
          Read Full Technical Documentation
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default TechSection;
