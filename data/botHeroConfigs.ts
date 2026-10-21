import type { BotHeroConfig } from '@/components/shared/BotHeroSection';

/**
 * Centralized hero section configurations for all bot pages
 * SSOT: All hero content is defined here and referenced by bot pages
 */
export const botHeroConfigs: Record<string, BotHeroConfig> = {
  'legal-expert': {
    badge: { emoji: '⚖️', text: 'Private AI Node' },
    title: 'Lex',
    titleSuffix: 'Your AI Legal Assistant',
    subtitle: 'Comprehensive legal research and analysis support for legal professionals.',
    primaryCTA: { text: 'Chat with Lex', href: '', external: true }, // href set dynamically
    secondaryCTA: { text: 'Try Demo', href: '#demo' },
    botInfo: {
      name: 'Lex',
      emoji: '⚖️',
      description: 'AI Legal Assistant',
    },
    chatMessages: [
      { role: 'bot', content: 'How can I help with your legal research today?' },
      { role: 'user', content: 'I need a summary of recent cases on data privacy in Europe.' },
      {
        role: 'bot',
        content:
          'Here is an overview of the main directives and leading cases, with the points worth checking against the current text.',
      },
    ],
  },

  'medical-expert': {
    title: 'Dr. Imhotep',
    titleSuffix: 'AI Health Assistant',
    subtitle:
      'Your personal AI health companion, offering evidence-based guidance for a healthier life.',
    primaryCTA: { text: 'Chat with Imhotep', href: '', external: true },
    secondaryCTA: { text: 'Explore Features', href: '#features' },
    botInfo: {
      name: 'Imhotep',
      emoji: '👨‍⚕️',
      description: 'AI Health Assistant',
    },
    chatMessages: [
      {
        role: 'bot',
        content:
          "I'm here to provide evidence-based health guidance. How can I assist with your health journey today?",
      },
      {
        role: 'user',
        content: "I'd like to improve my energy levels during the day. Any suggestions?",
      },
      {
        role: 'bot',
        content:
          'Improving energy levels involves several factors: optimizing sleep quality, balanced nutrition with steady blood sugar, regular physical activity, proper hydration, and stress management...',
      },
    ],
    keyBenefits: [
      { emoji: '✓', text: 'Evidence-based guidance' },
      { emoji: '✓', text: 'Personalized advice' },
      { emoji: '✓', text: '24/7 availability' },
      { emoji: '✓', text: 'Latest medical research' },
    ],
    showMobileBenefits: true,
  },

  'research-assistant': {
    badge: { emoji: '🧠', text: 'AI Research Assistant' },
    title: 'Nerd',
    titleSuffix: 'Your AI Research Assistant',
    subtitle: 'An AI research partner that drafts with you and questions your thinking.',
    primaryCTA: { text: 'Chat with Nerd', href: '', external: true },
    secondaryCTA: { text: 'Explore Features', href: '#features' },
    botInfo: {
      name: 'Nerd',
      emoji: '🧠',
      description: 'AI Research Assistant',
    },
    chatMessages: [
      { role: 'bot', content: 'How can I transform your research experience today?' },
      {
        role: 'user',
        content: 'Here is my argument on quantum error correction. Where are the gaps?',
      },
      {
        role: 'bot',
        content:
          'The argument assumes a noise model you never justify, and the threshold you cite depends on it. Want a draft of how to address that?',
      },
    ],
    keyBenefits: [
      { emoji: '✍️', text: 'Draft Generation' },
      { emoji: '🔍', text: 'Hard Questions' },
    ],
  },

  'swiss-german-teacher': {
    badge: { emoji: '🇨🇭', text: 'Language Learning' },
    title: 'Heidi',
    titleSuffix: 'Your Swiss German Companion',
    subtitle:
      "Your AI companion for High German and Züridütsch—learn the language and discover tonight's events in Zurich.",
    primaryCTA: { text: 'Chat with Heidi', href: '', external: true },
    secondaryCTA: { text: 'Try Demo', href: '#demo' },
    botInfo: {
      name: 'Heidi',
      emoji: '🇨🇭',
      description: 'Swiss German Teacher',
    },
    chatMessages: [
      { role: 'bot', content: 'Grüezi! How can I help you learn Swiss German today?' },
      { role: 'user', content: 'How do I say "thank you" in Züridütsch?' },
      {
        role: 'bot',
        content:
          'In Züridütsch, you say "Merci vielmal" (casual) or "Danke schön" (more formal). Here are some examples...',
      },
    ],
    keyBenefits: [
      { emoji: '🗣️', text: 'Dual-Language Learning' },
      { emoji: '📅', text: 'Local Events' },
      { emoji: '🎯', text: 'Practice Quizzes' },
      { emoji: '🏔️', text: 'Swiss Culture' },
    ],
  },

  'product-manager': {
    badge: { emoji: '🔱', text: 'AI Product Manager' },
    title: 'Trident',
    titleSuffix: 'AI Product Manager for Cursor',
    subtitle:
      'A specialized tool that combines project management capabilities with technical guidance to streamline development workflow in Cursor.',
    primaryCTA: { text: 'Get Started', href: '', external: true },
    secondaryCTA: { text: 'See Examples', href: '#demo' },
    botInfo: {
      name: 'Trident',
      emoji: '🔱',
      description: 'AI Product Manager',
    },
    chatMessages: [
      { role: 'bot', content: 'What feature would you like to build today?' },
      { role: 'user', content: 'I need to implement user authentication with OAuth.' },
      {
        role: 'bot',
        content:
          "I'll create a detailed implementation plan with architecture diagrams, API specifications, and testing strategies for OAuth integration.",
      },
    ],
    keyBenefits: [
      { emoji: '📋', text: 'Project Management' },
      { emoji: '🎯', text: 'Technical Direction' },
      { emoji: '⚡', text: 'Workflow Optimization' },
      { emoji: '🔧', text: 'Cursor-Optimized' },
    ],
  },

  'artistic-advisor': {
    badge: { emoji: '🎨', text: 'AI Creative Companion' },
    title: 'Muse',
    titleSuffix: 'Your AI Artistic Advisor',
    subtitle:
      'Unlock your creative potential with AI-powered guidance on style, composition, and artistic technique.',
    primaryCTA: { text: 'Chat with Muse', href: '', external: true },
    secondaryCTA: { text: 'Try Demo', href: '#demo' },
    botInfo: {
      name: 'Muse',
      emoji: '🎨',
      description: 'AI Artistic Advisor',
    },
    chatMessages: [
      { role: 'bot', content: 'What creative project are you working on today?' },
      { role: 'user', content: 'I want to create an abstract landscape with bold colors.' },
      {
        role: 'bot',
        content:
          "That sounds exciting! Let's explore color theory and composition techniques that could bring your vision to life.",
      },
    ],
    keyBenefits: [
      { emoji: '🎨', text: 'Style Analysis' },
      { emoji: '💡', text: 'Creative Prompts' },
      { emoji: '📚', text: 'Art History' },
      { emoji: '🖌️', text: 'Technique Tips' },
    ],
  },
};

/**
 * Get hero config for a specific bot
 * @param botSlug - The bot's slug identifier
 * @returns The hero configuration or undefined if not found
 */
export const getBotHeroConfig = (botSlug: string): BotHeroConfig | undefined => {
  return botHeroConfigs[botSlug];
};
