import { MenuItem } from '@/types/navigation';
import { UrlObject } from 'url';

export const menuItems: MenuItem[] = [
  {
    label: "Solutions",
    path: "/solutions",
    children: [
      // Bots
      { label: "Artistic Advisor", path: "/bots/artistic-advisor", description: "AI guidance for creative projects." },
      { label: "Auto Shopper", path: "/bots/auto-shopper", description: "Automated purchasing assistant." },
      { label: "Government Spending Tracker", path: "/bots/government-spending-tracker", description: "Follow public expenditures in real time." },
      { label: "Legal Expert", path: "/bots/legal-expert", description: "Research and analyze legal documents." },
      { label: "Medical Expert", path: "/bots/medical-expert", description: "Clinical research and decision support." },
      { label: "Product Manager (Trident)", path: "/bots/product-manager", description: "Project management in Cursor." },
      { label: "Research Assistant (Nerd)", path: "/bots/research-assistant", description: "Organize papers and discover insights." },
      { label: "Swiss German Teacher (Heidi)", path: "/bots/swiss-german-teacher", description: "Learn High German and Züridütsch." },
      // Projects
      { label: "Credit", path: "/projects/credit", description: "Automated venture credit operations." },
      { label: "Finance", path: "/projects/finance", description: "Open project finance management." },
      { label: "Governance", path: "/projects/governance", description: "Transparent, accountable government tech." },
      { label: "Recurring Fulfillment", path: "/projects/shopping", description: "Manage subscriptions and inventory." },
      { label: "Techno-Capital", path: "/projects/techno-capital", description: "Investment fund for technological progress." }
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