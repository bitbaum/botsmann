/**
 * Bot Page Configuration System
 * SSOT for all bot page content and structure
 *
 * To add a new bot:
 * 1. Add entry to botPageConfigs below
 * 2. Add hero config to data/botHeroConfigs.ts
 * 3. Add demo config to lib/demo/botDemoConfigs.ts
 * 4. Add basic bot info to data/bots.ts
 * That's it! No new page files needed.
 */

// ============================================================================
// Section Types
// ============================================================================

export type SectionType =
  | 'hero'
  | 'disclaimer'
  | 'demo'
  | 'features'
  | 'how-it-works'
  | 'benefits'
  | 'testimonials'
  | 'vision'
  | 'technology'
  | 'cta'
  | 'custom';

// ============================================================================
// Section Content Types
// ============================================================================

export interface DisclaimerContent {
  title?: string;
  items: Array<{
    icon: string;
    text: string;
  }>;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesContent {
  badge?: string;
  title: string;
  subtitle?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
}

export interface HowItWorksStep {
  number?: number;
  icon?: string;
  title: string;
  description: string;
}

export interface HowItWorksContent {
  title: string;
  subtitle?: string;
  steps: HowItWorksStep[];
}

export interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

export interface BenefitsContent {
  badge?: string;
  title: string;
  subtitle?: string;
  benefits: BenefitItem[];
  columns?: 2 | 3 | 4;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  tag?: string;
}

export interface TestimonialsContent {
  badge?: string;
  title: string;
  subtitle?: string;
  testimonials: TestimonialItem[];
  cta?: {
    text: string;
    href: string;
  };
}

export interface VisionPhase {
  phase: string;
  status: 'completed' | 'in-progress' | 'planned' | 'vision';
  title: string;
  timeline?: string;
  description: string;
  capabilities?: string[];
}

export interface VisionContent {
  badge?: string;
  title: string;
  subtitle?: string;
  mission?: {
    title: string;
    description: string;
  };
  principles?: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
  phases?: VisionPhase[];
  benefits?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export interface TechItem {
  icon?: string;
  title: string;
  description: string;
}

export interface TechCategory {
  title: string;
  items: TechItem[];
}

export interface TechnologyContent {
  badge?: string;
  title: string;
  subtitle?: string;
  categories: TechCategory[];
  architecture?: {
    title: string;
    layers: Array<{
      title: string;
      description: string;
    }>;
  };
  principles?: Array<{
    label: string;
    description: string;
  }>;
  feedbackForm?: {
    title: string;
    description: string;
    types: string[];
  };
}

export interface CTAContent {
  title: string;
  subtitle?: string;
  primaryButton: {
    text: string;
    useTryLink?: boolean;
    href?: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  metrics?: Array<{
    label: string;
    value?: string;
    dynamic?: boolean;
  }>;
  note?: string;
}

export interface DemoContent {
  title: string;
  subtitle: string;
}

export interface CustomSectionContent {
  component: string;
  props?: Record<string, unknown>;
}

// ============================================================================
// Section Configuration
// ============================================================================

export interface SectionConfig {
  id: string;
  type: SectionType;
  content:
    | DisclaimerContent
    | FeaturesContent
    | HowItWorksContent
    | BenefitsContent
    | TestimonialsContent
    | VisionContent
    | TechnologyContent
    | CTAContent
    | DemoContent
    | CustomSectionContent
    | null; // null for hero (uses botHeroConfigs)
  isLast?: boolean;
}

// ============================================================================
// Bot Page Configuration
// ============================================================================

export interface BotPageConfig {
  slug: string;
  displayName: string;
  sections: SectionConfig[];
  styles?: string; // Optional CSS file path
}

// ============================================================================
// Bot Page Configurations
// ============================================================================

export const botPageConfigs: Record<string, BotPageConfig> = {
  'legal-expert': {
    slug: 'legal-expert',
    displayName: 'Lex',
    sections: [
      { id: 'hero', type: 'hero', content: null },
      {
        id: 'disclaimer',
        type: 'disclaimer',
        content: {
          items: [
            {
              icon: '📚',
              text: 'Lex provides information for educational purposes only and is not a substitute for professional legal advice.',
            },
            {
              icon: '⚖️',
              text: 'Always consult a qualified attorney for specific legal matters. Use of Lex does not create an attorney-client relationship.',
            },
          ],
        } as DisclaimerContent,
      },
      {
        id: 'demo',
        type: 'demo',
        content: {
          title: 'Try Lex Now',
          subtitle:
            'Experience how Lex can help analyze your legal situation. Describe your case and get AI-powered insights.',
        } as DemoContent,
      },
      {
        id: 'features',
        type: 'features',
        content: {
          badge: 'Platform Features',
          title: 'Everything You Need in One Workspace',
          subtitle:
            'Collaborative data rooms designed for modern legal work. Secure, transparent, and built for teams.',
          columns: 3,
          features: [
            {
              icon: '🤖',
              title: 'AI + Human Collaboration',
              description:
                'Chat with AI 24/7, human lawyer joins when needed. No appointments required.',
            },
            {
              icon: '🔐',
              title: 'Multi-Level Access Control',
              description: 'Granular permissions for your entire team. Control who sees what.',
            },
            {
              icon: '📁',
              title: 'Smart File Organization',
              description: 'AI auto-categorizes and analyzes documents. 8 intelligent categories.',
            },
            {
              icon: '🌍',
              title: '130+ Jurisdictions',
              description: 'All 50 US states, 27 EU countries, 26 Swiss cantons, and more.',
            },
            {
              icon: '📋',
              title: 'Complete Audit Trail',
              description: 'Every action logged and encrypted. Full transparency for compliance.',
            },
            {
              icon: '💬',
              title: 'Real-Time Collaboration',
              description: 'Live chat, file sharing, annotations. Everyone stays in sync.',
            },
          ],
        } as FeaturesContent,
      },
      {
        id: 'how-it-works',
        type: 'how-it-works',
        content: {
          title: 'How Lex Works',
          steps: [
            {
              icon: '📝',
              title: 'Describe Your Case',
              description:
                'Select jurisdiction, legal area, upload files, and describe your situation.',
            },
            {
              icon: '🎯',
              title: 'Match with Lawyer',
              description: 'AI finds the perfect attorney based on expertise and availability.',
            },
            {
              icon: '🏗️',
              title: 'Workspace Created',
              description: 'Private data room set up with files organized and encrypted.',
            },
            {
              icon: '🚀',
              title: 'Start Collaborating',
              description: 'Chat with AI & lawyer, manage files, track timeline.',
            },
          ],
        } as HowItWorksContent,
      },
      {
        id: 'benefits',
        type: 'benefits',
        content: {
          title: 'Perfect For',
          columns: 4,
          benefits: [
            {
              icon: '👤',
              title: 'Individuals',
              description: 'Immigration, family law, employment disputes, tenant rights',
            },
            {
              icon: '🏢',
              title: 'Small Businesses',
              description: 'Contracts, compliance, IP protection, employment law',
            },
            {
              icon: '⚖️',
              title: 'Law Firms',
              description: 'Case management, client collaboration, document workflow',
            },
            {
              icon: '🏛️',
              title: 'Legal Teams',
              description: 'Corporate legal, compliance teams, in-house counsel',
            },
          ],
        } as BenefitsContent,
      },
      {
        id: 'testimonials',
        type: 'testimonials',
        content: {
          badge: 'What Legal Professionals Say',
          title: 'Trusted by Legal Professionals',
          subtitle:
            'Legal experts collaborate in AI-powered data rooms with multi-level privacy controls.',
          testimonials: [
            {
              quote:
                'The team behind Lex is doing something extraordinary. Their combination of deep legal understanding and cutting-edge AI is impressive.',
              author: '@LegalEagle_CH',
              role: 'Partner, International Law Firm',
              company: 'Zurich, Switzerland',
              tag: 'Corporate Law',
            },
            {
              quote:
                "I've reviewed their technical approach and vision for AI-assisted legal work. The methodology is sound and forward-thinking.",
              author: '@TechLawProf',
              role: 'Professor of Legal Tech',
              company: 'University of St. Gallen',
              tag: 'Legal Technology',
            },
            {
              quote:
                "What impressed me most is their commitment to building this responsibly. They're not promising overnight transformation.",
              author: '@DataRoomQueen',
              role: 'Legal Counsel, Tech Startup',
              company: 'Berlin, Germany',
              tag: 'Tech & IP Law',
            },
          ],
          cta: {
            text: 'Join Legal Professionals Shaping the Future',
            href: '#cta',
          },
        } as TestimonialsContent,
      },
      {
        id: 'vision',
        type: 'vision',
        content: {
          badge: 'Our Vision',
          title: 'From Legal Assistant to AI Judge',
          subtitle:
            "We're on a multi-year journey to transform legal services through AI responsibly.",
          mission: {
            title: 'Our Mission',
            description:
              'To democratize access to justice through AI while enhancing—not replacing—the expertise of legal professionals.',
          },
          principles: [
            {
              title: 'Transparent',
              description: 'Open about capabilities, limitations, and development progress',
            },
            {
              title: 'Collaborative',
              description: 'Built with input from legal professionals and researchers',
            },
            {
              title: 'Responsible',
              description: 'Privacy-first, bias-aware, and human-overseen',
            },
          ],
          phases: [
            {
              phase: 'Phase 1',
              status: 'in-progress',
              title: 'AI Legal Assistant',
              timeline: '2025-2026',
              description:
                'Lex assists lawyers with research, document analysis, and compliance checking.',
              capabilities: [
                'Legal research and case law analysis',
                'Contract review and risk assessment',
                'Regulatory compliance checking',
                'Document drafting assistance',
              ],
            },
            {
              phase: 'Phase 2',
              status: 'planned',
              title: 'AI Legal Advisor',
              timeline: '2026-2027',
              description:
                'Advanced reasoning for legal strategy, case evaluation, and predictive analytics.',
              capabilities: [
                'Case outcome prediction',
                'Legal strategy recommendations',
                'Multi-jurisdictional analysis',
                'Expert witness support',
              ],
            },
            {
              phase: 'Phase 3',
              status: 'vision',
              title: 'AI Judge',
              timeline: '2028+',
              description: 'Impartial adjudication for specific case types, with human oversight.',
              capabilities: [
                'Small claims adjudication',
                'Dispute resolution assistance',
                'Precedent-based ruling suggestions',
                'Bias detection and fairness analysis',
              ],
            },
          ],
          benefits: [
            {
              icon: '⚡',
              title: 'Access to Justice',
              description:
                'AI can help democratize legal assistance, making it accessible to everyone.',
            },
            {
              icon: '🎓',
              title: 'Enhanced Expertise',
              description:
                'Lawyers spend 30-40% on routine tasks. AI frees them to focus on strategy.',
            },
            {
              icon: '⚖️',
              title: 'Consistency & Fairness',
              description:
                'AI can help reduce bias while humans maintain oversight for complex cases.',
            },
            {
              icon: '🔬',
              title: 'Evidence-Based Law',
              description:
                'AI can analyze thousands of precedents instantly for comprehensive decisions.',
            },
          ],
        } as VisionContent,
      },
      {
        id: 'technology',
        type: 'technology',
        content: {
          badge: 'Technology & Architecture',
          title: 'Built on Cutting-Edge AI',
          subtitle:
            'We combine state-of-the-art language models with legal domain expertise and privacy-first architecture.',
          categories: [
            {
              title: 'AI & ML',
              items: [
                {
                  title: 'Large Language Models',
                  description: 'Claude, GPT-4, custom fine-tuned models',
                },
                {
                  title: 'Vector Databases',
                  description: 'Pinecone, Weaviate for semantic search',
                },
                {
                  title: 'RAG Architecture',
                  description: 'Retrieval-Augmented Generation for accuracy',
                },
              ],
            },
            {
              title: 'Legal Data',
              items: [
                { title: 'Case Law APIs', description: 'Integration with legal databases' },
                { title: 'Document Processing', description: 'OCR, NLP for contract analysis' },
                {
                  icon: '🕸️',
                  title: 'Knowledge Graphs',
                  description: 'Structured legal relationships',
                },
              ],
            },
            {
              title: 'Privacy & Security',
              items: [
                { title: 'End-to-End Encryption', description: 'Zero-knowledge architecture' },
                { title: 'On-Premise Deployment', description: 'Self-hosted for sensitive data' },
                { title: 'GDPR Compliance', description: 'Privacy-first by design' },
              ],
            },
          ],
          architecture: {
            title: 'System Architecture',
            layers: [
              { title: 'User Interface', description: 'Chat, Document Upload, Dashboard' },
              { title: 'AI Engine', description: 'LLM, RAG, Reasoning Layer' },
              { title: 'Legal Data', description: 'Case Law, Statutes, Documents' },
            ],
          },
          principles: [
            { label: 'Modular:', description: 'Easy to update and improve' },
            { label: 'Scalable:', description: 'From single user to enterprise' },
            { label: 'Private:', description: 'Your data never leaves your infrastructure' },
            { label: 'Auditable:', description: 'Transparent reasoning and sources' },
          ],
          feedbackForm: {
            title: 'We Want Your Feedback',
            description: 'Help us build better. Share your thoughts on our approach.',
            types: ['General Feedback', 'Technical Feedback'],
          },
        } as TechnologyContent,
      },
      {
        id: 'cta',
        type: 'cta',
        content: {
          title: 'Join the Waitlist',
          subtitle:
            'Be among the first to access Lex when we launch. Get early access, exclusive updates, and special pricing.',
          primaryButton: {
            text: 'Join the Waitlist',
            href: '#waitlist',
          },
          secondaryButton: {
            text: 'Try Lex Now',
            href: '#demo',
          },
          metrics: [
            { label: 'Waitlist Members', dynamic: true },
            { label: 'Active Cases', dynamic: true },
            { label: 'Data Rooms Created', dynamic: true },
            { label: 'Expected Launch', value: 'Q2 2026' },
          ],
          note: 'We believe in transparency. These numbers update in real-time.',
        } as CTAContent,
        isLast: true,
      },
    ],
  },

  'medical-expert': {
    slug: 'medical-expert',
    displayName: 'Imhotep',
    sections: [
      { id: 'hero', type: 'hero', content: null },
      {
        id: 'disclaimer',
        type: 'disclaimer',
        content: {
          items: [
            {
              icon: '🏥',
              text: 'Imhotep provides health information for educational purposes only and is not a substitute for professional medical advice.',
            },
            {
              icon: '👨‍⚕️',
              text: 'Always consult qualified healthcare providers for diagnosis and treatment. This tool does not create a doctor-patient relationship.',
            },
          ],
        } as DisclaimerContent,
      },
      {
        id: 'demo',
        type: 'demo',
        content: {
          title: 'Try Imhotep Now',
          subtitle:
            'Experience AI-powered health guidance. Describe your concerns and get evidence-based insights.',
        } as DemoContent,
      },
      {
        id: 'features',
        type: 'features',
        content: {
          badge: 'For Everyone',
          title: 'Your Personal Health Companion',
          subtitle: 'Evidence-based guidance accessible to everyone, anytime.',
          columns: 3,
          features: [
            {
              icon: '🔬',
              title: 'Evidence-Based Insights',
              description: 'Access the latest medical research and guidelines.',
            },
            {
              icon: '📊',
              title: 'Lab Results Explained',
              description: 'Upload test results and understand what they mean.',
            },
            {
              icon: '💊',
              title: 'Medication Guidance',
              description: 'Learn about interactions, side effects, and alternatives.',
            },
            {
              icon: '🩺',
              title: 'Symptom Analysis',
              description: 'Describe symptoms and get preliminary insights.',
            },
            {
              icon: '🥗',
              title: 'Wellness Advice',
              description: 'Personalized nutrition and lifestyle recommendations.',
            },
            {
              icon: '🔒',
              title: 'Private & Secure',
              description: 'Your health data stays encrypted and private.',
            },
          ],
        } as FeaturesContent,
      },
      {
        id: 'professionals',
        type: 'benefits',
        content: {
          badge: 'For Healthcare Professionals',
          title: 'Clinical Decision Support',
          subtitle: 'Tools designed to enhance, not replace, medical expertise.',
          columns: 3,
          benefits: [
            {
              icon: '📚',
              title: 'Research Assistant',
              description: 'Quick access to relevant studies and clinical trials.',
            },
            {
              icon: '📋',
              title: 'Case Analysis',
              description: 'AI-assisted review of complex medical cases.',
            },
            {
              icon: '⚕️',
              title: 'Guidelines Integration',
              description: 'Current clinical guidelines at your fingertips.',
            },
          ],
        } as BenefitsContent,
      },
      {
        id: 'medbox',
        type: 'features',
        content: {
          badge: 'Home Health Lab',
          title: 'MedBox: Your Home Health Laboratory',
          subtitle:
            'Clinical-grade diagnostics at home. MedBox automates health monitoring and puts the power of a medical lab at your fingertips.',
          columns: 3,
          features: [
            {
              icon: '\u{1F4C8}',
              title: 'Continuous Glucose Monitor',
              description: 'Real-time blood glucose tracking without finger pricks.',
            },
            {
              icon: '\u2764\uFE0F',
              title: '12-Lead ECG Monitor',
              description: 'Clinical-grade heart monitoring and arrhythmia detection.',
            },
            {
              icon: '\u{1F9EA}',
              title: 'Blood Chemistry Analyzer',
              description: 'Complete blood count, lipid panels, and metabolic testing.',
            },
            {
              icon: '\u{1FA78}',
              title: 'Blood Pressure System',
              description: 'Continuous monitoring with physician-grade accuracy.',
            },
            {
              icon: '\u{1F634}',
              title: 'Sleep & Recovery Monitor',
              description: 'Tracks deep sleep, REM, HRV, and respiratory patterns.',
            },
            {
              icon: '\u2696\uFE0F',
              title: 'Body Composition Scanner',
              description: 'Measures muscle mass, visceral fat, and bone density.',
            },
          ],
        } as FeaturesContent,
      },
      {
        id: 'health-topics',
        type: 'features',
        content: {
          badge: 'What You Can Ask',
          title: 'Health Topics Imhotep Covers',
          subtitle:
            'Common areas people bring to Imhotep, from daily habits to chronic conditions.',
          columns: 3,
          features: [
            {
              icon: '\u2764\uFE0F',
              title: 'Heart Health',
              description: 'Blood pressure, cholesterol, and cardiovascular risk.',
            },
            {
              icon: '\u{1F9E0}',
              title: 'Mental Wellness',
              description: 'Stress, mood, and evidence-based coping strategies.',
            },
            {
              icon: '\u{1F957}',
              title: 'Nutrition',
              description: 'Diet patterns, macronutrients, and supplementation.',
            },
            {
              icon: '\u{1F3C3}',
              title: 'Exercise',
              description: 'Training load, recovery, and building a sustainable routine.',
            },
            {
              icon: '\u{1F634}',
              title: 'Sleep',
              description: 'Sleep quality, circadian rhythm, and insomnia.',
            },
            {
              icon: '\u{1F4CA}',
              title: 'Diabetes',
              description: 'Glucose management, monitoring, and long-term risk.',
            },
          ],
        } as FeaturesContent,
      },
      {
        id: 'regimens',
        type: 'how-it-works',
        content: {
          title: 'Personalized Health Regimens',
          steps: [
            {
              icon: '\u{1F4CB}',
              title: 'Imhotep Basic',
              description:
                'Low cost, about 30 minutes a day, low complexity — and still fully customised to you.',
            },
            {
              icon: '\u{1F4C8}',
              title: 'Imhotep Advanced',
              description:
                'Medium cost, one to two hours a day, for people who want to go deeper without a full protocol.',
            },
            {
              icon: '\u2696\uFE0F',
              title: 'Compared to Blueprint',
              description:
                'High cost, three or more hours a day, high complexity, and limited customisation.',
            },
          ],
        } as HowItWorksContent,
      },
      {
        id: 'vision',
        type: 'vision',
        content: {
          badge: 'Our Vision',
          title: 'Democratizing Health Knowledge',
          subtitle: 'Making evidence-based health information accessible to everyone.',
          phases: [
            {
              phase: 'Phase 1',
              status: 'in-progress',
              title: 'Health Information Assistant',
              timeline: '2025-2026',
              description: 'AI-powered health education and guidance.',
              capabilities: [
                'Symptom information',
                'Medication lookup',
                'Lab result explanation',
                'Wellness guidance',
              ],
            },
            {
              phase: 'Phase 2',
              status: 'planned',
              title: 'Clinical Support Tool',
              timeline: '2026',
              description: 'Enhanced decision support for healthcare providers.',
              capabilities: [
                'Case analysis assistance',
                'Research synthesis',
                'Guidelines integration',
                'Telemedicine support',
              ],
            },
          ],
        } as VisionContent,
      },
      {
        id: 'cta',
        type: 'cta',
        content: {
          title: 'Start Your Health Journey',
          subtitle: 'Get personalized, evidence-based health guidance today.',
          primaryButton: {
            text: 'Chat with Imhotep',
            useTryLink: true,
          },
          secondaryButton: {
            text: 'Try Demo',
            href: '#demo',
          },
        } as CTAContent,
        isLast: true,
      },
    ],
  },

  'swiss-german-teacher': {
    slug: 'swiss-german-teacher',
    displayName: 'Heidi',
    sections: [
      { id: 'hero', type: 'hero', content: null },
      {
        id: 'demo',
        type: 'demo',
        content: {
          title: 'Try Heidi Now',
          subtitle:
            'Experience Swiss German learning. Ask about phrases, translations, or Swiss culture.',
        } as DemoContent,
      },
      {
        id: 'features',
        type: 'features',
        content: {
          badge: 'Language Learning',
          title: 'Learn Swiss German the Smart Way',
          subtitle: 'High German and Züridütsch, side by side with cultural context.',
          columns: 3,
          features: [
            {
              icon: '🗣️',
              title: 'Dual-Language Learning',
              description: 'High German and Swiss German taught together for complete fluency.',
            },
            {
              icon: '🎯',
              title: 'Adaptive Learning',
              description: 'Lessons adapt to your level and learning style.',
            },
            {
              icon: '📍',
              title: 'Regional Dialects',
              description: 'Learn Zürich, Bern, Basel, and other Swiss German variants.',
            },
            {
              icon: '✉️',
              title: 'Writing Assistance',
              description: 'Get help writing emails, messages, and documents in German.',
            },
            {
              icon: '🏔️',
              title: 'Swiss Culture',
              description: 'Understand customs, etiquette, and local traditions.',
            },
            {
              icon: '📅',
              title: 'Local Events',
              description: "Discover what's happening in Zurich and Switzerland.",
            },
          ],
        } as FeaturesContent,
      },
      {
        id: 'how-it-works',
        type: 'how-it-works',
        content: {
          title: 'How Heidi Helps You Learn',
          steps: [
            {
              icon: '💬',
              title: 'Ask Anything',
              description: 'Type a word, phrase, or question in any language.',
            },
            {
              icon: '📊',
              title: 'Get Comparisons',
              description: 'See High German and Swiss German side by side.',
            },
            {
              icon: '🎧',
              title: 'Learn Pronunciation',
              description: 'Phonetic guides help you sound like a local.',
            },
            {
              icon: '✅',
              title: 'Practice & Review',
              description: 'Heidi tracks your progress and tests your knowledge.',
            },
          ],
        } as HowItWorksContent,
      },
      {
        id: 'language-learning',
        type: 'features',
        content: {
          badge: 'Language Learning',
          title: 'Learn to Speak Like a Local',
          subtitle:
            'Personalised Swiss German focused on real conversation, not textbook grammar drills.',
          columns: 3,
          features: [
            {
              icon: '📖',
              title: 'Vocabulary Builder',
              description:
                'Practical words and phrases in Zürich dialect, with pronunciation guides.',
            },
            {
              icon: '💬',
              title: 'Conversation Practice',
              description: 'Everyday exchanges shown in both Standard German and Swiss German.',
            },
            {
              icon: '📐',
              title: 'Grammar Explanations',
              description: 'Swiss German grammar explained by how it differs from Standard German.',
            },
          ],
        } as FeaturesContent,
      },
      {
        id: 'communication',
        type: 'features',
        content: {
          badge: 'Communication',
          title: 'Write Like You Live Here',
          subtitle: 'The everyday writing that trips people up, handled in the right register.',
          columns: 2,
          features: [
            {
              icon: '✉️',
              title: 'Email Writing',
              description:
                'Formal and informal Swiss email conventions, with the phrasing locals actually use.',
            },
            {
              icon: '📱',
              title: 'Texting Help',
              description:
                'Casual Swiss German as it is really written — abbreviations, dialect spellings and all.',
            },
          ],
        } as FeaturesContent,
      },
      {
        id: 'culture',
        type: 'features',
        content: {
          badge: 'Swiss Content',
          title: 'Immerse Yourself',
          subtitle:
            'Authentic Swiss German content, matched to your level so it stretches you without losing you.',
          columns: 3,
          features: [
            {
              icon: '🎬',
              title: 'Video',
              description: 'Short videos subtitled in both Standard and Swiss German.',
            },
            {
              icon: '🎙️',
              title: 'Podcasts',
              description: 'Audio with transcripts, for listening practice you can follow along.',
            },
            {
              icon: '📰',
              title: 'Articles',
              description: 'News and blog posts with vocabulary assistance built in.',
            },
          ],
        } as FeaturesContent,
      },
      {
        id: 'cta',
        type: 'cta',
        content: {
          title: 'Start Learning Swiss German',
          subtitle: 'Your journey to speaking like a local starts here.',
          primaryButton: {
            text: 'Chat with Heidi',
            useTryLink: true,
          },
          secondaryButton: {
            text: 'Try Demo',
            href: '#demo',
          },
        } as CTAContent,
        isLast: true,
      },
    ],
  },

  'research-assistant': {
    slug: 'research-assistant',
    displayName: 'Nerd',
    sections: [
      { id: 'hero', type: 'hero', content: null },
      {
        id: 'demo',
        type: 'demo',
        content: {
          title: 'Try Nerd Now',
          subtitle:
            'Experience AI-powered research assistance. Explore topics and synthesize information.',
        } as DemoContent,
      },
      {
        id: 'features',
        type: 'features',
        content: {
          badge: 'Core Features',
          title: 'Transform Your Research Workflow',
          subtitle: 'AI-powered tools for organizing, discovering, and creating.',
          columns: 3,
          features: [
            {
              icon: '📚',
              title: 'Research Organization',
              description: 'Automatically organize and categorize your research materials.',
            },
            {
              icon: '🔄',
              title: 'Real-Time Updates',
              description: 'Stay current with the latest papers in your field.',
            },
            {
              icon: '✍️',
              title: 'Draft Generation',
              description: 'Generate structured drafts with proper citations.',
            },
            {
              icon: '❓',
              title: 'Daily Questions',
              description: 'Thought-provoking questions to challenge your thinking.',
            },
            {
              icon: '💡',
              title: 'Big Discovery Mode',
              description: 'Find novel connections and research gaps.',
            },
            {
              icon: '🔗',
              title: 'Collaboration',
              description: 'Share findings and work with other researchers.',
            },
          ],
        } as FeaturesContent,
      },
      {
        id: 'research-system',
        type: 'features',
        content: {
          badge: 'Systematisation',
          title: 'Upload Once, Organise Automatically',
          subtitle:
            'Drop in papers, notes and transcripts. Nerd sorts them into a system you can actually navigate.',
          columns: 3,
          features: [
            {
              icon: '🏷️',
              title: 'By Theme',
              description: 'Group research by topics and subtopics.',
            },
            {
              icon: '⭐',
              title: 'By Relevance',
              description: 'Prioritise by importance to your core question.',
            },
            {
              icon: '📅',
              title: 'By Chronology',
              description: 'Organise materials along a timeline.',
            },
            {
              icon: '📚',
              title: 'By Source Type',
              description: 'Group by papers, books, interviews and more.',
            },
            {
              icon: '🧪',
              title: 'By Methodology',
              description: 'Categorise by the research methods used.',
            },
            { icon: '👩‍🔬', title: 'By Author', description: 'Group research by key contributors.' },
          ],
        } as FeaturesContent,
      },
      {
        id: 'scraping',
        type: 'features',
        content: {
          badge: 'Real-Time Sources',
          title: 'Never Miss Important Developments',
          subtitle:
            'Nerd watches the literature and the news, so a relevant paper does not sit unread for three months.',
          columns: 3,
          features: [
            { icon: '📑', title: 'ArXiv', description: 'Preprint server for scientific papers.' },
            {
              icon: '🎓',
              title: 'Google Scholar',
              description: 'Search across scholarly literature.',
            },
            { icon: '🔬', title: 'PubMed', description: 'Biomedical literature and abstracts.' },
            {
              icon: '🌿',
              title: 'Nature',
              description: 'Leading multidisciplinary science journal.',
            },
            {
              icon: '📰',
              title: 'Science Daily',
              description: 'Science news articles and summaries.',
            },
            {
              icon: '💻',
              title: 'MIT Technology Review',
              description: 'Technology and innovation reporting.',
            },
          ],
        } as FeaturesContent,
      },
      {
        id: 'drafts',
        type: 'how-it-works',
        content: {
          title: 'Turn Unstructured Notes into Polished Research',
          steps: [
            {
              icon: '📋',
              title: 'Abstract',
              description: 'A tight summary of the question, method and finding.',
            },
            {
              icon: '📖',
              title: 'Literature Review',
              description: 'What the field already says, and where the gap is.',
            },
            {
              icon: '📄',
              title: 'Methodology',
              description: 'How the work was done, in the form reviewers expect.',
            },
            {
              icon: '✍️',
              title: 'Discussion',
              description: 'What the result means, and what it does not show.',
            },
          ],
        } as HowItWorksContent,
      },
      {
        id: 'vision',
        type: 'vision',
        content: {
          badge: 'Development Roadmap',
          title: 'The Future of Research',
          phases: [
            {
              phase: 'Phase 1',
              status: 'in-progress',
              title: 'Research Assistant',
              timeline: '2025-2026',
              description: 'Organization, search, and synthesis tools.',
              capabilities: [
                'Material organization',
                'Literature search',
                'Draft generation',
                'Citation management',
              ],
            },
            {
              phase: 'Phase 2',
              status: 'planned',
              title: 'Discovery Engine',
              timeline: '2026',
              description: 'Advanced pattern recognition and gap analysis.',
              capabilities: [
                'Cross-domain connections',
                'Research gap identification',
                'Hypothesis generation',
                'Collaboration matching',
              ],
            },
          ],
        } as VisionContent,
      },
      {
        id: 'cta',
        type: 'cta',
        content: {
          title: 'Join the Waitlist',
          subtitle: 'Be first to access Nerd when we launch.',
          primaryButton: {
            text: 'Join Waitlist',
            href: '#waitlist',
          },
          secondaryButton: {
            text: 'Try Demo',
            href: '#demo',
          },
        } as CTAContent,
        isLast: true,
      },
    ],
  },

  'product-manager': {
    slug: 'product-manager',
    displayName: 'Trident',
    sections: [
      { id: 'hero', type: 'hero', content: null },
      {
        id: 'demo',
        type: 'demo',
        content: {
          title: 'Try Trident Now',
          subtitle:
            'Experience AI-powered product management. Describe a feature and get implementation plans.',
        } as DemoContent,
      },
      {
        id: 'features',
        type: 'features',
        content: {
          badge: 'Features',
          title: 'Your AI Product Manager',
          subtitle: 'From idea to implementation-ready specifications.',
          columns: 3,
          features: [
            {
              icon: '📋',
              title: 'Project Management',
              description: 'Organize tasks and deliverables for efficient development.',
            },
            {
              icon: '🎯',
              title: 'Technical Direction',
              description: 'Implementation-ready specifications for developers.',
            },
            {
              icon: '⚡',
              title: 'Workflow Optimization',
              description: 'Streamline processes and eliminate roadblocks.',
            },
            {
              icon: '🗺️',
              title: 'Implementation Planning',
              description: 'Detailed roadmaps for feature development.',
            },
            {
              icon: '✅',
              title: 'Quality Assurance',
              description: 'Comprehensive testing and validation strategies.',
            },
            {
              icon: '🔧',
              title: 'Cursor-Optimized',
              description: 'Specifically designed for Cursor development workflow.',
            },
          ],
        } as FeaturesContent,
      },
      {
        id: 'how-it-works',
        type: 'how-it-works',
        content: {
          title: 'How Trident Works',
          steps: [
            {
              icon: '💡',
              title: 'Describe Your Feature',
              description: 'Tell Trident what you want to build.',
            },
            {
              icon: '📐',
              title: 'Get Architecture',
              description: 'Receive detailed technical specifications.',
            },
            {
              icon: '📝',
              title: 'Implementation Plan',
              description: 'Step-by-step plan ready for Cursor.',
            },
            {
              icon: '🚀',
              title: 'Build & Iterate',
              description: 'Execute with AI assistance throughout.',
            },
          ],
        } as HowItWorksContent,
      },
      {
        id: 'benefits',
        type: 'benefits',
        content: {
          badge: 'Why Trident',
          title: 'Why Use Trident?',
          subtitle: 'Project management that understands the code, not just the ticket.',
          columns: 2,
          benefits: [
            {
              icon: '🚀',
              title: 'Accelerated Development',
              description:
                'Speed up development with AI-powered project management and technical guidance.',
            },
            {
              icon: '⚡',
              title: 'Optimised Workflows',
              description:
                "Identify bottlenecks and streamline your team's processes for maximum productivity.",
            },
            {
              icon: '🎯',
              title: 'Technical Precision',
              description:
                'Expert development guidance with concrete best practices and implementation strategies.',
            },
            {
              icon: '📊',
              title: 'Better Planning',
              description:
                'Detailed roadmaps with realistic timelines, resource allocation and clear deliverables.',
            },
          ],
        } as BenefitsContent,
      },
      {
        id: 'showcase',
        type: 'how-it-works',
        content: {
          title: 'What Trident Is Actually For',
          steps: [
            {
              icon: '🗺️',
              title: 'Feature Planning & Development',
              description:
                'From a rough intent to a scoped plan, an implementation path, and a way to tell whether it worked.',
            },
            {
              icon: '🧹',
              title: 'Technical Debt Management',
              description:
                'Identify what is actually costing you, then sequence remediation so it fits around delivery.',
            },
            {
              icon: '🤝',
              title: 'Cross-Team Coordination',
              description:
                'One set of documentation everyone reads, kept current without a weekly meeting about it.',
            },
          ],
        } as HowItWorksContent,
      },
      {
        id: 'integration',
        type: 'features',
        content: {
          badge: 'Integrations',
          title: 'Fits the Tools You Already Use',
          columns: 2,
          features: [
            {
              icon: '🐙',
              title: 'GitHub',
              description:
                'Link tasks to pull requests, track milestones, and generate documentation from the code itself.',
            },
            {
              icon: '📋',
              title: 'Jira',
              description:
                'Sync tasks with tickets, import existing sprint structures, and generate sprint reports.',
            },
          ],
        } as FeaturesContent,
      },
      {
        id: 'cta',
        type: 'cta',
        content: {
          title: 'Start Building Faster',
          subtitle: 'Get Trident and transform your development workflow.',
          primaryButton: {
            text: 'Get Started',
            useTryLink: true,
          },
          secondaryButton: {
            text: 'See Examples',
            href: '#demo',
          },
        } as CTAContent,
        isLast: true,
      },
    ],
  },

  'artistic-advisor': {
    slug: 'artistic-advisor',
    displayName: 'Muse',
    sections: [
      { id: 'hero', type: 'hero', content: null },
      {
        id: 'demo',
        type: 'demo',
        content: {
          title: 'Try Muse Now',
          subtitle: 'Experience AI-powered creative guidance. Share your project and get inspired.',
        } as DemoContent,
      },
      {
        id: 'features',
        type: 'features',
        content: {
          badge: 'Creative Tools',
          title: 'Your AI Creative Companion',
          subtitle: 'Unlock your artistic potential with AI-powered guidance.',
          columns: 3,
          features: [
            {
              icon: '🎨',
              title: 'Style Analysis',
              description: 'Get feedback on composition, color, and technique.',
            },
            {
              icon: '💡',
              title: 'Creative Prompts',
              description: 'Overcome blocks with AI-generated inspiration.',
            },
            {
              icon: '📚',
              title: 'Art History',
              description: 'Learn from masters and artistic movements.',
            },
            {
              icon: '🖌️',
              title: 'Technique Tips',
              description: 'Improve your skills with targeted advice.',
            },
            {
              icon: '🎭',
              title: 'Style Exploration',
              description: 'Discover new styles that match your vision.',
            },
            {
              icon: '✍️',
              title: 'Writing Support',
              description: 'Help with creative writing, copy, and content.',
            },
          ],
        } as FeaturesContent,
      },
      {
        id: 'how-it-works',
        type: 'how-it-works',
        content: {
          title: 'How Muse Inspires',
          steps: [
            {
              icon: '📝',
              title: 'Share Your Vision',
              description: 'Describe your creative project or upload your work.',
            },
            {
              icon: '🔍',
              title: 'AI Analysis',
              description: 'Muse analyzes style, composition, and context.',
            },
            {
              icon: '💫',
              title: 'Get Inspired',
              description: 'Receive tailored suggestions and inspiration.',
            },
            {
              icon: '🎯',
              title: 'Create & Refine',
              description: 'Iterate with ongoing AI feedback.',
            },
          ],
        } as HowItWorksContent,
      },
      {
        id: 'cta',
        type: 'cta',
        content: {
          title: 'Ready to Create?',
          subtitle: 'Unlock your creative potential with Muse.',
          primaryButton: {
            text: 'Try Muse Now',
            useTryLink: true,
          },
          secondaryButton: {
            text: 'Learn More',
            href: '#features',
          },
        } as CTAContent,
        isLast: true,
      },
    ],
  },
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get page config for a bot by slug
 */
export function getBotPageConfig(slug: string): BotPageConfig | undefined {
  return botPageConfigs[slug];
}

/**
 * Get all available bot slugs
 */
export function getAvailableBotSlugs(): string[] {
  return Object.keys(botPageConfigs);
}

/**
 * Check if a bot has a page config
 */
export function hasBotPageConfig(slug: string): boolean {
  return slug in botPageConfigs;
}
