export interface MenuItem {
  label: string;
  path: string;
  children?: MenuItem[];
  isButton?: boolean;
}
