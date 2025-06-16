'use client';
import { useState, useEffect } from 'react';

export interface TOCItem {
  id: string;
  label: string;
  subItems?: TOCItem[];
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  // Update active section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0% -80% 0%', threshold: 0 }
    );

    // Observe all section elements that correspond to TOC items
    const itemIds = getAllIds(items);
    itemIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  // Get all IDs from items and their subitems
  const getAllIds = (items: TOCItem[]): string[] => {
    return items.reduce<string[]>((acc, item) => {
      acc.push(item.id);
      if (item.subItems && item.subItems.length > 0) {
        acc = [...acc, ...getAllIds(item.subItems)];
      }
      return acc;
    }, []);
  };

  // Handle smooth scrolling when clicking a TOC item
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveId(id);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Recursive rendering of TOC items
  const renderTOCItems = (items: TOCItem[], level = 0) => {
    return (
      <ul className={level === 0 ? "space-y-3" : "pl-4 mt-2 space-y-2"}>
        {items.map((item) => (
          <li key={item.id} className={level === 0 ? "pb-1" : ""}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className={`text-sm ${
                activeId === item.id
                  ? "font-semibold text-brand-500"
                  : "text-gray-600 hover:text-gray-900"
              } ${level === 0 ? "font-medium" : ""}`}
              aria-label={`Navigate to ${item.label} section`}
            >
              {item.label}
            </a>
            {item.subItems && item.subItems.length > 0 && renderTOCItems(item.subItems, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className="hidden lg:block sticky top-24 self-start w-64 p-6 bg-white rounded-lg border border-gray-200 shadow-sm" aria-label="Table of contents">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Contents</h2>
      {renderTOCItems(items)}
    </nav>
  );
} 