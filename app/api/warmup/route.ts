/**
 * Warmup API Endpoint
 *
 * GET /api/warmup - Pre-loads the embedding model to avoid cold start delays
 *
 * Called periodically by Vercel cron to keep the function warm
 */

import { NextResponse } from 'next/server';
import { generateEmbedding } from '@/lib/embeddings';
import { logger } from '@/lib/logger';

// Extend function timeout for model loading
export const maxDuration = 60;

export async function GET() {
  const startTime = Date.now();
  logger.log('[Warmup] Starting warmup...');

  try {
    // Generate a simple embedding to load the model
    await generateEmbedding('warmup test');

    const elapsed = Date.now() - startTime;
    logger.log(`[Warmup] Model loaded in ${elapsed} ms`);

    return NextResponse.json({
      success: true,
      message: 'Embedding model warmed up',
      loadTime: elapsed,
    });
  } catch (error) {
    const elapsed = Date.now() - startTime;
    logger.error(`[Warmup] Failed after ${elapsed} ms:`, error);

    return NextResponse.json(
      {
        success: false,
        error: 'Warmup failed',
        elapsed,
      },
      { status: 500 },
    );
  }
}
