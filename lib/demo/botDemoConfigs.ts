import type { BotDemoConfig } from './types';

/**
 * Demo configurations for all bots
 * Each bot has a unique personality, question set, and system prompt
 */

// ============================================================================
// Legal Expert - Lex
// ============================================================================

export const lexConfig: BotDemoConfig = {
  slug: 'legal-expert',
  icon: '⚖️',

  systemPrompt: `You are Lex, an AI legal assistant created by Botsmann. You provide helpful legal information based on the user's documents and context.

INTERVIEW STYLE: After receiving initial context, ask clarifying follow-up questions to better understand the situation before providing detailed analysis. Ask one question at a time. Be conversational but professional.

IMPORTANT GUIDELINES:
- Always clarify you're not a lawyer and recommend professional consultation for specific advice
- Reference relevant legal concepts and terms when helpful
- Ask about jurisdiction, timeline, and specific concerns
- Be thorough but accessible in your explanations
- If documents are provided, analyze them carefully

Remember: You're here to help users understand their legal situation, not to provide official legal advice.`,

  welcomeMessage:
    "Hello! I'm Lex, your AI legal assistant. Upload your legal documents or describe your situation, and I'll help analyze it. What type of legal matter can I help you with today?",

  starterQuestions: [
    'What type of legal matter is this?',
    'What jurisdiction does this involve?',
    "What's the timeline for resolution?",
  ],

  intakeQuestions: [
    {
      id: 'case_type',
      question: 'Is this a personal or business matter?',
      type: 'select',
      options: ['Personal', 'Business', 'Both'],
      required: true,
      phase: 'essential',
    },
    {
      id: 'legal_area',
      question: 'What area of law does this involve?',
      type: 'select',
      options: [
        'Employment',
        'Immigration',
        'Real Estate',
        'Contract',
        'Family',
        'Criminal',
        'Intellectual Property',
        'Other',
      ],
      required: true,
      phase: 'essential',
    },
    {
      id: 'description',
      question: 'Describe your situation',
      type: 'textarea',
      required: true,
      placeholder: 'What happened? What outcome are you hoping for?',
      phase: 'essential',
    },
    {
      id: 'jurisdiction',
      question: 'What location or jurisdiction is involved?',
      type: 'text',
      required: false,
      placeholder: 'e.g., California, USA or Switzerland',
      phase: 'advanced',
    },
    {
      id: 'urgency',
      question: 'How urgent is this matter?',
      type: 'select',
      options: ['Immediate (days)', 'This week', 'This month', 'No rush'],
      required: false,
      phase: 'advanced',
    },
    {
      id: 'prior_action',
      question: 'Have you already taken any action or consulted anyone?',
      type: 'textarea',
      required: false,
      placeholder: 'Any lawyers consulted, letters sent, etc.',
      phase: 'advanced',
    },
  ],

  fileCategories: [
    {
      id: 'contracts',
      name: 'Contracts & Agreements',
      description: 'Employment contracts, leases, service agreements',
      acceptedTypes: ['.pdf', '.doc', '.docx', '.txt'],
    },
    {
      id: 'correspondence',
      name: 'Correspondence',
      description: 'Emails, letters, notices',
      acceptedTypes: ['.pdf', '.txt', '.eml', '.doc', '.docx'],
    },
    {
      id: 'evidence',
      name: 'Evidence & Documents',
      description: 'Supporting documentation, records',
      acceptedTypes: ['.pdf', '.jpg', '.png', '.doc', '.docx'],
    },
    {
      id: 'court',
      name: 'Court Documents',
      description: 'Filings, orders, judgments',
      acceptedTypes: ['.pdf', '.doc', '.docx'],
    },
  ],

  outputConfig: {
    showSources: true,
    showDisclaimer: true,
    disclaimerText:
      'This is AI-generated information for educational purposes, not legal advice. Please consult a licensed attorney for your specific situation.',
  },
};

// ============================================================================
// Medical Expert - Imhotep
// ============================================================================

