# DevOps Implementation Plan - Botsmann/Lex Platform

**Based on**: DEVOPS_AUDIT_REPORT.md
**Priority**: CRITICAL → HIGH → MEDIUM → LOW
**Timeline**: 8 weeks to production-ready

---

## 🚨 PHASE 1: CRITICAL SECURITY FIXES (Week 1 - Days 1-5)

### 🔴 Day 1: Immediate Security Lockdown

#### Step 1: Rotate All Credentials (URGENT - Do First!)

**MongoDB:**
```bash
# 1. Log into MongoDB Atlas
# 2. Navigate to Database Access
# 3. Edit user 'g-but'
# 4. Click "Edit Password" → Generate new password
# 5. Update connection string
```

**Gmail App Password:**
```bash
# 1. Go to Google Account → Security → 2-Step Verification → App Passwords
# 2. Revoke existing password "botsmann"
# 3. Generate new app password
# 4. Save securely (1Password, Bitwarden, etc.)
```

**Environment Variables (Vercel):**
```bash
# 1. Go to Vercel Dashboard → botsmann project → Settings → Environment Variables
# 2. Add:
MONGODB_URI=<new-connection-string>
EMAIL_USER=REDACTED_EMAIL
EMAIL_PASS=<new-app-password>
EMAIL_TO=REDACTED_EMAIL
API_KEY=<generate-random-32-char-string>
NEXT_PUBLIC_API_KEY=<same-as-above>

# 3. Set environment: Production, Preview, Development (all)
```

#### Step 2: Remove .env from Git History

**⚠️ WARNING**: This rewrites Git history. Coordinate with team first!

```bash
# Backup first!
cp -r . ../botsmann-backup

# Install BFG (faster than filter-branch)
brew install bfg  # macOS
# or
wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# Remove .env from entire history
bfg --delete-files .env

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (DANGEROUS - warn team!)
git push origin --force --all
git push origin --force --tags
```

**Alternative (Safer but Slower):**
```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
```

#### Step 3: Update .gitignore and Local .env

**Update .gitignore:**
```bash
# Already in .gitignore, but let's make it explicit
cat >> .gitignore << 'EOF'

# Secrets - NEVER COMMIT
.env
.env.local
.env.*.local
.env.production
.env.development
secrets/
*.pem
*.key
*.cert
EOF
```

**Create Local .env (for development):**
```bash
# Copy from .env.example
cp .env.example .env

# Add values (use dummy data for local dev)
cat > .env << 'EOF'
# Local Development Environment Variables
# DO NOT commit this file!

MONGODB_URI=mongodb://localhost:27017/botsmann-dev
EMAIL_USER=dev@example.com
EMAIL_PASS=dummy-password-for-local
EMAIL_TO=dev@example.com
API_KEY=local-dev-api-key-12345678
NEXT_PUBLIC_API_KEY=local-dev-api-key-12345678
EOF
```

#### Step 4: Verify Secrets are Removed

```bash
# Check Git doesn't track .env
git ls-files | grep .env
# Should only show: .env.example

# Check remote repository
git log --all --full-history -- .env
# Should show "No commits found" or history stops at removal

# Check GitHub
# Visit: https://github.com/g-but/botsmann/blob/main/.env
# Should show 404
```

---

### 🔧 Day 2: Fix Build Process

#### Step 1: Update package.json

**Before:**
```json
{
  "scripts": {
    "build": "npm install react-icons framer-motion --save && next build"
  }
}
```

**After:**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:ci": "jest --ci --coverage --maxWorkers=2",
    "validate": "npm run lint && npm run type-check && npm run test:ci"
  },
  "dependencies": {
    // ... existing deps
    "react-icons": "^5.5.0",    // Already present
    "framer-motion": "^12.23.22" // Already present
  }
}
```

#### Step 2: Add Pre-commit Hooks

```bash
# Install husky
npm install --save-dev husky lint-staged

# Initialize husky
npx husky install

# Create pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# Create commit-msg hook (conventional commits)
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

**Create `.lintstagedrc.js`:**
```javascript
module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
  ],
  '*.{json,md,yml,yaml}': [
    'prettier --write',
  ],
  '*.ts?(x)': [
    () => 'tsc --noEmit', // Type check
  ],
};
```

#### Step 3: Add Dependency Validation

