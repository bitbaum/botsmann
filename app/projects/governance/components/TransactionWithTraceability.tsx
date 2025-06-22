"use client";

import React, { useState } from "react";
import Link from "next/link";

// Enhanced transaction type with law traceability and agency information
export interface EnhancedTransaction {
  id: string;
  date: string;
  department: string;
  departmentId: string;
  recipient: string;
  description: string;
  amount: number;
  status: string;
  metrics: {
    costPerUnit: string;
    timeline: string;
    qualityScore: number;
    contractCompliance: number;
  };
  transparencyScore: number;
  socialData: {
    publicComments: number;
    likes: number;
    concerns: number;
    shares: number;
  };
  enablingLaws: Array<{
    id: string;
    name: string;
  }>;
  documents: Array<{
    id: string;
    name: string;
    url: string;
  }>;
  timeline: Array<{
    date: string;
    event: string;
    description: string;
  }>;
}

interface TransactionWithTraceabilityProps {
  transaction: EnhancedTransaction;
}

/**
 * Displays a transaction with full traceability to laws and agency information
 */
export const TransactionWithTraceability: React.FC<
  TransactionWithTraceabilityProps
> = ({ transaction }) => {
  const [activeTab, setActiveTab] = useState<
    "details" | "laws" | "documents" | "timeline"
  >("details");
  const [expanded, setExpanded] = useState(false);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      {/* Transaction Header */}
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              {transaction.description}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Transaction ID: {transaction.id} | Date: {transaction.date}
            </p>
          </div>
          <div className="mt-3 md:mt-0 flex items-center">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                transaction.status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : transaction.status === "In Progress"
                    ? "bg-blue-100 text-blue-800"
                    : transaction.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
              }`}
            >
              {transaction.status}
            </span>
            <span className="ml-3 text-lg font-bold text-gray-900">
              {formatCurrency(transaction.amount)}
            </span>
          </div>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="px-4 py-4 sm:px-6 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500">
              Department
            </span>
            <Link
              href={{
                pathname: "/projects/governance/agencies/[id]",
                query: { id: transaction.departmentId },
              }}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              {transaction.department}
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500">Recipient</span>
            <span className="text-sm font-medium text-gray-900">
              {transaction.recipient}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500">
              Transparency Score
            </span>
            <div className="flex items-center mt-1">
              <div
                className={`h-2 w-full rounded-full ${
                  transaction.transparencyScore >= 90
                    ? "bg-green-500"
                    : transaction.transparencyScore >= 70
                      ? "bg-blue-500"
                      : transaction.transparencyScore >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                }`}
              >
                <div
                  className="h-2 rounded-full bg-green-200"
                  style={{ width: `${transaction.transparencyScore}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">
                {transaction.transparencyScore}/100
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500">
              Social Engagement
            </span>
            <div className="flex items-center space-x-3 mt-1">
              <button className="flex items-center text-sm text-gray-500 hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{transaction.socialData.likes}</span>
              </button>
              <button className="flex items-center text-sm text-gray-500 hover:text-yellow-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>{transaction.socialData.concerns}</span>
              </button>
              <button className="flex items-center text-sm text-gray-500 hover:text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <span>{transaction.socialData.publicComments}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex">
          <button
            onClick={() => setActiveTab("details")}
            className={`${
              activeTab === "details"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab("laws")}
            className={`${
              activeTab === "laws"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm`}
          >
            Enabling Laws
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`${
              activeTab === "documents"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm`}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`${
              activeTab === "timeline"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm`}
          >
            Timeline
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-5 sm:p-6">
        {/* Details Tab */}
        {activeTab === "details" && (
          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Transaction Metrics
                </h3>
                <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Cost Per Unit
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {transaction.metrics.costPerUnit}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Timeline Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {transaction.metrics.timeline}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Quality Score
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {transaction.metrics.qualityScore}/100
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Contract Compliance
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {transaction.metrics.contractCompliance}%
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Public Engagement
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="comment" className="sr-only">
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows={3}
                      className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Add your comment about this transaction..."
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Submit Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enabling Laws Tab */}
        {activeTab === "laws" && (
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Enabling Legislation
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              These laws authorized and governed the execution of this
              transaction.
            </p>

            <ul className="mt-4 divide-y divide-gray-200">
              {transaction.enablingLaws.map((law) => (
                <li key={law.id} className="py-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-sm font-medium">
                        <Link
                          href={{
                            pathname: "/projects/governance/open-law/[id]",
                            query: { id: law.id },
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {law.name}
                        </Link>
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">ID: {law.id}</p>
                    </div>
                    <div>
                      <Link
                        href={{
                          pathname: "/projects/governance/open-law/[id]",
                          query: { id: law.id },
                        }}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        View Law Details
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Supporting Documentation
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Complete documentation for transparency and compliance
              verification.
            </p>

            <ul className="mt-4 divide-y divide-gray-200">
              {transaction.documents.map((doc) => (
                <li key={doc.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {doc.name}
                      </span>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      View Document
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === "timeline" && (
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Transaction Timeline
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Complete history of this transaction from approval to completion.
            </p>

            <div className="flow-root mt-6">
              <ul className="-mb-8">
                {transaction.timeline.map((item, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index !== transaction.timeline.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        ></span>
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              index === transaction.timeline.length - 1
                                ? "bg-green-500"
                                : "bg-blue-500"
                            }`}
                          >
                            <svg
                              className="h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {item.event}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.description}
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time dateTime={item.date}>{item.date}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Footer */}
      <div className="bg-gray-50 px-4 py-4 sm:px-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share
            </button>
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Report Issue
            </button>
          </div>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span>{expanded ? "Show Less" : "Show More"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 transform ${expanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionWithTraceability;
