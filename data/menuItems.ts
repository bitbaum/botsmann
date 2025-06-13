import { MenuItem } from '@/types/navigation';
import { UrlObject } from 'url';

export const menuItems: MenuItem[] = [
  {
    label: "Solutions",
    path: "/solutions",
    children: [
      { label: "Individuals", path: "/solutions/individuals" },
      { label: "Businesses", path: "/solutions/businesses" },
      { label: "Governments", path: "/solutions/governments" }
    ]
  },
  {
    label: "Products",
    path: "/products"
  },
  {
    label: "Blog",
    path: "/blog"
  },
  {
    label: "About",
    path: "/about"
  },
  {
    label: "Contact Us",
    path: "/contact",
    isButton: true
  },
];