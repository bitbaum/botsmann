/**
 * Guard: a bot's nav may only link to sections that exist on its page.
 *
 * The config-driven refactor (4600019e) deleted ~16,000 lines of bot page
 * content but left data/bots.ts still advertising it. The result was 19 menu
 * items across five bots that scrolled nowhere -- "Web Scraping", "Daily
 * Questions", "Harm Reduction", "Pricing" -- each one a link to a section that
 * had been removed. Nothing failed, because nothing compared the two files.
 *
 * This is that comparison.
 */
import bots, { type Bot } from '@/data/bots';
import { getBotPageConfig } from '@/lib/config/bot-pages';

describe('bot nav integrity', () => {
  const withPages: Bot[] = bots.filter((b) => getBotPageConfig(b.slug));

  it('every bot with a page config is covered', () => {
    expect(withPages.length).toBeGreaterThan(0);
  });

  it.each(withPages.map((b) => [b.slug, b] as const))(
    '%s: every nav item targets a real section',
    (slug, bot) => {
      const config = getBotPageConfig(slug);
      const sectionIds = new Set(config!.sections.map((s) => s.id));

      const dangling = (bot.nav?.menuItems ?? [])
        .filter((item) => item.section !== undefined && !sectionIds.has(item.section))
        .map((item) => `${item.label} -> #${item.section}`);

      expect(dangling).toEqual([]);
    },
  );

  it.each(withPages.map((b) => [b.slug, b] as const))(
    '%s: nav item ids are unique',
    (_slug, bot) => {
      const ids = (bot.nav?.menuItems ?? []).map((i) => i.id);
      expect(ids).toEqual([...new Set(ids)]);
    },
  );
});