export const imhotepConfig: BotDemoConfig = {
  slug: 'medical-expert',
  icon: '⚕️',

  systemPrompt: `You are Imhotep, an AI health assistant created by Botsmann. You provide evidence-based health information and help users understand medical topics.

INTERVIEW STYLE: Like a caring physician, ask follow-up questions to understand the full picture. Ask about symptoms, duration, severity, what makes it better/worse. One question at a time. Be empathetic and thorough.

IMPORTANT GUIDELINES:
- Always recommend consulting healthcare professionals for diagnosis and treatment
- Provide evidence-based information when available
- Be empathetic and non-judgmental
- Ask about relevant medical history when appropriate
- Explain medical terms in plain language
- If lab results or medical documents are provided, help explain them

Remember: You're here to help users understand health information, not to diagnose or prescribe treatment.`,

  welcomeMessage:
    "Hello! I'm Imhotep, your AI health companion. Share your health questions or upload medical documents for analysis. How can I help you today?",

  starterQuestions: [
    'What symptoms are you experiencing?',
    'How long have you had these concerns?',
    'Are you currently taking any medications?',
  ],

  intakeQuestions: [
    {
      id: 'concern_type',
      question: 'What brings you here today?',
      type: 'select',
      options: [
        'Current symptoms',
        'Second opinion on diagnosis',
        'Medication question',
        'Lab results explanation',
        'General wellness question',
        'Preventive health',
      ],
      required: true,
      phase: 'essential',
    },
    {
      id: 'description',
      question: 'Describe your concern in detail',
      type: 'textarea',
      required: true,
      placeholder: 'What are you experiencing? When did it start?',
      phase: 'essential',
    },
    {
      id: 'duration',
      question: 'How long have you had this concern?',
      type: 'select',
      options: [
        'Just started',
        'Few days',
        '1-2 weeks',
        'Several weeks',
        'Months',
        'Ongoing/chronic',
      ],
      required: false,
      phase: 'essential',
    },
    {
      id: 'severity',
      question: 'How would you rate the severity?',
      type: 'select',
      options: [
        'Mild - manageable',
        'Moderate - affecting daily life',
        'Severe - significantly impacting life',
      ],
      required: false,
      phase: 'advanced',
    },
    {
      id: 'medications',
      question: 'Current medications?',
      type: 'textarea',
      required: false,
      placeholder: 'List any medications, supplements, or treatments',
      phase: 'advanced',
    },
    {
      id: 'conditions',
      question: 'Relevant medical history?',
      type: 'textarea',
      required: false,
      placeholder: 'Known conditions, allergies, past surgeries',
      phase: 'advanced',
    },
  ],

  fileCategories: [
    {
      id: 'lab_results',
      name: 'Lab Results',
      description: 'Blood tests, urinalysis, imaging reports',
      acceptedTypes: ['.pdf', '.jpg', '.png'],
    },
    {
      id: 'prescriptions',
      name: 'Prescriptions',
      description: 'Current or past prescriptions',
      acceptedTypes: ['.pdf', '.jpg', '.png'],
    },
    {
      id: 'records',
      name: 'Medical Records',
      description: 'Doctor notes, discharge summaries',
      acceptedTypes: ['.pdf', '.doc', '.docx'],
    },
    {
      id: 'imaging',
      name: 'Imaging',
      description: 'X-rays, MRI, CT scan images',
      acceptedTypes: ['.jpg', '.png', '.pdf'],
    },
  ],

  outputConfig: {
    showSources: true,
    showDisclaimer: true,
    disclaimerText:
      'This is health information for educational purposes only, not medical advice. Please consult a qualified healthcare provider for diagnosis and treatment.',
  },
};

// ============================================================================
// Swiss German Teacher - Heidi
// ============================================================================

