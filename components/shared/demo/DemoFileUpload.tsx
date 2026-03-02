'use client';

import { useState, useRef, type FC, type DragEvent, type ChangeEvent } from 'react';
import type { FileCategory, UploadedFile } from '@/lib/demo/types';
import type { BotAccentColor } from '@/types/bot';
import { ACCENT_DROPZONE_CLASSES } from '@/lib/config/colors';
import { formatBytes } from '@/lib/format';

interface DemoFileUploadProps {
  files: UploadedFile[];
  categories: FileCategory[];
  onUpload: (files: File[]) => Promise<void>;
  onRemove: (fileId: string) => void;
  isUploading: boolean;
  accentColor: BotAccentColor;
}

function getStatusIcon(status: UploadedFile['status']) {
  switch (status) {
    case 'uploading':
      return (
        <svg className="w-4 h-4 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      );
    case 'processing':
      return (
        <svg
          className="w-4 h-4 animate-pulse text-amber-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      );
    case 'ready':
      return (
        <svg
          className="w-4 h-4 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    case 'error':
      return (
        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
  }
}

function getStatusText(status: UploadedFile['status']) {
  switch (status) {
    case 'uploading':
      return 'Uploading...';
    case 'processing':
      return 'Processing...';
    case 'ready':
      return 'Ready';
    case 'error':
      return 'Error';
  }
}

export const DemoFileUpload: FC<DemoFileUploadProps> = ({
  files,
  categories,
  onUpload,
  onRemove,
  isUploading,
  accentColor,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colors = ACCENT_DROPZONE_CLASSES[accentColor];

  // Get all accepted file types from categories
  const acceptedTypes = Array.from(new Set(categories.flatMap((c) => c.acceptedTypes))).join(',');

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      await onUpload(droppedFiles);
    }
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      await onUpload(selectedFiles);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging ? `${colors.border} ${colors.bg}` : 'border-gray-300 hover:border-gray-400'
        } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={handleFileSelect}
          className="hidden"
        />

        <svg
          className={`mx-auto h-10 w-10 ${isDragging ? colors.text : 'text-gray-400'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        <p className="mt-2 text-sm text-gray-600">
          <span className={`font-medium ${colors.text}`}>Click to upload</span> or drag and drop
        </p>
        <p className="mt-1 text-xs text-gray-500">{categories.map((c) => c.name).join(', ')}</p>
      </div>

      {/* File categories info */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="text-xs bg-gray-100 rounded-full px-3 py-1 text-gray-600"
              title={category.description}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Uploaded Files ({files.length})
          </p>
          <ul className="space-y-2">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {getStatusIcon(file.status)}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatBytes(file.size)} &bull; {getStatusText(file.status)}
                      {file.errorMessage && (
                        <span className="text-red-500 ml-1">- {file.errorMessage}</span>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(file.id);
                  }}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove file"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
