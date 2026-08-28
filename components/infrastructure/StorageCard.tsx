'use client';

import { type FC } from 'react';
import {
  type StorageOption,
  getStorageStatusText,
  getStorageStatusColor,
} from '@/lib/infrastructure';

interface StorageCardProps {
  option: StorageOption;
  isActive?: boolean;
  onSelect?: () => void;
}

/**
 * Card component displaying a storage option
 * Used on infrastructure page
 */
export const StorageCard: FC<StorageCardProps> = ({ option, isActive = false, onSelect }) => {
  const { name, description, status, icon } = option;
  const statusText = getStorageStatusText(status);
  const statusColor = getStorageStatusColor(status);
  const isAvailable = status === 'available';
  const isDisabled = !isAvailable;

  const selectedRing = isActive ? 'ring-2 ring-action ring-offset-2' : '';
  const hoverClasses = isDisabled
    ? 'cursor-not-allowed opacity-60'
    : 'cursor-pointer hover:shadow-lg hover:border-gray-200 hover:-translate-y-0.5';

  return (
    <button
      type="button"
      onClick={isDisabled ? undefined : onSelect}
      disabled={isDisabled}
      className={`group relative w-full text-left bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 p-4 ${selectedRing} ${hoverClasses}`}
    >
      {/* Active indicator */}
      {isActive && (
        <div className="absolute top-2 right-2 bg-action rounded-full p-1">
          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* Content */}
      <div className="relative">
        {/* Icon */}
        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-3 text-xl">
          {icon}
        </div>

        {/* Name */}
        <h3 className="font-semibold text-gray-900 text-base mb-1">{name}</h3>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-2">{description}</p>

        {/* Status badge */}
        <span
          className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${statusColor}`}
        >
          {statusText}
        </span>
      </div>
    </button>
  );
};
