/**
 * Shared user LLM settings lookup
 * @module lib/chat/settings
 */

import { getServiceClient } from '@/lib/supabase';
import type { ModelProvider } from '@/lib/llm-client';
import { KEY_COLUMN, readStoredKey, sealKey, sealingSecret } from '@/lib/byok-vault';

export interface LLMSettings {
  provider: ModelProvider;
  apiKey: string | null | undefined;
  ollamaUrl: string | null | undefined;
}

/**
 * Look up a user's preferred LLM provider and API keys.
 * Falls back to 'groq' if no settings exist.
 *
 * Keys are stored sealed (lib/byok-vault.ts). A key an older version stored in
 * the clear still works, and is sealed in place here the first time it is read.
 */
export async function getUserLLMSettings(userId: string): Promise<LLMSettings> {
  const supabase = getServiceClient();
  const { data: settings } = await supabase
    .from('user_settings')
    .select('*')
    .eq('id', userId)
    .single();

  const provider: ModelProvider = settings?.preferred_model || 'groq';
  const ollamaUrl = settings?.ollama_url;
  if (provider !== 'groq' && provider !== 'openrouter') {
    return { provider, apiKey: null, ollamaUrl };
  }

  const column = KEY_COLUMN[provider];
  const secret = sealingSecret();
  const { key, legacy } = readStoredKey(settings?.[column], secret);
  if (key && legacy && secret) {
    // Best effort: a failed write leaves the key usable and tries again next read.
    await supabase
      .from('user_settings')
      .update({ [column]: sealKey(key, secret) })
      .eq('id', userId);
  }

  return { provider, apiKey: key, ollamaUrl };
}
