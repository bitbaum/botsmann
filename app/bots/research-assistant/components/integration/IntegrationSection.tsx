/**
 * IntegrationSection.tsx
 * 
 * This component showcases the Collaboration features of the 
 * Nerd AI Research Assistant. It demonstrates how Nerd enables researchers
 * to connect with peers, raise funding, find resources, and create
 * collaborative workspaces that integrate with popular research tools.
 */

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles.module.css';

interface IntegrationTool {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
}

interface CollaborationFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const IntegrationSection: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState('zotero');
  const [activeFeature, setActiveFeature] = useState('find-peers');

  const collaborationFeatures: CollaborationFeature[] = [
    {
      id: 'find-peers',
      title: 'Find Research Peers',
      description: 'Discover and connect with other researchers working in your field or on similar problems, regardless of institutional affiliation.',
      icon: '👥'
    },
    {
      id: 'raise-funding',
      title: 'Raise Research Funding',
      description: 'Access decentralized funding mechanisms, grants, and crowdfunding opportunities to support your independent research projects.',
      icon: '💰'
    },
    {
      id: 'find-resources',
      title: 'Access Resources',
      description: 'Find computational resources, datasets, specialized equipment, and other research assets shared by the community.',
      icon: '🔍'
    },
    {
      id: 'create-workspaces',
      title: 'Collaborative Workspaces',
      description: 'Create shared research environments that integrate with your favorite tools and enable real-time collaboration across distributed teams.',
      icon: '🔄'
    }
  ];

  const integrationTools: IntegrationTool[] = [
    {
      id: 'zotero',
      name: 'Zotero',
      icon: '/images/zotero-icon.svg',
      description: 'Sync your Zotero library with Nerd for seamless citation management and literature organization.',
      features: [
        'Automatically extract key information from papers in your Zotero library',
        'Generate summaries of papers with one click',
        'Organize research by themes that cut across your manual collections',
        'Identify connections between papers that might not be obvious',
        'Streamline citation workflow with formatted references on demand'
      ]
    },
    {
      id: 'notion',
      name: 'Notion',
      icon: '/images/notion-icon.svg',
      description: 'Connect your Notion workspace to organize research notes, drafts, and findings in your existing knowledge management system.',
      features: [
        'Push research summaries directly to your Notion pages',
        'Create structured databases of research findings',
        'Generate literature review tables that update automatically',
        'Keep research notes synchronized across platforms',
        'Embed interactive research visualizations in your Notion documents'
      ]
    },
    {
      id: 'google-drive',
      name: 'Google Drive',
      icon: '/images/google-drive-icon.svg',
      description: 'Seamlessly integrate with Google Drive to access, analyze, and organize your research documents in the cloud.',
      features: [
        'Process multiple document formats including Google Docs, Sheets, and PDFs',
        'Maintain version history when generating new research content',
        'Collaborate with team members using shared Drive folders',
        'Auto-generate research reports in Google Docs format',
        'Extract and analyze data from spreadsheets to identify patterns'
      ]
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: '/images/github-icon.svg',
      description: 'Connect with GitHub to manage research code, documentation, and collaborative projects with version control.',
      features: [
        'Generate documentation for research code automatically',
        'Track changes to research methods and results over time',
        'Facilitate code review and collaboration on computational research',
        'Create reproducible research environments with configuration files',
        'Publish research websites and interactive demonstrations'
      ]
    }
  ];

  const currentTool = integrationTools.find(tool => tool.id === selectedTool) || integrationTools[0];
  const currentFeature = collaborationFeatures.find(feature => feature.id === activeFeature) || collaborationFeatures[0];

  return (
    <div className="my-24">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">DeSci Collaboration Platform</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Connect with researchers, raise funding, access resources, and create collaborative workspaces 
          free from institutional constraints and bureaucratic hurdles.
        </p>
      </div>

      {/* Collaboration Features */}
      <div className="mb-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
        <h3 className="text-2xl font-semibold text-center mb-8">Decentralized Science Infrastructure</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {collaborationFeatures.map(feature => (
            <button
              key={feature.id}
              className={`p-4 rounded-lg text-left transition-all ${
                activeFeature === feature.id 
                  ? 'bg-white shadow-md border-l-4 border-indigo-500' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              onClick={() => setActiveFeature(feature.id)}
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h4 className="font-semibold text-gray-900">{feature.title}</h4>
            </button>
          ))}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-xl font-semibold text-indigo-700 mb-3">{currentFeature.title}</h4>
          <p className="text-gray-700 mb-4">{currentFeature.description}</p>
          
          {activeFeature === 'find-peers' && (
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h5 className="font-medium mb-2">How Nerd Connects Researchers</h5>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Semantic matching of research interests and expertise</li>
                <li>Anonymous collaboration options to focus on ideas, not credentials</li>
                <li>Discover researchers working on complementary problems</li>
                <li>Connect across disciplines, institutions, and geographical boundaries</li>
                <li>Build research networks based on shared interests, not institutional affiliations</li>
              </ul>
            </div>
          )}
          
          {activeFeature === 'raise-funding' && (
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h5 className="font-medium mb-2">Decentralized Research Funding</h5>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Access to quadratic funding pools for community-valued research</li>
                <li>Connect with research DAOs (Decentralized Autonomous Organizations)</li>
                <li>Create transparent funding proposals with clear milestones</li>
                <li>Crowdfund specific research initiatives from interested communities</li>
                <li>Receive micropayments for incremental research contributions</li>
              </ul>
            </div>
          )}
          
          {activeFeature === 'find-resources' && (
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h5 className="font-medium mb-2">Community Resource Sharing</h5>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Access shared computational resources for intensive research tasks</li>
                <li>Discover open datasets relevant to your research questions</li>
                <li>Find specialized equipment through peer-to-peer sharing networks</li>
                <li>Access journal subscriptions and paywalled content through community pools</li>
                <li>Share and discover specialized research software and tools</li>
              </ul>
            </div>
          )}
          
          {activeFeature === 'create-workspaces' && (
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h5 className="font-medium mb-2">Integrated Research Environments</h5>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Create shared workspaces that integrate with your preferred tools</li>
                <li>Real-time collaboration with version control and change tracking</li>
                <li>Customizable permission systems for different team roles</li>
                <li>Seamless data sharing across distributed research teams</li>
                <li>Integrated communication channels for synchronous and asynchronous work</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Tool Integration Section */}
      <div>
        <h3 className="text-2xl font-semibold text-center mb-8">Integrate with Your Favorite Tools</h3>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {integrationTools.map(tool => (
            <button
              key={tool.id}
              className={`px-4 py-2 rounded-lg flex items-center ${
                selectedTool === tool.id 
                  ? 'bg-indigo-100 text-indigo-800 font-medium' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedTool(tool.id)}
            >
              <div className="w-6 h-6 mr-2 relative">
                <Image 
                  src={tool.icon} 
                  alt={`${tool.name} icon`} 
                  width={24} 
                  height={24} 
                />
              </div>
              <span>{tool.name}</span>
            </button>
          ))}
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 mr-3 relative">
                <Image 
                  src={currentTool.icon} 
                  alt={`${currentTool.name} icon`} 
                  width={40} 
                  height={40} 
                />
              </div>
              <h4 className="text-xl font-semibold">{currentTool.name} Integration</h4>
            </div>
            <p className="text-gray-700">{currentTool.description}</p>
          </div>
          
          <div className="p-6">
            <h5 className="font-medium mb-3">Key Features</h5>
            <ul className="space-y-2">
              {currentTool.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-indigo-500 mr-2">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Join our decentralized science community and transform how research is conducted, 
          funded, and shared—free from traditional gatekeepers and institutional constraints.
        </p>
        <button className={styles.primaryButton}>
          Join the DeSci Movement
        </button>
      </div>
    </div>
  );
};

export default IntegrationSection; 