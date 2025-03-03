import { LinkProps } from 'next/link';

export interface MenuItem {
  label: string;
  path: LinkProps<string>['href'];
  children?: MenuItem[];
  isButton?: boolean;
}
