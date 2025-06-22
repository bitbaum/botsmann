import { LinkProps } from "next/link";

export interface MenuItem {
  label: string;
  path: LinkProps<string>["href"];
  /**
   * Optional description for mega menu display
   */
  description?: string;
  children?: MenuItem[];
  isButton?: boolean;
}
