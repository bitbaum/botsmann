import type { NextRequest } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { checkRateLimit } from '@/lib/rate-limit';
import { CustomerSchema } from '@/lib/schemas/customer';
import { validateApiKey } from '@/lib/middleware/auth';
import { monitorRequest } from '@/lib/middleware/monitoring';
import { EmailService } from '@/lib/email/service';
import {
  jsonSuccess,
  jsonValidationError,
  jsonRateLimitError,
  jsonServiceUnavailable,
  formatZodErrors,
  handleError,
} from '@/lib/api';
import { DOMAIN_ERRORS } from '@/lib/constants';
import { ZodError } from 'zod';
import { logger } from '@/lib/logger';

const emailService = new EmailService();

async function handler(req: NextRequest) {
  try {
    // Validate API key first
    const authResponse = await validateApiKey(req);
    if (authResponse) {
      return authResponse;
    }

    // Check rate limit (5 per minute, 3 per second in test)
    const windowSeconds = process.env.NODE_ENV === 'test' ? 1 : 60;
    const maxRequests = process.env.NODE_ENV === 'test' ? 3 : 5;
    const { isRateLimited } = await checkRateLimit('CONSULTATION_FORM', maxRequests, windowSeconds);
    if (isRateLimited) {
      return jsonRateLimitError();
    }

    const body = await req.json();
    const validatedData = CustomerSchema.parse(body);

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      logger.error('Supabase not configured');
      return jsonServiceUnavailable('Database not configured');
    }

    // Insert consultation into Supabase
    const { data: consultation, error: dbError } = await supabase
      .from('consultations')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
        status: 'new',
      })
      .select('id')
      .single();

    if (dbError) {
      logger.error('Supabase insert error:', dbError);
      return jsonServiceUnavailable('Database error');
    }

    // Send emails asynchronously
    try {
      await Promise.all([
        emailService.sendWelcomeEmail(validatedData),
        emailService.sendAdminNotification(validatedData),
      ]);
    } catch (emailError) {
      logger.error('Failed to send emails:', emailError);
      // Don't return error response, continue with success
    }

    return jsonSuccess({ id: consultation.id });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return jsonValidationError('Validation failed', formatZodErrors(error));
    }
    return handleError(error, DOMAIN_ERRORS.FAILED_SUBMIT_CONSULTATION);
  }
}

export const POST = (req: NextRequest) => monitorRequest(req, handler);
