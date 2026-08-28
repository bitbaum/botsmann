'use client';

import { useState, useEffect } from 'react';
import type { TableOfContentsItem } from '@/types/knowledge';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

/**
 * Sticky table of contents for guide navigation
 */
export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0% -80% 0%',
        threshold: 0,
      },
    );

    // Observe all headings
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="hidden xl:block sticky top-24 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
        On this page
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className={`block w-full text-left text-sm transition-colors ${
                item.level === 3 ? 'pl-4' : ''
              } ${item.level === 4 ? 'pl-8' : ''} ${
                activeId === item.id
                  ? 'text-action font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
