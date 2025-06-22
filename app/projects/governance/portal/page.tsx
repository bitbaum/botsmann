"use client";

import React, { useState } from "react";
import DashboardTransactionDemo from "../components/DashboardTransactionDemo";
import MetricsGrid from "./components/MetricsGrid";
import ComponentCards from "./components/ComponentCards";
import ActivityFeed from "./components/ActivityFeed";
import TaxFlow from "./components/TaxFlow";
import ActionCenter from "./components/ActionCenter";
import TabsContainer from "./components/TabsContainer";
import ComponentPreview from "./components/ComponentPreview";
import Link from "next/link";

/**
 * Portal - Central hub for citizen interaction with Solon
 * Provides access to all four key components with interactive features
 * and tax-related transparency
 */
export default function Portal() {
  const [activeTab, setActiveTab] = useState("overview");
  const [filter, setFilter] = useState("all");

  // Enhanced metrics with tax-focused data
  const metrics = [
    {
      label: "Annual Tax Contribution",
      value: "$8,942.58",
      change: "+$412.12",
      trend: "up" as const,
      tooltip: "Total tax payments for the current fiscal year",
    },
    {
      label: "Tax Allocation Efficiency",
      value: "94.3%",
      change: "+2.1%",
      trend: "up" as const,
      tooltip: "Percentage of your tax dollars allocated to public goods",
    },
    {
      label: "Community Rank",
      value: "241",
      change: "of 5280",
      trend: "neutral" as const,
      tooltip:
        "Your ranking in the Solon community based on contribution and participation",
    },
    {
      label: "Participation Score",
      value: "78.2",
      change: "+12.4",
      trend: "up" as const,
      tooltip: "Score based on voting participation and community engagement",
    },
    {
      label: "Tax Return Rate",
      value: "4.1%",
      change: "-0.3%",
      trend: "down" as const,
      tooltip: "Percentage of taxes returned through efficiency gains",
    },
    {
      label: "Budget Influence",
      value: "Medium",
      change: "+1 tier",
      trend: "up" as const,
      tooltip:
        "Your level of influence on budget allocation based on participation",
    },
  ];

  // Tax allocation breakdown for visualization
  const taxAllocation = [
    { category: "Infrastructure", percentage: 32, amount: "$1,024" },
    { category: "Education", percentage: 28, amount: "$896" },
    { category: "Healthcare", percentage: 18, amount: "$576" },
    { category: "Public Safety", percentage: 12, amount: "$384" },
    { category: "Recreation", percentage: 5, amount: "$160" },
    { category: "Administration", percentage: 5, amount: "$160" },
  ];

  // Recent activity for the activity feed - using the interface defined in ActivityFeed.tsx
  const recentActivity = [
    {
      id: "1",
      type: "transaction" as "transaction" | "law" | "service" | "vote",
      action: "commented on",
      item: "Highway Repair - Section 14A",
      time: "2 hours ago",
      path: "/projects/governance/open-pay",
      taxImpact: "Your contribution: $4.12",
    },
    {
      id: "2",
      type: "law" as "transaction" | "law" | "service" | "vote",
      action: "reviewed",
      item: "Public Parks Expansion Act",
      time: "1 day ago",
      path: "/projects/governance/open-law",
      taxImpact: "Affects $160 of your taxes annually",
    },
    {
      id: "3",
      type: "service" as "transaction" | "law" | "service" | "vote",
      action: "rated",
      item: "Waste Management Services",
      time: "3 days ago",
      path: "/projects/governance/open-service",
      taxImpact: "Your contribution: $86.40 annually",
    },
    {
      id: "4",
      type: "vote" as "transaction" | "law" | "service" | "vote",
      action: "voted on",
      item: "City Budget Allocation 2023",
      time: "1 week ago",
      path: "/projects/governance/open-vote",
      taxImpact: "Controls 100% of your tax allocation",
    },
  ];

  // Pending actions for the action center - using the interface defined in ActionCenter.tsx
  const pendingActions = [
    {
      id: "pa1",
      type: "vote" as "vote" | "review" | "delegate",
      title: "Transportation Infrastructure Bond",
      description: "Vote on $12M bond for road improvements",
      deadline: "3 days",
      taxImpact: "Est. impact: +$28/year for 5 years",
      path: "/projects/governance/open-vote",
    },
    {
      id: "pa2",
      type: "review" as "vote" | "review" | "delegate",
      title: "School Budget Increase Proposal",
      description: "Review and comment on 8% budget increase",
      deadline: "5 days",
      taxImpact: "Est. impact: +$45/year ongoing",
      path: "/projects/governance/open-law",
    },
    {
      id: "pa3",
      type: "delegate" as "vote" | "review" | "delegate",
      title: "Public Safety Fund Allocation",
      description: "Delegate your vote or vote directly",
      deadline: "1 week",
      taxImpact: "Affects $384 of your annual taxes",
      path: "/projects/governance/open-vote",
    },
  ];

  // Tax-funded projects for tax flow tab
  const taxFundedProjects = [
    {
      category: "Infrastructure",
      title: "Highway Repair - Section 14A",
      impact: "Reduced travel time by 12 minutes for 15,000 daily commuters",
      contribution: "$4.12",
      total: "$249,800",
      link: "/projects/governance/open-pay",
    },
    {
      category: "Recreation",
      title: "Community Park Maintenance",
      impact: "Benefits 1,200+ weekly park visitors and ensures safe equipment",
      contribution: "$0.94",
      total: "$56,750",
      link: "/projects/governance/open-pay",
    },
    {
      category: "Education",
      title: "School District Technology Upgrade",
      impact: "Upgraded technology for 3,500 students across 8 schools",
      contribution: "$20.63",
      total: "$1,250,000",
      link: "/projects/governance/open-pay",
    },
    {
      category: "Public Safety",
      title: "Emergency Response Equipment",
      impact: "Reduced response times by 1.8 minutes in emergency situations",
      contribution: "$8.22",
      total: "$498,600",
      link: "/projects/governance/open-pay",
    },
  ];

  // Component cards for navigation
  const componentCards = [
    {
      id: "payments",
      title: "Open Pay",
      description:
        "Track, verify, and engage with government spending in real-time.",
      icon: "💸",
      color: "blue",
      path: "/projects/governance/open-pay",
    },
    {
      id: "laws",
      title: "Open Law",
      description: "Review, comment on, and track the progress of legislation.",
      icon: "⚖️",
      color: "amber",
      path: "/projects/governance/open-law",
    },
    {
      id: "services",
      title: "Open Service",
      description:
        "Rate service providers, suggest improvements, and monitor contracts.",
      icon: "🛠️",
      color: "green",
      path: "/projects/governance/open-service",
    },
    {
      id: "voting",
      title: "Open Vote",
      description:
        "Vote directly on issues that matter and see results in real-time.",
      icon: "🗳️",
      color: "purple",
      path: "/projects/governance/open-vote",
    },
    {
      id: "citizen",
      title: "My Citizen Profile",
      description:
        "View and manage your citizen profile, tax contributions, and government benefits.",
      icon: "👤",
      color: "blue",
      path: "/projects/governance/citizen",
    },
    {
      id: "employees",
      title: "Employee Profiles",
      description:
        "Explore government employees, their roles, and transparency scores.",
      icon: "👥",
      color: "green",
      path: "/projects/governance/employees",
    },
    {
      id: "agencies",
      title: "Agency Directory",
      description:
        "View government agencies, their budgets, and transparency metrics.",
      icon: "🏛️",
      color: "amber",
      path: "/projects/governance/agencies",
    },
  ];

  // Tab definitions
  const tabs = [
    { id: "overview", label: "Recent Activity" },
    { id: "transactions", label: "Open Pay" },
    { id: "tax-flow", label: "Tax Flow" },
    { id: "action-center", label: "Action Center" },
    { id: "laws", label: "Open Law" },
    { id: "services", label: "Open Service" },
    { id: "voting", label: "Open Vote" },
  ];

  // Component previews
  const openLawPreview = {
    icon: "⚖️",
    title: "Open Law Platform",
    description:
      "Track legislation, comment on proposals, and see the impact of laws in your community and on your taxes.",
    ctaText: "Go to Open Law",
    path: "/projects/governance/open-law",
    color: "amber",
  };

  const openServePreview = {
    icon: "🛠️",
    title: "Public Service Marketplace",
    description:
      "Rate service providers, suggest improvements, and ensure your tax dollars fund quality public services.",
    ctaText: "Explore Services",
    path: "/projects/governance/open-service",
    color: "green",
  };

  const demosPreview = {
    icon: "🗳️",
    title: "Open Vote Platform",
    description:
      "Vote directly on issues that matter in your community and see the results and implementation in real-time.",
    ctaText: "Participate Now",
    path: "/projects/governance/open-vote",
    color: "purple",
  };

  // High-value citizen information
  const citizenData = {
    name: "Alex Morgan",
    id: "CIT-10045876",
    district: "North Central",
    taxContribution: "$15,500",
    lastActivity: "Voted on School Budget Proposal (3 days ago)",
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      {/* Portal Header */}
      <header className="bg-white border-b border-gray-200 mb-6">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">
                Citizen Portal
              </h1>
              <p className="mt-1 text-gray-500">
                Your personal hub for transparent governance and civic
                participation
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Customize Portal
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Portal Content */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6">
        {/* Citizen Welcome Banner */}
        <div className="bg-white shadow-md rounded-lg mb-6 overflow-hidden">
          <div className="px-4 py-5 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold mr-4">
                    AM
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl">
                      Welcome, {citizenData.name}
                    </h2>
                    <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap">
                      <div className="mt-2 flex items-center text-sm text-blue-100">
                        <span>Citizen ID: {citizenData.id}</span>
                        <span className="mx-2 text-blue-300">•</span>
                        <span>District: {citizenData.district}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <Link
                  href="/projects/governance/citizen"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  View My Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Tax Contribution
                </div>
                <div className="mt-1 text-xl font-semibold text-gray-900">
                  {citizenData.taxContribution}
                </div>
                <div className="mt-1">
                  <Link
                    href="/projects/governance/citizen#tax"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    View Tax History
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Agency Distribution
                </div>
                <div className="mt-1 text-sm text-gray-900">5 Agencies</div>
                <div className="mt-1">
                  <Link
                    href="/projects/governance/citizen#advisory"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Set Advisory Preferences
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Active Benefits
                </div>
                <div className="mt-1 text-sm text-gray-900">3 Benefits</div>
                <div className="mt-1">
                  <Link
                    href="/projects/governance/citizen#benefits"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    View All Benefits
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Last Activity
                </div>
                <div className="mt-1 text-sm text-gray-900">
                  {citizenData.lastActivity}
                </div>
                <div className="mt-1">
                  <Link
                    href="/projects/governance/portal"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    View Activity
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portal Metrics */}
        <MetricsGrid metrics={metrics} />

        {/* Component Navigation Cards */}
        <ComponentCards cards={componentCards} />

        {/* Portal Tabs with Filter */}
        <TabsContainer
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          showFilter={activeTab === "transactions" || activeTab === "tax-flow"}
          filter={filter}
          onFilterChange={setFilter}
        >
          {/* Overview Tab - Activity Feed */}
          {activeTab === "overview" && (
            <ActivityFeed activities={recentActivity} />
          )}

          {/* Transactions Tab */}
          {activeTab === "transactions" && (
            <DashboardTransactionDemo filter={filter} />
          )}

          {/* Tax Flow Tab */}
          {activeTab === "tax-flow" && (
            <TaxFlow
              taxAllocation={taxAllocation}
              taxFundedProjects={taxFundedProjects}
              filter={filter}
              onFilterChange={setFilter}
            />
          )}

          {/* Action Center Tab */}
          {activeTab === "action-center" && (
            <ActionCenter pendingActions={pendingActions} />
          )}

          {/* Open Laws Tab */}
          {activeTab === "laws" && <ComponentPreview {...openLawPreview} />}

          {/* Open Serve Tab */}
          {activeTab === "services" && (
            <ComponentPreview {...openServePreview} />
          )}

          {/* Demos Tab */}
          {activeTab === "voting" && <ComponentPreview {...demosPreview} />}
        </TabsContainer>
      </main>

      {/* Portal Footer */}
      <footer className="max-w-screen-xl mx-auto px-4 sm:px-6 mt-12">
        <div className="border-t border-gray-200 py-8">
          <p className="text-sm text-center text-gray-500">
            Solon Governance Platform - Empowering citizens through tax
            transparency and participation
          </p>
        </div>
      </footer>
    </div>
  );
}
