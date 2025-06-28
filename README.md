# Botsmann - AI Bot Platform

## Overview

Botsmann is a platform for creating, showcasing, and managing AI bots built with the OpenAI API. Each bot provides specialized functionality through a custom web interface that connects to a ChatGPT-powered backend.

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

### User Flow for Creating an AI Bot

Use this step-by-step flow to scaffold, preview, and publish a new bot. You can also follow the multi‑step [Bot Creation Tool](./create-bot) which stores your selections in Supabase and generates these instructions automatically:

1. **Clone & Install** – Clone the repository and run `npm install` if you haven’t already.
2. **Create Bot Directory** – Inside `app/bots/`, create a folder named after your bot (for example, `app/bots/my-bot`).
3. **Add a Page Component** – In this new folder, create `page.tsx` that renders your bot’s interface. Add any supporting components under a `components/` subfolder and styles in `styles.module.css` if needed.
4. **Register Metadata** – Update `data/bots.ts` with your bot’s `slug`, `title`, `description`, and `features`. This enables it to appear in the directory page.
5. **Preview Locally** – Run `npm run dev` and navigate to `/bots/<your-bot>` in the browser to verify the layout and functionality.
6. **Test & Refine** – Add Jest tests in `__tests__/` and iterate on the page until it behaves as expected.
7. **Commit & Push** – Commit your changes, push them to GitHub, and open a pull request for review.

The creation wizard progressively reveals options based on the assistant type you choose, making it easy to fill in only the relevant details.


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