import { MenuItem } from '@/types/navigation';
import {
  AcademicCapIcon,
  ArrowPathIcon,
  BanknotesIcon,
  BookOpenIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  HeartIcon,
  LanguageIcon,
  PaintBrushIcon,
  ScaleIcon,
  ShoppingCartIcon,
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
    label: "Bots",
    path: "/bots",
    children: [
      { label: "Artistic Advisor", path: "/bots/artistic-advisor", description: "AI guidance for creative projects.", icon: PaintBrushIcon },
      { label: "Auto Shopper", path: "/bots/auto-shopper", description: "Automated purchasing assistant.", icon: ShoppingCartIcon },
      { label: "Government Spending Tracker", path: "/bots/government-spending-tracker", description: "Follow public expenditures in real time.", icon: BanknotesIcon },
      { label: "Legal Expert", path: "/bots/legal-expert", description: "Research and analyze legal documents.", icon: ScaleIcon },
      { label: "Medical Expert", path: "/bots/medical-expert", description: "Clinical research and decision support.", icon: HeartIcon },
      { label: "Product Manager (Trident)", path: "/bots/product-manager", description: "Project management in Cursor.", icon: ClipboardDocumentListIcon },
      { label: "Research Assistant (Nerd)", path: "/bots/research-assistant", description: "Organize papers and discover insights.", icon: BookOpenIcon },
      { label: "Swiss German Teacher (Heidi)", path: "/bots/swiss-german-teacher", description: "Learn High German and Züridütsch.", icon: LanguageIcon }
    ]
  },
  {
    label: "Projects",
    path: "/projects",
    children: [
      { label: "Credit", path: "/projects/credit", description: "Automated venture credit operations.", icon: CreditCardIcon },
      { label: "Finance", path: "/projects/finance", description: "Open project finance management.", icon: CurrencyDollarIcon },
      { label: "Governance", path: "/projects/governance", description: "Transparent, accountable government tech.", icon: BuildingOfficeIcon },
      { label: "Recurring Fulfillment", path: "/projects/shopping", description: "Manage subscriptions and inventory.", icon: ArrowPathIcon },
      { label: "Techno-Capital", path: "/projects/techno-capital", description: "Investment fund for technological progress.", icon: GlobeAltIcon }
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
