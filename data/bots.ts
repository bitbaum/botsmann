export interface Bot {
  slug: string;
  title: string;
  description: string;
  overview: string;
  features: string[];
  details: string;
}

const bots: Bot[] = [
  {
    slug: 'swiss-german-teacher',
    title: 'Swiss German Teacher',
    description: 'Master Swiss German with our AI language tutor',
    overview: 'Learn authentic dialects and cultural nuances through interactive conversations with our specialized language AI.',
    features: [
      'Dialect-specific lessons',
      'Interactive conversations',
      'Cultural context',
      'Pronunciation feedback',
      'Customized learning pace'
    ],
    details: 'Our Swiss German Teacher AI provides personalized language instruction, helping you master both the language and cultural aspects of Swiss German communication.'
  },
  {
    slug: 'medical-expert',
    title: 'Medical Expert Assistant',
    description: 'AI-powered medical knowledge and consultation support',
    overview: 'Supporting healthcare professionals with evidence-based insights and comprehensive research analysis.',
    features: [
      'Evidence-based insights',
      'Research assistance',
      'Case analysis',
      'Medical literature review',
      'Clinical guidelines integration'
    ],
    details: 'Designed to assist medical professionals in staying current with research, analyzing cases, and making informed decisions based on the latest medical evidence.'
  },
  {
    slug: 'legal-expert',
    title: 'Legal Expert Assistant',
    description: 'Navigate legal complexities with AI guidance',
    overview: 'Comprehensive legal research and analysis support for legal professionals.',
    features: [
      'Legal research',
      'Document analysis',
      'Case law insights',
      'Regulatory compliance',
      'Contract review assistance'
    ],
    details: 'Our Legal Expert Assistant combines advanced legal knowledge with AI capabilities to provide comprehensive support for legal research and analysis.'
  },
  {
    slug: 'artistic-advisor',
    title: 'Artistic Advisor',
    description: 'Enhance your creative process with AI insights',
    overview: 'Get expert guidance on composition, style analysis, and technique refinement for your artistic projects.',
    features: [
      'Style analysis',
      'Composition guidance',
      'Technique suggestions',
      'Color theory assistance',
      'Art history insights'
    ],
    details: 'The Artistic Advisor AI helps artists explore new techniques, refine their style, and gain insights from art history while maintaining their unique creative vision.'
  }
];

export default bots;
