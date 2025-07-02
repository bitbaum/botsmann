export interface MenuItem {
  label: string;
  path: string;
  /**
   * Optional description for mega menu display
   */
  description?: string;
  children?: MenuItem[];
  isButton?: boolean;
}
