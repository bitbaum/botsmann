import { LinkProps } from 'next/link';
import { ComponentType, SVGProps } from 'react';

export interface MenuItem {
  label: string;
  path: LinkProps<string>['href'];
  /**
   * Optional description for mega menu display
   */
  description?: string;
  /**
   * Optional icon component for mega menu items
   */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  children?: MenuItem[];
  isButton?: boolean;
}
