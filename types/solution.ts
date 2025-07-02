export interface SolutionCustomSections {
  caseStudies?: string[];
  faq?: string[];
  testimonials?: string[];
  [key: string]: unknown;
}

export interface Solution {
  slug: string;
  title: string;
  overview: string;
  features: string[];
  details: string;
  customSections?: SolutionCustomSections;
  tryLink?: string;
}
