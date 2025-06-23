import { MenuItem } from '@/types/navigation';
import {
  BriefcaseIcon,
  BuildingLibraryIcon,
  UserIcon,
} from '@heroicons/react/20/solid';
import { UrlObject } from 'url';

export const menuItems: MenuItem[] = [
  {
    label: "Solutions",
    path: "/solutions",
    children: [
      { label: "Individuals", path: "/solutions/individuals", description: "Personal productivity and language tools.", icon: UserIcon },
      { label: "Businesses", path: "/solutions/businesses", description: "Workflow automation for teams and enterprises.", icon: BriefcaseIcon },
      { label: "Governments", path: "/solutions/governments", description: "Transparency and citizen engagement platforms.", icon: BuildingLibraryIcon }
    ]
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
  }
];
