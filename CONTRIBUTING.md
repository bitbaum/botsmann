# Contributing to Botsmann

Thank you for your interest in contributing to Botsmann! This guide will help you get started with contributing to our domain-specific AI bot platform.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Bot Development Guide](#bot-development-guide)
- [Community](#community)

---

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful, constructive, and professional in all interactions.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 20+** and npm
- **Git** for version control
- **Docker** (optional, for full-stack development)
- **MongoDB** (or use Docker)
- A code editor (we recommend **VS Code**)

### Recommended VS Code Extensions

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Docker (if using containers)

---

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/botsmann.git
cd botsmann

# Add upstream remote
git remote add upstream https://github.com/g-but/botsmann.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
# Required variables:
# - MONGODB_URI (e.g., mongodb://localhost:27017/botsmann)
# - EMAIL_USER (your SMTP email)
# - EMAIL_PASS (your SMTP password)
# - NEXT_PUBLIC_API_KEY (generate a random 32-character string)
```

### 4. Start Development Server

**Option A: Standard Development**
```bash
npm run dev
```

**Option B: Docker (Recommended for full stack)**
```bash
docker-compose up
```

Navigate to [http://localhost:3000](http://localhost:3000)

### 5. Verify Setup

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests
npm test
```

---

## Project Structure

```
botsmann/
├── app/                      # Next.js application
│   ├── api/                  # API routes
│   ├── bots/                 # Individual bot applications
│   │   ├── legal-expert/     # Lex (Legal Assistant)
│   │   ├── medical-expert/   # Imhotep (Medical Expert)
│   │   ├── research-assistant/ # Nerd (Research Assistant)
│   │   ├── swiss-german-teacher/ # Heidi (Language Teacher)
│   │   ├── artistic-advisor/ # Artr (Artistic Advisor)
│   │   └── product-manager/  # Trident (Product Manager)
│   ├── about/                # About page
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/               # Shared UI components
│   ├── BotPageHeader.tsx     # Bot-specific headers
│   ├── ConditionalHeader.tsx # Conditional navigation
│   ├── Header.tsx            # Main site header
│   ├── Footer.tsx            # Site footer
│   └── ...
├── data/                     # Static data and configuration
│   ├── bots.ts               # Bot metadata
│   └── menuItems.ts          # Navigation configuration
├── lib/                      # Shared utilities
├── public/                   # Static assets
├── types/                    # TypeScript type definitions
├── docs/                     # Documentation (templates, guides)
├── tests/                    # Test files
├── README.md                 # Main project documentation
├── ARCHITECTURE.md           # System architecture
├── CONTRIBUTING.md           # This file
└── package.json              # Dependencies and scripts
```

---

## How to Contribute

### Types of Contributions

We welcome contributions in the following areas:

1. **Bug Fixes**: Fix issues reported in GitHub Issues
2. **New Features**: Implement planned features from the roadmap
3. **New Bots**: Create domain-specific AI assistants
4. **Documentation**: Improve docs, add examples, fix typos
5. **Performance**: Optimize code, reduce bundle size, improve speed
6. **Tests**: Add or improve test coverage
7. **Design**: Improve UI/UX, accessibility, responsive design

### Finding Work

- Check [GitHub Issues](https://github.com/g-but/botsmann/issues) for open tasks
- Look for issues labeled `good first issue` for beginner-friendly tasks
- Issues labeled `help wanted` are actively seeking contributors
- Propose new features by creating an issue first (discuss before coding)

---

## Development Workflow

### 1. Create a Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

**Branch Naming Convention:**
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation changes
- `refactor/refactor-description` - Code refactoring
- `test/test-description` - Test additions/improvements

### 2. Make Changes

- Write clean, readable code
- Follow the coding standards (see below)
- Add tests for new functionality
- Update documentation as needed
- Commit frequently with clear messages

### 3. Commit Your Changes

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: <type>(<scope>): <description>

git commit -m "feat(legal-expert): add jurisdiction selector"
git commit -m "fix(api): resolve CORS issue in consultation endpoint"
git commit -m "docs(readme): update installation instructions"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, tooling

### 4. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use type inference where possible

```typescript
// Good
interface BotConfig {
  slug: string;
  title: string;
  emoji?: string;
}

const bot: BotConfig = {
  slug: 'legal-expert',
  title: 'Lex'
};

// Avoid
const bot: any = { ... };
```

### React Components

- Use functional components with hooks
- Prefer named exports over default exports for components
- Keep components small and focused (< 200 lines)
- Extract complex logic into custom hooks

```typescript
// Good
export function MyComponent({ prop1, prop2 }: MyComponentProps) {
  const [state, setState] = useState<string>('');
  // ...
}

// Avoid
export default function MyComponent(props: any) { ... }
```

### Styling

- Use Tailwind CSS for styling
- Create custom classes in `styles.css` for reusable patterns
- Follow mobile-first responsive design
- Use semantic color names from theme

```tsx
// Good
<div className="bg-green-500 hover:bg-green-600 rounded-lg p-4">

// Avoid inline styles
<div style={{ backgroundColor: '#10a37f' }}>
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `BotPageHeader.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Styles: `kebab-case.css` (e.g., `bot-styles.css`)
- Test files: `*.test.tsx` or `*.test.ts`

### Code Organization

- Group related files in directories
- Keep business logic separate from UI components
- Use barrel exports (`index.ts`) for cleaner imports

```typescript
// components/bot/index.ts
export { BotCard } from './BotCard';
export { BotList } from './BotList';

// Usage
import { BotCard, BotList } from '@/components/bot';
```

---

## Testing Requirements

### Test Coverage

- All new features must include tests
- Aim for 80%+ code coverage
- Test critical user flows end-to-end
- Test edge cases and error handling

### Running Tests

```bash
# Run all tests
npm test

# Watch mode (recommended during development)
npm run test:watch

# Coverage report
npm run test:coverage
```

### Writing Tests

**Unit Tests (Jest + React Testing Library):**

```typescript
import { render, screen } from '@testing-library/react';
import { BotCard } from './BotCard';

describe('BotCard', () => {
  it('renders bot title', () => {
    render(<BotCard title="Lex" slug="legal-expert" />);
    expect(screen.getByText('Lex')).toBeInTheDocument();
  });
});
```

**API Route Tests:**

```typescript
import { POST } from '@/app/api/consultation/route';

describe('/api/consultation', () => {
  it('validates email format', async () => {
    const request = new Request('http://localhost:3000/api/consultation', {
      method: 'POST',
      body: JSON.stringify({ email: 'invalid-email' })
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
```

---

## Documentation

### Code Documentation

- Add JSDoc comments to all functions and components
- Document complex logic and algorithms
- Include usage examples for utilities

```typescript
/**
 * Formats a date string for display
 *
 * @param date - The date to format (ISO string or Date object)
 * @param locale - The locale for formatting (default: 'en-US')
 * @returns Formatted date string
 *
 * @example
 * formatDate('2025-10-03') // "October 3, 2025"
 */
export function formatDate(date: string | Date, locale = 'en-US'): string {
  // ...
}
```

### README Documentation

- Every bot must have a comprehensive README (see template)
- Update main README when adding major features
- Keep ARCHITECTURE.md in sync with structural changes

---

## Pull Request Process

### Before Submitting

1. **Self-Review**: Review your own code first
2. **Run Tests**: Ensure all tests pass (`npm test`)
3. **Lint Code**: Fix any linting errors (`npm run lint`)
4. **Type Check**: Verify TypeScript types (`npm run type-check`)
5. **Build**: Ensure project builds (`npm run build`)
6. **Update Docs**: Update relevant documentation

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review of code completed
- [ ] Tests added for new functionality
- [ ] All tests passing
- [ ] Documentation updated (if applicable)
- [ ] No console.log or debugging code
- [ ] Commit messages follow Conventional Commits
- [ ] Branch is up-to-date with main

### PR Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] All checklist items above completed
```

### Review Process

1. **Automated Checks**: GitHub Actions will run linting, tests, and security scans
2. **Code Review**: A maintainer will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, a maintainer will merge your PR

---

## Bot Development Guide

### Creating a New Bot

#### 1. Plan Your Bot

Before coding, define:
- **Domain**: What specific area does this bot serve?
- **Target Users**: Who will use this bot?
- **Key Features**: What are the 3-5 main capabilities?
- **Unique Value**: What makes this bot different from generic AI?

#### 2. Create Bot Directory

```bash
mkdir -p app/bots/your-bot-slug
cd app/bots/your-bot-slug
```

#### 3. Create README

```bash
# Copy template (once created)
cp docs/BOT_README_TEMPLATE.md README.md

# Edit with your bot's details
```

Ensure your README includes:
- Overview and value proposition
- Key features (detailed)
- Technical architecture
- Use cases
- File structure
- Development instructions
- Future roadmap
- Integration possibilities

#### 4. Implement Bot Page

```typescript
// app/bots/your-bot-slug/page.tsx
'use client';

import React from 'react';
import bots from '@/data/bots';
import BotPageHeader from '@/components/BotPageHeader';

export default function YourBot() {
  const bot = bots.find(b => b.slug === 'your-bot-slug');

  const menuItems = [
    { id: 'features', label: 'Features', icon: '✨', section: 'features' },
    // ... more menu items
  ];

  return (
    <div className="min-h-screen bg-white">
      <BotPageHeader
        botTitle="Your Bot Name"
        botEmoji="🤖"
        botSlug="your-bot-slug"
        menuItems={menuItems}
        accentColor="blue" // blue, green, amber, indigo
      />

      <main className="max-w-7xl mx-auto px-4">
        {/* Your bot content */}
      </main>
    </div>
  );
}
```

#### 5. Add Bot Metadata

```typescript
// data/bots.ts
export const bots: Bot[] = [
  // ... existing bots
  {
    slug: 'your-bot-slug',
    title: 'Your Bot Name',
    shortName: 'BotName',
    emoji: '🤖',
    description: 'Brief description of your bot',
    overview: 'Longer overview for the bot',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3'
    ],
    details: 'Detailed explanation of bot capabilities',
    category: 'legal' | 'medical' | 'research' | 'creative' | 'education' | 'business',
    audience: ['individuals', 'businesses', 'governments'],
    status: 'soon' | 'beta' | 'live'
  }
];
```

#### 6. Create Components

Organize components by feature:

```
your-bot-slug/
└── components/
    ├── hero/
    │   └── HeroSection.tsx
    ├── features/
    │   └── FeaturesSection.tsx
    ├── demo/
    │   └── DemoSection.tsx
    └── vision/
        └── VisionSection.tsx
```

#### 7. Bot Quality Checklist

- [ ] Comprehensive README (150+ lines)
- [ ] Responsive mobile-first design
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Error handling and loading states
- [ ] SEO optimization (meta tags)
- [ ] Analytics tracking setup
- [ ] Security review completed
- [ ] Tests for bot-specific logic
- [ ] Documentation complete

### Bot-Specific Best Practices

#### Domain-Specific AI Prompts

```typescript
// For domain-specific AI behavior
const SYSTEM_PROMPT = `
You are ${botName}, a specialized AI assistant for ${domain}.
Your expertise includes: ${expertise}.
Always provide: ${requirements}.
Never: ${restrictions}.
`;
```

#### Domain Knowledge Integration

```typescript
// Integrate domain-specific data
const knowledgeBase = await loadDomainKnowledge(botSlug);
const context = buildAIContext(userQuery, knowledgeBase);
```

#### Bot-Specific Validation

```typescript
// Validate inputs specific to your domain
import { z } from 'zod';

const BotInputSchema = z.object({
  query: z.string().min(10, 'Query too short'),
  domain: z.enum(['subdomain1', 'subdomain2']),
  // ... domain-specific fields
});
```

---

## Community

### Communication Channels

- **GitHub Issues**: Bug reports, feature requests
- **Pull Requests**: Code contributions and discussions
- **Email**: collaborate@botsmann.com

### Getting Help

- Check existing [documentation](./README.md)
- Search [GitHub Issues](https://github.com/g-but/botsmann/issues)
- Review [Architecture docs](./ARCHITECTURE.md)
- Ask in your PR or create a new issue

### Recognition

Contributors will be:
- Listed in release notes
- Acknowledged in README (for significant contributions)
- Invited to contributor meetings (future)

---

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):
- **Major (X.0.0)**: Breaking changes
- **Minor (1.X.0)**: New features (backwards compatible)
- **Patch (1.0.X)**: Bug fixes

### Release Schedule

- **Patch releases**: As needed for critical bugs
- **Minor releases**: Monthly (new features, improvements)
- **Major releases**: Quarterly (significant changes)

---

## License

By contributing to Botsmann, you agree that your contributions will be licensed under the same license as the project (see [LICENSE](./LICENSE)).

---

## Questions?

If you have questions about contributing, please:
1. Check this guide first
2. Search existing GitHub Issues
3. Create a new issue with the `question` label
4. Email us at: contribute@botsmann.com

---

**Thank you for contributing to Botsmann! Your contributions help make specialized AI accessible to everyone.** 🚀
