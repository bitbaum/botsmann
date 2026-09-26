/**
 * User Settings API
 *
 * GET /api/settings - Get user settings (keys as hints only, never the key)
 * PUT /api/settings - Update user settings
 *
 * PUT body: { preferred_model, groq_api_key?, openrouter_api_key?, ollama_url?,
 *             remove_keys?: ('groq' | 'openrouter')[] }
 * A key that is omitted or empty is left as it is; a new key is checked with
 * its provider and sealed before it is stored. See lib/byok-vault.ts.
 */

import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
import { probeByokKey } from '@bitbaum/ai-kit/byok-probe';
import { getServiceClient } from '@/lib/supabase';
import { verifyUser } from '@/lib/api-utils';
import { jsonSuccess, jsonError, jsonUnauthorized, handleError, HTTP_STATUS } from '@/lib/api';
import { MODEL_PROVIDERS, DB_ERROR_CODES, DOMAIN_ERRORS } from '@/lib/constants';
import {
  KEY_COLUMN,
  KEY_PROVIDERS,
  planKeyChange,
  sealKey,
  sealingSecret,
  storedKeyHint,
} from '@/lib/byok-vault';

const NOT_SET_UP =
  "Saving your own key isn't switched on for this server yet — Botsmann keeps using its free models.";

export async function GET(req: NextRequest) {
  try {
    const user = await verifyUser(req);
    if (!user) {
      return jsonUnauthorized();
    }

    const supabase = getServiceClient();

    const { data: settings, error } = await supabase
      .from('user_settings')
      .select('preferred_model, groq_api_key, openrouter_api_key, ollama_url')
      .eq('id', user.id)
      .single();

    if (error && error.code !== DB_ERROR_CODES.NO_ROWS_FOUND) {
      throw error;
    }

    const secret = sealingSecret();
    return jsonSuccess(
      {
        settings: {
          preferred_model: settings?.preferred_model ?? 'groq',
          ollama_url: settings?.ollama_url ?? null,
          // Never the key itself — it does not leave the server.
          groq_key_hint: storedKeyHint(settings?.groq_api_key, secret),
          openrouter_key_hint: storedKeyHint(settings?.openrouter_api_key, secret),
        },
        keysAvailable: secret !== null,
      },
      { cache: 'PRIVATE_SHORT' },
    );
  } catch (error) {
    return handleError(error, DOMAIN_ERRORS.FAILED_GET_SETTINGS);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await verifyUser(req);
    if (!user) {
      return jsonUnauthorized();
    }

    const body = await req.json();
    const { preferred_model, ollama_url } = body;
    const removeKeys: unknown[] = Array.isArray(body.remove_keys) ? body.remove_keys : [];

    // Validate preferred_model
    if (!MODEL_PROVIDERS.includes(preferred_model)) {
      return jsonError('Invalid model', 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
    }

    const update: Record<string, string | null> = {
      id: user.id,
      preferred_model,
      ollama_url: ollama_url || null,
    };

    for (const provider of KEY_PROVIDERS) {
      const change = planKeyChange(body[KEY_COLUMN[provider]], removeKeys.includes(provider));
      if (change.kind === 'remove') update[KEY_COLUMN[provider]] = null;
      if (change.kind !== 'set') continue;

      const secret = sealingSecret();
      if (!secret) {
        return jsonError(NOT_SET_UP, 'SERVICE_UNAVAILABLE', HTTP_STATUS.SERVICE_UNAVAILABLE);
      }
      // Checked with the provider here, whatever the screen said: a saved key
      // that does not work is a chat that fails later with nobody knowing why.
      const probe = await probeByokKey(provider, change.key);
      if (!probe.ok) {
        return jsonError(probe.message, 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
      }
      update[KEY_COLUMN[provider]] = sealKey(change.key, secret);
    }

    const supabase = getServiceClient();
    const { error } = await supabase.from('user_settings').upsert(update);

    if (error) {
      throw error;
    }

    return jsonSuccess({ updated: true }, { cache: 'NONE' });
  } catch (error) {
    return handleError(error, DOMAIN_ERRORS.FAILED_UPDATE_SETTINGS);
  }
}
