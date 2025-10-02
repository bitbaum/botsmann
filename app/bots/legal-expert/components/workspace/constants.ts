// Workspace Constants - Production Ready

// MVP: Only Zurich (CH) and California (US)
// Focus on federal laws, no local ordinances yet
export const JURISDICTIONS = {
  CH: {
    code: 'CH',
    name: 'Switzerland',
    flag: '🇨🇭',
    regions: [
      { code: 'ZH', name: 'Zürich', available: true }
    ],
    lawScope: 'Federal Swiss Law'
  },
  US: {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    regions: [
      { code: 'CA', name: 'California', available: true }
    ],
    lawScope: 'Federal & California State Law'
  }
} as const;

export const LEGAL_AREAS = [
  {
    id: 'immigration',
    name: 'Immigration',
    description: 'Visa, citizenship, work permits'
  },
  {
    id: 'employment',
    name: 'Employment',
    description: 'Contracts, disputes, termination'
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Property, leases, transactions'
  },
  {
    id: 'family',
    name: 'Family Law',
    description: 'Divorce, custody, support'
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Formation, contracts, compliance'
  },
  {
    id: 'intellectual-property',
    name: 'IP & Patents',
    description: 'Trademarks, copyrights, patents'
  },
  {
    id: 'tax',
    name: 'Tax',
    description: 'Planning, disputes, compliance'
  },
  {
    id: 'estate',
    name: 'Estate Planning',
    description: 'Wills, trusts, inheritance'
  }
] as const;

export const FILE_CATEGORIES = {
  contract: { label: 'Contract', color: 'blue' },
  evidence: { label: 'Evidence', color: 'purple' },
  correspondence: { label: 'Correspondence', color: 'green' },
  'court-filing': { label: 'Court Filing', color: 'red' },
  identification: { label: 'ID Document', color: 'yellow' },
  financial: { label: 'Financial', color: 'indigo' },
  other: { label: 'Other', color: 'gray' }
} as const;

export const ROLE_PERMISSIONS = {
  client: [
    'view-case',
    'view-files',
    'upload-files',
    'view-messages',
    'send-messages',
    'view-billing'
  ],
  lawyer: ['*'], // All permissions
  paralegal: [
    'view-case',
    'view-files',
    'upload-files',
    'view-messages',
    'send-messages'
  ],
  expert: ['view-files'], // Only files shared with them
  admin: ['view-case', 'view-files', 'view-messages']
} as const;
