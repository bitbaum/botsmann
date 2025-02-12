import { createErrorResponse } from '@/src/lib/schemas/errors';

const API_KEY = process.env.API_KEY || 'development-key';

export async function validateApiKey(req: Request) {
  // Skip validation during build time
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
    return;
  }

  const apiKey = req.headers.get('x-api-key');
  
  if (!apiKey) {
    return new Response(
      JSON.stringify(createErrorResponse(
        'API key is required',
        'UNAUTHORIZED'
      )),
      { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  if (apiKey !== API_KEY) {
    return new Response(
      JSON.stringify(createErrorResponse(
        'Invalid API key',
        'UNAUTHORIZED'
      )),
      { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
