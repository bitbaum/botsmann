import { truncateChunks, joinContext } from '@/lib/chat/context';
import { parseResponseWithSuggestions } from '@/lib/chat/parse';

describe('truncateChunks', () => {
  it('returns all chunks when within budget', () => {
    const chunks = [{ content: 'Hello' }, { content: 'World' }];
    const result = truncateChunks(chunks, 1000);
    expect(result).toHaveLength(2);
    expect(result[0].content).toBe('Hello');
    expect(result[1].content).toBe('World');
  });

  it('truncates when chunks exceed budget', () => {
    const chunks = [{ content: 'A'.repeat(500) }, { content: 'B'.repeat(500) }];
    const result = truncateChunks(chunks, 600);
    // First chunk fits (500), second partially included since 100 < 200
    expect(result).toHaveLength(1);
  });

  it('partially includes last chunk when remaining > 200', () => {
    const chunks = [{ content: 'A'.repeat(300) }, { content: 'B'.repeat(500) }];
    const result = truncateChunks(chunks, 600);
    expect(result).toHaveLength(2);
    expect(result[1].content).toContain('[truncated]');
    expect(result[1].content.length).toBeLessThan(500);
  });

  it('returns empty array for empty input', () => {
    expect(truncateChunks([], 1000)).toEqual([]);
  });

  it('preserves extra properties on chunks', () => {
    const chunks = [{ content: 'test', topic: 'general', score: 0.9 }];
    const result = truncateChunks(chunks, 1000);
    expect(result[0]).toHaveProperty('topic', 'general');
    expect(result[0]).toHaveProperty('score', 0.9);
  });
});

describe('joinContext', () => {
  it('joins parts with separator', () => {
    const result = joinContext(['Part 1', 'Part 2']);
    expect(result).toBe('Part 1\n\n---\n\nPart 2');
  });

  it('handles single part', () => {
    expect(joinContext(['Only part'])).toBe('Only part');
  });

  it('handles empty array', () => {
    expect(joinContext([])).toBe('');
  });
});

describe('parseResponseWithSuggestions', () => {
  it('extracts suggestions prefixed with >>>', () => {
    const raw = 'Main response here.\n>>>Follow up question?\n>>>Another suggestion';
    const result = parseResponseWithSuggestions(raw);
    expect(result.content).toBe('Main response here.');
    expect(result.suggestions).toEqual(['Follow up question?', 'Another suggestion']);
  });

  it('returns empty suggestions when none present', () => {
    const result = parseResponseWithSuggestions('Just a regular response.');
    expect(result.content).toBe('Just a regular response.');
    expect(result.suggestions).toEqual([]);
  });

  it('limits to 3 suggestions', () => {
    const raw =
      'Content\n>>>First question?\n>>>Second question?\n>>>Third question?\n>>>Fourth question?';
    const result = parseResponseWithSuggestions(raw);
    expect(result.suggestions).toHaveLength(3);
  });

  it('ignores short suggestions (<=3 chars)', () => {
    const raw = 'Content\n>>>Hi\n>>>A valid question?';
    const result = parseResponseWithSuggestions(raw);
    expect(result.suggestions).toEqual(['A valid question?']);
  });

  it('trims trailing empty lines from content', () => {
    const raw = 'Response\n\n\n>>>Suggestion';
    const result = parseResponseWithSuggestions(raw);
    expect(result.content).toBe('Response');
  });

  it('handles empty input', () => {
    const result = parseResponseWithSuggestions('');
    expect(result.content).toBe('');
    expect(result.suggestions).toEqual([]);
  });
});
