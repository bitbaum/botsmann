import { type NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { checkRateLimit } from '@/lib/rate-limit';
import { jsonSuccess, jsonError, HTTP_STATUS } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    // Rate limit: 5 requests per 10 minutes per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const { isRateLimited } = await checkRateLimit(`rebuild:${ip}`, 5, 600);
    if (isRateLimited) {
      return jsonError('Too many requests', 'RATE_LIMIT', HTTP_STATUS.RATE_LIMIT);
    }

    // Revalidate the blog pages
    revalidatePath('/blog');

    return jsonSuccess({
      revalidated: true,
      now: new Date().toISOString(),
      message: 'Blog content has been refreshed.',
    });
  } catch {
    return jsonError('Error revalidating content', 'INTERNAL_ERROR', HTTP_STATUS.INTERNAL_ERROR);
  }
}
