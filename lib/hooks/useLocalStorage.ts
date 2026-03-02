'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for persisting boolean state in localStorage.
 * SSR-safe: returns initialValue until hydration completes.
 */
export function useLocalStorageFlag(
  key: string,
  initialValue = false,
): [boolean, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      setValue(stored === 'true');
    }
  }, [key]);

  const setAndPersist = useCallback(
    (newValue: boolean) => {
      setValue(newValue);
      localStorage.setItem(key, String(newValue));
    },
    [key],
  );

  return [value, setAndPersist];
}
