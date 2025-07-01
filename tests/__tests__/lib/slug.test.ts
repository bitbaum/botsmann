import { generateSlug } from '@/src/lib/slug';

describe('generateSlug', () => {
  it('converts spaces to hyphens and lowercases', () => {
    expect(generateSlug('Test Bot')).toBe('test-bot');
  });

  it('trims extra whitespace', () => {
    expect(generateSlug('  My Bot  ')).toBe('my-bot');
  });

  it('removes non alphanumeric characters', () => {
    expect(generateSlug('Cool! Bot*&')).toBe('cool-bot');
  });
});
