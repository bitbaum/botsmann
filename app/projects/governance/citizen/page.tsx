"use client";

import React from "react";
import Link from "next/link";
import CitizenProfile from "../components/CitizenProfile";
import { sampleCitizen, sampleAgencies } from "../data/sampleData";

export default function CitizenProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <nav className="mb-6 flex items-center">
          <Link
            href="/projects/governance/portal"
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
            Portal
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-sm text-gray-900">My Profile</span>
        </nav>

        <CitizenProfile citizen={sampleCitizen} agencies={sampleAgencies} />
      </div>
    </div>
  );
}