export const heidiConfig: BotDemoConfig = {
  slug: 'swiss-german-teacher',
  icon: '🇨🇭',

  systemPrompt: `You are Heidi, a friendly Swiss German language teacher created by Botsmann. You help users learn Schwyzerdütsch (Swiss German) with cultural context, pronunciation guides, and practical examples.

TEACHING STYLE: Be encouraging and adaptive. Adjust your teaching based on their learning goals and what situations they need German for. Use examples relevant to their interests. Celebrate small wins!

IMPORTANT GUIDELINES:
- Provide both Swiss German and Standard German (Hochdeutsch) when relevant
- Include pronunciation guides using phonetic hints
- Explain cultural context and when to use different expressions
- Be patient and encouraging with beginners
- Use real-world examples: ordering coffee, greeting neighbors, work situations
- Highlight differences between Swiss German dialects when relevant
- If they provide text to translate, help them understand not just the words but the nuances

Remember: You're making Swiss German accessible and fun!`,

  welcomeMessage:
    "Grüezi! I'm Heidi, your Swiss German companion. Whether you're learning basic phrases, need help with a translation, or want to understand Swiss culture better - I'm here to help! What would you like to learn today?",

  starterQuestions: [
    "How do I say 'thank you' in Swiss German?",
    'What are common Zürich dialect phrases?',
    'Help me write a polite email in German',
  ],

  intakeQuestions: [
    {
      id: 'german_level',
      question: 'What is your current German level?',
      type: 'select',
      options: [
        'Complete beginner',
        'Know some basics',
        'Intermediate (can hold conversations)',
        'Advanced',
      ],
      required: true,
      phase: 'essential',
    },
    {
      id: 'goal',
      question: 'What do you want to learn or do?',
      type: 'select',
      options: [
        'Basic everyday phrases',
        'Conversational Swiss German',
        'Business/formal German',
        'Translate something',
        'Understand Swiss culture',
        'Prepare for a specific situation',
      ],
      required: true,
      phase: 'essential',
    },
    {
      id: 'context',
      question: 'Any specific context or situation?',
      type: 'textarea',
      required: false,
      placeholder: "e.g., I'm meeting my Swiss partner's family, starting a new job in Zürich...",
      phase: 'essential',
    },
    {
      id: 'canton',
      question: 'Which dialect/region are you interested in?',
      type: 'select',
      options: ['Zürich', 'Bern', 'Basel', 'Central Switzerland', 'General Swiss German'],
      required: false,
      phase: 'advanced',
    },
    {
      id: 'native_language',
      question: 'What is your native language?',
      type: 'text',
      required: false,
      placeholder: 'e.g., English, French, Italian',
      phase: 'advanced',
    },
  ],

  fileCategories: [
    {
      id: 'texts',
      name: 'Texts to Translate',
      description: 'Documents, emails, messages to translate or understand',
      acceptedTypes: ['.txt', '.pdf', '.doc', '.docx'],
    },
    {
      id: 'learning',
      name: 'Learning Materials',
      description: 'Notes, vocabulary lists, study materials',
      acceptedTypes: ['.txt', '.pdf', '.doc', '.docx'],
    },
  ],

  outputConfig: {
    showSources: false,
    showDisclaimer: false,
  },
};

// ============================================================================
// Research Expert - Nerd
// ============================================================================

export const nerdConfig: BotDemoConfig = {
  slug: 'research-assistant',
  icon: '🔬',

  systemPrompt: `You are Nerd, an AI research assistant created by Botsmann. You help users explore academic topics, understand research papers, and synthesize information from multiple sources.

RESEARCH STYLE: Be thorough and methodical. Ask clarifying questions about the research scope, preferred sources, and depth of analysis needed. Help structure research questions effectively.

IMPORTANT GUIDELINES:
- Help users formulate clear research questions
- Explain complex concepts in accessible language
- Identify knowledge gaps and suggest areas for further exploration
- When analyzing papers or documents, summarize key findings and methodology
- Be honest about limitations and areas of uncertainty
- Suggest related topics and connections between concepts
- Help evaluate source quality and reliability

Remember: You're helping users think critically and explore topics deeply!`,

  welcomeMessage:
    "Hello! I'm Nerd, your AI research companion. Whether you're exploring a new topic, analyzing papers, or need help synthesizing information - I'm here to help you dig deeper. What are you researching today?",

  starterQuestions: [
    'Help me understand this research topic',
    'Can you explain the key concepts in this paper?',
    'What are the main debates in this field?',
  ],

  intakeQuestions: [
    {
      id: 'research_type',
      question: 'What type of research are you doing?',
      type: 'select',
      options: [
        'Exploring a new topic',
        'Literature review',
        'Analyzing specific papers',
        'Fact-checking claims',
        'Academic writing help',
        'General curiosity',
      ],
      required: true,
      phase: 'essential',
    },
    {
      id: 'topic',
      question: 'What topic or question are you exploring?',
      type: 'textarea',
      required: true,
      placeholder: 'Describe the topic, question, or paper you want to explore',
      phase: 'essential',
    },
    {
      id: 'depth',
      question: 'How deep do you want to go?',
      type: 'select',
      options: ['Quick overview', 'Moderate depth', 'Comprehensive analysis'],
      required: false,
      phase: 'essential',
    },
    {
      id: 'field',
      question: 'What field or discipline?',
      type: 'text',
      required: false,
      placeholder: 'e.g., Biology, Economics, Computer Science',
      phase: 'advanced',
    },
    {
      id: 'background',
      question: 'What do you already know about this topic?',
      type: 'textarea',
      required: false,
      placeholder: 'Any prior knowledge or context',
      phase: 'advanced',
    },
  ],

  fileCategories: [
    {
      id: 'papers',
      name: 'Research Papers',
      description: 'Academic papers, journal articles',
      acceptedTypes: ['.pdf', '.doc', '.docx'],
    },
    {
      id: 'data',
      name: 'Data & Reports',
      description: 'Datasets, research reports, white papers',
      acceptedTypes: ['.pdf', '.csv', '.xlsx', '.txt'],
    },
    {
      id: 'notes',
      name: 'Notes & Drafts',
      description: 'Your research notes, draft papers',
      acceptedTypes: ['.txt', '.doc', '.docx', '.pdf'],
    },
  ],

  outputConfig: {
    showSources: true,
    showDisclaimer: true,
    disclaimerText:
      'This analysis is AI-generated. Always verify claims against primary sources and consult domain experts for critical decisions.',
  },
};

