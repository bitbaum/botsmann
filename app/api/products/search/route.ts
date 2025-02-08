import { NextResponse } from 'next/server';
import { searchAmazon } from '@/lib/platforms/amazon';
import { searchRicardo } from '@/lib/platforms/ricardo';
import { processQuery } from '@/lib/nlp';
import { ProductResult } from '@/types/products';
import { rateLimit } from '@/lib/rate-limit';

// Create a rate limiter that allows 10 requests per minute
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max number of users per interval
  limit: 10, // Requests per interval
});

export async function POST(req: Request) {
  try {
    // Check rate limit
    const identifier = req.headers.get('x-forwarded-for') || 'anonymous';
    const { isRateLimited, remaining } = limiter.check(identifier);
    
    if (isRateLimited) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { 
          status: 429,
          headers: { 'X-RateLimit-Remaining': remaining.toString() }
        }
      );
    }

    const { query } = await req.json();
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Invalid query parameter' },
        { status: 400 }
      );
    }
    
    // Process query with NLP
    const { category, attributes } = await processQuery(query);
    
    // Search platforms in parallel
    const [amazonResults, ricardoResults] = await Promise.all([
      searchAmazon(category, attributes),
      searchRicardo(category, attributes)
    ]);
    
    // Combine and sort results
    const results = [...amazonResults, ...ricardoResults]
      .sort((a, b) => a.price - b.price);
    
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
}
