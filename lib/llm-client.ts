/**
 * Multi-Provider LLM Client
 *
 * Supports:
 * - Groq (free, default)
 * - OpenRouter (100+ models: Claude, GPT, Gemini, Grok, etc.)
 * - Ollama (local)
 */

import { freeChain, providerModels, usableChain, tryChain } from '@bitbaum/ai-kit';
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

/** Trim whitespace and strip literal/escaped newlines a pasted key can carry. */
function cleanApiKey(raw: string | null | undefined): string | undefined {
  return raw?.trim().replace(/\\n/g, '').replace(/\n/g, '');
}

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
 * One call, one model, at Groq. The single-shot primitive both
 * `generateWithGroq`'s model loop and the ai-kit chain in
 * `generateWithBestProvider` walk over — a 404 here means the id was
 * retired, a 429 means this model is busy or spent, and either way the
 * caller's job is to try the next link, not this function's.
 */
async function callGroqModel(
  model: string,
  key: string,
  messages: LLMMessage[],
  temperature: number,
  maxTokens: number,
): Promise<LLMResponse> {
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
    const text = await response.text();
    logger.error(`Groq API error: ${response.status} (model ${model})`, text);
    throw new Error(`Groq API error: ${response.status}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0]?.message?.content || '',
    provider: 'groq',
    model,
  };
}

/**
 * Generate with Groq (free tier), trying every model in the fleet's chain
 * before giving up.
 */
async function generateWithGroq(
  messages: LLMMessage[],
  apiKey: string | null | undefined,
  temperature: number,
  maxTokens: number,
): Promise<LLMResponse> {
  // Use provided key or fallback to server-side key.
  const key = cleanApiKey(apiKey || getServerEnv().GROQ_API_KEY);

  if (!key) {
    throw new Error('Groq API key not configured');
  }

  const models = groqModels();
  let lastError: Error = new Error('Groq API error: no model attempted');

  for (const model of models) {
    try {
      return await callGroqModel(model, key, messages, temperature, maxTokens);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
  }

  throw new Error(`${lastError.message} — all ${models.length} model(s) failed`);
}

/**
 * One call, one model, at OpenRouter — the single-shot primitive both
 * `generateWithOpenRouter`'s model loop and the ai-kit chain walk over.
 * Supports Claude, GPT-4, Gemini, Grok, Llama, Mistral, and more.
 */
async function callOpenRouterModel(
  model: string,
  apiKey: string,
  messages: LLMMessage[],
  temperature: number,
  maxTokens: number,
): Promise<LLMResponse> {
  const response = await fetch(API_CONFIG.OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': getClientEnv().NEXT_PUBLIC_APP_URL,
      'X-Title': 'Botsmann',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    logger.error(`OpenRouter API error: ${response.status} (model ${model})`, text);
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0]?.message?.content || '',
    provider: 'openrouter',
    model,
  };
}

/**
 * Generate with OpenRouter (100+ models), trying every model in the fleet's
 * chain before giving up.
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
  let lastError: Error = new Error('OpenRouter API error: no model attempted');

  for (const selectedModel of models) {
    try {
      return await callOpenRouterModel(selectedModel, apiKey, messages, temperature, maxTokens);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
  }

  throw new Error(`${lastError.message} — all ${models.length} model(s) failed`);
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
 * Generate using the first link \u2014 provider AND model \u2014 that actually answers.
 *
 * This used to be two hand-rolled loops: this function walked PROVIDERS,
 * and `generateWithGroq`/`generateWithOpenRouter` separately walked MODELS
 * within whichever provider got picked. That let a configured-but-revoked
 * key look identical to having no provider at all \u2014 botsmann's Groq key
 * started returning 401 and the whole AI layer went down while an
 * OpenRouter key sat unused. Now it is ONE chain, built and walked by
 * `ai-kit` (`usableChain`/`tryChain`): provider and model demote together,
 * in a single pass, and `ai-kit` owns the ordering so a fix to the chain
 * lands here without a matching edit in this file.
 *
 * Ollama stays outside that chain and is tried first: its availability is a
 * live ping, not an API key, which does not fit `ai-kit`'s `Provider` shape.
 */
export async function generateWithBestProvider(
  messages: LLMMessage[],
  options?: Partial<Omit<LLMOptions, 'provider'>>,
): Promise<LLMResponse & { providerInfo: string }> {
  const { temperature = 0.7, maxTokens = 1024 } = options ?? {};
  const env = getServerEnv();

  if (await isOllamaAvailable()) {
    try {
      const response = await generateWithOllama(messages, env.OLLAMA_URL, temperature, maxTokens);
      return { ...response, providerInfo: 'Local Ollama running' };
    } catch (error) {
      logger.warn('[LLM] ollama failed, trying cloud chain', {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const chain = usableChain(freeChain('BOTSMANN'), {
    GROQ_API_KEY: env.GROQ_API_KEY,
    OPENROUTER_API_KEY: env.OPENROUTER_API_KEY,
  });

  if (chain.length === 0) {
    throw new Error('No LLM provider available. Start Ollama or configure API keys.');
  }

  const response = await tryChain(chain, {
    attempt: ({ provider, model }) => {
      if (provider.id === 'groq') {
        const key = cleanApiKey(env.GROQ_API_KEY);
        if (!key) throw new Error('Groq API key not configured');
        return callGroqModel(model, key, messages, temperature, maxTokens);
      }
      if (!env.OPENROUTER_API_KEY) throw new Error('OpenRouter API key required');
      return callOpenRouterModel(model, env.OPENROUTER_API_KEY, messages, temperature, maxTokens);
    },
    onLinkFailure: (link, error) => {
      logger.warn(`[LLM] ${link.provider.id}/${link.model} failed, trying next`, {
        error: error instanceof Error ? error.message : String(error),
      });
    },
  });

  return { ...response, providerInfo: `${response.provider} (${response.model})` };
}
