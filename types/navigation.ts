import type { Route } from 'next';

export interface MenuItem {
  label: string;
  path: Route | string;
  /**
   * Optional description for mega menu display
   */
  description?: string;
  /**
   * Optional icon (emoji or SVG) for menu item
   */
  icon?: string;
  children?: MenuItem[];
  isButton?: boolean;
}
