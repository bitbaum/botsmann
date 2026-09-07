---
title: 'Building a Slack Bot with AI'
description: 'Create an AI-powered Slack bot that can answer questions, summarize threads, and automate workflows'
difficulty: 'Intermediate'
readTime: '25 min'
author: 'Botsmann Team'
publishedAt: '2026-01-12'
tags: ['slack', 'integration', 'bot', 'automation', 'bolt']
prerequisites: ['Basic chatbot experience', 'Node.js knowledge']
category: 'integration'
published: true
---

## Building a Slack Bot with AI

Create an AI assistant that lives in your Slack workspace. It can answer questions, summarize conversations, and help your team be more productive.

## What You'll Build

- A Slack bot that responds to mentions and DMs
- AI-powered responses using GPT-4o or Claude
- Thread summarization feature
- Channel context awareness

---

## Step 1: Create a Slack App

### 1.1 Go to Slack API

1. Visit [api.slack.com/apps](https://api.slack.com/apps)
2. Click **Create New App**
3. Choose **From scratch**
4. Name it (e.g., "AI Assistant") and select your workspace

### 1.2 Configure Bot Permissions

Go to **OAuth & Permissions** → **Scopes** → **Bot Token Scopes** and add:

| Scope               | Purpose                       |
| ------------------- | ----------------------------- |
| `app_mentions:read` | Respond when @mentioned       |
| `chat:write`        | Send messages                 |
| `channels:history`  | Read channel messages         |
| `groups:history`    | Read private channel messages |
| `im:history`        | Read DMs                      |
| `im:write`          | Send DMs                      |
| `users:read`        | Get user info                 |

### 1.3 Enable Events

Go to **Event Subscriptions**:

1. Enable Events: **On**
2. Subscribe to bot events:
   - `app_mention`
   - `message.im`
3. Request URL: We'll set this after deploying

### 1.4 Install to Workspace

Go to **Install App** → **Install to Workspace**

Save these tokens:

- **Bot User OAuth Token** (`xoxb-...`)
- **Signing Secret** (from Basic Information)

---

## Step 2: Project Setup

```bash
mkdir slack-ai-bot && cd slack-ai-bot
npm init -y
npm install @slack/bolt openai dotenv
```

Create `.env`:

```bash
SLACK_BOT_TOKEN=xoxb-your-token
SLACK_SIGNING_SECRET=your-signing-secret
SLACK_APP_TOKEN=xapp-your-app-token  # For Socket Mode
OPENAI_API_KEY=sk-your-key
```

### Enable Socket Mode (for local dev)

In your Slack app settings:

1. Go to **Socket Mode**
2. Enable Socket Mode
3. Generate an **App-Level Token** with `connections:write` scope
4. Save it as `SLACK_APP_TOKEN`

---

## Step 3: Build the Bot

```javascript
// app.js
import bolt from '@slack/bolt';
import OpenAI from 'openai';
import 'dotenv/config';

const { App } = bolt;

// Initialize Slack app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for the AI
const SYSTEM_PROMPT = `You are a helpful AI assistant in a Slack workspace.
- Be concise and friendly
- Use Slack formatting (*bold*, _italic_, \`code\`)
- If you don't know something, say so
- Keep responses under 300 words unless asked for detail`;

// Handle @mentions
app.event('app_mention', async ({ event, client, say }) => {
  try {
    // Show typing indicator
    await client.reactions.add({
      channel: event.channel,
      timestamp: event.ts,
      name: 'thinking_face',
    });

    // Get the message text (remove the bot mention)
    const text = event.text.replace(/<@[A-Z0-9]+>/g, '').trim();

    // Get AI response
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: text },
      ],
      max_tokens: 500,
    });

    // Remove thinking reaction
    await client.reactions.remove({
      channel: event.channel,
      timestamp: event.ts,
      name: 'thinking_face',
    });

    // Reply in thread
    await say({
      text: response.choices[0].message.content,
      thread_ts: event.thread_ts || event.ts,
    });
  } catch (error) {
    console.error('Error:', error);
    await say({
      text: 'Sorry, I encountered an error. Please try again.',
      thread_ts: event.thread_ts || event.ts,
    });
  }
});

// Handle DMs
app.event('message', async ({ event, client, say }) => {
  // Only respond to DMs (not channels)
  if (event.channel_type !== 'im') return;
  // Ignore bot messages
  if (event.bot_id) return;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: event.text },
      ],
      max_tokens: 500,
    });

    await say(response.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
    await say('Sorry, I encountered an error.');
  }
});

