import { detectDomains } from '@/lib/context/domain-detector';

describe('detectDomains', () => {
  it('returns ["general"] for text with no domain keywords', () => {
    expect(detectDomains('Hello, how are you today?')).toEqual(['general']);
  });

  it('returns ["general"] for empty string', () => {
    expect(detectDomains('')).toEqual(['general']);
  });

  it('detects legal domain with multiple keywords', () => {
    const result = detectDomains('I need to review my contract with the attorney');
    expect(result).toContain('legal');
    expect(result).toContain('general');
  });

  it('detects health domain with multiple keywords', () => {
    const result = detectDomains('My doctor prescribed medication for my condition');
    expect(result).toContain('health');
    expect(result).toContain('general');
  });

  it('detects research domain with multiple keywords', () => {
    const result = detectDomains('The study methodology uses statistical analysis');
    expect(result).toContain('research');
    expect(result).toContain('general');
  });

  it('detects business domain with multiple keywords', () => {
    const result = detectDomains('Our startup needs funding for marketing and growth');
    expect(result).toContain('business');
    expect(result).toContain('general');
  });

  it('detects creative domain with multiple keywords', () => {
    const result = detectDomains('The story has a compelling character and plot');
    expect(result).toContain('creative');
    expect(result).toContain('general');
  });

  it('detects language domain with multiple keywords', () => {
    const result = detectDomains('I need help with grammar and vocabulary in translation');
    expect(result).toContain('language');
    expect(result).toContain('general');
  });

  it('requires at least 2 keywords to match a domain', () => {
    // Only one keyword — should not match
    const result = detectDomains('I saw my doctor yesterday');
    expect(result).toEqual(['general']);
  });

  it('detects multiple domains when text spans topics', () => {
    const result = detectDomains(
      'The research study analyzed medical treatment data for patient diagnosis methodology',
    );
    expect(result).toContain('health');
    expect(result).toContain('research');
    expect(result).toContain('general');
  });

  it('is case-insensitive', () => {
    const result = detectDomains('CONTRACT review with ATTORNEY needed');
    expect(result).toContain('legal');
  });
});
