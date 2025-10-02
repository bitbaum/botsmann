// Hierarchical jurisdiction data structure
export interface JurisdictionHierarchy {
  code: string;
  name: string;
  flag: string;
  type: 'country' | 'state' | 'province' | 'emirate' | 'city-state' | 'region';
  children?: JurisdictionHierarchy[];
  popular?: boolean; // For frequently selected jurisdictions
}

// Complete hierarchical jurisdiction data
export const JURISDICTIONS: JurisdictionHierarchy[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    type: 'country',
    popular: true,
    children: [
      { code: 'US-AL', name: 'Alabama', flag: '🇺🇸', type: 'state' },
      { code: 'US-AK', name: 'Alaska', flag: '🇺🇸', type: 'state' },
      { code: 'US-AZ', name: 'Arizona', flag: '🇺🇸', type: 'state' },
      { code: 'US-AR', name: 'Arkansas', flag: '🇺🇸', type: 'state' },
      { code: 'US-CA', name: 'California', flag: '🇺🇸', type: 'state', popular: true },
      { code: 'US-CO', name: 'Colorado', flag: '🇺🇸', type: 'state' },
      { code: 'US-CT', name: 'Connecticut', flag: '🇺🇸', type: 'state' },
      { code: 'US-DE', name: 'Delaware', flag: '🇺🇸', type: 'state' },
      { code: 'US-FL', name: 'Florida', flag: '🇺🇸', type: 'state', popular: true },
      { code: 'US-GA', name: 'Georgia', flag: '🇺🇸', type: 'state' },
      { code: 'US-HI', name: 'Hawaii', flag: '🇺🇸', type: 'state' },
      { code: 'US-ID', name: 'Idaho', flag: '🇺🇸', type: 'state' },
      { code: 'US-IL', name: 'Illinois', flag: '🇺🇸', type: 'state' },
      { code: 'US-IN', name: 'Indiana', flag: '🇺🇸', type: 'state' },
      { code: 'US-IA', name: 'Iowa', flag: '🇺🇸', type: 'state' },
      { code: 'US-KS', name: 'Kansas', flag: '🇺🇸', type: 'state' },
      { code: 'US-KY', name: 'Kentucky', flag: '🇺🇸', type: 'state' },
      { code: 'US-LA', name: 'Louisiana', flag: '🇺🇸', type: 'state' },
      { code: 'US-ME', name: 'Maine', flag: '🇺🇸', type: 'state' },
      { code: 'US-MD', name: 'Maryland', flag: '🇺🇸', type: 'state' },
      { code: 'US-MA', name: 'Massachusetts', flag: '🇺🇸', type: 'state' },
      { code: 'US-MI', name: 'Michigan', flag: '🇺🇸', type: 'state' },
      { code: 'US-MN', name: 'Minnesota', flag: '🇺🇸', type: 'state' },
      { code: 'US-MS', name: 'Mississippi', flag: '🇺🇸', type: 'state' },
      { code: 'US-MO', name: 'Missouri', flag: '🇺🇸', type: 'state' },
      { code: 'US-MT', name: 'Montana', flag: '🇺🇸', type: 'state' },
      { code: 'US-NE', name: 'Nebraska', flag: '🇺🇸', type: 'state' },
      { code: 'US-NV', name: 'Nevada', flag: '🇺🇸', type: 'state' },
      { code: 'US-NH', name: 'New Hampshire', flag: '🇺🇸', type: 'state' },
      { code: 'US-NJ', name: 'New Jersey', flag: '🇺🇸', type: 'state' },
      { code: 'US-NM', name: 'New Mexico', flag: '🇺🇸', type: 'state' },
      { code: 'US-NY', name: 'New York', flag: '🇺🇸', type: 'state', popular: true },
      { code: 'US-NC', name: 'North Carolina', flag: '🇺🇸', type: 'state' },
      { code: 'US-ND', name: 'North Dakota', flag: '🇺🇸', type: 'state' },
      { code: 'US-OH', name: 'Ohio', flag: '🇺🇸', type: 'state' },
      { code: 'US-OK', name: 'Oklahoma', flag: '🇺🇸', type: 'state' },
      { code: 'US-OR', name: 'Oregon', flag: '🇺🇸', type: 'state' },
      { code: 'US-PA', name: 'Pennsylvania', flag: '🇺🇸', type: 'state' },
      { code: 'US-RI', name: 'Rhode Island', flag: '🇺🇸', type: 'state' },
      { code: 'US-SC', name: 'South Carolina', flag: '🇺🇸', type: 'state' },
      { code: 'US-SD', name: 'South Dakota', flag: '🇺🇸', type: 'state' },
      { code: 'US-TN', name: 'Tennessee', flag: '🇺🇸', type: 'state' },
      { code: 'US-TX', name: 'Texas', flag: '🇺🇸', type: 'state', popular: true },
      { code: 'US-UT', name: 'Utah', flag: '🇺🇸', type: 'state' },
      { code: 'US-VT', name: 'Vermont', flag: '🇺🇸', type: 'state' },
      { code: 'US-VA', name: 'Virginia', flag: '🇺🇸', type: 'state' },
      { code: 'US-WA', name: 'Washington', flag: '🇺🇸', type: 'state' },
      { code: 'US-WV', name: 'West Virginia', flag: '🇺🇸', type: 'state' },
      { code: 'US-WI', name: 'Wisconsin', flag: '🇺🇸', type: 'state' },
      { code: 'US-WY', name: 'Wyoming', flag: '🇺🇸', type: 'state' }
    ]
  },
  {
    code: 'EU',
    name: 'European Union',
    flag: '🇪🇺',
    type: 'region',
    popular: true,
    children: [
      { code: 'AT', name: 'Austria', flag: '🇦🇹', type: 'country' },
      { code: 'BE', name: 'Belgium', flag: '🇧🇪', type: 'country' },
      { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', type: 'country' },
      { code: 'HR', name: 'Croatia', flag: '🇭🇷', type: 'country' },
      { code: 'CY', name: 'Cyprus', flag: '🇨🇾', type: 'country' },
      { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', type: 'country' },
      { code: 'DK', name: 'Denmark', flag: '🇩🇰', type: 'country' },
      { code: 'EE', name: 'Estonia', flag: '🇪🇪', type: 'country' },
      { code: 'FI', name: 'Finland', flag: '🇫🇮', type: 'country' },
      { code: 'FR', name: 'France', flag: '🇫🇷', type: 'country', popular: true },
      { code: 'DE', name: 'Germany', flag: '🇩🇪', type: 'country', popular: true },
      { code: 'GR', name: 'Greece', flag: '🇬🇷', type: 'country' },
      { code: 'HU', name: 'Hungary', flag: '🇭🇺', type: 'country' },
      { code: 'IE', name: 'Ireland', flag: '🇮🇪', type: 'country' },
      { code: 'IT', name: 'Italy', flag: '🇮🇹', type: 'country', popular: true },
      { code: 'LV', name: 'Latvia', flag: '🇱🇻', type: 'country' },
      { code: 'LT', name: 'Lithuania', flag: '🇱🇹', type: 'country' },
      { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', type: 'country' },
      { code: 'MT', name: 'Malta', flag: '🇲🇹', type: 'country' },
      { code: 'NL', name: 'Netherlands', flag: '🇳🇱', type: 'country', popular: true },
      { code: 'PL', name: 'Poland', flag: '🇵🇱', type: 'country' },
      { code: 'PT', name: 'Portugal', flag: '🇵🇹', type: 'country' },
      { code: 'RO', name: 'Romania', flag: '🇷🇴', type: 'country' },
      { code: 'SK', name: 'Slovakia', flag: '🇸🇰', type: 'country' },
      { code: 'SI', name: 'Slovenia', flag: '🇸🇮', type: 'country' },
      { code: 'ES', name: 'Spain', flag: '🇪🇸', type: 'country', popular: true },
      { code: 'SE', name: 'Sweden', flag: '🇸🇪', type: 'country' }
    ]
  },
  {
    code: 'UK',
    name: 'United Kingdom',
    flag: '🇬🇧',
    type: 'country',
    popular: true,
    children: [
      { code: 'UK-ENG', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', type: 'region', popular: true },
      { code: 'UK-SCT', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', type: 'region' },
      { code: 'UK-WLS', name: 'Wales', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', type: 'region' },
      { code: 'UK-NIR', name: 'Northern Ireland', flag: '🇬🇧', type: 'region' }
    ]
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    type: 'country',
    popular: true,
    children: [
      { code: 'CA-AB', name: 'Alberta', flag: '🇨🇦', type: 'province' },
      { code: 'CA-BC', name: 'British Columbia', flag: '🇨🇦', type: 'province', popular: true },
      { code: 'CA-MB', name: 'Manitoba', flag: '🇨🇦', type: 'province' },
      { code: 'CA-NB', name: 'New Brunswick', flag: '🇨🇦', type: 'province' },
      { code: 'CA-NL', name: 'Newfoundland and Labrador', flag: '🇨🇦', type: 'province' },
      { code: 'CA-NS', name: 'Nova Scotia', flag: '🇨🇦', type: 'province' },
      { code: 'CA-ON', name: 'Ontario', flag: '🇨🇦', type: 'province', popular: true },
      { code: 'CA-PE', name: 'Prince Edward Island', flag: '🇨🇦', type: 'province' },
      { code: 'CA-QC', name: 'Quebec', flag: '🇨🇦', type: 'province', popular: true },
      { code: 'CA-SK', name: 'Saskatchewan', flag: '🇨🇦', type: 'province' }
    ]
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    type: 'country',
    popular: true,
    children: [
      { code: 'AU-NSW', name: 'New South Wales', flag: '🇦🇺', type: 'state', popular: true },
      { code: 'AU-VIC', name: 'Victoria', flag: '🇦🇺', type: 'state', popular: true },
      { code: 'AU-QLD', name: 'Queensland', flag: '🇦🇺', type: 'state' },
      { code: 'AU-SA', name: 'South Australia', flag: '🇦🇺', type: 'state' },
      { code: 'AU-WA', name: 'Western Australia', flag: '🇦🇺', type: 'state' },
      { code: 'AU-TAS', name: 'Tasmania', flag: '🇦🇺', type: 'state' }
    ]
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    type: 'country',
    popular: true,
    children: [
      { code: 'AE-DU', name: 'Dubai', flag: '🇦🇪', type: 'emirate', popular: true },
      { code: 'AE-AZ', name: 'Abu Dhabi', flag: '🇦🇪', type: 'emirate', popular: true },
      { code: 'AE-SH', name: 'Sharjah', flag: '🇦🇪', type: 'emirate' },
      { code: 'AE-AJ', name: 'Ajman', flag: '🇦🇪', type: 'emirate' },
      { code: 'AE-UQ', name: 'Umm Al Quwain', flag: '🇦🇪', type: 'emirate' },
      { code: 'AE-FU', name: 'Fujairah', flag: '🇦🇪', type: 'emirate' },
      { code: 'AE-RK', name: 'Ras Al Khaimah', flag: '🇦🇪', type: 'emirate' }
    ]
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    type: 'city-state',
    popular: true
  },
  {
    code: 'CH',
    name: 'Switzerland',
    flag: '🇨🇭',
    type: 'country',
    popular: true,
    children: [
      { code: 'CH-ZH', name: 'Zürich', flag: '🇨🇭', type: 'state', popular: true },
      { code: 'CH-BE', name: 'Bern', flag: '🇨🇭', type: 'state', popular: true },
      { code: 'CH-LU', name: 'Luzern', flag: '🇨🇭', type: 'state' },
      { code: 'CH-UR', name: 'Uri', flag: '🇨🇭', type: 'state' },
      { code: 'CH-SZ', name: 'Schwyz', flag: '🇨🇭', type: 'state' },
      { code: 'CH-OW', name: 'Obwalden', flag: '🇨🇭', type: 'state' },
      { code: 'CH-NW', name: 'Nidwalden', flag: '🇨🇭', type: 'state' },
      { code: 'CH-GL', name: 'Glarus', flag: '🇨🇭', type: 'state' },
      { code: 'CH-ZG', name: 'Zug', flag: '🇨🇭', type: 'state' },
      { code: 'CH-FR', name: 'Fribourg', flag: '🇨🇭', type: 'state' },
      { code: 'CH-SO', name: 'Solothurn', flag: '🇨🇭', type: 'state' },
      { code: 'CH-BS', name: 'Basel-Stadt', flag: '🇨🇭', type: 'state' },
      { code: 'CH-BL', name: 'Basel-Landschaft', flag: '🇨🇭', type: 'state' },
      { code: 'CH-SH', name: 'Schaffhausen', flag: '🇨🇭', type: 'state' },
      { code: 'CH-AR', name: 'Appenzell Ausserrhoden', flag: '🇨🇭', type: 'state' },
      { code: 'CH-AI', name: 'Appenzell Innerrhoden', flag: '🇨🇭', type: 'state' },
      { code: 'CH-SG', name: 'St. Gallen', flag: '🇨🇭', type: 'state' },
      { code: 'CH-GR', name: 'Graubünden', flag: '🇨🇭', type: 'state' },
      { code: 'CH-AG', name: 'Aargau', flag: '🇨🇭', type: 'state' },
      { code: 'CH-TG', name: 'Thurgau', flag: '🇨🇭', type: 'state' },
      { code: 'CH-TI', name: 'Ticino', flag: '🇨🇭', type: 'state' },
      { code: 'CH-VD', name: 'Vaud', flag: '🇨🇭', type: 'state', popular: true },
      { code: 'CH-VS', name: 'Valais', flag: '🇨🇭', type: 'state' },
      { code: 'CH-NE', name: 'Neuchâtel', flag: '🇨🇭', type: 'state' },
      { code: 'CH-GE', name: 'Geneva', flag: '🇨🇭', type: 'state', popular: true },
      { code: 'CH-JU', name: 'Jura', flag: '🇨🇭', type: 'state' }
    ]
  },
  {
    code: 'HK',
    name: 'Hong Kong',
    flag: '🇭🇰',
    type: 'city-state',
    popular: true
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    type: 'country',
    popular: true,
    children: [
      { code: 'IN-DL', name: 'Delhi', flag: '🇮🇳', type: 'state', popular: true },
      { code: 'IN-MH', name: 'Maharashtra', flag: '🇮🇳', type: 'state', popular: true },
      { code: 'IN-KA', name: 'Karnataka', flag: '🇮🇳', type: 'state', popular: true },
      { code: 'IN-TN', name: 'Tamil Nadu', flag: '🇮🇳', type: 'state' },
      { code: 'IN-GJ', name: 'Gujarat', flag: '🇮🇳', type: 'state' }
    ]
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    type: 'country',
    popular: true
  },
  {
    code: 'KR',
    name: 'South Korea',
    flag: '🇰🇷',
    type: 'country',
    popular: true
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    type: 'country',
    popular: true
  },
  {
    code: 'MX',
    name: 'Mexico',
    flag: '🇲🇽',
    type: 'country',
    popular: true
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    flag: '🇳🇿',
    type: 'country'
  },
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    type: 'country'
  }
];

// Helper function to find jurisdiction by code
export function findJurisdiction(code: string, jurisdictions: JurisdictionHierarchy[] = JURISDICTIONS): JurisdictionHierarchy | null {
  for (const jurisdiction of jurisdictions) {
    if (jurisdiction.code === code) {
      return jurisdiction;
    }
    if (jurisdiction.children) {
      const found = findJurisdiction(code, jurisdiction.children);
      if (found) return found;
    }
  }
  return null;
}

// Get breadcrumb path for a jurisdiction
export function getJurisdictionPath(code: string, jurisdictions: JurisdictionHierarchy[] = JURISDICTIONS, path: JurisdictionHierarchy[] = []): JurisdictionHierarchy[] {
  for (const jurisdiction of jurisdictions) {
    const currentPath = [...path, jurisdiction];
    if (jurisdiction.code === code) {
      return currentPath;
    }
    if (jurisdiction.children) {
      const found = getJurisdictionPath(code, jurisdiction.children, currentPath);
      if (found.length > 0) return found;
    }
  }
  return [];
}

// Get popular jurisdictions for quick access
export function getPopularJurisdictions(): JurisdictionHierarchy[] {
  const popular: JurisdictionHierarchy[] = [];

  function traverse(jurisdictions: JurisdictionHierarchy[]) {
    for (const jurisdiction of jurisdictions) {
      if (jurisdiction.popular) {
        popular.push(jurisdiction);
      }
      if (jurisdiction.children) {
        traverse(jurisdiction.children);
      }
    }
  }

  traverse(JURISDICTIONS);
  return popular;
}
