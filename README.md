# Botsmann - AI Bot Platform

## Overview

Botsmann is a platform for creating, showcasing, and managing AI bots built with the OpenAI API. Each bot provides specialized functionality through a custom web interface that connects to a ChatGPT-powered backend.

### Our Mission

We build AI extensions of human minds maximizing computational power, privacy, sovereignty, and efficiency. We default to fully private AI nodes with fine-tuned open-source models that automate tasks and give humans the most valuable resource: time.

## How It Works

Botsmann helps you deploy custom AI assistants that run privately and securely. Here's an overview of the process:

### Business Perspective

1. **Choose a Solution** – Pick from our catalog of ready-made bots or request a tailor‑made AI that fits your workflow.
2. **Deploy Privately** – We help you host the model on your own infrastructure so data never leaves your control.
3. **Save Time** – Automate repetitive tasks and integrate the AI into your existing tools, freeing you to focus on higher‑level strategy.

### Technical Perspective

1. **Open‑Source Models** – We fine‑tune open-source models for your needs, ensuring transparency and avoiding vendor lock‑in.
2. **Self-Hosted Nodes** – Each bot runs as an independent node that can be deployed on Vercel or your preferred cloud provider.
3. **Extensible Architecture** – Use our APIs and component library to build additional features or integrate with third‑party platforms.

## Home Screen & Navigation

The landing page is modular, composed of a hero, featured bots, and a collaboration form. Navigation now mirrors the elegant dropdown experience of [Medusa](https://medusajs.com/). A full-width mega menu opens on hover with concise descriptions, while mobile users get a smooth slide-in panel.

## Documentation

Detailed business and technical guides live under `/docs`. The docs explain our mission, how to deploy private AI nodes, and the philosophy behind human-centric automation.

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

## Deployment

### GitHub Setup

The Botsmann platform uses GitHub for version control and as a deployment source:

1. **Push to GitHub:**

   ```bash
   # Add all changes
   git add .

   # Commit changes with a descriptive message
   git commit -m "Your commit message"

   # Push to the GitHub repository
   git push origin <branch-name>
   ```

2. **Merge to Main Branch:**
   - Create a pull request on GitHub
   - Review code changes
   - Merge into the main branch

### Vercel Deployment

The platform is configured for deployment on Vercel. Deployments are automatically triggered when changes are pushed to the main branch.

1. **Initial Vercel Setup:**

   - Create an account on [Vercel](https://vercel.com)
   - Connect your GitHub account to Vercel
   - Import the Botsmann repository
   - Vercel will automatically detect the Next.js project

2. **Environment Variables:**
   Set the following environment variables in the Vercel project settings:

   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NEXT_PUBLIC_BASE_URL`: The base URL of your deployment (e.g., https://botsmann.vercel.app)

3. **Deployment Options:**

   - **Production Deployment:** Automatically triggered when pushing to the main branch
   - **Preview Deployments:** Automatically created for pull requests
   - **Manual Deployment:** Can be triggered from the Vercel dashboard

4. **Monitoring Deployments:**

   - Monitor build logs in the Vercel dashboard
   - Check deployment status in the GitHub repository
   - View detailed analytics and performance metrics in Vercel

5. **Rollback (if needed):**
   - Use the Vercel dashboard to view deployment history
   - Select a previous successful deployment to instantly rollback

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
