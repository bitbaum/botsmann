export interface Offering {
  slug: string;
  title: string;
  overview: string;
  type: 'Bot' | 'Platform' | 'Hardware' | 'Consulting Package';
  useCase: string;
  target: 'Personal' | 'Business' | 'Public Sector';
  status: 'Concept' | 'In Development' | 'Available Now';
}

const offerings: Offering[] = [
  {
    slug: 'swiss-german-teacher',
    title: 'Heidi – Swiss German Companion',
    overview: 'Master Swiss German with AI-guided lessons and cultural tips.',
    type: 'Bot',
    useCase: 'Education',
    target: 'Personal',
    status: 'Available Now'
  },
  {
    slug: 'research-assistant',
    title: 'Research Assistant',
    overview: 'Automate literature reviews and discover new insights.',
    type: 'Bot',
    useCase: 'Research',
    target: 'Business',
    status: 'In Development'
  },
  {
    slug: 'legal-expert',
    title: 'Legal Expert',
    overview: 'Preliminary legal guidance and document analysis.',
    type: 'Bot',
    useCase: 'Legal',
    target: 'Business',
    status: 'In Development'
  },
  {
    slug: 'government-spending-tracker',
    title: 'Government Spending Tracker',
    overview: 'Increase transparency with real-time budget analytics.',
    type: 'Platform',
    useCase: 'Transparency',
    target: 'Public Sector',
    status: 'In Development'
  },
  {
    slug: 'techno-capital',
    title: 'Techno-Capital',
    overview: 'Investment fund accelerating technological progress.',
    type: 'Platform',
    useCase: 'Finance',
    target: 'Business',
    status: 'Concept'
  },
  {
    slug: 'recurring-fulfillment',
    title: 'Recurring Fulfillment',
    overview: 'Automate subscription management and inventory planning.',
    type: 'Platform',
    useCase: 'Automation',
    target: 'Business',
    status: 'In Development'
  }
];

export default offerings;
