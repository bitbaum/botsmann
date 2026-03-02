/**
 * Shared user LLM settings lookup
 * @module lib/chat/settings
 */

import { getServiceClient } from '@/lib/supabase';
import type { ModelProvider } from '@/lib/llm-client';

export interface LLMSettings {
  provider: ModelProvider;
  apiKey: string | null | undefined;
  ollamaUrl: string | null | undefined;
}

/**
 * Look up a user's preferred LLM provider and API keys.
 * Falls back to 'groq' if no settings exist.
 */
export async function getUserLLMSettings(userId: string): Promise<LLMSettings> {
  const supabase = getServiceClient();
  const { data: settings } = await supabase
    .from('user_settings')
    .select('*')
    .eq('id', userId)
    .single();

  const provider: ModelProvider = settings?.preferred_model || 'groq';
  const apiKey =
    provider === 'groq'
      ? settings?.groq_api_key
      : provider === 'openrouter'
        ? settings?.openrouter_api_key
        : null;
  const ollamaUrl = settings?.ollama_url;

  return { provider, apiKey, ollamaUrl };
}
