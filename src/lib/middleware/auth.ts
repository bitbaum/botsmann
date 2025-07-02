import { createErrorResponse } from '@/src/lib/schemas/errors';

const API_KEY = process.env.API_KEY;

export async function validateApiKey(req: Request) {
  // Skip validation during build time or static generation
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.NEXT_PHASE === 'phase-static-generation') {
    return;
  }

  if (!API_KEY) {
    console.error('API_KEY environment variable is not set');
    return new Response(
      JSON.stringify(createErrorResponse('Server misconfiguration', 'INTERNAL_ERROR')),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
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
