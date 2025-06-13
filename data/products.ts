export type ProductStatus = 'launched' | 'beta' | 'prototype';
export type ProductType = 'agent' | 'tool' | 'integration';

export interface Product {
  slug: string;
  name: string;
  excerpt: string;
  status: ProductStatus;
  type: ProductType;
  description: string;
}

const products: Product[] = [
  {
    slug: 'swiss-german-teacher',
    name: 'Heidi – Swiss German Companion',
    excerpt: 'Your AI companion for High German and Züridütsch.',
    status: 'beta',
    type: 'agent',
    description: 'Practice conversational High German and Swiss dialects with an interactive AI tutor.',
  },
  {
    slug: 'research-assistant',
    name: 'Research Assistant',
    excerpt: 'AI-powered research companion for organizing data and generating insights.',
    status: 'prototype',
    type: 'agent',
    description: 'Collect sources, summarise key points and brainstorm questions for any topic.',
  },
  {
    slug: 'medical-expert',
    name: 'Medical Expert Assistant',
    excerpt: 'AI-powered medical knowledge and consultation support.',
    status: 'prototype',
    type: 'agent',
    description: 'Research medical literature and explore treatment guidelines with AI support.',
  },
  {
    slug: 'legal-expert',
    name: 'Legal Expert Assistant',
    excerpt: 'Navigate legal complexities with AI guidance.',
    status: 'prototype',
    type: 'agent',
    description: 'Draft simple contracts and explore regulatory questions in plain language.',
  },
  {
    slug: 'artistic-advisor',
    name: 'Artistic Advisor',
    excerpt: 'Enhance your creative process with AI insights.',
    status: 'prototype',
    type: 'agent',
    description: 'Generate ideas and receive critique for your creative projects.',
  },
  {
    slug: 'product-manager',
    name: 'Trident - AI Product Manager',
    excerpt: 'AI-powered product manager for development workflow.',
    status: 'prototype',
    type: 'agent',
    description: 'Helps prioritise features and track tasks using conversational UI.',
  },
  {
    slug: 'techno-capital',
    name: 'Techno-Capital',
    excerpt: 'Investing in technology to drive humanity toward singularity.',
    status: 'prototype',
    type: 'tool',
    description: 'Crowd‑funding platform for moonshot technology initiatives.',
  },
  {
    slug: 'governance',
    name: 'Governance',
    excerpt: 'Technologies maximizing transparency in government spending.',
    status: 'prototype',
    type: 'tool',
    description: 'Open‑source modules for civic budgeting and procurement transparency.',
  },
  {
    slug: 'credit',
    name: 'Credit',
    excerpt: 'Automation for venture credit operations.',
    status: 'prototype',
    type: 'tool',
    description: 'Manage credit line requests and track utilisation in one dashboard.',
  },
  {
    slug: 'shopping',
    name: 'Recurring Fulfillment',
    excerpt: 'AI-powered platform for managing recurring purchases.',
    status: 'prototype',
    type: 'tool',
    description: 'Keep household essentials stocked automatically with smart reordering.',
  },
  {
    slug: 'finance',
    name: 'Project Finance',
    excerpt: 'Full transparency project finance and management tool.',
    status: 'prototype',
    type: 'tool',
    description: 'Track budgets and milestones for large infrastructure initiatives.',
  },
];

export default products;
