import { NLPResult } from '@/types/products';
import { generateWithBestProvider } from '@/lib/llm-client';

/**
 * Converts a one-word shopping query into structured search parameters.
 *
 * Routed through `generateWithBestProvider` (Ollama -> Groq -> OpenRouter),
 * not a hardcoded OpenAI call: this used to `fetch` `api.openai.com` directly
 * with a single model and no fallback, which meant it was dead code the
 * moment `OPENAI_API_KEY` was unset (it always is in production) or OpenAI
 * had an outage. Any failure -- provider unavailable, malformed JSON, no
 * content -- degrades to a basic keyword search rather than surfacing an
 * error, exactly as before.
 */
export async function processQuery(query: string): Promise<NLPResult> {
  try {
    const { content } = await generateWithBestProvider([
      {
        role: 'system',
        content: `Convert one-word shopping queries into structured product search parameters.
                   Return a JSON object with 'category' and 'attributes'.
                   Example: For "laptop", return:
                   {
                     "category": "electronics/computers",
                     "attributes": {
                       "type": "laptop",
                       "minRam": "8GB",
                       "minStorage": "256GB"
                     }
                   }`,
      },
      {
        role: 'user',
        content: query,
      },
    ]);

    if (!content) {
      throw new Error('Invalid response from LLM provider');
    }

    try {
      const parsed = JSON.parse(content);
      return {
        category: parsed.category || 'general',
        attributes: parsed.attributes || {},
      };
    } catch {
      // Non-critical: error handled via fallback
      return {
        category: 'general',
        attributes: { query },
      };
    }
  } catch {
    // Fallback to basic search
    return {
      category: 'general',
      attributes: { query },
    };
  }
}
