import React from "react";
import Header from "@/components/Header";

/**
 * Layout for the Product Manager Bot pages.
 * Includes the main site header to maintain navigation consistency.
 */
export default function ProductManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