**Create `scripts/check-deps.js`:**
```javascript
const fs = require('fs');
const pkg = require('../package.json');

const requiredDeps = ['react', 'next', 'react-dom', 'react-icons', 'framer-motion'];

const missingDeps = requiredDeps.filter(dep => !pkg.dependencies[dep]);

if (missingDeps.length > 0) {
  console.error('❌ Missing required dependencies:', missingDeps.join(', '));
  process.exit(1);
}

console.log('✅ All required dependencies present');
```

**Update package.json:**
```json
{
  "scripts": {
    "postinstall": "node scripts/check-deps.js"
  }
}
```

---

### 🔐 Day 3-4: Security Scanning Setup

#### Step 1: Add Dependabot

**Create `.github/dependabot.yml`:**
```yaml
version: 2
updates:
  # npm dependencies
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    reviewers:
      - "g-but"
    labels:
      - "dependencies"
      - "security"

  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    reviewers:
      - "g-but"
```

#### Step 2: Add Snyk Security Scanning

```bash
# Install Snyk
npm install -g snyk

# Authenticate
snyk auth

# Test for vulnerabilities
snyk test

# Monitor project
snyk monitor
```

**Create `.github/workflows/security.yml`:**
```yaml
name: Security Scan
on:
  push:
    branches: [main, develop]
  pull_request:
  schedule:
    - cron: '0 0 * * 0' # Weekly

jobs:
  snyk:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
```

#### Step 3: Add Secrets Scanning

**Create `.github/workflows/secrets-scan.yml`:**
```yaml
name: Secrets Scan
on: [push, pull_request]

jobs:
  gitleaks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Create `.gitleaks.toml`:**
```toml
[extend]
useDefault = true

[[rules]]
id = "mongodb-uri"
description = "MongoDB connection string"
regex = '''mongodb(\+srv)?://[^\s]+'''
```

---

### ✅ Day 5: Basic CI/CD Pipeline

#### Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20'

jobs:
  lint:
    name: Lint & Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Type check
        run: npm run type-check

  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:ci

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          files: ./coverage/lcov.info

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build
        env:
          NODE_ENV: production

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: .next
```

---

## 📦 PHASE 2: CONTAINERIZATION (Week 2 - Days 6-10)

### Day 6: Create Dockerfile

**Create `Dockerfile`:**
```dockerfile
# Multi-stage build for optimal image size

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**Create `.dockerignore`:**
```
node_modules
.next
.git
.github
.vscode
.env
.env.local
*.md
logs
coverage
.DS_Store
Thumbs.db
npm-debug.log*
```

### Day 7: Docker Compose for Local Dev

**Create `docker-compose.yml`:**
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    env_file:
      - .env.local
    environment:
      - NODE_ENV=development
    volumes:
      - ./app:/app/app
      - ./public:/app/public
    depends_on:
      - mongodb
    networks:
      - botsmann-network

  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
      MONGO_INITDB_DATABASE: botsmann
    volumes:
      - mongodb-data:/data/db
    networks:
      - botsmann-network

  # Optional: MongoDB admin UI
  mongo-express:
    image: mongo-express:latest
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: admin
      ME_CONFIG_MONGODB_ADMINPASSWORD: password
      ME_CONFIG_MONGODB_SERVER: mongodb
    depends_on:
      - mongodb
    networks:
      - botsmann-network

volumes:
  mongodb-data:

networks:
  botsmann-network:
    driver: bridge
```

**Create `docker-compose.prod.yml`:**
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: runner
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    restart: unless-stopped
```

### Day 8: Test Containerized Setup

```bash
# Build image
docker build -t botsmann:latest .

# Run with Docker Compose
docker-compose up -d

# Check logs
docker-compose logs -f app

# Test application
curl http://localhost:3000

# Stop
docker-compose down
```

---

## 📊 PHASE 3: MONITORING & OBSERVABILITY (Week 3 - Days 11-15)

### Day 11-12: Error Tracking with Sentry

```bash
# Install Sentry
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Configure `sentry.client.config.ts`:**
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === 'production',
});
```

**Update `.env.example`:**
```
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
```

### Day 13: Logging Setup

**Create `lib/logger.ts`:**
```typescript
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  browser: {
    asObject: true
  },
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
```

**Update `.gitignore`:**
```
# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### Day 14-15: Uptime Monitoring

