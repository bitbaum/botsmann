import { type NextRequest } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { jsonSuccess, jsonServiceUnavailable } from '@/lib/api';
import { logger } from '@/lib/logger';
import { getLLMHealth } from '@/lib/llm-health';

/**
 * Health check, in two flavours.
 *
 * Default (liveness): is this process serving and can it reach its database?
 * Answers 200 even when the LLM chain is down, because restarting the app does
 * not fix an expired API key -- failing liveness on it would just get a healthy
 * process killed, and would fail deploy gates on a problem no deploy caused.
 *
 * ?strict=1 (readiness): is the PRODUCT working? 503 once the LLM chain is
 * consistently failing. Point alerting here.
 *
 * Either way the body carries the real state. This endpoint used to report
 * only the database, so on 2026-08-28 it said "healthy" while every AI feature
 * on the site was failing on an invalid Groq key.
 */
export async function GET(request: NextRequest) {
  const strict = request.nextUrl.searchParams.get('strict') === '1';
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

    if (strict && llm.status === 'down') {
      logger.error('Health check (strict): LLM chain is down', { lastError: llm.lastError });
      return jsonServiceUnavailable('AI provider unavailable');
    }

    return jsonSuccess({ status, database: 'connected', llm }, { cache: 'PUBLIC_SHORT' });
  } catch (error) {
    logger.error('Health check failed:', error);
    return jsonServiceUnavailable('Database connection failed');
  }
}
