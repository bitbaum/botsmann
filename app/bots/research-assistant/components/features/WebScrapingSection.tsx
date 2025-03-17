import React from 'react';

/**
 * Web Scraping Section
 * 
 * This component showcases the web scraping feature that keeps
 * researchers updated with the latest information in their field.
 */
const WebScrapingSection: React.FC = () => {
  // Sample sources the system can scrape from
  const scrapingSources = [
    { name: "ArXiv", category: "Academic", logo: "📑", description: "Preprint server for scientific papers" },
    { name: "Google Scholar", category: "Academic", logo: "🎓", description: "Search engine for scholarly literature" },
    { name: "PubMed", category: "Academic", logo: "🔬", description: "Biomedical literature and abstracts" },
    { name: "Science Daily", category: "News", logo: "📰", description: "Science news articles and summaries" },
    { name: "Nature", category: "Academic", logo: "🌿", description: "Leading multidisciplinary science journal" },
    { name: "MIT Technology Review", category: "News", logo: "💻", description: "Technology and innovation reporting" },
    { name: "Twitter/X", category: "Social", logo: "🐦", description: "Real-time updates from researchers and institutions" },
    { name: "Academic Blogs", category: "Blogs", logo: "✍️", description: "Expert commentary on recent developments" }
  ];

  // Sample recent updates
  const recentUpdates = [
    {
      title: "Quantum Error Correction Breakthrough",
      source: "Nature Physics",
      date: "2 days ago",
      summary: "Researchers demonstrated a new approach to quantum error correction that reduces noise by 74%, potentially bringing fault-tolerant quantum computing closer to reality.",
      url: "#",
      relevance: 98
    },
    {
      title: "New Algorithm for Database Search Optimization",
      source: "arXiv",
      date: "1 week ago",
      summary: "A novel algorithm that combines quantum and classical approaches shows a 3x speedup for large database searches compared to previous methods.",
      url: "#",
      relevance: 87
    },
    {
      title: "Quantum Computing Hardware Scaling Challenges",
      source: "IEEE Spectrum",
      date: "2 weeks ago",
      summary: "Industry experts discuss the main engineering obstacles to scaling quantum processors beyond 1000 qubits, with superconducting materials emerging as a key focus area.",
      url: "#",
      relevance: 82
    }
  ];

  return (
    <div className="my-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Web Scraping for Real-Time Updates</h2>
        <p className="text-gray-700 text-lg mb-12">
          Stay at the cutting edge of your research field with automated updates from trusted sources,
          filtered and prioritized based on your specific interests.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-16 items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Never Miss Important Developments</h3>
            <p className="text-gray-700 mb-6">
              Our AI research assistant continuously monitors key sources in your field, identifying new publications, 
              breakthroughs, and discussions relevant to your specific research focus.
            </p>
            
            <div className="bg-white rounded-lg shadow-md border border-indigo-100 overflow-hidden mb-6">
              <div className="border-b border-gray-200 bg-indigo-50 p-4">
                <h4 className="font-medium text-indigo-800">Recent Updates in Quantum Computing</h4>
              </div>
              <div className="divide-y divide-gray-100">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between mb-1">
                      <h5 className="font-medium text-gray-900">{update.title}</h5>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {update.relevance}% Match
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      <span className="font-medium">{update.source}</span> • {update.date}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{update.summary}</p>
                    <a href={update.url} className="text-xs text-indigo-600 hover:underline">Read more →</a>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 p-3 text-center">
                <button className="text-sm text-indigo-600 hover:text-indigo-800">
                  View all updates
                </button>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <h4 className="font-medium text-indigo-800 mb-2">Delivery Options</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded border border-indigo-100 text-center">
                  <div className="text-2xl mb-1">📧</div>
                  <div className="text-sm font-medium">Daily Email Digest</div>
                </div>
                <div className="bg-white p-3 rounded border border-indigo-100 text-center">
                  <div className="text-2xl mb-1">🔔</div>
                  <div className="text-sm font-medium">Real-time Alerts</div>
                </div>
                <div className="bg-white p-3 rounded border border-indigo-100 text-center">
                  <div className="text-2xl mb-1">📱</div>
                  <div className="text-sm font-medium">Mobile Notifications</div>
                </div>
                <div className="bg-white p-3 rounded border border-indigo-100 text-center">
                  <div className="text-2xl mb-1">🔄</div>
                  <div className="text-sm font-medium">Dashboard Updates</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Comprehensive Source Coverage</h3>
            <p className="text-gray-700 mb-6">
              We monitor a wide range of sources to ensure you have complete coverage of developments in your field, 
              from formal academic publications to cutting-edge discussions on social media.
            </p>
            
            <div className="bg-white rounded-lg shadow-md border border-indigo-100 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">Information Sources</h4>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Filter sources..."
                      className="text-sm border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-40"
                    />
                  </div>
                </div>
              </div>
              <div className="h-80 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {scrapingSources.map((source, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-xl mr-2">{source.logo}</div>
                            <div className="text-sm font-medium text-gray-900">{source.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {source.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                          {source.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 p-3 text-center border-t border-gray-200">
                <span className="text-xs text-gray-500">Additional sources can be added upon request</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Filtering & Analysis</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Keyword Relevance</h4>
              <p className="text-sm text-gray-600">
                Set up custom keywords and phrases to ensure you only receive updates that matter to your specific research focus.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Trending Analysis</h4>
              <p className="text-sm text-gray-600">
                Identify emerging trends in your field before they become mainstream, giving you a competitive edge in research.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Reputation Scoring</h4>
              <p className="text-sm text-gray-600">
                Filter sources by academic credibility, citation count, and peer-review status to ensure quality information.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Stop manually checking dozens of sources. Let our AI assistant bring the latest research directly to you,
            precisely filtered to match your interests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebScrapingSection; 