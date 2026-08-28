import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { jsonSuccess, jsonServiceUnavailable } from '@/lib/api';
import { logger } from '@/lib/logger';
import { getLLMHealth } from '@/lib/llm-health';

/**
 * Health check.
 *
 * Reports the database AND the LLM chain. It used to report only the database,
 * so on 2026-08-28 it answered "healthy" while every AI feature on the site was
 * failing on an invalid Groq key -- the product's core capability was dead and
 * nothing that watches this endpoint could tell.
 *
 * LLM state comes from what the chat routes actually observed, so it costs
 * nothing here and reflects real traffic rather than a synthetic probe.
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

    // The database being up is not the same as the product working.
    if (llm.status === 'down') {
      logger.error('Health check: LLM chain is down', { lastError: llm.lastError });
      return jsonServiceUnavailable('AI provider unavailable');
    }

    return jsonSuccess(
      {
        status: llm.status === 'degraded' ? 'degraded' : 'healthy',
        database: 'connected',
        llm,
      },
      { cache: 'PUBLIC_SHORT' },
    );
  } catch (error) {
    logger.error('Health check failed:', error);
    return jsonServiceUnavailable('Database connection failed');
  }
}
