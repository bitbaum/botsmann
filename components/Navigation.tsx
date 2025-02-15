import { useEffect, useState } from 'react';
import Link from 'next/link';

interface NavigationItem {
  label: string;
  path: string;
  children?: NavigationItem[];
}

interface NavigationData {
  items: NavigationItem[];
}

export default function Navigation() {
  const [data, setData] = useState<NavigationData | null>(null);

  useEffect(() => {
    fetch('/api/navigation')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <nav className="flex gap-6">
      {data.items.map((item, i) => (
        <div key={i} className="relative group">
          <Link
            href={{ pathname: item.path }}
            className="text-gray-600 hover:text-gray-900"
          >
            {item.label}
          </Link>
          {item.children && item.children.length > 0 && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
              {item.children.map((child, j) => (
                <Link
                  key={j}
                  href={{ pathname: child.path }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
