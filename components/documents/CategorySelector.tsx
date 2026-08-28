'use client';

import { type FC, useState, useRef, useEffect } from 'react';
import { type DocumentCategory, DOCUMENT_CATEGORIES } from '@/types/document';

interface CategorySelectorProps {
  category: DocumentCategory;
  onCategoryChange: (category: DocumentCategory) => void;
  disabled?: boolean;
}

/**
 * Dropdown for selecting a document's category
 */
export const CategorySelector: FC<CategorySelectorProps> = ({
  category,
  onCategoryChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentCategory =
    DOCUMENT_CATEGORIES.find((c) => c.value === category) || DOCUMENT_CATEGORIES[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newCategory: DocumentCategory) => {
    onCategoryChange(newCategory);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border transition-colors ${
          disabled
            ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200'
            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 cursor-pointer'
        }`}
        title="Click to change category"
      >
        <span>{currentCategory.emoji}</span>
        <span>{currentCategory.label}</span>
        {!disabled && (
          <svg
            className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
          {DOCUMENT_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleSelect(cat.value)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 ${
                cat.value === category ? 'bg-action-tint text-action' : 'text-gray-700'
              }`}
            >
              <span>{cat.emoji}</span>
              <div>
                <div className="font-medium">{cat.label}</div>
                <div className="text-xs text-gray-500">{cat.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
