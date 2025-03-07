export interface Bot {
  slug: string;
  title: string;
  description: string;
  overview: string;
  features: string[];
  details: string;
  tryLink?: string;
}

const bots: Bot[] = [
  {
    slug: 'swiss-german-teacher',
    title: 'Heidi – Your Swiss German Companion',
    description: 'Your AI companion for High German and Züridütsch—try her now and see the difference.',
    overview: 'Smart, simple tools to speak and live like a local.',
    features: [
      'Adapts to You: Tables for words, replies for sentences—built for your needs.',
      'Dual-Language Power: High German and Züridütsch, side by side.',
      'Real Context: Words and phrases come alive with examples.',
      'Instant Writing: Emails and texts crafted in both languages.',
      'Swiss Culture: Insider tips on history and social life.',
      'Local Smarts: Navigate Switzerland like you belong.'
    ],
    details: "Type a word, and Heidi delivers a table comparing High German and Züridütsch with real-life examples. Send a sentence or email, and get a tailored response to communicate effortlessly. With cultural tips and local know-how, she's your shortcut to thriving in Switzerland. Curious? Try her yourself and see the magic.",
    tryLink: 'https://chatgpt.com/g/g-rni41WTSh-heidi-tell'
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
