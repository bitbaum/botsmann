"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AgencyProfile from "../../components/AgencyProfile";
import { sampleAgencies } from "../../data/sampleData";

export default function AgencyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const agencyId = params.id;

  const agency = sampleAgencies.find((a) => a.id === agencyId);

  if (!agency) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-24 pb-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Agency Not Found</h1>
          <p className="mt-3 text-xl text-gray-500">
            The agency you are looking for does not exist or has been moved.
          </p>
          <div className="mt-6">
            <Link
              href="/projects/governance/agencies"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View All Agencies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <nav className="mb-6 flex items-center">
          <Link
            href="/projects/governance/agencies"
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            All Agencies
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-sm text-gray-900">{agency.name}</span>
        </nav>

        <AgencyProfile agency={agency} />
      </div>
    </div>
  );
}
