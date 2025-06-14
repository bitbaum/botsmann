# Lex Solutions Page (v2) Product Spec

Audience: Codex team (frontend + backend). Goal: ship a new, production-ready page that clearly communicates Lex offerings for Individuals & Law Firms, while surfacing our tech edge and privacy posture.

## Objectives

| # | Goal | Success Metric |
| - | ---- | -------------- |
| 1 | Clarify problem → audience → solution flow | - Visitors spend ≥ 45 s on the page (Mixpanel) - Bounce rate ≤ 35 % |
| 2 | Present two tailored offerings (Private Node & Law-Firm Stack) | 100 % of visitors scroll to “Choose your setup” section |
| 3 | Showcase tech stack & privacy credibly | ≥ 70 % of visitors click “Learn more about architecture” CTA |
| 4 | Keep page fully responsive & a11y AA | Lighthouse perf ≥ 90, a11y ≥ 95 |

## Information Architecture

```
/lex
 ├─ Hero (value prop)
 ├─ The Problem We’re Solving
 ├─ Solutions Overview (toggle tabs: Individuals | Law Firms)
 │    ├─ Value Highlights
 │    ├─ How It Works (3-step cards)
 │    ├─ Technology Snapshot
 │    └─ Pricing CTA
 ├─ Deep Tech Section (expandable)
 ├─ Comparison Table (Individual Node vs Law-Firm Stack)
 ├─ Call-to-Action Strip
 └─ Footer
```

## Copy Wireframes

### Hero

- **h1:** Your AI Legal Partner—On Your Terms
- **p:** Lex turns complex law into clear answers, privately and instantly.
- **CTA:** Get Started | Watch Demo

### Problem Statement

Legal advice is slow, expensive, and data-hungry. People and firms need counsel that keeps secrets secret and scales on demand.

### Solutions Tabs

#### Individuals – Private Node

- What it is: A personal LLM-powered lawyer that runs on hardware you own (e.g., NUC, Mac, or Raspberry Pi 5).
- Why you’ll love it
  - 100 % data ownership—no trace leaves your device.
  - Works offline after initial setup (good for travel / weak internet).
  - Pricing: one-time hardware + yearly updates subscription.
- Tech under the hood
  - Llama-3-8B-Lex fine-tune (quantized 4-bit).
  - RAG pipeline w/ local Qdrant vector DB.
  - Docker Compose + optional GPU pass-through.
  - Automated OTA model updates via TUF-signed delta bundles.
- Setup in 3 steps
  1. Flash our image to SD/SSD.
  2. Run `lex-bootstrap.sh` → verifies signature, installs containers.
  3. Open `https://lex.local` in browser (mDNS) → onboarding wizard.

#### Law Firms – Managed or Hybrid

- What it is: Multi-tenant Lex instance with team management, citational output, and audit logs.
- Why you’ll love it
  - Handles up to 5 M docs, -99 % retrieval latency (<300 ms).
  - Granular role-based access + client matter isolation.
  - SOC-2 Type II & ISO 27001 ready; EU data region option.
- Deployment options

| Mode | Ideal for | Infra notes |
| --- | --- | --- |
| SaaS (Azure confidential VMs) | Small/medium firms | Enclave-encrypted RAM, regional failover |
| Hybrid (self-host vector DB) | Mid-size, strict DPAs | Our control plane + your data plane |
| On-Prem | Big-law / gov | Helm chart for air-gapped K8s |

- Tech stack
  - Llama-3-70B-Lex in vLLM/Flash-Attention 2.
  - Milvus 2.4 with scale-to-zero shard autoscaler.
  - Trace-based billing via OpenTelemetry + Tempo.
  - Frontend: Next.js 14 App Router + Tailwind CSS + radix-ui.

## Design & UX Guidelines

1. Components: Use existing DS primitives (`<Card>`, `<Tab>`, `<Accordion>`, `<KPI>`).
2. Animations: micro-interactions only (200 ms ease-in-out via Framer Motion).
3. Breakpoints: xs <480 ⇢ md <768 ⇢ lg <1280 ⇢ xl.
4. Accessibility: All interactive elements keyboard-navigable; focus ring visible.
5. Images/Diagrams: Implement as responsive SVGs; keep text selectable for copy.

## Technical Implementation Notes

### Frontend

```ts
// pages/lex/page.tsx
export default async function LexPage() {
  const { section } = unstable_getServerProps(); // auto-scroll via hash
  return (
    <main>
      <Hero />
      <ProblemBlock />
      <SolutionsTabs default={section ?? 'individuals'} />
      <TechAccordion />
      <Comparison />
      <CTA />
    </main>
  );
}
```

Use React Server Components for heavy diagrams to reduce bundle size.

### Data

- Copy & tech specs live in `/content/lex/*.mdx`; MDX front-matter drives UI.
- Price & limits pulled via `usePricing()` hook (stripe price API cached 15 m).

### Performance

- Lazy-import Lottie hero animation (50 kB) only above lg breakpoint.
- Use next/legacy-image with AVIF first, then WebP fallback.

### SEO

```json
{
 "title": "Lex · Private AI Lawyer for You and Your Firm | Botsmann",
 "description": "Run Lex on your own hardware or in our encrypted cloud. Instant legal answers, zero data leaks."
}
```

Include structured data (Product, FAQPage) for each solution.

## Acceptance Criteria

- Page renders < 1 s on 3G simulated (Lighthouse).
- Tab switching does not trigger full reload.
- Comparison table accessible via screen reader.
- All outbound links have `rel="noopener"` + tracking id.
- Copy approved by Legal & Marketing.
- Unit snapshot tests for SolutionsTabs.
- E2E Cypress test: select “Law Firms” → click “Book demo” → form loads.

## Next Steps & Owner

| Task | Owner | ETA |
| --- | --- | --- |
| High-fidelity Figma handoff | Design (Mia) | Jun 18 |
| MDX content draft | Content (Lea) | Jun 19 |
| Frontend build | Codex | Jun 24 |
| QA & accessibility pass | QA Eng | Jun 26 |
| Prod deploy | DevOps | Jun 27 |

**TL;DR for Codex:** Implement `/lex` per IA above, reuse DS components, ensure blazing performance and accessibility, surface two offerings (Private Node & Law-Firm Stack) with clear copy and tech specs, and make everything liquid-responsive. Reach out to the CTO for architectural diagram SVGs if needed.

