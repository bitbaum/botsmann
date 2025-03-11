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
    label: "Bots",
    path: "/bots",
    children: [
      { label: "Artistic Advisor", path: "/bots/artistic-advisor" },
      { label: "Auto Shopper", path: "/bots/auto-shopper" },
      { label: "Government Spending Tracker", path: "/bots/government-spending-tracker" },
      { label: "Legal Expert", path: "/bots/legal-expert" },
      { label: "Medical Expert", path: "/bots/medical-expert" },
      { label: "Swiss German Teacher", path: "/bots/swiss-german-teacher" }
    ]
  },
  {
    label: "Projects",
    path: "/projects",
    children: [
      { label: "Credit", path: "/projects/credit" },
      { label: "Finance", path: "/projects/finance" },
      { label: "Governance", path: "/projects/governance" },
      { label: "Recurring Fulfillment", path: "/projects/shopping" },
      { label: "Techno-Capital", path: "/projects/techno-capital" }
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