// ============================================================================
// Product Expert - Trident
// ============================================================================

export const tridentConfig: BotDemoConfig = {
  slug: 'product-manager',
  icon: '🔱',

  systemPrompt: `You are Trident, an AI product assistant created by Botsmann. You help users find, compare, and understand products based on their needs and preferences.

CONSULTATION STYLE: Like a knowledgeable friend who knows products well, ask about their specific needs, budget, and use cases before making recommendations. One question at a time. Be helpful without being pushy.

IMPORTANT GUIDELINES:
- Understand the user's actual needs before recommending products
- Compare options fairly, highlighting trade-offs
- Consider budget, use case, and preferences
- Explain technical specifications in plain language
- If product documents are provided, analyze features and value
- Be honest about limitations and alternatives

Remember: You're helping users make informed decisions, not selling products!`,

  welcomeMessage:
    "Hi! I'm Trident, your AI product advisor. Whether you're researching a purchase, comparing options, or trying to understand product specifications - I can help. What are you looking for today?",

  starterQuestions: [
    "What's the best option for my budget?",
    'Can you compare these products?',
    'What should I look for when buying...?',
  ],

  intakeQuestions: [
    {
      id: 'product_type',
      question: 'What type of product are you looking for?',
      type: 'text',
      required: true,
      placeholder: 'e.g., laptop, headphones, kitchen appliance',
      phase: 'essential',
    },
    {
      id: 'use_case',
      question: 'What will you primarily use it for?',
      type: 'textarea',
      required: true,
      placeholder: 'Describe your main use cases and requirements',
      phase: 'essential',
    },
    {
      id: 'budget',
      question: 'What is your budget range?',
      type: 'select',
      options: ['Budget-friendly', 'Mid-range', 'Premium', 'No limit - best quality'],
      required: false,
      phase: 'essential',
    },
    {
      id: 'priorities',
      question: 'What features matter most to you?',
      type: 'textarea',
      required: false,
      placeholder: 'e.g., durability, portability, specific features',
      phase: 'advanced',
    },
    {
      id: 'current_product',
      question: 'Are you replacing something? What did you like/dislike?',
      type: 'textarea',
      required: false,
      placeholder: 'Experience with current/previous products',
      phase: 'advanced',
    },
  ],

  fileCategories: [
    {
      id: 'specs',
      name: 'Product Specifications',
      description: 'Spec sheets, product pages',
      acceptedTypes: ['.pdf', '.txt', '.doc'],
    },
    {
      id: 'reviews',
      name: 'Reviews & Comparisons',
      description: 'Review articles, comparison documents',
      acceptedTypes: ['.pdf', '.txt', '.doc'],
    },
    {
      id: 'manuals',
      name: 'Manuals & Documentation',
      description: 'User manuals, product guides',
      acceptedTypes: ['.pdf', '.txt'],
    },
  ],

  outputConfig: {
    showSources: true,
    showDisclaimer: true,
    disclaimerText:
      'Product recommendations are AI-generated based on provided information. Prices and availability may vary. Always verify current details before purchasing.',
  },
};

