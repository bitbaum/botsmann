export interface Bot {
  slug: string;
  title: string;
  description: string;
  overview: string;
  features: string[];
  details: string;
  tryLink?: string;
}

const bots: Bot[] = [
  {
    slug: "swiss-german-teacher",
    title: "Heidi – Your Swiss German Companion",
    description:
      "Your AI companion for High German and Züridütsch—learn the language and discover tonight's events in Zurich.",
    overview:
      "Smart, simple tools to speak, learn, and live like a local in Zurich.",
    features: [
      "Adapts to You: Learns your tastes and tests your progress in a smart way.",
      "Events in Zurich: Discover tonight's events and activities for this week.",
      "Dual-Language Power: High German and Züridütsch, side by side.",
      "Real Context: Words and phrases come alive with examples.",
      "Instant Writing: Emails and texts crafted in both languages.",
      "Swiss Culture: Insider tips on history and social life.",
    ],
    details:
      "Type a word, and Heidi delivers a table comparing High German and Züridütsch with real-life examples. Send a sentence or email, and get a tailored response to communicate effortlessly. Discover tonight's events in Zurich with the 'Browse Events' feature. Heidi follows your learning progress, tests you in a smart way, and helps you remember more while introducing you to local activities. With cultural tips and local know-how, she's your shortcut to thriving in Switzerland.",
    tryLink: "https://chatgpt.com/g/g-rni41WTSh-heidi-tell",
  },
  {
    slug: "research-assistant",
    title: "Research Assistant",
    description:
      "AI-powered research companion for organizing data, generating insights, and discovering connections.",
    overview:
      "Elevate your research workflow with AI automation that organizes materials, provides real-time updates, and sparks innovation.",
    features: [
      "Automated Research Systematization",
      "Web Scraping for Updates",
      "AI-Generated Research Drafts",
      "Daily Thought-Provoking Questions",
      "Big Discovery Mode",
      "Integration & Collaboration",
    ],
    details:
      "The Research Assistant Bot transforms how academics, scientists, journalists, and industry professionals conduct research. It automatically organizes uploaded materials, keeps you updated with the latest developments in your field, generates structured content with proper citations, and challenges your thinking with insightful questions. The unique Big Discovery Mode helps identify research gaps and novel connections between concepts, potentially leading to breakthrough insights.",
    tryLink: "https://chatgpt.com/g/research-assistant",
  },
  {
    slug: "medical-expert",
    title: "Medical Expert Assistant",
    description: "AI-powered medical knowledge and consultation support",
    overview:
      "Supporting healthcare professionals with evidence-based insights and comprehensive research analysis.",
    features: [
      "Evidence-based insights",
      "Research assistance",
      "Case analysis",
      "Medical literature review",
      "Clinical guidelines integration",
    ],
    details:
      "Designed to assist medical professionals in staying current with research, analyzing cases, and making informed decisions based on the latest medical evidence.",
  },
  {
    slug: "legal-expert",
    title: "Legal Expert Assistant",
    description: "Navigate legal complexities with AI guidance",
    overview:
      "Comprehensive legal research and analysis support for legal professionals.",
    features: [
      "Legal research",
      "Document analysis",
      "Case law insights",
      "Regulatory compliance",
      "Contract review assistance",
    ],
    details:
      "Our Legal Expert Assistant combines advanced legal knowledge with AI capabilities to provide comprehensive support for legal research and analysis.",
  },
  {
    slug: "artistic-advisor",
    title: "Artistic Advisor",
    description: "Enhance your creative process with AI insights",
    overview:
      "Get expert guidance on composition, style analysis, and technique refinement for your artistic projects.",
    features: [
      "Style analysis",
      "Composition guidance",
      "Technique suggestions",
      "Color theory assistance",
      "Art history insights",
    ],
    details:
      "The Artistic Advisor AI helps artists explore new techniques, refine their style, and gain insights from art history while maintaining their unique creative vision.",
  },
  {
    slug: "product-manager",
    title: "Trident - AI Product Manager",
    description:
      "AI-powered product manager for Cursor development and project management",
    overview:
      "A specialized tool that combines project management capabilities with technical guidance to streamline development workflow in Cursor.",
    features: [
      "Project Management: Organize tasks and deliverables for efficient development",
      "Technical Direction: Implementation-ready specifications for developers",
      "Workflow Optimization: Streamline development processes and eliminate roadblocks",
      "Implementation Planning: Detailed roadmaps for feature development",
      "Quality Assurance: Comprehensive testing and validation strategies",
      "Cursor-Optimized: Specifically designed for Cursor development workflow",
    ],
    details:
      "Trident transforms the development process by providing comprehensive project management and technical guidance. It helps organize tasks, create detailed implementation plans, and optimize workflows specifically for Cursor development. By leveraging AI capabilities, it produces clear specifications, architecture diagrams, and risk assessments that developers can immediately use for implementation.",
  },
];

export default bots;
