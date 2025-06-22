"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EnhancedTransaction } from "./TransactionWithTraceability";

export interface AgencyTeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  imageUrl?: string;
  bio: string;
  yearsOfService: number;
  salary: number;
  transparency: number; // 0-100 score
  responsibilities: string[];
  contact: {
    email?: string;
    phone?: string;
    office?: string;
  };
}

export interface AgencyRegulation {
  id: string;
  title: string;
  description: string;
  dateEnacted: string;
  lastUpdated: string;
  status: "active" | "proposed" | "revoked";
  purpose: string;
  kpis: Array<{
    metric: string;
    target: string;
    current: string;
    status: "achieved" | "on-track" | "at-risk" | "failed";
  }>;
  enablingLawId: string;
  enablingLawName: string;
}

export interface AgencyData {
  id: string;
  name: string;
  description: string;
  transparencyScore: number;
  establishment: string;
  budget: {
    total: number;
    allocated: number;
    spent: number;
    fiscalYear: string;
  };
  metrics: Array<{
    name: string;
    value: string;
    change: string;
    trend: "up" | "down" | "neutral";
  }>;
  transactions: EnhancedTransaction[];
  regulations: AgencyRegulation[];
  team: AgencyTeamMember[];
  citizenImpact: {
    servicesProvided: number;
    citizensServed: number;
    satisfactionScore: number;
    avgResponseTime: string;
  };
}

interface AgencyProfileProps {
  agency: AgencyData;
}

