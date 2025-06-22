"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import bots from "@/data/bots";
import solutions from "@/data/solutions.json";
import projects from "@/data/projects";

interface Item {
  id: string;
  title: string;
  description: string;
  href: Route;
  type: "bot" | "solution" | "project";
}

const botItems: Item[] = bots.map((bot) => ({
  id: `bot-${bot.slug}`,
  title: bot.title,
  description: bot.overview,
  href: `/bots/${bot.slug}` as Route,
  type: "bot",
}));

const solutionItems: Item[] = [
  ...solutions.individuals.map((s: any) => ({ ...s, category: "individuals" })),
  ...solutions.businesses.map((s: any) => ({ ...s, category: "businesses" })),
  ...solutions.governments.map((s: any) => ({ ...s, category: "governments" })),
].map((sol) => ({
  id: `solution-${sol.slug}`,
  title: sol.title,
  description: sol.overview,
  href: `/solutions/${sol.category}/${sol.slug}` as Route,
  type: "solution",
}));

const projectItems: Item[] = projects.map((project) => ({
  id: `project-${project.title.toLowerCase().replace(/\s+/g, "-")}`,
  title: project.title,
  description: project.description,
  href: project.href as Route,
  type: "project",
}));

const allItems: Item[] = [...botItems, ...solutionItems, ...projectItems];

export default function OfferingsPage() {
  const [filter, setFilter] = useState<
    "all" | "bots" | "solutions" | "projects"
  >("all");

  const filteredItems = allItems.filter((item) => {
    if (filter === "all") return true;
    if (filter === "bots" && item.type === "bot") return true;
    if (filter === "solutions" && item.type === "solution") return true;
    if (filter === "projects" && item.type === "project") return true;
    return false;
  });

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-semibold tracking-tight">
        Our Offerings
      </h1>

      <div className="mb-8 flex gap-2">
        {(["all", "bots", "solutions", "projects"] as const).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              filter === key
                ? "bg-openai-green text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <h2 className="mb-2 text-xl font-semibold text-gray-900">
                {item.title}
              </h2>
              <p className="mb-4 text-gray-600 min-h-[3rem]">
                {item.description}
              </p>
            </div>
            <span className="text-sm font-medium text-openai-green group-hover:underline mt-auto">
              Learn more →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
