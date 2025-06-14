'use client';
import { useState } from 'react';

export default function TechAccordion() {
  const [open, setOpen] = useState(false);
  return (
    <section className="mx-auto max-w-3xl py-12" id="tech">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full rounded-md bg-gray-100 px-4 py-3">
        <span className="font-medium">Deep Tech Details</span>
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="mt-4 space-y-2 px-4">
          <p>Llama-3 models fine-tuned for law.</p>
          <p>Secure OTA updates signed with TUF.</p>
          <p>Runs on Docker Compose with optional GPU.</p>
        </div>
      )}
    </section>
  );
}
