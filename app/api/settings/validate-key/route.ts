/**
 * API Key Validation API
 *
 * POST /api/settings/validate-key - Validate an API key for a provider
 */

import { type NextRequest } from 'next/server';
import { z } from 'zod';
import { probeByokKey } from '@bitbaum/ai-kit/byok-probe';
import { verifyUser } from '@/lib/api-utils';
import { jsonSuccess, jsonError, jsonUnauthorized, handleError, HTTP_STATUS } from '@/lib/api';

// Request validation schema
const ValidateKeySchema = z.object({
  provider: z.enum(['groq', 'openrouter', 'ollama']),
  key: z.string().min(1, 'Key is required'),
});

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
      case 'openrouter':
        return await validateProviderKey(provider, key);
      case 'ollama':
        return await validateOllamaConnection(key);
      default:
        return jsonError('Unknown provider', 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
    }
  } catch (error) {
    return handleError(error, 'Failed to validate API key');
  }
}

/**
 * Groq and OpenRouter go through ai-kit's probe: the vendor's own verdict and
 * words, the key redacted, and the right endpoint. OpenRouter's /models is
 * public and answers 200 for a dead key, so the check that used to run there
 * called anything pasted "valid".
 */
async function validateProviderKey(provider: 'groq' | 'openrouter', apiKey: string) {
  const cleanKey = apiKey.trim().replace(/\\n/g, '').replace(/\n/g, '');
  const probe = await probeByokKey(provider, cleanKey);
  return probe.ok
    ? jsonSuccess({ valid: true, message: probe.message })
    : jsonSuccess({ valid: false, error: probe.message });
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
