/**
 * Navigation colour classes for first-party bot pages.
 *
 * There is one scheme, because there is one brand. Bot pages used to carry a
 * per-bot accent (blue, green, indigo, red, amber), which put a blue logo and
 * a blue nav button on the same screen as the ochre CTA defined in
 * app/globals.css — two design systems arguing inside one viewport.
 *
 * Values here are semantic Tailwind classes bound to the CSS custom properties
 * in app/globals.css. That file is the SSOT; nothing below is a literal colour.
 */
export interface NavColorClasses {
  /** Logo/icon background */
  logo: string;
  /** Title text color */
  title: string;
  /** Active menu item */
  active: string;
  /** Hover state for menu items */
  hover: string;
  /** Primary accent (buttons, CTAs) */
  accent: string;
  /** Border color */
  border: string;
}

export const NAV_COLORS: NavColorClasses = {
  logo: 'bg-action-tint',
  title: 'text-ink',
  active: 'text-action bg-action-tint',
  hover: 'hover:text-action hover:bg-action-tint',
  accent: 'bg-action hover:bg-action-hover',
  border: 'border-edge',
};

/** Navigation colours for first-party bot pages. */
export const getNavColors = (): NavColorClasses => NAV_COLORS;