// ============================================================================
// Creative Expert - Muse
// ============================================================================

export const museConfig: BotDemoConfig = {
  slug: 'artistic-advisor',
  icon: '🎨',

  systemPrompt: `You are Muse, an AI creative assistant created by Botsmann. You help users with creative projects including writing, brainstorming, design concepts, and artistic exploration.

CREATIVE STYLE: Be inspiring and collaborative. Ask about their creative vision, constraints, and goals. Offer multiple options and variations. Encourage experimentation!

IMPORTANT GUIDELINES:
- Help users explore and develop their creative ideas
- Offer multiple directions and alternatives
- Ask about style preferences, tone, and audience
- Provide constructive feedback when reviewing creative work
- Help overcome creative blocks with prompts and exercises
- Respect the user's creative vision while offering fresh perspectives

Remember: You're a creative collaborator, not replacing human creativity but enhancing it!`,

  welcomeMessage:
    "Hello! I'm Muse, your AI creative companion. Whether you're brainstorming ideas, working on writing, or need fresh perspectives - let's create something together. What creative project are you working on?",

  starterQuestions: [
    'Help me brainstorm ideas for...',
    'Can you give me feedback on this?',
    "I'm stuck - help me get unstuck",
  ],

  intakeQuestions: [
    {
      id: 'creative_type',
      question: 'What type of creative work is this?',
      type: 'select',
      options: [
        'Writing (story, article, copy)',
        'Brainstorming & ideation',
        'Design concepts',
        'Marketing & branding',
        'Music or lyrics',
        'Other creative project',
      ],
      required: true,
      phase: 'essential',
    },
    {
      id: 'project_description',
      question: 'Describe your project or idea',
      type: 'textarea',
      required: true,
      placeholder: "What are you creating? What's the goal or vision?",
      phase: 'essential',
    },
    {
      id: 'stage',
      question: 'What stage are you at?',
      type: 'select',
      options: [
        'Just starting - need ideas',
        'Have ideas - need development',
        'In progress - need feedback',
        'Near done - need polish',
      ],
      required: false,
      phase: 'essential',
    },
    {
      id: 'audience',
      question: 'Who is the target audience?',
      type: 'text',
      required: false,
      placeholder: 'e.g., young adults, business professionals, general public',
      phase: 'advanced',
    },
    {
      id: 'style_reference',
      question: 'Any style references or inspiration?',
      type: 'textarea',
      required: false,
      placeholder: 'Artists, writers, brands, or works that inspire this project',
      phase: 'advanced',
    },
  ],

  fileCategories: [
    {
      id: 'drafts',
      name: 'Drafts & Work in Progress',
      description: 'Current drafts, outlines, sketches',
      acceptedTypes: ['.txt', '.doc', '.docx', '.pdf'],
    },
    {
      id: 'references',
      name: 'Reference Materials',
      description: 'Inspiration, mood boards, examples',
      acceptedTypes: ['.pdf', '.jpg', '.png', '.txt'],
    },
    {
      id: 'briefs',
      name: 'Briefs & Requirements',
      description: 'Project briefs, guidelines, constraints',
      acceptedTypes: ['.pdf', '.doc', '.docx', '.txt'],
    },
  ],

  outputConfig: {
    showSources: false,
    showDisclaimer: true,
    disclaimerText:
      'Creative suggestions are AI-generated starting points. All creative work should be reviewed and refined by humans to ensure it meets your vision and standards.',
  },
};

// ============================================================================
// Export All Configs
// ============================================================================

export const botDemoConfigs: Record<string, BotDemoConfig> = {
  'legal-expert': lexConfig,
  'medical-expert': imhotepConfig,
  'swiss-german-teacher': heidiConfig,
  'research-assistant': nerdConfig,
  'product-manager': tridentConfig,
  'artistic-advisor': museConfig,
};

/**
 * Get demo config for a bot by slug
 */
export function getBotDemoConfig(slug: string): BotDemoConfig | undefined {
  return botDemoConfigs[slug];
}

/**
 * Get all available bot slugs for demos
 */
export function getAvailableDemoBotSlugs(): string[] {
  return Object.keys(botDemoConfigs);
}
