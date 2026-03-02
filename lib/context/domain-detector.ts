/**
 * Domain Detector
 *
 * Classifies text content into professional domains based on keyword matching.
 * Used to auto-tag user context and documents with relevant domains.
 */

const DOMAIN_KEYWORDS: Record<string, string[]> = {
  legal: [
    'contract',
    'lawsuit',
    'attorney',
    'lawyer',
    'court',
    'legal',
    'clause',
    'liability',
    'plaintiff',
    'defendant',
    'statute',
    'jurisdiction',
    'verdict',
    'settlement',
    'damages',
    'intellectual property',
    'patent',
    'trademark',
    'copyright',
    'regulation',
    'compliance',
    'tenant',
    'landlord',
    'lease',
    'employment law',
    'divorce',
    'custody',
    'will',
    'estate',
    'trust',
  ],
  health: [
    'diagnosis',
    'symptom',
    'medication',
    'doctor',
    'hospital',
    'treatment',
    'patient',
    'prescription',
    'medical',
    'health',
    'condition',
    'allergy',
    'blood pressure',
    'diabetes',
    'cholesterol',
    'therapy',
    'surgery',
    'immunization',
    'vaccine',
    'chronic',
    'acute',
    'mental health',
    'depression',
    'anxiety',
    'insurance claim',
    'referral',
  ],
  research: [
    'study',
    'research',
    'hypothesis',
    'experiment',
    'data analysis',
    'methodology',
    'peer review',
    'citation',
    'abstract',
    'thesis',
    'dissertation',
    'literature review',
    'sample size',
    'variable',
    'statistical',
    'correlation',
    'causation',
    'findings',
    'publication',
    'journal',
    'academic',
    'scholar',
  ],
  language: [
    'translation',
    'grammar',
    'vocabulary',
    'pronunciation',
    'conjugation',
    'tense',
    'fluency',
    'dialect',
    'idiom',
    'language learning',
    'bilingual',
    'native speaker',
    'accent',
    'phrase',
    'expression',
  ],
  creative: [
    'story',
    'character',
    'plot',
    'narrative',
    'poem',
    'creative writing',
    'dialogue',
    'fiction',
    'genre',
    'screenplay',
    'draft',
    'manuscript',
    'editing',
    'revision',
    'brainstorm',
    'outline',
  ],
  business: [
    'revenue',
    'profit',
    'startup',
    'investor',
    'business plan',
    'market',
    'strategy',
    'competitor',
    'customer',
    'pricing',
    'budget',
    'forecast',
    'roi',
    'kpi',
    'marketing',
    'sales',
    'product',
    'service',
    'growth',
    'scaling',
    'funding',
    'partnership',
  ],
};

/**
 * Detect which professional domains a piece of text is relevant to.
 * Returns at least ['general'] if no specific domain matches.
 */
export function detectDomains(text: string): string[] {
  const lower = text.toLowerCase();
  const matched: string[] = [];

  for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
    const matchCount = keywords.filter((kw) => lower.includes(kw)).length;
    // Require at least 2 keyword matches to assign a domain
    if (matchCount >= 2) {
      matched.push(domain);
    }
  }

  // Always include 'general'
  return matched.length > 0 ? [...matched, 'general'] : ['general'];
}
