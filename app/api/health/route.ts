import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { jsonSuccess, jsonServiceUnavailable } from '@/lib/api';
import { logger } from '@/lib/logger';
import { getLLMHealth } from '@/lib/llm-health';

/**
 * Health check (liveness): is this process serving and can it reach its
 * database? Always 200 once the database answers, even when the LLM chain is
 * down, because restarting the app does not fix an expired API key --
 * failing liveness on it would just get a healthy process killed, and would
 * fail deploy gates on a problem no deploy caused.
 *
 * The body still carries the real LLM state as an informational field, so
 * alerting/dashboards can see it without the process being torn down for it.
 * This endpoint used to report only the database, so on 2026-08-28 it said
 * "healthy" while every AI feature on the site was failing on an invalid Groq
 * key.
 */
export async function GET() {
  const llm = getLLMHealth();

  try {
    if (!isSupabaseConfigured()) {
      return jsonServiceUnavailable('Database not configured');
    }

    const { error } = await supabase.from('consultations').select('id').limit(1);

    if (error) {
      throw error;
    }

    // 'unknown' means nothing has exercised the chain since this process
    // started. That is not evidence of a problem, so it is not degraded.
    const status =
      llm.status === 'down' ? 'down' : llm.status === 'degraded' ? 'degraded' : 'healthy';

    return jsonSuccess({ status, database: 'connected', llm }, { cache: 'PUBLIC_SHORT' });
  } catch (error) {
    logger.error('Health check failed:', error);
    return jsonServiceUnavailable('Database connection failed');
  }
}
