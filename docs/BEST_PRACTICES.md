# Development Best Practices

This document defines the core principles for developing Botsmann. All contributors (human and AI) must follow these guidelines.

---

## Core Principles

### 1. DRY (Don't Repeat Yourself)

**Definition:** Every piece of knowledge must have a single, unambiguous representation in the system.

**In Practice:**

- Extract repeated logic into reusable functions in `lib/`
- Create shared components for repeated UI patterns
- Use TypeScript generics for type reuse
- Centralize configuration in `data/` or environment variables

**Bad:**

```typescript
// Repeated in multiple files
const formatDate = (date: Date) => date.toLocaleDateString('de-CH');
```

**Good:**

```typescript
// lib/formatters.ts
export const formatDate = (date: Date) => date.toLocaleDateString('de-CH');

// Usage everywhere
import { formatDate } from '@/lib/formatters';
```

---

### 2. SSOT (Single Source of Truth)

**Definition:** Any data element should be stored exactly once, with all other usages referencing that single source.

**In Practice:**

- Bot configurations live in `data/bots.ts` only
- Type definitions live in `types/` only
- Environment variables are the SSOT for secrets
- API responses define the data contract

**Bad:**

```typescript
// Hardcoded in component
const bots = [
  { name: 'Legal Expert', slug: 'legal-expert' },
  // ...duplicated elsewhere
];
```

**Good:**

```typescript
// data/bots.ts (SSOT)
export const BOTS = [
  { name: 'Legal Expert', slug: 'legal-expert', ... }
] as const;

// Used everywhere via import
import { BOTS } from '@/data/bots';
```

---

### 3. SoC (Separation of Concerns)

**Definition:** Each module should have one responsibility and one reason to change.

**In Practice:**

| Layer      | Responsibility   | Location      |
| ---------- | ---------------- | ------------- |
| Pages      | Routing, layout  | `app/`        |
| Components | UI rendering     | `components/` |
| Hooks      | State logic      | `lib/hooks/`  |
| API        | Route helpers    | `lib/api/`    |
| Utilities  | Pure functions   | `lib/`        |
| Types      | Type definitions | `types/`      |

**Bad:**

```typescript
// Component doing too much
export function BotPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/bots')
      .then(r => r.json())
      .then(setData);
  }, []);

  const formatPrice = (p) => `CHF ${p.toFixed(2)}`;

  return <div>...</div>;
}
```

**Good:**

```typescript
// Separated concerns
// lib/services/bots.ts
export const fetchBots = () => fetch('/api/bots').then(r => r.json());

// lib/formatters.ts
export const formatPrice = (p: number) => `CHF ${p.toFixed(2)}`;

// components/BotPage.tsx
import { fetchBots } from '@/lib/services/bots';
import { formatPrice } from '@/lib/formatters';

export function BotPage() {
  const { data } = useSWR('bots', fetchBots);
  return <div>...</div>;
}
```

---

### 4. Progressive Disclosure

**Definition:** Show only what's necessary at each level; reveal complexity gradually.

**In Practice:**

- README.md: Quick start only
- AGENTS.md: Essential dev info
- docs/: Deep dives by topic
- Code comments: Only for non-obvious logic

**Documentation Hierarchy:**

```
README.md           → "What is this? How do I run it?"
AGENTS.md           → "How do I develop on this?"
docs/COMMANDS.md    → "What commands are available?"
docs/BEST_PRACTICES.md → "What principles do we follow?"
docs/SHARED_CONTEXT.md → "What's the architecture?"
```

---

### 5. YAGNI (You Aren't Gonna Need It)

**Definition:** Don't add functionality until it's necessary.

**In Practice:**

- Don't create abstractions for hypothetical futures
- Don't add configuration options "just in case"
- Don't write code for features not yet requested
- Remove dead code immediately

**Bad:**

```typescript
// Over-engineered for imaginary requirements
interface BotConfig {
  name: string;
  enabledFeatures: string[];
  experimentalMode?: boolean;
  futureFeatureFlags?: Record<string, boolean>;
  legacyCompatMode?: boolean; // "might need this"
}
```

**Good:**

```typescript
// Only what's actually needed
interface BotConfig {
  name: string;
  slug: string;
  description: string;
}
```

---

### 6. KISS (Keep It Simple, Stupid)

**Definition:** Simplicity should be a key goal. Avoid unnecessary complexity.

**In Practice:**

- Prefer readable code over clever code
- Use standard patterns over custom solutions
- Choose boring technology when possible
- Write code that junior developers can understand

**Bad:**

```typescript
// Clever but unreadable
const x = arr.reduce((a, b) => ({ ...a, [b.k]: b.v }), {});
```

**Good:**

```typescript
// Clear and maintainable
const result: Record<string, unknown> = {};
for (const item of arr) {
  result[item.key] = item.value;
}
```

---

## Code Quality Checklist

Before submitting any code:

- [ ] **DRY**: Is this logic duplicated anywhere else?
- [ ] **SSOT**: Is this data defined in one place only?
- [ ] **SoC**: Does this module have a single responsibility?
- [ ] **YAGNI**: Am I adding features not yet needed?
- [ ] **KISS**: Can a junior developer understand this?
- [ ] **Types**: Are all types explicit (no `any`)?
- [ ] **Validation**: Are inputs validated with Zod?
- [ ] **Errors**: Are errors handled gracefully?

---

## Anti-Patterns to Avoid

### AI Slop Prevention

When using AI assistance, watch for:

1. **Over-documentation**: Don't add comments explaining obvious code
2. **Premature abstraction**: Don't create factories, builders, or managers for simple use cases
3. **Feature creep**: Don't let AI add "nice to have" features
4. **Type gymnastics**: Don't accept overly complex generic types
5. **Dead code**: Don't keep commented-out code "for reference"

### Common Mistakes

| Mistake           | Fix                       |
| ----------------- | ------------------------- |
| Hardcoded strings | Use constants in `data/`  |
| `any` types       | Define proper interfaces  |
| `console.log`     | Use proper error handling |
| `.then()` chains  | Use `async/await`         |
| Inline styles     | Use Tailwind classes      |
| Default exports   | Use named exports         |

---

## References

- [DRY Principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
- [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)
- [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)
- [KISS](https://en.wikipedia.org/wiki/KISS_principle)

---

**Last Updated:** 2026-01-07
