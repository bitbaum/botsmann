export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

export interface Step {
  title: string;
  description: string;
  image?: string;
}

export interface BotPageProps {
  title: string;
  overview: string;
  features: Feature[];
  howItWorks: Step[];
  demo?: React.ReactNode;
}
