'use client';

import { useEffect, useState } from 'react';
import { MenuItem } from '../types';

export function useActiveSection(pathname: string, menuItems: MenuItem[]) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const currentPath = pathname.split('/').pop() || '';
    
    // Find the menu item that matches the current path
    const activeItem = menuItems.find((item) => {
      if (typeof item.path !== 'string' && item.path?.pathname) {
        return item.path.pathname.split('/').pop() === currentPath;
      }
      return false;
    });

    setActiveSection(activeItem?.section || '');
  }, [pathname, menuItems]);

  return { activeSection };
} 