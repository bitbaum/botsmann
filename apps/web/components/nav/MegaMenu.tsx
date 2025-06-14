'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import type { MenuItem } from '@/types/navigation';
import { Card, CardContent } from '../ui/card';

interface MegaMenuProps {
  item: MenuItem;
}

export default function MegaMenu({ item }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        (ref.current?.parentElement as HTMLElement | null)?.focus();
      }
    }
    if (open) {
      document.addEventListener('keydown', onKey);
    } else {
      document.removeEventListener('keydown', onKey);
    }
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href={item.path} className="text-sm font-medium text-gray-600 hover:text-openai-green">
        {item.label}
      </Link>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-1/2 z-20 mt-3 w-72 -translate-x-1/2"
          >
            <Card className="shadow-lg">
              <CardContent className="grid gap-2">
                {item.children?.map((child) => (
                  <Link
                    key={child.label}
                    href={child.path}
                    className="block rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {child.label}
                  </Link>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