const AgencyProfile: React.FC<AgencyProfileProps> = ({ agency }) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Agency Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:truncate">
                {agency.name}
              </h1>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span>Established: {agency.establishment}</span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span>Budget: {formatCurrency(agency.budget.total)}/yr</span>
                </div>
                <div className="mt-2 flex items-center">
                  <div
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      agency.transparencyScore >= 80
                        ? "bg-green-100 text-green-800"
                        : agency.transparencyScore >= 60
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    Transparency Score: {agency.transparencyScore}/100
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
              <span className="ml-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Request Information
                </button>
              </span>
              <span className="ml-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Rate Services
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8">
            {["overview", "transactions", "regulations", "team"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Agency Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Agency Overview
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {agency.description}
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Budget Allocation
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="mb-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            Allocated: {formatCurrency(agency.budget.allocated)}
                          </span>
                          <span>
                            Spent: {formatCurrency(agency.budget.spent)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{
                              width: `${(agency.budget.spent / agency.budget.allocated) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Fiscal Year: {agency.budget.fiscalYear}
                      </p>
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Services Impact
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="block text-2xl font-bold text-blue-600">
                            {agency.citizenImpact.servicesProvided.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">
                            Services Provided
                          </span>
                        </div>
                        <div>
                          <span className="block text-2xl font-bold text-blue-600">
                            {agency.citizenImpact.citizensServed.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">
                            Citizens Served
                          </span>
                        </div>
                        <div>
                          <span className="block text-2xl font-bold text-blue-600">
                            {agency.citizenImpact.satisfactionScore}%
                          </span>
                          <span className="text-xs text-gray-500">
                            Satisfaction Score
                          </span>
                        </div>
                        <div>
                          <span className="block text-2xl font-bold text-blue-600">
                            {agency.citizenImpact.avgResponseTime}
                          </span>
                          <span className="text-xs text-gray-500">
                            Average Response Time
                          </span>
                        </div>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Agency Metrics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {agency.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {metric.name}
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      {metric.value}
                    </dd>
                    <dd
                      className={`mt-1 text-sm ${
                        metric.trend === "up"
                          ? "text-green-600"
                          : metric.trend === "down"
                            ? "text-red-600"
                            : "text-gray-500"
                      }`}
                    >
                      {metric.change}
                    </dd>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                {agency.transactions.map((transaction) => (
                  <li key={transaction.id}>
                    <Link
                      href={{
                        pathname: "/projects/governance/open-pay/[id]",
                        query: { id: transaction.id },
                      }}
                      className="block hover:bg-gray-50"
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-blue-600 truncate">
                              {transaction.description}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  transaction.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : transaction.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {transaction.status}
                              </p>
                            </div>
                          </div>
                          <div className="text-sm text-gray-900 font-medium">
                            {formatCurrency(transaction.amount)}
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              To: {transaction.recipient}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>{transaction.date}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Regulations Tab */}
        {activeTab === "regulations" && (
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                {agency.regulations.map((regulation) => (
                  <li key={regulation.id}>
                    <div className="px-4 py-5 sm:px-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {regulation.title}
                        </h3>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              regulation.status === "active"
                                ? "bg-green-100 text-green-800"
                                : regulation.status === "proposed"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {regulation.status.charAt(0).toUpperCase() +
                              regulation.status.slice(1)}
                          </p>
                        </div>
                      </div>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        {regulation.description}
                      </p>

                      <div className="mt-3 sm:mt-4">
                        <div className="sm:flex sm:items-baseline sm:justify-between">
                          <p className="text-sm text-gray-500">
                            Enacted: {regulation.dateEnacted} | Last Updated:{" "}
                            {regulation.lastUpdated}
                          </p>
                          <p className="mt-2 text-sm text-gray-500 sm:mt-0">
                            Enabling Law:{" "}
                            <Link
                              href={{
                                pathname: "/projects/governance/open-law/[id]",
                                query: { id: regulation.enablingLawId },
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {regulation.enablingLawName}
                            </Link>
                          </p>
                        </div>
                      </div>

                      {/* KPIs */}
                      <div className="mt-4 border-t border-gray-200 pt-4">
                        <h4 className="text-sm font-medium text-gray-500">
                          Performance Metrics:
                        </h4>
                        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {regulation.kpis.map((kpi, idx) => (
                            <div key={idx} className="relative">
                              <div className="flex items-center">
                                <div
                                  className={`flex-shrink-0 h-3 w-3 rounded-full ${
                                    kpi.status === "achieved"
                                      ? "bg-green-500"
                                      : kpi.status === "on-track"
                                        ? "bg-blue-500"
                                        : kpi.status === "at-risk"
                                          ? "bg-yellow-500"
                                          : "bg-red-500"
                                  }`}
                                />
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">
                                    {kpi.metric}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {kpi.current} / {kpi.target}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === "team" && (
          <div>
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {agency.team.map((member) => (
                <li
                  key={member.id}
                  className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                >
                  <div className="flex-1 flex flex-col p-8">
                    <div className="w-24 h-24 flex-shrink-0 mx-auto rounded-full bg-gray-200 overflow-hidden">
                      {member.imageUrl ? (
                        <img
                          className="w-24 h-24 object-cover"
                          src={member.imageUrl}
                          alt={member.name}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-500 text-2xl">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className="mt-6 text-gray-900 text-sm font-medium">
                      {member.name}
                    </h3>
                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                      <dt className="sr-only">Position</dt>
                      <dd className="text-gray-500 text-sm">
                        {member.position}
                      </dd>
                      <dt className="sr-only">Department</dt>
                      <dd className="text-gray-500 text-xs">
                        {member.department}
                      </dd>
                      <dd className="mt-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            member.transparency >= 80
                              ? "bg-green-100 text-green-800"
                              : member.transparency >= 60
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          T-Score: {member.transparency}/100
                        </span>
                      </dd>
                    </dl>
                  </div>
                  <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                      <div className="w-0 flex-1 flex">
                        <Link
                          href={{
                            pathname: "/projects/governance/employees/[id]",
                            query: { id: member.id },
                          }}
                          className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                        >
                          <span className="ml-3">View Profile</span>
                        </Link>
                      </div>
                      <div className="-ml-px w-0 flex-1 flex">
                        {member.contact.email && (
                          <a
                            href={`mailto:${member.contact.email}`}
                            className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                          >
                            <span className="ml-3">Contact</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgencyProfile;
