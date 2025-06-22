export interface ProjectItem {
  title: string;
  description: string;
  href: string;
  image: string;
}

const projects: ProjectItem[] = [
  {
    title: "Techno-Capital",
    description:
      "Investing in technology to drive humanity toward technological singularity through commodities, public companies, startups, research, and SubSpace Capital.",
    href: "/projects/techno-capital",
    image: "/images/techno-capital.jpg",
  },
  {
    title: "Governance",
    description:
      "Technologies dedicated to maximizing transparency and accountability in government spending, featuring innovative solutions like the Venmo-style spending tracker.",
    href: "/projects/governance",
    image: "/governance.png",
  },
  {
    title: "Credit",
    description:
      "Enterprise-grade automation for venture credit operations. Automatically ingest and analyze portfolio company reports, monitor debt metrics, and make data-driven decisions.",
    href: "/projects/credit",
    image: "/credit.png",
  },
  {
    title: "Recurring Fulfillment",
    description:
      "AI-powered platform for managing recurring purchases, subscriptions, and services. Automate your replenishment process and inventory management with predictive analytics.",
    href: "/projects/shopping",
    image: "/shopping.png",
  },
  {
    title: "Project Finance",
    description:
      "Full transparency project finance and management tool. Start projects, manage funding through donations/credit/investments, track tasks and costs, with complete public visibility.",
    href: "/projects/finance",
    image: "/finance.png",
  },
];

export default projects;
