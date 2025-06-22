"use client";

import React from "react";
import bots from "../../../data/bots";
import BotNavigation from "../BotNavigation";
import "./styles.css";

import HeroSection from "./components/hero/HeroSection";
import DisclaimerSection from "./components/disclaimer/DisclaimerSection";
import FeaturesSection from "./components/features/FeaturesSection";
import HowItWorksSection from "./components/how-it-works/HowItWorksSection";
import UseCasesSection from "./components/usecases/UseCasesSection";
import CallToActionSection from "./components/cta/CallToActionSection";

export default function LegalExpert() {
  const bot = bots.find((b) => b.slug === "legal-expert");

  const menuItems = [
    { id: "features", label: "Features", icon: "⚖️", section: "features" },
    {
      id: "how-it-works",
      label: "How It Works",
      icon: "🔎",
      section: "how-it-works",
    },
    { id: "use-cases", label: "Use Cases", icon: "📝", section: "use-cases" },
    {
      id: "get-started",
      label: "Get Started",
      icon: "🚀",
      section: "get-started",
    },
  ];

  const getTryLink = () => bot?.tryLink || "https://chat.openai.com/";

  if (!bot) {
    return <div className="p-8 text-center">Lex configuration not found</div>;
  }

  const featureItems = [
    {
      title: "Legal Research",
      description: "Search statutes and case law with precision.",
      icon: "📚",
    },
    {
      title: "Document Analysis",
      description: "Understand contracts and legal briefs instantly.",
      icon: "📄",
    },
    {
      title: "Case Law Insights",
      description: "Surface relevant precedents for your matter.",
      icon: "💡",
    },
    {
      title: "Regulatory Compliance",
      description: "Check requirements across jurisdictions.",
      icon: "✅",
    },
    {
      title: "Contract Review",
      description: "Highlight risks and missing clauses automatically.",
      icon: "✍️",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <BotNavigation
        botTitle="Lex"
        botEmoji="⚖️"
        botDescription="AI Legal Assistant"
        accentColor="blue"
        menuItems={menuItems}
        chatLink={getTryLink()}
      />

      <main className="mx-auto max-w-screen-xl px-6 pt-24">
        <HeroSection
          title="Lex"
          overview={bot.overview}
          getTryLink={getTryLink}
        />
        <DisclaimerSection />
        <FeaturesSection features={featureItems} />
        <HowItWorksSection />
        <UseCasesSection />
        <CallToActionSection getTryLink={getTryLink} />
      </main>
    </div>
  );
}
