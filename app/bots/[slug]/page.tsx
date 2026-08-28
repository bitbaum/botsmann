'use client';

import { useParams } from 'next/navigation';
import { getBotPageConfig } from '@/lib/config/bot-pages';
import { getBotBySlug, getBotTryLink } from '@/data/bots';
import { getBotHeroConfig } from '@/data/botHeroConfigs';
import BotNavigation from '@/app/bots/BotNavigation';
import { BotNotFoundFallback } from '@/components/shared/BotNotFoundFallback';
import { BotSection, BotHeroSection } from '@/components/shared';
import {
  DisclaimerSection,
  FeaturesSection,
  HowItWorksSection,
  BenefitsSection,
  TestimonialsSection,
  VisionSection,
  TechnologySection,
  CTASection,
  DemoSectionWrapper,
} from '@/components/shared/sections';
import type {
  DisclaimerContent,
  FeaturesContent,
  HowItWorksContent,
  BenefitsContent,
  TestimonialsContent,
  VisionContent,
  TechnologyContent,
  CTAContent,
  DemoContent,
  SectionConfig,
} from '@/lib/config/bot-pages';

/**
 * Dynamic bot page that renders from config
 * No need to create individual page files for each bot!
 */
export default function BotPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Get configs
  const pageConfig = getBotPageConfig(slug);
  const bot = getBotBySlug(slug);
  const heroConfig = getBotHeroConfig(slug);

  // Fallback if bot not found
  if (!pageConfig || !bot || !bot.nav) {
    return <BotNotFoundFallback botName={slug} />;
  }

  const rawTryLink = getBotTryLink(bot);
  const tryLink = rawTryLink || '#waitlist';

  return (
    <div className="min-h-screen bg-paper">
      <BotNavigation
        botSlug={bot.slug}
        botTitle={bot.nav.navTitle}
        botEmoji={bot.nav.emoji}
        botDescription={bot.nav.navDescription}
        menuItems={bot.nav.menuItems}
        chatLink={tryLink}
      />

      <main className="mx-auto max-w-screen-xl px-6 pt-24">
        {pageConfig.sections.map((section) => (
          <SectionRenderer
            key={section.id}
            section={section}
            botSlug={slug}
            tryLink={tryLink}
            heroConfig={heroConfig}
          />
        ))}
      </main>
    </div>
  );
}

/**
 * Renders a section based on its type and content
 */
interface SectionRendererProps {
  section: SectionConfig;
  botSlug: string;
  tryLink: string;
  heroConfig: ReturnType<typeof getBotHeroConfig>;
}

function SectionRenderer({ section, botSlug, tryLink, heroConfig }: SectionRendererProps) {
  const { id, type, content, isLast } = section;

  // Hero section uses external config
  if (type === 'hero') {
    if (!heroConfig) return null;
    const config = {
      ...heroConfig,
      primaryCTA: { ...heroConfig.primaryCTA, href: tryLink },
    };
    return <BotHeroSection config={config} />;
  }

  // All other sections wrapped in BotSection
  return (
    <BotSection id={id} isLast={isLast}>
      {renderSectionContent(type, content, botSlug, tryLink)}
    </BotSection>
  );
}

/**
 * Renders the content component for a section type
 */
function renderSectionContent(
  type: SectionConfig['type'],
  content: SectionConfig['content'],
  botSlug: string,
  tryLink: string,
): React.ReactNode {
  if (!content) return null;

  switch (type) {
    case 'disclaimer':
      return <DisclaimerSection content={content as DisclaimerContent} />;

    case 'demo':
      return <DemoSectionWrapper content={content as DemoContent} botSlug={botSlug} />;

    case 'features':
      return <FeaturesSection content={content as FeaturesContent} />;

    case 'how-it-works':
      return <HowItWorksSection content={content as HowItWorksContent} />;

    case 'benefits':
      return <BenefitsSection content={content as BenefitsContent} />;

    case 'testimonials':
      return <TestimonialsSection content={content as TestimonialsContent} />;

    case 'vision':
      return <VisionSection content={content as VisionContent} />;

    case 'technology':
      return <TechnologySection content={content as TechnologyContent} />;

    case 'cta':
      return <CTASection content={content as CTAContent} tryLink={tryLink} />;

    default:
      return null;
  }
}
