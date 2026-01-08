'use client';

import { usePathname } from 'next/navigation';

export default function ConditionalMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Bot pages have their own headers, so no top padding needed
  const isBotPage = pathname?.startsWith('/bots/') && pathname !== '/bots';

  return (
    <main className={isBotPage ? '' : 'pt-16'}>
      {children}
    </main>
  );
}
