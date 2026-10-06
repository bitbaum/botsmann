import type { BotMenuItem, BotAccentColor } from '../types/bot';

export interface Bot {
  slug: string;
  title: string;
  description: string;
  overview: string;
  features: string[];
  details: string;
  tryLink?: string;
  // Navigation configuration (optional for backwards compatibility)
  nav?: {
    navTitle: string;
    emoji: string;
    navDescription?: string;
    accentColor: BotAccentColor;
    menuItems: BotMenuItem[];
  };
  // Display metadata for bots list page (optional with fallbacks)
  display?: {
    tagline: string;
    whatItDoes: string;
    inputData: string;
    output: string;
    useCases: string[];
  };
}

const bots: Bot[] = [
  {
    slug: 'swiss-german-teacher',
    title: 'Heidi – Your Swiss German Companion',
    description:
      "Your AI companion for High German and Züridütsch—learn the language and discover tonight's events in Zurich.",
    overview: 'Smart, simple tools to speak, learn, and live like a local in Zurich.',
    features: [
      'Adapts to You: Learns your tastes and tests your progress in a smart way.',
      "Events in Zurich: Discover tonight's events and activities for this week.",
      'Dual-Language Power: High German and Züridütsch, side by side.',
      'Real Context: Words and phrases come alive with examples.',
      'Instant Writing: Emails and texts crafted in both languages.',
      'Swiss Culture: Insider tips on history and social life.',
    ],
    details:
      "Type a word, and Heidi delivers a table comparing High German and Züridütsch with real-life examples. Send a sentence or email, and get a tailored response to communicate effortlessly. Discover tonight's events in Zurich with the 'Browse Events' feature. Heidi follows your learning progress, tests you in a smart way, and helps you remember more while introducing you to local activities. With cultural tips and local know-how, she's your shortcut to thriving in Switzerland.",
    tryLink: 'https://chatgpt.com/g/g-rni41WTSh-heidi-tell',
    nav: {
      navTitle: 'Heidi',
      emoji: '🇨🇭',
      navDescription: 'Swiss German Teacher',
      accentColor: 'red',
      menuItems: [
        { id: 'demo', label: 'Demo', icon: '💬', section: 'demo' },
        { id: 'features', label: 'Features', icon: '✨', section: 'features' },
        { id: 'learning', label: 'Learning', icon: '📖', section: 'language-learning' },
        { id: 'communication', label: 'Communication', icon: '✉️', section: 'communication' },
      ],
    },
    display: {
      tagline: 'Master Schwyzerdütsch naturally',
      whatItDoes:
        'Provides contextual Swiss German learning with cultural insights and canton-specific variations',
      inputData: 'Your German level, target canton, learning goals',
      output: 'Personalized lessons, pronunciation guides, cultural context',
      useCases: [
        'Moving to Switzerland',
        'Work in Swiss companies',
        'Connect with locals',
        'Canton-specific dialects',
      ],
    },
  },
  {
    slug: 'research-assistant',
    title: 'Research Assistant',
    description:
      'AI-powered research companion for organizing data, generating insights, and discovering connections.',
    overview: 'An AI research partner that drafts with you and questions your thinking.',
    features: ['AI-Generated Research Drafts', 'Questions that challenge your assumptions'],
    details:
      'Nerd helps academics, scientists, journalists, and industry professionals work through their material. It turns rough notes into structured drafts and asks the questions that expose gaps in an argument.',
    nav: {
      navTitle: 'Nerd',
      emoji: '🔬',
      navDescription: 'AI Research Assistant',
      accentColor: 'indigo',
      menuItems: [
        { id: 'demo', label: 'Demo', icon: '💻', section: 'demo' },
        { id: 'features', label: 'Features', icon: '✨', section: 'features' },
        { id: 'drafts', label: 'Drafts', icon: '✍️', section: 'drafts' },
        { id: 'vision', label: 'Vision', icon: '🚀', section: 'vision' },
      ],
    },
    display: {
      tagline: 'Accelerate your research workflow',
      whatItDoes: 'Drafts with you, questions your thinking, and synthesizes findings',
      inputData: 'Research papers, notes, queries, data sets',
      output: 'Literature reviews, summaries, insights',
      useCases: [
        'Academic research',
        'Market analysis',
        'Patent research',
        'Technical documentation',
      ],
    },
  },
  {
    slug: 'medical-expert',
    title: 'Medical Expert Assistant',
    description: 'AI-powered medical knowledge and consultation support',
    overview:
      'Supporting healthcare professionals with evidence-based insights and comprehensive research analysis.',
    features: [
      'Evidence-based insights',
      'Research assistance',
      'Case analysis',
      'Medical literature review',
      'Clinical guidelines integration',
    ],
    details:
      'Designed to assist medical professionals in staying current with research, analyzing cases, and making informed decisions based on the latest medical evidence.',
    nav: {
      navTitle: 'Imhotep',
      emoji: '⚕️',
      navDescription: 'AI Health Assistant',
      accentColor: 'green',
      menuItems: [
        { id: 'demo', label: 'Demo', icon: '💻', section: 'demo' },
        { id: 'features', label: 'Features', icon: '✨', section: 'features' },
        { id: 'professionals', label: 'For Professionals', icon: '👨‍⚕️', section: 'professionals' },
        { id: 'medbox', label: 'MedBox', icon: '🔬', section: 'medbox' },
        { id: 'health-topics', label: 'Topics', icon: '🩺', section: 'health-topics' },
        { id: 'vision', label: 'Vision', icon: '🚀', section: 'vision' },
      ],
    },
    display: {
      tagline: 'Evidence-based health insights',
      whatItDoes:
        'Analyzes medical literature, symptoms, and data to provide evidence-based health information',
      inputData: 'Symptoms, medical history, lab results, research papers',
      output: 'Evidence-based insights, specialist recommendations, treatment options',
      useCases: [
        'Second opinions',
        'Research rare conditions',
        'Treatment comparisons',
        'Clinical studies',
      ],
    },
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
      'Contract review assistance',
    ],
    details:
      'Our Legal Expert Assistant combines advanced legal knowledge with AI capabilities to provide comprehensive support for legal research and analysis.',
    nav: {
      navTitle: 'Lex',
      emoji: '⚖️',
      navDescription: 'AI Legal Assistant',
      accentColor: 'blue',
      menuItems: [
        { id: 'demo', label: 'Demo', icon: '💻', section: 'demo' },
        { id: 'features', label: 'Features', icon: '⚖️', section: 'features' },
        { id: 'vision', label: 'Vision', icon: '🚀', section: 'vision' },
        { id: 'technology', label: 'Technology', icon: '⚙️', section: 'technology' },
        { id: 'get-started', label: 'Get Started', icon: '✨', section: 'cta' },
      ],
    },
    display: {
      tagline: 'Your AI-powered legal companion',
      whatItDoes:
        'Reviews contracts, answers legal questions, and analyzes cases in plain language',
      inputData: 'Legal documents, case descriptions, jurisdiction info',
      output: 'Case analysis, contract review, plain-language explanations',
      useCases: [
        'Immigration cases',
        'Employment disputes',
        'Real estate contracts',
        'Business law',
      ],
    },
  },
  {
    slug: 'artistic-advisor',
    title: 'Artistic Advisor',
    description: 'Enhance your creative process with AI insights',
    overview:
      'Get expert guidance on composition, style analysis, and technique refinement for your artistic projects.',
    features: [
      'Style analysis',
      'Composition guidance',
      'Technique suggestions',
      'Color theory assistance',
      'Art history insights',
    ],
    details:
      'The Artistic Advisor AI helps artists explore new techniques, refine their style, and gain insights from art history while maintaining their unique creative vision.',
    nav: {
      navTitle: 'Muse',
      emoji: '🎨',
      navDescription: 'AI Artistic Advisor',
      accentColor: 'amber',
      menuItems: [
        { id: 'demo', label: 'Demo', icon: '🖼️', section: 'demo' },
        { id: 'features', label: 'Features', icon: '✨', section: 'features' },
        { id: 'how-it-works', label: 'How It Works', icon: '🎨', section: 'how-it-works' },
        { id: 'get-started', label: 'Get Started', icon: '🚀', section: 'cta' },
      ],
    },
    display: {
      tagline: 'Your creative co-pilot',
      whatItDoes:
        'Analyzes art styles, generates creative concepts, and provides artistic feedback and guidance',
      inputData: 'Art references, style preferences, project briefs',
      output: 'Style analysis, creative concepts, technical feedback',
      useCases: [
        'Style exploration',
        'Concept development',
        'Art history research',
        'Portfolio review',
      ],
    },
  },
  {
    slug: 'product-manager',
    title: 'Trident - AI Product Manager',
    description: 'AI-powered product manager for Cursor development and project management',
    overview:
      'A specialized tool that combines project management capabilities with technical guidance to streamline development workflow in Cursor.',
    features: [
      'Project Management: Organize tasks and deliverables for efficient development',
      'Technical Direction: Implementation-ready specifications for developers',
      'Workflow Optimization: Streamline development processes and eliminate roadblocks',
      'Implementation Planning: Detailed roadmaps for feature development',
      'Quality Assurance: Comprehensive testing and validation strategies',
      'Cursor-Optimized: Specifically designed for Cursor development workflow',
    ],
    details:
      'Trident transforms the development process by providing comprehensive project management and technical guidance. It helps organize tasks, create detailed implementation plans, and optimize workflows specifically for Cursor development. By leveraging AI capabilities, it produces clear specifications, architecture diagrams, and risk assessments that developers can immediately use for implementation.',
    nav: {
      navTitle: 'Trident',
      emoji: '🔱',
      navDescription: 'AI Product Manager',
      accentColor: 'indigo',
      menuItems: [
        { id: 'demo', label: 'Demo', icon: '💻', section: 'demo' },
        { id: 'features', label: 'Features', icon: '✨', section: 'features' },
        { id: 'benefits', label: 'Benefits', icon: '⚡', section: 'benefits' },
        { id: 'showcase', label: 'Showcase', icon: '🎯', section: 'showcase' },
      ],
    },
    display: {
      tagline: 'Strategic product development',
      whatItDoes:
        'Analyzes market data, user feedback, and competitive landscape to guide product strategy',
      inputData: 'User feedback, market data, feature requests, analytics',
      output: 'Product roadmaps, prioritization, competitive analysis',
      useCases: ['Feature prioritization', 'Market analysis', 'User research', 'Roadmap planning'],
    },
  },
];

export default bots;

/**
 * Helper to get a bot by slug
 */
export const getBotBySlug = (slug: string): Bot | undefined => {
  return bots.find((b) => b.slug === slug);
};

/**
 * Helper to get bot's try link (returns undefined if not available)
 */
export const getBotTryLink = (bot: Bot | undefined): string | undefined => {
  return bot?.tryLink;
};
