"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const projects = [
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

export default function Projects() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-screen-xl px-6 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900">
            Projects
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Explore our transformative projects focused on governance, finance,
            and automation. Each project represents our commitment to
            transparency, efficiency, and technological innovation.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={{ pathname: project.href }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
            >
              <div className="aspect-video w-full bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 rounded-lg bg-white/80 backdrop-blur-sm">
                    <h3 className="text-xl font-medium text-gray-900">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  {project.title}
                </h2>
                <p className="text-gray-600">{project.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-openai-green">
                  Learn more
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
