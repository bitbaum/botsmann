import { MenuItem } from '@/types/navigation';

export const menuItems: MenuItem[] = [
  {
    label: "Bots",
    path: "/bots",
    children: [
      {
        label: "Legal Expert (Lex)",
        path: "/bots/legal-expert",
        description: "Ingest legal docs, get AI analysis & lawyer matches",
        icon: "⚖️"
      },
      {
        label: "Swiss German Teacher (Heidi)",
        path: "/bots/swiss-german-teacher",
        description: "Learn Züridütsch with personalized AI lessons",
        icon: "🇨🇭"
      },
      {
        label: "Research Assistant (Nerd)",
        path: "/bots/research-assistant",
        description: "Ingest papers, organize research, discover insights",
        icon: "🧠"
      },
      {
        label: "Medical Expert (Imhotep)",
        path: "/bots/medical-expert",
        description: "Analyze medical data for evidence-based insights",
        icon: "⚕️"
      },
      {
        label: "Creative Advisor (Artr)",
        path: "/bots/artistic-advisor",
        description: "Upload art, get style analysis & creative feedback",
        icon: "🎨"
      },
      {
        label: "Product Manager (Trident)",
        path: "/bots/product-manager",
        description: "Ingest user data, get product roadmaps & analysis",
        icon: "🔱"
      }
    ]
  },
  {
    label: "Projects",
    path: "/projects",
    children: [
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
];