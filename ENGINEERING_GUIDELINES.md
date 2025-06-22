# 🧠 ENGINEERING GUIDELINES – BOTS'MANN CODEBASE

> Last Updated: 2025-06-22  
> Maintainer: Codex (AI) under supervision of Georg (CTO)

---

## 🔥 Philosophy

We build sovereign AI systems, but our **initial priority is clean, modular, and maintainable frontend**.  
Our goal: **no spaghetti, no duplication, no build errors, no excuses.**

Everything we build must be:

- 🔁 **DRY** – Don’t Repeat Yourself
- 🧼 **Clean** – No tech debt, no console.logs, no temp files
- 🧩 **Modular** – Code should be isolated, composable, testable
- 🪢 **Maintainable** – Easy for future developers to pick up
- 🚀 **Deployable** – CI/CD must work flawlessly every time
- 🎓 **Educational** – The code teaches what Botsmann is and how it works

---

## 📁 Folder Structure (for Next.js App Router)

```
/app                # Next.js App Router pages and layout
/features/          # Feature-specific pages and logic
/components/        # Reusable UI components (presentation only)
/shared/            # Hooks, utils, constants shared across app
/styles/            # Global + component-level styles
/public/            # Static files and assets
/tests/             # Unit/component tests (Vitest)
.env, .env.example  # Environment configuration
```

---

## ✍️ Code Style & Naming

### ✅ Naming Rules

| Type         | Convention  | Example              |
|--------------|-------------|----------------------|
| Components   | PascalCase  | `UserCard.tsx`       |
| Variables    | camelCase   | `isUserActive`       |
| Constants    | UPPER_SNAKE | `MAX_ATTEMPTS`       |
| Routes       | kebab-case  | `/bots`, `/solutions`|

### ✅ Format & Linting

- Use [**Prettier**](https://prettier.io/)
- Use [**ESLint**](https://eslint.org/) with Next.js config
- Use `husky` + `lint-staged` for pre-commit checks

---

## 🚫 What We Avoid (for Now)

Until otherwise decided, **do not** implement or introduce:

- 🧠 LLMs (OpenAI, LM Studio, Ollama, etc.)
- 🗄️ Databases (PostgreSQL, SQLite, Supabase, etc.)
- ❌ Server-heavy logic or backend APIs

Keep everything **frontend-focused**. Marketing, UX, explanation, clarity.

---

## 💡 Frontend Focus

We use:

| Area              | Tool                  | Open Source | Free |
|------------------|-----------------------|-------------|------|
| Framework         | Next.js 14+ (App Router) | ✅        | ✅   |
| Styling           | Tailwind CSS          | ✅          | ✅   |
| Animation         | Framer Motion         | ✅          | ✅   |
| Icons             | Heroicons, Lucide     | ✅          | ✅   |
| Forms             | React Hook Form       | ✅          | ✅   |
| State Mgmt (opt.) | Zustand               | ✅          | ✅   |

Optional but allowed if truly needed.

---

## 🧪 Testing (TDD Where It Makes Sense)

- Use [Vitest](https://vitest.dev/) for unit/component tests
- Use [React Testing Library](https://testing-library.com/)
- If a component has business logic, it **must** have a test

---

## 🚀 CI/CD & Vercel

### 🛠️ Vercel Build Setup

Codex must ensure:
- ✅ Every build works locally before push
- ✅ Vercel builds are consistent and fast
- ✅ All pages build in production mode (`pnpm build`)
- ✅ `.env.example` contains all required keys

### 🧪 GitHub Actions (optional but preferred)

Add GitHub Actions pipeline to:
- Run `pnpm lint`
- Run `pnpm test`
- (Optional) deploy preview

---

## 🔐 Security & Hygiene

- No API keys or tokens in code
- No unused files, logs, or commented-out blocks
- No console logs in production
- Never push directly to `main`

---

## 🧼 Git & Branching Rules

- Use feature branches: `feature/<name>`
- Use conventional commits:
  - `feat: add new bot page`
  - `fix: correct nav hover issue`
  - `refactor: simplify layout logic`

---

## 📦 Package Management

Use `pnpm` for everything:
```bash
pnpm install
pnpm dev
pnpm lint
pnpm test
pnpm format
```

---

✅ Final Summary for Codex
- The project is frontend-first.
- No LLMs or databases now — plan only.
- CI/CD must be frictionless and work every time.
- All code must be modular, clean, maintainable, and DRY.
- Any code violating these standards should be refactored or removed.

---

Let me know if you want me to proceed to the **next task doc for Codex**, which will inspect and refactor the existing codebase using these principles — or if you want any changes in this version first.
