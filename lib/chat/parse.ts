/**
 * Parse LLM response to extract suggestions
 * @module lib/chat/parse
 *
 * Lines prefixed with ">>>" are treated as follow-up suggestions.
 */

/**
 * Parse an LLM response to separate main content from follow-up suggestions.
 * Suggestions are lines starting with ">>>".
 */
export function parseResponseWithSuggestions(rawContent: string): {
  content: string;
  suggestions: string[];
} {
  const lines = rawContent.split('\n');
  const suggestions: string[] = [];
  const contentLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('>>>')) {
      const suggestion = trimmed.slice(3).trim();
      if (suggestion && suggestion.length > 3) {
        suggestions.push(suggestion);
      }
    } else {
      contentLines.push(line);
    }
  }

  // Clean up trailing empty lines
  while (contentLines.length > 0 && contentLines[contentLines.length - 1].trim() === '') {
    contentLines.pop();
  }

  return {
    content: contentLines.join('\n').trim(),
    suggestions: suggestions.slice(0, 3),
  };
}