// Start the app
(async () => {
  await app.start();
  console.log('⚡️ Slack bot is running!');
})();
```

Run it:

```bash
node app.js
```

---

## Step 4: Add Thread Summarization

Add a slash command to summarize threads:

```javascript
// Add to app.js

// Slash command: /summarize
app.command('/summarize', async ({ command, ack, client, respond }) => {
  await ack();

  try {
    // Get the thread messages
    const result = await client.conversations.replies({
      channel: command.channel_id,
      ts: command.text || command.thread_ts, // Thread timestamp
      limit: 50,
    });

    if (!result.messages || result.messages.length < 2) {
      await respond('I need a thread with messages to summarize. Use `/summarize [thread_ts]`');
      return;
    }

    // Format messages for the AI
    const conversation = result.messages.map((m) => `<${m.user}>: ${m.text}`).join('\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'Summarize this Slack thread concisely. Include key decisions, action items, and important points.',
        },
        {
          role: 'user',
          content: conversation,
        },
      ],
      max_tokens: 500,
    });

    await respond({
      text: `*Thread Summary*\n\n${response.choices[0].message.content}`,
    });
  } catch (error) {
    console.error('Error:', error);
    await respond("Sorry, I couldn't summarize that thread.");
  }
});
```

### Register the Slash Command

In Slack app settings → **Slash Commands**:

1. Create New Command: `/summarize`
2. Request URL: Your server URL + `/slack/events`
3. Description: "Summarize a thread with AI"

---

## Step 5: Add Context Awareness

Make the bot aware of recent channel context:

```javascript
// Enhanced mention handler with context
app.event('app_mention', async ({ event, client, say }) => {
  try {
    const text = event.text.replace(/<@[A-Z0-9]+>/g, '').trim();

    // Fetch recent channel messages for context
    const history = await client.conversations.history({
      channel: event.channel,
      limit: 10,
    });

    const contextMessages = history.messages
      .reverse()
      .filter((m) => !m.bot_id)
      .map((m) => ({ role: 'user', content: m.text }));

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `${SYSTEM_PROMPT}\n\nRecent channel context is provided. Use it to give relevant answers.`,
        },
        ...contextMessages.slice(-5), // Last 5 messages as context
        { role: 'user', content: text },
      ],
      max_tokens: 500,
    });

    await say({
      text: response.choices[0].message.content,
      thread_ts: event.thread_ts || event.ts,
    });
  } catch (error) {
    console.error('Error:', error);
  }
});
```

---

## Step 6: Deploy to Production

### Option A: Railway (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

Add environment variables in Railway dashboard.

### Option B: Render

1. Connect your GitHub repo at [render.com](https://render.com)
2. Add environment variables
3. Deploy

### Option C: Self-hosted

```dockerfile
# Dockerfile
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["node", "app.js"]
```

```bash
docker build -t slack-bot .
docker run -d --env-file .env slack-bot
```

---

## Using Claude Instead

```javascript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function getAIResponse(text, context = []) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages: [...context, { role: 'user', content: text }],
  });

  return response.content[0].text;
}
```

---

## Best Practices

### Rate Limiting

```javascript
import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({
  minTime: 1000,  // 1 request per second
  maxConcurrent: 3,
});

const rateLimitedAI = limiter.wrap(async (text) => {
  return openai.chat.completions.create({...});
});
```

### Error Handling

```javascript
app.error(async (error) => {
  console.error('Slack app error:', error);
  // Send to error tracking (Sentry, etc.)
});
```

### Logging

```javascript
app.use(async ({ next, context }) => {
  console.log(`Event: ${context.eventType} from ${context.userId}`);
  await next();
});
```

---

## Cost Estimation

| Usage             | Monthly Cost |
| ----------------- | ------------ |
| 1,000 messages    | ~$5 (GPT-4o) |
| 10,000 messages   | ~$50         |
| Hosting (Railway) | $5-20        |

---

## Next Steps

- Add **RAG** for company knowledge
- Implement **conversation memory** per user
- Add **scheduled summaries** (daily channel digests)
- Create **workflow automations** with Slack Workflow Builder

See our [Advanced: Production Deployment](/knowledge/guides/production-deployment) for scaling to large teams.
