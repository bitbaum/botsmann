import type { Route } from 'next';

export type PathWithHash = Route | {
  pathname: Route;
  hash?: string;
};

export type MenuItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path: PathWithHash;
  section?: string;
  dropdown?: {
    items: MenuItem[];
  };
};

export type ProductLink = {
  id: string;
  label: string;
  description: string;
  path: PathWithHash;
  icon: React.ReactNode;
};

export type ProfileLink = {
  id: string;
  label: string;
  path: PathWithHash;
};

export type LogoProps = {
  className?: string;
};

export type ProductDropdownProps = {
  isOpen: boolean;
  onToggle: () => void;
  item: MenuItem;
};

export type ProfileDropdownProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  activeSection: string | null;
}; 