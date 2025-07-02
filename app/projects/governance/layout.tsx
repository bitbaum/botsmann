'use client';

import React from 'react';

export default function GovernanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="min-h-screen">{children}</section>;
}
