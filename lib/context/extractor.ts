/**
 * Context Extractor
 *
 * Uses LLM to extract factual information about a user from conversation messages.
 * Extracted facts are stored in user_context for future personalization.
 */

import { generateLLMResponse } from '@/lib/llm-client';
import { detectDomains } from '@/lib/context/domain-detector';
import { saveUserContext } from '@/lib/context/store';

const EXTRACTION_PROMPT = `You are a fact extraction system. Given a conversation between a user and an AI assistant, extract specific factual information about the user that would be useful for future conversations.

Rules:
- Extract ONLY concrete facts (names, dates, conditions, preferences, situations)
- Each fact should be a single, self-contained statement
- Do NOT extract opinions, general knowledge, or AI assistant responses
- Do NOT extract greetings or pleasantries
- If no useful facts are present, return an empty array
- Keep each fact under 200 characters
- Assign a confidence score (0.5-1.0) based on how clearly the fact is stated

Return a JSON array of objects: [{"fact": "...", "confidence": 0.8}]
Return ONLY the JSON array, no other text.`;

interface ExtractedFact {
  fact: string;
  confidence: number;
}

/**
 * Extract facts from a conversation turn and save them as user context.
 *
 * Called asynchronously after each conversation turn — not in the critical path.
 */
export async function extractAndSaveContext(
  userId: string,
  conversationId: string,
  userMessage: string,
  assistantResponse: string,
  professionalDomain?: string,
): Promise<number> {
  try {
    const facts = await extractFacts(userMessage, assistantResponse);
    if (facts.length === 0) return 0;

    const contextFacts = facts.map((f) => ({
      content: f.fact,
      domains: professionalDomain ? [professionalDomain, 'general'] : detectDomains(f.fact),
      sourceType: 'conversation' as const,
      sourceId: conversationId,
      confidence: f.confidence,
    }));

    return await saveUserContext(userId, contextFacts);
  } catch {
    return 0;
  }
}

/**
 * Use LLM to extract facts from a conversation turn.
 */
async function extractFacts(
  userMessage: string,
  assistantResponse: string,
): Promise<ExtractedFact[]> {
  const conversationText = `User: ${userMessage}\nAssistant: ${assistantResponse}`;

  try {
    const response = await generateLLMResponse(
      [
        { role: 'system', content: EXTRACTION_PROMPT },
        { role: 'user', content: conversationText },
      ],
      {
        provider: 'groq',
        temperature: 0.1,
        maxTokens: 512,
      },
    );

    const parsed = JSON.parse(response.content);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (item: unknown): item is ExtractedFact =>
          typeof item === 'object' &&
          item !== null &&
          'fact' in item &&
          typeof (item as ExtractedFact).fact === 'string' &&
          (item as ExtractedFact).fact.length > 0 &&
          (item as ExtractedFact).fact.length <= 200,
      )
      .map((item) => ({
        fact: item.fact,
        confidence: Math.min(1, Math.max(0.5, item.confidence ?? 0.8)),
      }));
  } catch {
    return [];
  }
}
