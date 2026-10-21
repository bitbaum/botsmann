// Storage Options - Single Source of Truth for storage definitions

import type { StorageOption, StorageId } from './types';

export const storageOptions: StorageOption[] = [
  {
    id: 'cloud',
    name: 'Cloud',
    description: 'Stored on our server, visible to your account alone',
    status: 'available',
    icon: '☁️',
  },
  {
    id: 'local',
    name: 'Local',
    description: 'Store data on your device only',
    status: 'coming',
    icon: '💻',
  },
  {
    id: 'usb',
    name: 'USB Drive',
    description: 'Portable storage on external drive',
    status: 'future',
    icon: '🔌',
  },
];

// Helper function to get storage option by ID
export const getStorageById = (id: StorageId | string): StorageOption | undefined =>
  storageOptions.find((s) => s.id === id);

// Helper function to get all available storage options
export const getAvailableStorageOptions = (): StorageOption[] =>
  storageOptions.filter((s) => s.status === 'available');

// Get default storage option (Cloud)
export const getDefaultStorage = (): StorageOption => storageOptions[0];

// Status badge text mapping
export const getStorageStatusText = (status: StorageOption['status']): string => {
  const statusMap: Record<StorageOption['status'], string> = {
    available: 'Available',
    coming: 'Coming Soon',
    future: 'Planned',
  };
  return statusMap[status];
};

// Status badge color mapping
export const getStorageStatusColor = (status: StorageOption['status']): string => {
  const colorMap: Record<StorageOption['status'], string> = {
    available: 'bg-green-100 text-green-700',
    coming: 'bg-amber-100 text-amber-700',
    future: 'bg-gray-100 text-gray-500',
  };
  return colorMap[status];
};
