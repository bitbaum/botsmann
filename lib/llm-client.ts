/**
 * Multi-Provider LLM Client
 *
 * Supports:
 * - Groq (free, default)
 * - OpenRouter (100+ models: Claude, GPT, Gemini, Grok, etc.)
 * - Ollama (local)
 */

import { freeChain, providerModels } from 'ai-kit';
import { API_CONFIG } from '@/lib/constants';
import { getServerEnv, getClientEnv } from '@/lib/config/env';
import { logger } from './logger';

/**
 * The models to try at each vendor, in order, from `ai-kit`.
 *
 * A list rather than a name, because the previous single ids were retired out
 * from under this app and there was nothing between that and total failure:
 * `generateWithBestProvider` picks ONE provider and calls it once. A retired id
 * was a dead chatbot with a valid key.
 *
 * The lists cross models, not vendors — vendor selection above stays exactly as
 * it was. That is the smaller half of the protection (a spent daily budget is
 * org-wide, so every model at the same vendor dies together), but it is the
 * half that covers rot, which is what actually happened here twice.
 */
const groqModels = () => providerModels(freeChain('BOTSMANN')[0]);
const openRouterModels = () => providerModels(freeChain('BOTSMANN')[1]);

export type ModelProvider = 'groq' | 'openrouter' | 'ollama';

interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface LLMOptions {
  provider: ModelProvider;
  apiKey?: string | null;
  ollamaUrl?: string | null;
  model?: string; // Optional model override for OpenRouter
  temperature?: number;
  maxTokens?: number;
}

interface LLMResponse {
  content: string;
  provider: ModelProvider;
  model: string;
}

// Ollama configuration (lazy to avoid calling getServerEnv at module scope during SSG)
const getOllamaModel = () => getServerEnv().OLLAMA_MODEL;

/**
 * Generate a response using the specified LLM provider
 */
export async function generateLLMResponse(
  messages: LLMMessage[],
  options: LLMOptions,
): Promise<LLMResponse> {
  const { provider, apiKey, ollamaUrl, model, temperature = 0.7, maxTokens = 1024 } = options;

  switch (provider) {
    case 'groq':
      return generateWithGroq(messages, apiKey, temperature, maxTokens);
    case 'openrouter':
      return generateWithOpenRouter(messages, apiKey, model, temperature, maxTokens);
    case 'ollama':
      return generateWithOllama(messages, ollamaUrl, temperature, maxTokens);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

/**
 * Generate with Groq (free tier)
 */
async function generateWithGroq(
  messages: LLMMessage[],
  apiKey: string | null | undefined,
  temperature: number,
  maxTokens: number,
): Promise<LLMResponse> {
  // Use provided key or fallback to server-side key
  // Clean the key: trim whitespace and remove any literal \n or escaped newlines
  const rawKey = apiKey || getServerEnv().GROQ_API_KEY;
  const key = rawKey?.trim().replace(/\\n/g, '').replace(/\n/g, '');

  if (!key) {
    throw new Error('Groq API key not configured');
  }

  const models = groqModels();
  let lastStatus = 0;
  let lastError = '';

  for (const model of models) {
    const response = await fetch(API_CONFIG.GROQ_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      lastStatus = response.status;
      lastError = await response.text();
      // A 404 here means the id was retired, which is the whole reason this is
      // a loop; a 429 means this model is busy or spent. Either way the next id
      // is a different model and worth asking.
      logger.error(`Groq API error: ${response.status} (model ${model})`, lastError);
      continue;
    }

    const data = await response.json();
    return {
      content: data.choices[0]?.message?.content || '',
      provider: 'groq',
      model,
    };
  }

  throw new Error(`Groq API error: ${lastStatus} — all ${models.length} model(s) failed`);
}

/**
 * Generate with OpenRouter (100+ models)
 * Supports Claude, GPT-4, Gemini, Grok, Llama, Mistral, and more
 */
async function generateWithOpenRouter(
  messages: LLMMessage[],
  apiKey: string | null | undefined,
  model: string | undefined,
  temperature: number,
  maxTokens: number,
): Promise<LLMResponse> {
  if (!apiKey) {
    throw new Error('OpenRouter API key required');
  }

  // An explicit caller override is honoured as-is and alone: if someone names a
  // model, silently answering from a different one is worse than failing.
  const models = model ? [model] : openRouterModels();
  let lastStatus = 0;
  let lastError = '';

  for (const selectedModel of models) {
    const response = await fetch(API_CONFIG.OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': getClientEnv().NEXT_PUBLIC_APP_URL,
        'X-Title': 'Botsmann',
      },
      body: JSON.stringify({
        model: selectedModel,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      lastStatus = response.status;
      lastError = await response.text();
      logger.error(`OpenRouter API error: ${response.status} (model ${selectedModel})`, lastError);
      continue;
    }

    const data = await response.json();
    return {
      content: data.choices[0]?.message?.content || '',
      provider: 'openrouter',
      model: selectedModel,
    };
  }

  throw new Error(
    `OpenRouter API request failed: ${lastStatus} — all ${models.length} model(s) failed`,
  );
}

/**
 * Generate with Ollama (local)
 */
async function generateWithOllama(
  messages: LLMMessage[],
  ollamaUrl: string | null | undefined,
  temperature: number,
  maxTokens: number,
): Promise<LLMResponse> {
  const baseUrl = ollamaUrl || 'http://localhost:11434';
  const url = `${baseUrl}/api/chat`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: getOllamaModel(),
        messages,
        stream: false,
        options: {
          temperature,
          num_predict: maxTokens,
        },
      }),
      signal: AbortSignal.timeout(60000), // 60 second timeout for model loading
    });

    if (!response.ok) {
      const error = await response.text();
      logger.error('Ollama API error:', error);
      throw new Error('Ollama API request failed');
    }

    const data = await response.json();
    return {
      content: data.message?.content || '',
      provider: 'ollama',
      model: getOllamaModel(),
    };
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Cannot connect to Ollama. Is it running?');
    }
    throw error;
  }
}

