import { LegalArea, LawyerProfile } from './types';

// High-demand legal areas based on market research
export const LEGAL_AREAS: LegalArea[] = [
  {
    id: 'immigration',
    name: 'Immigration Law',
    icon: '✈️',
    description: 'Visas, citizenship, asylum, deportation defense',
    demandLevel: 'high'
  },
  {
    id: 'family',
    name: 'Family Law',
    icon: '👨‍👩‍👧',
    description: 'Divorce, custody, adoption, domestic issues',
    demandLevel: 'high'
  },
  {
    id: 'criminal',
    name: 'Criminal Defense',
    icon: '⚖️',
    description: 'Criminal charges, DUI, white-collar crime',
    demandLevel: 'high'
  },
  {
    id: 'employment',
    name: 'Employment Law',
    icon: '💼',
    description: 'Wrongful termination, discrimination, wages',
    demandLevel: 'high'
  },
  {
    id: 'personal-injury',
    name: 'Personal Injury',
    icon: '🏥',
    description: 'Accidents, medical malpractice, compensation',
    demandLevel: 'high'
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: '🏠',
    description: 'Property disputes, landlord-tenant, transactions',
    demandLevel: 'medium'
  },
  {
    id: 'business',
    name: 'Business & Corporate',
    icon: '🏢',
    description: 'Formation, contracts, compliance, M&A',
    demandLevel: 'medium'
  },
  {
    id: 'intellectual-property',
    name: 'Intellectual Property',
    icon: '💡',
    description: 'Patents, trademarks, copyright, trade secrets',
    demandLevel: 'medium'
  },
  {
    id: 'estate-planning',
    name: 'Estate Planning',
    icon: '📜',
    description: 'Wills, trusts, probate, inheritance',
    demandLevel: 'medium'
  },
  {
    id: 'bankruptcy',
    name: 'Bankruptcy',
    icon: '💸',
    description: 'Debt relief, Chapter 7, Chapter 13, foreclosure',
    demandLevel: 'medium'
  },
  {
    id: 'tax',
    name: 'Tax Law',
    icon: '🧾',
    description: 'Tax disputes, IRS audits, tax planning',
    demandLevel: 'low'
  },
  {
    id: 'civil-rights',
    name: 'Civil Rights',
    icon: '✊',
    description: 'Discrimination, police misconduct, constitutional',
    demandLevel: 'medium'
  }
];

// Mock lawyer profiles for demo
export const MOCK_LAWYERS: LawyerProfile[] = [
  {
    id: '1',
    username: '@ImmigrationPro_US',
    avatar: '✈️',
    expertise: ['Immigration Law', 'Asylum', 'Work Visas'],
    rating: 4.9,
    casesHandled: 347,
    responseTime: '< 2 hours',
    availability: 'available',
    hourlyRate: 250,
    languages: ['English', 'Spanish']
  },
  {
    id: '2',
    username: '@FamilyLawGuardian',
    avatar: '👨‍⚖️',
    expertise: ['Family Law', 'Divorce', 'Child Custody'],
    rating: 4.8,
    casesHandled: 521,
    responseTime: '< 4 hours',
    availability: 'available',
    hourlyRate: 300,
    languages: ['English', 'French']
  },
  {
    id: '3',
    username: '@CriminalDefender',
    avatar: '🛡️',
    expertise: ['Criminal Defense', 'DUI', 'Felonies'],
    rating: 4.7,
    casesHandled: 289,
    responseTime: '< 1 hour',
    availability: 'busy',
    hourlyRate: 400,
    languages: ['English']
  },
  {
    id: '4',
    username: '@EmploymentChampion',
    avatar: '💼',
    expertise: ['Employment Law', 'Discrimination', 'Wrongful Termination'],
    rating: 4.9,
    casesHandled: 412,
    responseTime: '< 3 hours',
    availability: 'available',
    languages: ['English', 'German']
  },
  {
    id: '5',
    username: '@InjuryAdvocate',
    avatar: '🏥',
    expertise: ['Personal Injury', 'Medical Malpractice', 'Accidents'],
    rating: 4.8,
    casesHandled: 634,
    responseTime: '< 2 hours',
    availability: 'available',
    hourlyRate: 350,
    languages: ['English', 'Spanish', 'Mandarin']
  }
];

// File categories for AI organization
export const FILE_CATEGORIES = [
  { id: 'evidence', title: 'Evidence & Documentation', icon: '📎' },
  { id: 'contracts', title: 'Contracts & Agreements', icon: '📄' },
  { id: 'correspondence', title: 'Correspondence', icon: '✉️' },
  { id: 'court-filings', title: 'Court Filings', icon: '⚖️' },
  { id: 'identification', title: 'ID & Credentials', icon: '🪪' },
  { id: 'financial', title: 'Financial Records', icon: '💰' },
  { id: 'medical', title: 'Medical Records', icon: '🏥' },
  { id: 'other', title: 'Other Documents', icon: '📁' }
];
