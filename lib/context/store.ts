/**
 * User Context Store
 *
 * CRUD operations for the user_context table.
 * Stores accumulated knowledge extracted from conversations and documents.
 */

import { getServiceClient } from '@/lib/supabase';
import { generateEmbedding } from '@/lib/embeddings';

export interface UserContextEntry {
  id: string;
  content: string;
  domains: string[];
  source_type: 'conversation' | 'document' | 'manual';
  source_id?: string;
  confidence: number;
  similarity?: number;
}

/**
 * Save extracted context facts for a user.
 * Generates embeddings and stores them for later semantic search.
 */
export async function saveUserContext(
  userId: string,
  facts: Array<{
    content: string;
    domains: string[];
    sourceType: 'conversation' | 'document' | 'manual';
    sourceId?: string;
    confidence?: number;
  }>,
): Promise<number> {
  if (facts.length === 0) return 0;

  const supabase = getServiceClient();
  let saved = 0;

  for (const fact of facts) {
    try {
      const embedding = await generateEmbedding(fact.content);

      const { error } = await supabase.from('user_context').insert({
        user_id: userId,
        content: fact.content,
        domains: fact.domains,
        source_type: fact.sourceType,
        source_id: fact.sourceId,
        confidence: fact.confidence ?? 0.8,
        embedding,
      });

      if (!error) saved++;
    } catch {
      // Skip facts that fail to save — non-critical
    }
  }

  return saved;
}

/**
 * Find relevant context for a user based on semantic similarity.
 * Used to inject personalized context into professional chat prompts.
 */
export async function getRelevantContext(
  userId: string,
  domains: string[],
  query: string,
  maxResults: number = 10,
  matchThreshold: number = 0.3,
): Promise<UserContextEntry[]> {
  const supabase = getServiceClient();

  try {
    const embedding = await generateEmbedding(query);

    const { data, error } = await supabase.rpc('get_relevant_context', {
      p_user_id: userId,
      p_domains: domains,
      p_embedding: embedding,
      p_match_threshold: matchThreshold,
      p_max_results: maxResults,
    });

    if (error || !data) return [];

    return data as UserContextEntry[];
  } catch {
    return [];
  }
}
