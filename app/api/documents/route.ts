/**
 * Document Upload & List API
 *
 * POST /api/documents - Upload a new document
 * GET /api/documents - List user's documents
 * DELETE /api/documents?id=xxx - Delete a document
 */

import { type NextRequest } from 'next/server';
import { SUPPORTED_FILE_TYPES, type SupportedFileType } from '@/types/document';
import { VALIDATION } from '@/lib/constants';
import { getServiceClient } from '@/lib/supabase';
import { verifyUser } from '@/lib/api-utils';
import {
  jsonSuccess,
  jsonError,
  jsonUnauthorized,
  jsonNotFound,
  handleError,
  HTTP_STATUS,
} from '@/lib/api';
import { DOMAIN_ERRORS } from '@/lib/constants';
import { logger } from '@/lib/logger';

/**
 * Upload a new document
 */
export async function POST(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return jsonError('No file provided', 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
    }

    // Validate file type
    if (!SUPPORTED_FILE_TYPES.includes(file.type as SupportedFileType)) {
      return jsonError(
        `Unsupported file type: ${file.type}. Supported: PDF, TXT, MD`,
        'VALIDATION_ERROR',
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    // Validate file size
    if (file.size > VALIDATION.MAX_FILE_SIZE) {
      return jsonError(
        `File too large. Maximum size: ${VALIDATION.MAX_FILE_SIZE / 1024 / 1024}MB`,
        'VALIDATION_ERROR',
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const supabase = getServiceClient();

    // Generate unique storage path: user_id/timestamp_filename
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `${user.id}/${timestamp}_${safeName}`;

    // Upload to Supabase Storage
    const fileBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(storagePath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      logger.error('Storage upload error:', uploadError);
      return jsonError('Failed to upload file', 'INTERNAL_ERROR', HTTP_STATUS.INTERNAL_ERROR);
    }

    // Create document record
    const { data: document, error: dbError } = await supabase
      .from('documents')
      .insert({
        user_id: user.id,
        name: file.name,
        type: file.type,
        size_bytes: file.size,
        storage_path: storagePath,
        status: 'pending',
      })
      .select()
      .single();

    if (dbError) {
      logger.error('Database insert error:', dbError);
      // Clean up uploaded file
      await supabase.storage.from('documents').remove([storagePath]);
      return jsonError(
        'Failed to create document record',
        'DATABASE_ERROR',
        HTTP_STATUS.INTERNAL_ERROR,
      );
    }

    // Trigger async processing (will be handled separately)
    // For now, the document is created with status 'pending'

    return jsonSuccess({ document }, { cache: 'NONE' });
  } catch (error) {
    return handleError(error, DOMAIN_ERRORS.FAILED_UPLOAD_DOCUMENT);
  }
}

/**
 * List user's documents
 */
export async function GET(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const supabase = getServiceClient();

    const { data: documents, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      logger.error('Database query error:', error);
      return jsonError('Failed to fetch documents', 'DATABASE_ERROR', HTTP_STATUS.INTERNAL_ERROR);
    }

    return jsonSuccess({ documents }, { cache: 'PRIVATE_SHORT' });
  } catch (error) {
    return handleError(error, DOMAIN_ERRORS.FAILED_GET_DOCUMENTS);
  }
}

/**
 * Delete a document
 */
export async function DELETE(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get('id');

    if (!documentId) {
      return jsonError('Document ID required', 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
    }

    const supabase = getServiceClient();

    // Get document to verify ownership and get storage path
    const { data: document, error: fetchError } = await supabase
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !document) {
      return jsonNotFound('Document not found');
    }

    // Delete from storage
    await supabase.storage.from('documents').remove([document.storage_path]);

    // Delete document record (chunks will cascade delete)
    const { error: deleteError } = await supabase.from('documents').delete().eq('id', documentId);

    if (deleteError) {
      logger.error('Database delete error:', deleteError);
      return jsonError('Failed to delete document', 'DATABASE_ERROR', HTTP_STATUS.INTERNAL_ERROR);
    }

    return jsonSuccess({ deleted: true }, { cache: 'NONE' });
  } catch (error) {
    return handleError(error, DOMAIN_ERRORS.FAILED_DELETE_DOCUMENT);
  }
}
