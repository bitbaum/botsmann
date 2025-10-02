# Botsmann - AI Bot Suite

## Overview

A modern, futuristic AI-powered bot platform featuring intelligent assistants for legal, language learning, research, and more. Built with Next.js 14, featuring a cutting-edge design with gradient backgrounds, glassmorphism effects, and smooth animations.

## Architecture

The platform follows a Next.js-based architecture with the following structure:

```
botsmann/
├── app/                  # Main Next.js application
│   ├── api/              # API routes
│   ├── bots/             # Individual bot applications
│   │   ├── medical-expert/    # Medical Expert (Imhotep) bot
│   │   ├── research-assistant/  # Research Assistant (Nerd) bot
│   │   └── ...          # Other specialized bots
│   └── ...              # Other app directories
├── components/          # Shared UI components
├── data/                # Static data and configuration
├── lib/                 # Shared utilities and helper functions
├── public/              # Static assets
│   └── images/          # Image assets used across the platform
└── types/               # TypeScript type definitions
```

## Technology Stack

- **Frontend**: React, Next.js, TailwindCSS
- **Backend**: Next.js API routes, OpenAI API integration
- **Styling**: TailwindCSS with custom utility classes
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/botsmann.git
   cd botsmann
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and add your OpenAI API key:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` to include your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Workflow

### Creating a New Bot

1. Create a new directory in `app/bots/` with your bot's name (e.g., `app/bots/your-bot-name/`)
2. Create the following files:
   - `page.tsx`: Main entry point for your bot's UI
   - `README.md`: Documentation specific to your bot
   - `styles.module.css`: Bot-specific styles (if needed)
   - `/components/`: Directory for bot-specific components

3. Add your bot's metadata to `data/bots.ts` to have it appear in the main directory

### Code Conventions

- Use TypeScript for all new code
- Use functional components with React hooks
- Follow the component organization pattern established in existing bots
- Document all components with JSDoc comments
- Keep components modular and reusable when possible

### Testing

Run tests with:

```bash
npm test
```

Write tests for components in a `__tests__` directory alongside the component.

## Contributing

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git commit -m "Add new feature/fix"
   ```

3. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a pull request against the main branch

## 🚀 Deployment

### Automated Deployment (Recommended)

This project uses GitHub Actions for fully automated deployment to Vercel with comprehensive monitoring and testing.

#### Prerequisites

1. **Vercel Account**: Create an account on [Vercel](https://vercel.com)
2. **GitHub Repository**: Connect your GitHub repository to Vercel
3. **Environment Variables**: Configure the following secrets in your GitHub repository:
   - `VERCEL_TOKEN`: Vercel access token
   - `VERCEL_ORG_ID`: Vercel organization ID
   - `VERCEL_PROJECT_ID`: Vercel project ID
   - `VERCEL_TEAM_URL`: Your Vercel team URL

#### Deployment Process

1. **Push to Main Branch**:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Automatic Deployment**:
   - GitHub Actions workflow triggers automatically
   - Dependencies are installed and optimized for production
   - Code is linted and tested
   - Application is built with production optimizations
   - Deployment is pushed to Vercel production environment
   - Health checks are performed

3. **Deployment Features**:
   - **Production Deployments**: Automatic on main branch pushes
   - **Preview Deployments**: Automatic for pull requests
   - **Rollback Support**: Instant rollback to previous deployments
   - **Performance Monitoring**: Real-time metrics and analytics

#### Monitoring and Verification

- **Build Logs**: Available in GitHub Actions and Vercel dashboard
- **Deployment Status**: Real-time updates in GitHub repository
- **Performance Metrics**: Lighthouse scores and Core Web Vitals
- **Error Tracking**: Automated error monitoring and alerts

### Manual Deployment (Alternative)

```bash
# Build the application
npm run build

# Deploy to Vercel
vercel --prod
```

### Environment Variables

Set the following environment variables in your Vercel project:
- `OPENAI_API_KEY`: Your OpenAI API key (if using OpenAI features)
- `NEXT_PUBLIC_BASE_URL`: Base URL of your deployment
- `NEXT_PUBLIC_DEPLOY_TIME`: Auto-populated deployment timestamp

### Custom Domain Configuration (Optional)

1. Purchase a domain through a domain registrar
2. Add the domain in your Vercel project settings
3. Configure DNS settings as instructed by Vercel
4. Verify domain ownership
5. Enable HTTPS for your custom domain

## Bot Documentation

For details on specific bots, see their individual README files:

- [Medical Expert (Imhotep)](./app/bots/medical-expert/README.md)
- [Research Assistant (Nerd)](./app/bots/research-assistant/README.md)

## License

[MIT License](LICENSE) 