import { type NextRequest } from 'next/server';
import { z } from 'zod';
import {
  jsonSuccess,
  jsonError,
  validateBody,
  hasValidationError,
  handleError,
  HTTP_STATUS,
} from '@/lib/api';
import { DOMAIN_ERRORS } from '@/lib/constants';
import { isSupabaseConfigured, getServiceClient } from '@/lib/supabase';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request';

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  expertise: z.string().min(1, 'Please select an area of expertise'),
  message: z.string().min(1, 'Message is required'),
});

export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP (5 per 10 minutes)
    const ip = getClientIp(req);
    const { isRateLimited } = await checkRateLimit(`contact:${ip}`, 5, 600);
    if (isRateLimited) {
      return jsonError(
        'Too many requests. Please try later.',
        'RATE_LIMIT',
        HTTP_STATUS.RATE_LIMIT,
      );
    }
    // Validate input
    const validation = await validateBody(req, ContactSchema);
    if (hasValidationError(validation)) {
      return validation.error;
    }

    const { name, email, expertise: _expertise, message } = validation.data;

    if (isSupabaseConfigured()) {
      try {
        const supabase = getServiceClient();
        const { data, error } = await supabase
          .from('consultations')
          .insert({ name, email, message, status: 'new' })
          .select('id')
          .single();
        if (error) {
          console.error('Supabase consultations insert error:', error);
          return jsonError(
            'Failed to save contact request',
            'DATABASE_ERROR',
            HTTP_STATUS.INTERNAL_ERROR,
          );
        }
        return jsonSuccess({ id: data.id }, "Thank you! We'll be in touch soon.");
      } catch (dbErr) {
        console.error('Supabase client error (contact):', dbErr);
        // Fall through to local message (no persistence)
      }
    }

    // Minimal fallback: accept without persistence (serverless FS not reliable)
    return jsonSuccess({ id: `contact_${Date.now()}` }, "Thank you! We'll be in touch soon.");
  } catch (error) {
    return handleError(error, DOMAIN_ERRORS.FAILED_SUBMIT_CONTACT);
  }
}
