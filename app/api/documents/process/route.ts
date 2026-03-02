/**
 * Document Processing API
 *
 * POST /api/documents/process - Process a pending document
 *
 * This endpoint:
 * 1. Downloads the file from storage
 * 2. Parses the content (TXT, MD, PDF)
 * 3. Chunks the text
 * 4. Generates embeddings
 * 5. Stores chunks in the database
 */

import { type NextRequest } from 'next/server';
import { PDFParse } from 'pdf-parse';
import { generateEmbedding, chunkText } from '@/lib/embeddings';
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
import { detectDomains } from '@/lib/context/domain-detector';
import { logger } from '@/lib/logger';

// Extend function timeout for embedding generation (Vercel)
export const maxDuration = 60; // Allow longer for document processing

/**
 * Parse text content from file based on type
 */
async function parseFileContent(
  fileBuffer: ArrayBuffer,
  fileType: string,
  _fileName: string,
): Promise<string> {
  const decoder = new TextDecoder('utf-8');

  switch (fileType) {
    case 'text/plain':
    case 'text/markdown':
      return decoder.decode(fileBuffer);

    case 'application/pdf':
      // For PDF, we'll extract text using a simple approach
      // In production, you'd want pdf-parse or similar
      const pdfText = await extractPdfText(fileBuffer);
      return pdfText;

    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }
}

/**
 * Extract text from PDF using pdf-parse library
 * Handles most PDF formats including those with complex encodings
 */
async function extractPdfText(buffer: ArrayBuffer): Promise<string> {
  try {
    // Convert ArrayBuffer to Uint8Array for pdf-parse v2
    const pdfData = new Uint8Array(buffer);

    // Create parser and extract text
    const parser = new PDFParse({ data: pdfData });
    const textResult = await parser.getText({
      last: 100, // Limit pages to prevent timeout on very large PDFs
    });

    // Clean up
    await parser.destroy();

    if (!textResult.text || !textResult.text.trim()) {
      throw new Error('Could not extract text from PDF. The PDF may be image-based or encrypted.');
    }

    // Clean up the extracted text
    const cleanedText = textResult.text
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/\n\s*\n/g, '\n\n') // Preserve paragraph breaks
      .trim();

    return cleanedText;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Check for common PDF issues
    if (errorMessage.includes('encrypted')) {
      throw new Error(
        'This PDF is encrypted and cannot be processed. Please provide an unencrypted version.',
      );
    }
    if (errorMessage.includes('password')) {
      throw new Error('This PDF is password-protected. Please remove the password and try again.');
    }

    throw new Error(
      `Failed to extract text from PDF: ${errorMessage}. Try uploading a text or markdown file.`,
    );
  }
}

/**
 * Process a document: parse, chunk, embed, store
 */
export async function POST(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return jsonUnauthorized();
    }

    const body = await request.json();
    const { documentId } = body;

    if (!documentId) {
      return jsonError('Document ID required', 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
    }

    const supabase = getServiceClient();

    // Get document and verify ownership
    const { data: document, error: fetchError } = await supabase
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !document) {
      return jsonNotFound('Document not found');
    }

    // Check if already processed
    if (document.status === 'ready') {
      return jsonSuccess({ document }, 'Document already processed');
    }

    // Update status to processing
    await supabase.from('documents').update({ status: 'processing' }).eq('id', documentId);

    try {
      // Download file from storage
      const { data: fileData, error: downloadError } = await supabase.storage
        .from('documents')
        .download(document.storage_path);

      if (downloadError || !fileData) {
        throw new Error('Failed to download file from storage');
      }

      // Parse file content
      const fileBuffer = await fileData.arrayBuffer();
      const textContent = await parseFileContent(fileBuffer, document.type, document.name);

      if (!textContent.trim()) {
        throw new Error('No text content found in document');
      }

      // Auto-detect domains from content (if not already set by user)
      const currentDomains: string[] = document.domains || [];
      const detectedDomains =
        currentDomains.length === 0 ? detectDomains(textContent) : currentDomains;

      // Chunk the text
      const chunks = chunkText(textContent, 500, 50);

      if (chunks.length === 0) {
        throw new Error('Document produced no chunks');
      }

      // Generate embeddings and store chunks
      const chunkRecords = [];

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const embedding = await generateEmbedding(chunk);

        chunkRecords.push({
          document_id: documentId,
          user_id: user.id,
          content: chunk,
          embedding: `[${embedding.join(',')}]`, // Format for pgvector
          metadata: { chunk_index: i },
        });
      }

      // Insert chunks in batches
      const batchSize = 50;
      for (let i = 0; i < chunkRecords.length; i += batchSize) {
        const batch = chunkRecords.slice(i, i + batchSize);
        const { error: insertError } = await supabase.from('document_chunks').insert(batch);

        if (insertError) {
          logger.error('Chunk insert error:', insertError);
          throw new Error('Failed to store document chunks');
        }
      }

      // Update document status and auto-detected domains
      const { data: updatedDocument } = await supabase
        .from('documents')
        .update({
          status: 'ready',
          chunk_count: chunks.length,
          domains: detectedDomains,
          error_message: null,
        })
        .eq('id', documentId)
        .select()
        .single();

      return jsonSuccess({ document: updatedDocument, chunks_created: chunks.length });
    } catch (processingError) {
      // Update document with error
      const errorMessage =
        processingError instanceof Error ? processingError.message : 'Unknown processing error';

      await supabase
        .from('documents')
        .update({
          status: 'error',
          error_message: errorMessage,
        })
        .eq('id', documentId);

      return jsonError(errorMessage, 'INTERNAL_ERROR', HTTP_STATUS.INTERNAL_ERROR);
    }
  } catch (error) {
    return handleError(error, DOMAIN_ERRORS.FAILED_PROCESS_DOCUMENT);
  }
}
