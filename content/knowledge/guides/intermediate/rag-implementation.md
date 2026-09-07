---
title: 'Implementing RAG: Give Your AI Custom Knowledge'
description: 'Build a Retrieval-Augmented Generation system to make your AI answer questions from your own documents'
difficulty: 'Intermediate'
readTime: '30 min'
author: 'Botsmann Team'
publishedAt: '2026-01-12'
tags: ['rag', 'embeddings', 'vector-database', 'langchain', 'pinecone']
prerequisites: ['Basic chatbot experience', 'Node.js knowledge']
category: 'building-bots'
published: true
---

## Implementing RAG: Give Your AI Custom Knowledge

RAG (Retrieval-Augmented Generation) lets your AI answer questions using your own documents, databases, or knowledge bases. Instead of relying solely on the model's training data, RAG retrieves relevant information at query time.

## How RAG Works

```
┌─────────────────────────────────────────────────────────────┐
│                      RAG Pipeline                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. INDEXING (One-time)                                     │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────┐      │
│  │Documents │ -> │  Chunk   │ -> │ Generate         │      │
│  │(PDF,etc) │    │  Text    │    │ Embeddings       │      │
│  └──────────┘    └──────────┘    └────────┬─────────┘      │
│                                           │                 │
│                                           v                 │
│                                  ┌──────────────────┐      │
│                                  │  Vector Database │      │
│                                  │  (Pinecone, etc) │      │
│                                  └────────┬─────────┘      │
│                                           │                 │
│  2. QUERYING (Every request)              │                 │
│  ┌──────────┐    ┌──────────┐             │                 │
│  │  User    │ -> │ Embed    │ -> Search ──┘                │
│  │  Query   │    │ Query    │                              │
│  └──────────┘    └──────────┘                              │
│                       │                                     │
│                       v                                     │
│  ┌──────────────────────────────────────────────────┐      │
│  │ LLM + Retrieved Context = Grounded Answer        │      │
│  └──────────────────────────────────────────────────┘      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## What You'll Build

A Q&A system that can answer questions about your own documents. We'll use:

- **OpenAI** for embeddings and chat
- **Pinecone** for vector storage (free tier available)
- **LangChain** for orchestration

---

## Step 1: Project Setup

```bash
mkdir rag-system && cd rag-system
npm init -y
npm install langchain @langchain/openai @langchain/pinecone @pinecone-database/pinecone pdf-parse
```

Create your environment file:

```bash
# .env
OPENAI_API_KEY=sk-your-key
PINECONE_API_KEY=your-pinecone-key
PINECONE_INDEX=your-index-name
```

---

## Step 2: Create the Vector Store

First, let's create a script to index your documents.

```javascript
// index-documents.js
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import 'dotenv/config';

async function indexDocuments(pdfPath) {
  console.log('Loading PDF...');
  const loader = new PDFLoader(pdfPath);
  const docs = await loader.load();

  console.log('Splitting into chunks...');
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000, // Characters per chunk
    chunkOverlap: 200, // Overlap between chunks
  });
  const chunks = await splitter.splitDocuments(docs);
  console.log(`Created ${chunks.length} chunks`);

  console.log('Creating embeddings and uploading to Pinecone...');
  const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-small', // $0.02/1M tokens
  });

  const pinecone = new Pinecone();
  const index = pinecone.index(process.env.PINECONE_INDEX);

  await PineconeStore.fromDocuments(chunks, embeddings, {
    pineconeIndex: index,
    namespace: 'documents',
  });

  console.log('Done! Documents indexed.');
}

// Run with: node index-documents.js ./your-document.pdf
indexDocuments(process.argv[2]);
```

### Set Up Pinecone

1. Sign up at [pinecone.io](https://pinecone.io) (free tier: 1 index)
2. Create an index with:
   - **Dimensions:** 1536 (for text-embedding-3-small)
   - **Metric:** cosine
3. Copy your API key and index name to `.env`

### Index Your Documents

```bash
node index-documents.js ./company-handbook.pdf
```

---

## Step 3: Build the Query System

Now create the RAG query pipeline:

```javascript
// rag-query.js
import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
import 'dotenv/config';

// Initialize components
const embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-small',
});

const llm = new ChatOpenAI({
  model: 'gpt-4o',
  temperature: 0, // More deterministic for factual answers
});

const pinecone = new Pinecone();
const index = pinecone.index(process.env.PINECONE_INDEX);

// Create vector store retriever
const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex: index,
  namespace: 'documents',
});

const retriever = vectorStore.asRetriever({
  k: 4, // Return top 4 most relevant chunks
});

// RAG prompt template
const ragPrompt = PromptTemplate.fromTemplate(`
You are a helpful assistant. Answer the question based ONLY on the following context.
If the answer is not in the context, say "I don't have information about that in my knowledge base."

Context:
{context}

Question: {question}

Answer:`);

// Build the RAG chain
const ragChain = RunnableSequence.from([
  {
    context: async (input) => {
      const docs = await retriever.invoke(input.question);
      return docs.map((d) => d.pageContent).join('\n\n');
    },
    question: (input) => input.question,
  },
  ragPrompt,
  llm,
  new StringOutputParser(),
]);

// Query function
export async function askQuestion(question) {
  const answer = await ragChain.invoke({ question });
  return answer;
}

// Interactive CLI
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('RAG System ready! Ask questions about your documents.\n');

