import type { MenuItem, MenuChildItem } from '@/types/navigation';
import type { Route } from 'next';
import bots from '@/data/bots';

/**
 * Map bot slug to professional category path
 * This mapping allows bots to link to their corresponding professional page
 */
const BOT_TO_PROFESSIONAL_PATH: Record<string, string> = {
  'legal-expert': 'legal',
  'medical-expert': 'health',
  'research-assistant': 'research',
  'swiss-german-teacher': 'language',
  'artistic-advisor': 'creative',
  'product-manager': 'business',
};

/**
 * Generate professional menu children from bots.ts
 * SSOT: Bot data drives navigation
 */
const generateProfessionalChildren = (): MenuChildItem[] => {
  const allProfessionals: MenuChildItem = {
    label: 'All Professionals',
    path: '/professionals' as Route,
    description: 'Browse all AI professionals.',
    icon: '👥',
  };

  const botItems: MenuChildItem[] = bots
    .filter((b) => b.nav)
    .map((bot) => {
      const professionalPath = BOT_TO_PROFESSIONAL_PATH[bot.slug] || bot.slug;
      // Extract short category from navDescription (e.g., "AI Legal Assistant" -> "Legal")
      const category =
        bot.nav!.navDescription?.replace(/^AI\s+/, '').replace(/\s+Assistant$/, '') || 'Assistant';
      return {
        label: `${bot.nav!.navTitle} (${category})`,
        path: `/professionals/${professionalPath}` as Route,
        description: bot.description,
        icon: bot.nav!.emoji,
      };
    });

  return [allProfessionals, ...botItems];
};

/**
 * Main site navigation menu items
 * SSOT for navigation structure across desktop and mobile
 *
 * Botsmann: Your Private AI Professionals
 * - AI Professionals (specialized advisors)
 * - Enterprise (for businesses)
 * - About
 */
export const menuItems: MenuItem[] = [
  {
    label: 'Professionals',
    path: '/professionals' as Route,
    children: generateProfessionalChildren(),
    megaMenu: {
      columns: 2,
      header: {
        title: 'AI Professionals',
        subtitle: 'Expert advisors for every need',
        gradient: 'bg-action-tint',
      },
    },
  },
  {
    label: 'Enterprise',
    path: '/enterprise' as Route,
  },
  {
    label: 'About',
    path: '/about' as Route,
  },
  {
    label: 'Get Started',
    path: '/professionals' as Route,
    isButton: true,
  },
];

/**
 * Get menu items without button items (for desktop nav)
 */
export const getNavItems = () => menuItems.filter((item) => !item.isButton);

/**
 * Get button items only (for CTA section)
 */
export const getButtonItems = () => menuItems.filter((item) => item.isButton);
