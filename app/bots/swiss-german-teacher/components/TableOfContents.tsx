'use client';
import { useState, useEffect } from 'react';

interface TableOfContentsProps {
  items: {
    id: string;
    title: string;
    subItems?: Array<{
      id: string;
      title: string;
    }>;
  }[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
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
        rootMargin: '-20% 0% -80% 0%',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
      
      if (item.subItems) {
        item.subItems.forEach((subItem) => {
          const subElement = document.getElementById(subItem.id);
          if (subElement) observer.observe(subElement);
        });
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
        
        if (item.subItems) {
          item.subItems.forEach((subItem) => {
            const subElement = document.getElementById(subItem.id);
            if (subElement) observer.unobserve(subElement);
          });
        }
      });
    };
  }, [items]);

  return (
    <nav className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-lg font-medium mb-4">On This Page</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block py-1 border-l-2 pl-3 transition-colors ${
                activeId === item.id
                  ? 'border-openai-green text-openai-green font-medium'
                  : 'border-transparent hover:text-gray-900 hover:border-gray-300'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              {item.title}
            </a>
            {item.subItems && (
              <ul className="mt-1 space-y-1 ml-4">
                {item.subItems.map((subItem) => (
                  <li key={subItem.id}>
                    <a
                      href={`#${subItem.id}`}
                      className={`block py-1 text-sm border-l-2 pl-3 transition-colors ${
                        activeId === subItem.id
                          ? 'border-openai-green text-openai-green font-medium'
                          : 'border-transparent hover:text-gray-900 hover:border-gray-300'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(subItem.id)?.scrollIntoView({
                          behavior: 'smooth',
                        });
                      }}
                    >
                      {subItem.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
} 