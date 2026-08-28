import { type NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { enforceRateLimit } from '@/lib/rate-limit';
import { jsonSuccess, jsonError, HTTP_STATUS } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const limited = await enforceRateLimit(request, 'rebuild');
    if (limited) return limited;

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
