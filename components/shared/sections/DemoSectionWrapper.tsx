'use client';

import type { DemoContent } from '@/lib/config/bot-pages';
import { DemoSection } from '@/components/shared/demo/DemoSection';

interface DemoSectionWrapperProps {
  content: DemoContent;
  botSlug: string;
}

export function DemoSectionWrapper({ content, botSlug }: DemoSectionWrapperProps) {
  const { title, subtitle } = content;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-ink mb-3">{title}</h2>
        <p className="text-lg text-ink-muted max-w-2xl mx-auto">{subtitle}</p>
      </div>
      <DemoSection botSlug={botSlug} />
    </div>
  );
}
