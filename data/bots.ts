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
    slug: 'lawyer-bot',
    title: 'Legal Assistant Bot',
    description: 'AI-powered legal assistant for document review and analysis',
    overview: 'Our Legal Assistant Bot helps streamline document review processes and provides quick legal insights.',
    features: [
      'Document analysis and review',
      'Legal research assistance',
      'Contract clause identification',
      'Risk assessment',
      'Compliance checking'
    ],
    details: 'Powered by advanced natural language processing, our Legal Assistant Bot helps legal professionals work more efficiently.'
  },
  {
    slug: 'customer-service-bot',
    title: 'Customer Service Bot',
    description: 'Intelligent customer support automation',
    overview: 'Our Customer Service Bot provides 24/7 support and handles common customer inquiries.',
    features: [
      'Natural language understanding',
      'Multi-language support',
      'Ticket creation and routing',
      'FAQ automation',
      'Sentiment analysis'
    ],
    details: 'Built with state-of-the-art AI models to provide human-like customer interactions.'
  },
  {
    slug: 'gov-spending-tracker',
    title: 'Government Spending Tracker',
    description: 'Transparent government spending monitoring with social features',
    overview: 'Track and analyze government spending with a Venmo-like social interface for maximum transparency and accountability.',
    features: [
      'Real-time payment tracking with unique IDs',
      'Sender and receiver details with privacy controls',
      'Payment amount and purpose tracking',
      'Legal basis documentation',
      'Social features (like, comment, share)',
      'Donation capabilities',
      'Privacy protection for welfare recipients',
      'Timeline-based interface'
    ],
    details: 'Our Government Spending Tracker brings transparency to public finances by creating a social, Venmo-like interface for every government payment. Each transaction includes a unique ID, date, sender (government agency), receiver, amount, legal basis, and purpose. The platform protects individual privacy while maximizing transparency, allowing citizens to monitor, discuss, and engage with government spending decisions.'
  }
];

export default bots;
