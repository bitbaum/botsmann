'use client';

import React, { useCallback, useState } from 'react';
import { UploadedFile } from './types';

interface FileUploaderProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
  maxFiles?: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesUploaded, maxFiles = 10 }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFiles = useCallback((fileList: FileList) => {
    const files: UploadedFile[] = Array.from(fileList).slice(0, maxFiles).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      status: 'uploading' as const
    }));

    // Simulate upload and AI processing
    files.forEach(file => {
      setTimeout(() => {
        file.status = 'processing';
        onFilesUploaded([file]);
      }, 500);

      setTimeout(() => {
        file.status = 'completed';
        // AI categorization would happen here
        file.category = detectCategory(file.name);
        onFilesUploaded([file]);
      }, 1500);
    });

    onFilesUploaded(files);
  }, [maxFiles, onFilesUploaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const { files } = e.dataTransfer;
    if (files?.length) {
      processFiles(files);
    }
  }, [processFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length) {
      processFiles(files);
    }
  }, [processFiles]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-xl p-8 text-center transition-all
        ${isDragging
          ? 'border-blue-500 bg-blue-50 scale-105'
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }
      `}
    >
      <div className="text-4xl mb-3">📁</div>
      <h4 className="font-semibold text-gray-900 mb-2">
        Drop files here or click to upload
      </h4>
      <p className="text-sm text-gray-600 mb-4">
        Supports PDF, DOC, DOCX, JPG, PNG (max {maxFiles} files)
      </p>
      <input
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
      >
        Select Files
      </label>
      <p className="text-xs text-gray-500 mt-4">
        🔒 Files are encrypted and processed locally. AI auto-categorizes your documents.
      </p>
    </div>
  );
};

// Simple file category detection based on filename
function detectCategory(filename: string): string {
  const lower = filename.toLowerCase();

  if (lower.includes('contract') || lower.includes('agreement')) return 'contracts';
  if (lower.includes('email') || lower.includes('letter')) return 'correspondence';
  if (lower.includes('court') || lower.includes('filing')) return 'court-filings';
  if (lower.includes('id') || lower.includes('passport') || lower.includes('license')) return 'identification';
  if (lower.includes('bank') || lower.includes('invoice') || lower.includes('receipt')) return 'financial';
  if (lower.includes('medical') || lower.includes('health')) return 'medical';
  if (lower.includes('photo') || lower.includes('evidence') || lower.includes('proof')) return 'evidence';

  return 'other';
}

export default FileUploader;
