/**
 * API Key Validation API
 *
 * POST /api/settings/validate-key - Validate an API key for a provider
 */

import { type NextRequest } from 'next/server';
import { z } from 'zod';
import { verifyUser } from '@/lib/api-utils';
import { jsonSuccess, jsonError, jsonUnauthorized, handleError, HTTP_STATUS } from '@/lib/api';

// Request validation schema
const ValidateKeySchema = z.object({
  provider: z.enum(['groq', 'openrouter', 'ollama']),
  key: z.string().min(1, 'Key is required'),
});

// API URLs for validation
const GROQ_API_URL = 'https://api.groq.com/openai/v1/models';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/models';

export async function POST(req: NextRequest) {
  try {
    const user = await verifyUser(req);
    if (!user) {
      return jsonUnauthorized();
    }

    const body = await req.json();
    const parseResult = ValidateKeySchema.safeParse(body);

    if (!parseResult.success) {
      return jsonError(
        parseResult.error.issues[0].message,
        'VALIDATION_ERROR',
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const { provider, key } = parseResult.data;

    switch (provider) {
      case 'groq':
        return await validateGroqKey(key);
      case 'openrouter':
        return await validateOpenRouterKey(key);
      case 'ollama':
        return await validateOllamaConnection(key);
      default:
        return jsonError('Unknown provider', 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
    }
  } catch (error) {
    return handleError(error, 'Failed to validate API key');
  }
}

async function validateGroqKey(apiKey: string) {
  try {
    const cleanKey = apiKey.trim().replace(/\\n/g, '').replace(/\n/g, '');

    const response = await fetch(GROQ_API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cleanKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return jsonSuccess({ valid: true, message: 'Groq API key is valid' });
    }

    if (response.status === 401) {
      return jsonSuccess({ valid: false, error: 'Invalid API key' });
    }

    return jsonSuccess({ valid: false, error: `API error: ${response.status}` });
  } catch {
    return jsonSuccess({ valid: false, error: 'Failed to connect to Groq API' });
  }
}

async function validateOpenRouterKey(apiKey: string) {
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return jsonSuccess({ valid: true, message: 'OpenRouter API key is valid' });
    }

    if (response.status === 401) {
      return jsonSuccess({ valid: false, error: 'Invalid API key' });
    }

    if (response.status === 429) {
      return jsonSuccess({ valid: false, error: 'API key is rate limited' });
    }

    return jsonSuccess({ valid: false, error: `API error: ${response.status}` });
  } catch {
    return jsonSuccess({ valid: false, error: 'Failed to connect to OpenRouter API' });
  }
}

async function validateOllamaConnection(url: string) {
  try {
    // Validate URL format
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return jsonSuccess({ valid: false, error: 'Invalid URL protocol (must be http or https)' });
    }

    // Test connection to Ollama
    const testUrl = `${url.replace(/\/$/, '')}/api/tags`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(testUrl, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const modelCount = data.models?.length || 0;
      return jsonSuccess({
        valid: true,
        message: `Connected to Ollama (${modelCount} models available)`,
      });
    }

    return jsonSuccess({ valid: false, error: 'Ollama server returned an error' });
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return jsonSuccess({ valid: false, error: 'Cannot connect to Ollama. Is it running?' });
    }
    if (error instanceof Error && error.name === 'AbortError') {
      return jsonSuccess({ valid: false, error: 'Connection timeout. Is Ollama running?' });
    }
    return jsonSuccess({ valid: false, error: 'Invalid URL or cannot connect' });
  }
}
