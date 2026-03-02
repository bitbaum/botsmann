/**
 * Demo PDF Parsing API
 *
 * POST /api/demo/parse-pdf - Parse PDF and extract text (no auth required)
 *
 * This endpoint allows public demo of PDF parsing.
 * Rate limited to prevent abuse.
 */

import { type NextRequest, NextResponse } from 'next/server';
import { PDFParse } from 'pdf-parse';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request';
import { VALIDATION } from '@/lib/constants';

// Extend function timeout for PDF parsing
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    // Rate limit per IP (stricter since no auth)
    const ip = getClientIp(request);
    const { isRateLimited } = await checkRateLimit(`demo-pdf-parse:${ip}`, 10, 60);
    if (isRateLimited) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment.' },
        { status: 429 },
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json(
        { success: false, error: 'Only PDF files are supported' },
        { status: 400 },
      );
    }

    // Validate file size
    if (file.size > VALIDATION.DEMO_MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 5MB.' },
        { status: 400 },
      );
    }

    // Read file content
    const arrayBuffer = await file.arrayBuffer();
    const pdfData = new Uint8Array(arrayBuffer);

    // Parse PDF using new PDFParse API
    const parser = new PDFParse({ data: pdfData });

    // Get text content
    const textResult = await parser.getText({
      last: 50, // Limit pages for demo
    });

    // Clean up and destroy parser
    await parser.destroy();

    if (!textResult.text || !textResult.text.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Could not extract text from PDF. The PDF may be image-based or encrypted.',
        },
        { status: 400 },
      );
    }

    // Clean up the extracted text
    const cleanedText = textResult.text
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();

    return NextResponse.json({
      success: true,
      data: {
        text: cleanedText,
        pages: textResult.pages?.length || 0,
        info: {
          title: null,
          author: null,
        },
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Handle common PDF errors
    if (errorMessage.includes('encrypted') || errorMessage.includes('password')) {
      return NextResponse.json(
        { success: false, error: 'This PDF is encrypted or password-protected.' },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to parse PDF. Please try a different file.' },
      { status: 500 },
    );
  }
}
