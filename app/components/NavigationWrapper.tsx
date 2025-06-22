"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import SolonNavigation from "@/app/projects/governance/components/Navigation";

export default function NavigationWrapper() {
  const pathname = usePathname();
  const isSolonPage = pathname?.startsWith("/projects/governance");

  if (isSolonPage) {
    return <SolonNavigation />;
  }

  return <Header />;
}
