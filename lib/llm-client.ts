/**
 * Multi-Provider LLM Client
 *
 * Supports:
 * - Groq (free, default)
 * - OpenRouter (100+ models: Claude, GPT, Gemini, Grok, etc.)
 * - Ollama (local)
 */

import { API_CONFIG } from '@/lib/constants';
import { getServerEnv, getClientEnv } from '@/lib/config/env';

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

  const response = await fetch(API_CONFIG.GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: API_CONFIG.GROQ_MODEL,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Groq API error:', response.status, error);
    throw new Error(`Groq API error: ${response.status}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0]?.message?.content || '',
    provider: 'groq',
    model: API_CONFIG.GROQ_MODEL,
  };
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

  const selectedModel = model || API_CONFIG.OPENROUTER_DEFAULT_MODEL;

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
    const error = await response.text();
    console.error('OpenRouter API error:', error);
    throw new Error('OpenRouter API request failed');
  }

  const data = await response.json();
  return {
    content: data.choices[0]?.message?.content || '',
    provider: 'openrouter',
    model: selectedModel,
  };
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
      console.error('Ollama API error:', error);
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
export async function generateWithBestProvider(
  messages: LLMMessage[],
  options?: Partial<Omit<LLMOptions, 'provider'>>,
): Promise<LLMResponse & { providerInfo: string }> {
  const { provider, available, reason } = await getBestProvider();

  if (!available) {
    throw new Error(reason);
  }

  const fullOptions: LLMOptions = {
    provider,
    apiKey: provider === 'groq' ? getServerEnv().GROQ_API_KEY : getServerEnv().OPENROUTER_API_KEY,
    ollamaUrl: getServerEnv().OLLAMA_URL,
    ...options,
  };

  const response = await generateLLMResponse(messages, fullOptions);
  return {
    ...response,
    providerInfo: reason,
  };
}
