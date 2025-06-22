"use client";

import React from "react";
import Link from "next/link";

interface NextSectionProps {
  nextPage: string;
  title: string;
  description: string;
}

export function NextSection({
  nextPage,
  title,
  description,
}: NextSectionProps) {
  return (
    <div className="border-t mt-16 pt-8">
      <h2 className="mb-4 text-2xl font-semibold">Continue Your Journey</h2>
      <Link href={{ pathname: nextPage }}>
        <div className="rounded-lg p-6 hover:bg-gray-50 transition-colors duration-200">
          <h3 className="mb-2 text-xl font-medium text-openai-green">
            {title}
          </h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </Link>
    </div>
  );
}
