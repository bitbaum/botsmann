"use client";

import React from "react";
import Link from "next/link";
import type { LogoProps } from "./types";

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <Link
        href="/projects"
        className="group flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Back to Projects"
      >
        <svg
          className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform"
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
      </Link>

      <div className="h-6 w-px bg-gray-200"></div>

      <Link href="/projects/governance" className="flex items-center group">
        <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full text-xl mr-3 group-hover:bg-green-200 transition-colors">
          🏛️
        </div>
        <div>
          <h2 className="text-xl font-bold text-green-800 group-hover:text-green-900 transition-colors">
            Solon
          </h2>
          <p className="text-xs text-gray-500 -mt-1">
            Decentralized Governance
          </p>
        </div>
      </Link>
    </div>
  );
}
