import React from 'react';

interface FilterPillProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

export default function FilterPill({ active, label, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm border transition-transform active:scale-95 ${
        active
          ? 'bg-openai-green text-white border-openai-green'
          : 'border-gray-300 text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );
}
