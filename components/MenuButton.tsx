'use client';

import React, { useState, useEffect } from 'react';

interface MenuButtonProps {
  onToggle: (isOpen: boolean) => void;
}

export function MenuButton({ onToggle }: MenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClick = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle(newState);
    
    // Toggle menu visibility using DOM
    const menu = document.querySelector('#mobile-menu-overlay');
    if (menu) {
      menu.classList.toggle('translate-y-0');
      menu.classList.toggle('opacity-100');
      menu.classList.toggle('-translate-y-full');
      menu.classList.toggle('opacity-0');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('#mobile-menu')) {
        setIsOpen(false);
        onToggle(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="lg:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-openai-green focus:outline-none focus:ring-2 focus:ring-openai-green"
      aria-controls="mobile-menu"
      aria-expanded={isOpen}
    >
      <span className="sr-only">Open main menu</span>
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
        />
      </svg>
    </button>
  );
}
