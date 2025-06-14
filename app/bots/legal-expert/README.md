# Lex - AI Legal Assistant

## Overview

Lex is an AI-powered legal assistant that runs on a private AI node. It can be deployed for individuals, lawyers, or entire law firms. The system keeps confidential documents secure while providing fast legal research, document analysis, and compliance checks.

## Features

- **Legal Research** – Search statutes and case law with precision
- **Document Analysis** – Summarize and extract key clauses from contracts and filings
- **Case Law Insights** – Surface relevant precedents for your matter
- **Regulatory Compliance** – Check requirements across jurisdictions
- **Contract Review** – Highlight risks and missing clauses automatically

## File Structure

```
legal-expert/
├── page.tsx                  # Main page component
├── styles.css                # Custom styles for the bot
├── README.md                 # This documentation
└── components/               # Modular UI components
    ├── hero/                 # Hero section
    ├── disclaimer/           # Legal disclaimer
    ├── features/             # Feature cards
    ├── how-it-works/         # Step-by-step guide
    ├── usecases/             # Common use cases
    └── cta/                  # Call to action
```

## Architecture

Lex follows the same architecture as other bots in this repository. Each section of the page is implemented as an isolated React component, making the code easy to maintain and extend. TailwindCSS is used for styling and responsive design.

## Development

1. Run the development server:
   ```bash
   npm run dev
   ```
2. Navigate to `http://localhost:3000/bots/legal-expert` to see the page.
3. Unit tests can be executed with:
   ```bash
   npm test
   ```

## Security

Lex runs on a private AI node, ensuring that uploaded documents never leave your infrastructure. No user data is shared with third parties when deployed privately. Always follow best practices for access control and data encryption.

## License

MIT