/**
 * Helper to create a simple chat completion
 */
export async function chat(
  systemPrompt: string,
  userMessage: string,
  context: string,
  options: LLMOptions,
): Promise<string> {
  const messages: LLMMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Context:\n${context}\n\n---\nUser question: ${userMessage}` },
  ];

  const response = await generateLLMResponse(messages, options);
  return response.content;
}

/**
 * Check if Ollama is available and running
 */
export async function isOllamaAvailable(ollamaUrl?: string): Promise<boolean> {
  const baseUrl = ollamaUrl || getServerEnv().OLLAMA_URL;
  try {
    const response = await fetch(`${baseUrl}/api/tags`, {
      method: 'GET',
      signal: AbortSignal.timeout(2000), // 2 second timeout
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get the best available provider based on configuration
 * Priority: Ollama (local, free) > Groq (cloud, free) > OpenRouter (cloud, paid)
 */
export async function getBestProvider(): Promise<{
  provider: ModelProvider;
  available: boolean;
  reason: string;
}> {
  // Check Ollama first (local = best for privacy)
  const ollamaAvailable = await isOllamaAvailable();
  if (ollamaAvailable) {
    return {
      provider: 'ollama',
      available: true,
      reason: 'Local Ollama running',
    };
  }

  // Check Groq (free cloud)
  const env = getServerEnv();
  if (env.GROQ_API_KEY) {
    return {
      provider: 'groq',
      available: true,
      reason: 'Groq API key configured',
    };
  }

  // Check OpenRouter (paid cloud)
  if (env.OPENROUTER_API_KEY) {
    return {
      provider: 'openrouter',
      available: true,
      reason: 'OpenRouter API key configured',
    };
  }

  // No provider available
  return {
    provider: 'ollama',
    available: false,
    reason: 'No LLM provider available. Start Ollama or configure API keys.',
  };
}

/**
 * Generate a response using the best available provider
 */
/**
 * Every provider that is configured, in preference order.
 *
 * Ollama first (local, private, free), then Groq (free tier), then OpenRouter
 * (paid). Being configured is not the same as working -- a key can be present
 * and revoked -- so this returns the whole chain and lets the caller demote.
 */
export async function getProviderChain(): Promise<
  Array<{ provider: ModelProvider; reason: string }>
> {
  const chain: Array<{ provider: ModelProvider; reason: string }> = [];
  const env = getServerEnv();

  if (await isOllamaAvailable()) {
    chain.push({ provider: 'ollama', reason: 'Local Ollama running' });
  }
  if (env.GROQ_API_KEY) {
    chain.push({ provider: 'groq', reason: 'Groq API key configured' });
  }
  if (env.OPENROUTER_API_KEY) {
    chain.push({ provider: 'openrouter', reason: 'OpenRouter API key configured' });
  }

  return chain;
}

/**
 * Generate using the first provider that actually answers.
 *
 * This used to pick one provider and call it once, so a configured-but-revoked
 * key was indistinguishable from having no provider at all: botsmann's Groq key
 * started returning 401 and the whole AI layer went down while an OpenRouter
 * key sat unused. Being chosen must not mean being trusted -- each provider
 * gets demoted on failure and the next one is tried.
 *
 * generateLLMResponse already walks the model list within a provider, so this
 * is the layer above that: models, then providers.
 */
export async function generateWithBestProvider(
  messages: LLMMessage[],
  options?: Partial<Omit<LLMOptions, 'provider'>>,
): Promise<LLMResponse & { providerInfo: string }> {
  const chain = await getProviderChain();

  if (chain.length === 0) {
    throw new Error('No LLM provider available. Start Ollama or configure API keys.');
  }

  const env = getServerEnv();
  const failures: string[] = [];

  for (const { provider, reason } of chain) {
    try {
      const response = await generateLLMResponse(messages, {
        provider,
        apiKey: provider === 'groq' ? env.GROQ_API_KEY : env.OPENROUTER_API_KEY,
        ollamaUrl: env.OLLAMA_URL,
        ...options,
      });
      return { ...response, providerInfo: reason };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push(`${provider}: ${message}`);
      logger.warn(`[LLM] ${provider} failed, trying next provider`, { error: message });
    }
  }

  throw new Error(`All ${chain.length} provider(s) failed \u2014 ${failures.join('; ')}`);
}
