/**
 * Single Document API Route
 *
 * GET /api/documents/[id] - Get document details
 * PATCH /api/documents/[id] - Update document (including domains)
 */

import { type NextRequest } from 'next/server';
import { z } from 'zod';
import { getServiceClient } from '@/lib/supabase';
import { verifyUser } from '@/lib/api-utils';
import {
  jsonSuccess,
  jsonError,
  jsonUnauthorized,
  jsonNotFound,
  validateBody,
  hasValidationError,
  HTTP_STATUS,
} from '@/lib/api';
import { DomainsArraySchema } from '@/lib/validations/domain';
import { logger } from '@/lib/logger';

/**
 * Schema for updating a document
 */
const UpdateDocumentSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  domains: DomainsArraySchema.optional(),
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET - Get single document details
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const { id } = await context.params;

    const supabase = getServiceClient();

    const { data: document, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error || !document) {
      return jsonNotFound('Document not found');
    }

    return jsonSuccess({ document });
  } catch (error) {
    logger.error('Get document error:', error);
    return jsonError('Failed to fetch document', 'INTERNAL_ERROR', HTTP_STATUS.INTERNAL_ERROR);
  }
}

/**
 * PATCH - Update document (name, domains)
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const { id } = await context.params;

    // Validate request body
    const validation = await validateBody(request, UpdateDocumentSchema);
    if (hasValidationError(validation)) {
      return validation.error;
    }

    const updates = validation.data;
    const supabase = getServiceClient();

    // Verify document ownership
    const { data: existing, error: fetchError } = await supabase
      .from('documents')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existing) {
      return jsonNotFound('Document not found');
    }

    // Build update object
    const updateData: Record<string, unknown> = {};

    if (updates.name !== undefined) {
      updateData.name = updates.name;
    }
    if (updates.domains !== undefined) {
      updateData.domains = updates.domains;
    }

    // Update document
    const { data: document, error: updateError } = await supabase
      .from('documents')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      logger.error('Update document error:', updateError);
      return jsonError('Failed to update document', 'DATABASE_ERROR', HTTP_STATUS.INTERNAL_ERROR);
    }

    return jsonSuccess({ document }, 'Document updated');
  } catch (error) {
    logger.error('Update document error:', error);
    return jsonError('Failed to update document', 'INTERNAL_ERROR', HTTP_STATUS.INTERNAL_ERROR);
  }
}
