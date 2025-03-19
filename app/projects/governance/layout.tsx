'use client';

import React from 'react';
import Navigation from './components/Navigation';
import './styles.css';

export default function GovernanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen">
      <Navigation />
      {children}
    </section>
  );
} 