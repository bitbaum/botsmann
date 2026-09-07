---
title: 'Building Your First AI Chatbot'
description: 'Create a simple AI chatbot from scratch in 15 minutes - choose between OpenAI, Anthropic, or open source models'
difficulty: 'Beginner'
readTime: '15 min'
author: 'Botsmann Team'
publishedAt: '2026-01-12'
tags: ['chatbot', 'openai', 'anthropic', 'ollama', 'getting-started']
prerequisites: []
category: 'getting-started'
published: true
---

## Building Your First AI Chatbot

In this guide, you'll learn how to create a simple AI chatbot. We'll show you three approaches: using OpenAI's GPT-4o, Anthropic's Claude, or running open source models locally with Ollama.

## Choose Your Approach

| Approach                   | Pros                                | Cons                          | Cost                   |
| -------------------------- | ----------------------------------- | ----------------------------- | ---------------------- |
| **OpenAI (GPT-4o)**        | Best-in-class quality, fast         | Requires API key, usage costs | ~$2.50/1M input tokens |
| **Anthropic (Claude 3.5)** | Excellent reasoning, longer context | Requires API key, usage costs | ~$3/1M input tokens    |
| **Ollama (Local)**         | Free, private, no internet needed   | Requires decent hardware      | Free                   |

## What You'll Need

- **Node.js** (version 20+) - [Download here](https://nodejs.org)
- A text editor (VS Code recommended)
- For cloud options: An API key from your chosen provider
- For local: A computer with 8GB+ RAM

---

## Option A: Using OpenAI (GPT-4o)

### Step 1: Set Up

```bash
mkdir my-chatbot && cd my-chatbot
npm init -y
npm install openai
```

### Step 2: Create the Bot

Create `bot.js`:

```javascript
import OpenAI from 'openai';
import readline from 'readline';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const messages = [{ role: 'system', content: 'You are a helpful assistant.' }];

async function chat(userMessage) {
  messages.push({ role: 'user', content: userMessage });

  const response = await openai.chat.completions.create({
    model: 'gpt-4o', // Latest GPT-4 Omni model
    messages,
  });

  const reply = response.choices[0].message.content;
  messages.push({ role: 'assistant', content: reply });
  return reply;
}

// Interactive CLI
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('GPT-4o Chatbot ready! Type "quit" to exit.\n');

function prompt() {
  rl.question('You: ', async (input) => {
    if (input.toLowerCase() === 'quit') {
      rl.close();
      return;
    }
    console.log('\nBot:', await chat(input), '\n');
    prompt();
  });
}

prompt();
```

### Step 3: Run

```bash
export OPENAI_API_KEY=sk-your-key-here
node bot.js
```

---

## Option B: Using Anthropic (Claude 3.5 Sonnet)

### Step 1: Set Up

```bash
mkdir my-chatbot && cd my-chatbot
npm init -y
npm install @anthropic-ai/sdk
```

### Step 2: Create the Bot

Create `bot.js`:

```javascript
import Anthropic from '@anthropic-ai/sdk';
import readline from 'readline';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const messages = [];

async function chat(userMessage) {
  messages.push({ role: 'user', content: userMessage });

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', // Latest Claude Sonnet
    max_tokens: 1024,
    system: 'You are a helpful assistant.',
    messages,
  });

  const reply = response.content[0].text;
  messages.push({ role: 'assistant', content: reply });
  return reply;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Claude 3.5 Chatbot ready! Type "quit" to exit.\n');

function prompt() {
  rl.question('You: ', async (input) => {
    if (input.toLowerCase() === 'quit') {
      rl.close();
      return;
    }
    console.log('\nBot:', await chat(input), '\n');
    prompt();
  });
}

prompt();
```

### Step 3: Run

```bash
export ANTHROPIC_API_KEY=sk-ant-your-key-here
node bot.js
```

---

## Option C: Using Ollama (Free, Local, Private)

Ollama lets you run powerful open source models like Llama 3.1 and Mistral locally.

### Step 1: Install Ollama

```bash
# macOS/Linux
curl -fsSL https://ollama.com/install.sh | sh

# Or download from ollama.com for Windows
```

### Step 2: Download a Model

```bash
# Llama 3.1 8B - Good balance of quality and speed
ollama pull llama3.1

# Or Mistral 7B - Fast and capable
ollama pull mistral
```

### Step 3: Create the Bot

```bash
mkdir my-chatbot && cd my-chatbot
npm init -y
npm install ollama
```

Create `bot.js`:

```javascript
import { Ollama } from 'ollama';
import readline from 'readline';

const ollama = new Ollama();
const messages = [];

async function chat(userMessage) {
  messages.push({ role: 'user', content: userMessage });

  const response = await ollama.chat({
    model: 'llama3.1', // or 'mistral'
    messages,
  });

  const reply = response.message.content;
  messages.push({ role: 'assistant', content: reply });
  return reply;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Llama 3.1 Chatbot ready! Type "quit" to exit.\n');

function prompt() {
  rl.question('You: ', async (input) => {
    if (input.toLowerCase() === 'quit') {
      rl.close();
      return;
    }
    console.log('\nBot:', await chat(input), '\n');
    prompt();
  });
}

prompt();
```

### Step 4: Run

```bash
# Make sure Ollama is running first
ollama serve  # In another terminal

node bot.js
```

---

## Comparing the Models

| Model             | Best For              | Context Window | Notes                           |
| ----------------- | --------------------- | -------------- | ------------------------------- |
| GPT-4o            | General tasks, vision | 128K tokens    | Fastest GPT-4 variant           |
| Claude 3.5 Sonnet | Coding, analysis      | 200K tokens    | Excellent at reasoning          |
| Llama 3.1 8B      | Local/private use     | 128K tokens    | Free, runs on consumer hardware |
| Mistral 7B        | Fast local inference  | 32K tokens     | Very efficient                  |

## Next Steps

- **Add a web interface** - Use Next.js or Express
- **Add RAG** - Give your bot custom knowledge
- **Try different models** - Each has unique strengths
- **Add streaming** - Show responses as they generate

See our [Model Comparison Guide](/knowledge/infrastructure/model-comparison) for detailed provider profiles.
