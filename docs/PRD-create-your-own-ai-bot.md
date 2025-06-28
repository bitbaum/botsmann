# PRD: "Create Your Own AI Bot" Flow

## Overview
Flagship feature providing a guided chat interface so users can request a custom AI bot.

## Goal
Make it easy and privacy compliant for users to define and request a bot matching their domain and infrastructure needs.

## User Stories
1. Individuals choose a use case and hosting preference to receive an implementation path.
2. Law firms specify privacy/jurisdiction to get a compliant bot.
3. Non‑technical users follow a simple chat style wizard.

## Chat Flow
1. **Greeting** – short introduction.
2. **Select Bot Type** – Legal, Medical, Financial, Research/Educational, or Custom.
3. **Requirements** – Hosting (Local/Cloud/In‑country), Privacy level, Input types, Output preferences.
4. **Summary** – Auto generate a summary of selections.
5. **Submission** – Collect contact info or deployment details.

## Implementation Phases
### MVP
- Chat UI component
- Decision tree stored in JSON or Supabase
- Store submissions (initially a database table)
- Optional email confirmation

### Phase 2
- Integrate with Codex API to auto‑deploy
- Provide cost estimate & feasibility check
- Deploy preview for public API bots

## Technical Stack
- **Frontend**: Next.js, TailwindCSS, TypeScript
- **Backend**: Supabase
- **Chat Interface**: Pre-built or custom
- **Hosting**: Vercel

## Compliance
- Jurisdiction warnings (e.g., Swiss data residency)
- Flag if privacy cannot be guaranteed when using public APIs

## Deliverables
1. Chat UI with decision flow
2. Configurable backend
3. Summary output and submission form
4. Admin interface to review requests
5. Optional JSON config export per request
