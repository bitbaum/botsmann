export interface Solution {
  slug: string;
  title: string;
  overview: string;
  features: string[];
  details: string;
  customSections?: {
    caseStudies?: string[];
    faq?: string[];
    testimonials?: string[];
    [key: string]: any;
  };
  icon: string;
  type: 'Bot' | 'Platform' | 'Tool' | 'Service';
  audience: string[];
  domain: string[];
  status: 'Available' | 'Coming Soon' | 'In Concept';
  link?: string;
  tryLink?: string;
}