**UptimeRobot Setup:**
1. Sign up at https://uptimerobot.com
2. Add monitor: https://botsmann.vercel.app
3. Set up alerts (email, Slack)
4. Configure status page

**Vercel Analytics:**
```bash
npm install @vercel/analytics
```

**Add to `_app.tsx`:**
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

---

## 🏗️ PHASE 4: INFRASTRUCTURE AS CODE (Week 4-5)

### Terraform Setup

**Create `terraform/main.tf`:**
```hcl
terraform {
  required_version = ">= 1.0"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 1.0"
    }
  }

  backend "s3" {
    bucket = "botsmann-terraform-state"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
}

resource "vercel_project" "botsmann" {
  name      = "botsmann"
  framework = "nextjs"

  git_repository = {
    type = "github"
    repo = "g-but/botsmann"
  }
}

resource "vercel_project_environment_variable" "mongodb_uri" {
  project_id = vercel_project.botsmann.id
  key        = "MONGODB_URI"
  value      = var.mongodb_uri
  target     = ["production", "preview"]
  sensitive  = true
}

# Add other env vars...
```

---

## ✅ PHASE 5: ADVANCED CI/CD (Week 6-7)

### E2E Testing with Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

**Create `playwright.config.ts`:**
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

### Performance Testing

**Create `.github/workflows/performance.yml`:**
```yaml
name: Performance
on:
  push:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://botsmann.vercel.app
            https://botsmann.vercel.app/bots/legal-expert
          uploadArtifacts: true
```

---

## 📋 IMPLEMENTATION CHECKLIST

### Week 1: Critical Security ✅
- [ ] Day 1: Rotate all credentials
- [ ] Day 1: Remove .env from Git history
- [ ] Day 1: Set up Vercel environment variables
- [ ] Day 2: Fix build script
- [ ] Day 2: Add pre-commit hooks
- [ ] Day 3: Configure Dependabot
- [ ] Day 3: Set up Snyk scanning
- [ ] Day 4: Add secrets scanning (Gitleaks)
- [ ] Day 5: Create basic CI pipeline

### Week 2: Containerization ✅
- [ ] Day 6: Create Dockerfile
- [ ] Day 6: Create .dockerignore
- [ ] Day 7: Create docker-compose.yml
- [ ] Day 7: Create docker-compose.prod.yml
- [ ] Day 8: Test Docker build
- [ ] Day 8: Test local Docker Compose
- [ ] Day 9: Optimize Docker image size
- [ ] Day 10: Document Docker setup

### Week 3: Monitoring ✅
- [ ] Day 11: Set up Sentry
- [ ] Day 12: Configure error tracking
- [ ] Day 13: Implement structured logging
- [ ] Day 13: Add log rotation
- [ ] Day 14: Set up UptimeRobot
- [ ] Day 15: Configure Vercel Analytics

### Week 4-5: Infrastructure as Code ✅
- [ ] Create Terraform config
- [ ] Set up remote state (S3)
- [ ] Define all resources
- [ ] Create staging environment
- [ ] Test IaC deployment
- [ ] Document infrastructure

### Week 6-7: Advanced CI/CD ✅
- [ ] Set up E2E testing (Playwright)
- [ ] Add performance testing (Lighthouse)
- [ ] Visual regression testing
- [ ] Advanced security scans
- [ ] Deployment strategies

### Week 8: Production Readiness ✅
- [ ] Security audit
- [ ] Performance audit
- [ ] Load testing
- [ ] Disaster recovery testing
- [ ] Documentation review
- [ ] Team training

---

## 🚀 Quick Start Commands

```bash
# Security fixes
npm run security:scan
npm run secrets:check

# Development
docker-compose up -d
npm run dev

# Testing
npm run test
npm run test:e2e
npm run test:performance

# Deployment
npm run build
npm run deploy:staging
npm run deploy:production

# Monitoring
npm run logs:prod
npm run monitor:health
```

---

## 📚 Additional Resources

- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [GitHub Actions Best Practices](https://docs.github.com/en/actions/learn-github-actions/best-practices-for-workflows)
- [Terraform Vercel Provider](https://registry.terraform.io/providers/vercel/vercel/latest/docs)
- [Sentry Next.js Setup](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

---

*Implementation Plan Version: 1.0*
*Last Updated: January 2025*
*Status: Ready for Execution*