function prompt() {
  rl.question('You: ', async (question) => {
    if (question.toLowerCase() === 'quit') {
      rl.close();
      return;
    }

    const answer = await askQuestion(question);
    console.log(`\nAssistant: ${answer}\n`);
    prompt();
  });
}

prompt();
```

Run it:

```bash
node rag-query.js
```

---

## Step 4: Add Source Citations

Enhance the system to show where answers come from:

```javascript
// rag-with-sources.js
import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';
import 'dotenv/config';

const embeddings = new OpenAIEmbeddings({ model: 'text-embedding-3-small' });
const llm = new ChatOpenAI({ model: 'gpt-4o', temperature: 0 });

const pinecone = new Pinecone();
const index = pinecone.index(process.env.PINECONE_INDEX);

const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex: index,
  namespace: 'documents',
});

export async function askWithSources(question) {
  // Retrieve relevant documents
  const docs = await vectorStore.similaritySearch(question, 4);

  // Build context with source tracking
  const context = docs.map((doc, i) => ({
    content: doc.pageContent,
    source: doc.metadata.source || `Document ${i + 1}`,
    page: doc.metadata.page || 'N/A',
  }));

  // Generate answer
  const contextText = context.map((c) => c.content).join('\n\n---\n\n');

  const response = await llm.invoke([
    {
      role: 'system',
      content: `Answer based ONLY on this context. Cite sources using [1], [2], etc.
      
Context:
${contextText}`,
    },
    {
      role: 'user',
      content: question,
    },
  ]);

  return {
    answer: response.content,
    sources: context.map((c, i) => ({
      index: i + 1,
      source: c.source,
      page: c.page,
      excerpt: c.content.substring(0, 200) + '...',
    })),
  };
}

// Example usage
const result = await askWithSources('What is the vacation policy?');
console.log('Answer:', result.answer);
console.log('\nSources:');
result.sources.forEach((s) => {
  console.log(`[${s.index}] ${s.source} (Page ${s.page})`);
});
```

---

## Alternative: Using Ollama Locally

For privacy or cost savings, run everything locally:

```javascript
// local-rag.js
import { OllamaEmbeddings, ChatOllama } from '@langchain/ollama';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

// Use local Ollama models
const embeddings = new OllamaEmbeddings({
  model: 'nomic-embed-text', // Good embedding model
});

const llm = new ChatOllama({
  model: 'llama3.1',
  temperature: 0,
});

// In-memory vector store (no external DB needed)
async function createLocalRAG(pdfPath) {
  const loader = new PDFLoader(pdfPath);
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const chunks = await splitter.splitDocuments(docs);

  // Store in memory
  const vectorStore = await MemoryVectorStore.fromDocuments(chunks, embeddings);

  return async function ask(question) {
    const relevantDocs = await vectorStore.similaritySearch(question, 4);
    const context = relevantDocs.map((d) => d.pageContent).join('\n\n');

    const response = await llm.invoke([
      {
        role: 'system',
        content: `Answer based on this context:\n\n${context}`,
      },
      { role: 'user', content: question },
    ]);

    return response.content;
  };
}

// Usage
const ask = await createLocalRAG('./document.pdf');
console.log(await ask('What does this document say about X?'));
```

First, pull the required models:

```bash
ollama pull llama3.1
ollama pull nomic-embed-text
```

---

## Vector Database Options

| Database     | Free Tier             | Best For                 |
| ------------ | --------------------- | ------------------------ |
| **Pinecone** | 1 index, 100K vectors | Production, serverless   |
| **Qdrant**   | Self-hosted free      | Privacy, control         |
| **Weaviate** | 100K objects          | Hybrid search            |
| **Chroma**   | Unlimited (local)     | Development, small scale |
| **Memory**   | RAM-limited           | Prototyping              |

---

## Chunking Strategies

How you split documents affects retrieval quality:

| Strategy     | Chunk Size | Overlap | Use Case              |
| ------------ | ---------- | ------- | --------------------- |
| **Small**    | 500 chars  | 50      | Precise Q&A           |
| **Medium**   | 1000 chars | 200     | General use           |
| **Large**    | 2000 chars | 400     | Summarization         |
| **Semantic** | Varies     | N/A     | Best quality (slower) |

```javascript
// Semantic chunking (splits on meaning)
import { SemanticTextSplitter } from 'langchain/text_splitter';

const splitter = new SemanticTextSplitter({
  embeddings: new OpenAIEmbeddings(),
  breakpointThreshold: 0.5,
});
```

---

## Cost Optimization

| Component  | Cost               | Optimization                      |
| ---------- | ------------------ | --------------------------------- |
| Embeddings | $0.02/1M tokens    | Cache queries, use smaller model  |
| Vector DB  | $0-70/mo           | Use free tiers, local for dev     |
| LLM calls  | $2.50-15/1M tokens | Use smaller models for simple Q&A |

**Tips:**

1. Cache embedding results for repeated queries
2. Use `text-embedding-3-small` (vs large) - 5x cheaper, similar quality
3. Batch document indexing during off-peak hours

---

## Next Steps

- Add **hybrid search** (keyword + semantic)
- Implement **conversation memory** for follow-up questions
- Add **reranking** for better relevance
- Build a **web UI** with streaming responses

See our [Advanced: Production RAG](/knowledge/guides/production-deployment) for scaling to millions of documents.
