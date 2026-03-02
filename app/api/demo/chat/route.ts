/* eslint-disable no-console */

import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { jsonError, jsonValidationError, formatZodErrors, HTTP_STATUS } from '@/lib/api';
import { generateWithBestProvider, type ModelProvider } from '@/lib/llm-client';
import {
  sanitizeSystemPrompt,
  sanitizeUserMessage,
  wrapUserContext,
  PROMPT_LIMITS,
} from '@/lib/prompt-sanitizer';

// ============================================================================
// Types
// ============================================================================

interface KnowledgeChunk {
  id: string;
  topic: string;
  question: string;
  content: string;
  keywords: string[];
}

interface SearchResult {
  chunk: KnowledgeChunk;
  score: number;
  matchedTerms: string[];
}

// ============================================================================
// LLM Integration (Ollama local / Groq cloud / OpenRouter)
// ============================================================================

const SYSTEM_PROMPT = `You are a helpful assistant for Botsmann, a platform that builds private AI assistants.

Your role is to answer questions about Botsmann's services, AI bots, and how the platform works.

Guidelines:
- Be friendly, professional, and concise
- Use the provided context to answer questions accurately
- If the context doesn't contain relevant information, say so honestly
- Encourage users to book a consultation for detailed discussions
- Mention specific bot names (Heidi, Lex, Imhotep, Nerd, Trident, Muse) when relevant
- Emphasize Botsmann's privacy-first approach when discussing data handling

Available AI Assistants:
- Heidi: Swiss German Teacher (live)
- Lex: Legal Expert (demo available)
- Imhotep: Medical Expert (demo available)
- Nerd: Research Assistant (demo available)
- Trident: AI Product Manager (demo available)
- Muse: Artistic Advisor (demo available)

Key value propositions:
- Your data stays yours (privacy-first)
- Local or cloud deployment options
- No subscriptions for local setups
- Expert consulting available`;

interface LLMResult {
  content: string;
  provider: ModelProvider;
  model: string;
}

async function generateResponse(
  userMessage: string,
  context: string,
  customSystemPrompt?: string,
  additionalContext?: string,
): Promise<LLMResult> {
  // Sanitize user message
  const sanitizedMessage = sanitizeUserMessage(userMessage);

  // Use custom system prompt if provided (sanitized), otherwise use default
  let systemPrompt = SYSTEM_PROMPT;
  if (customSystemPrompt) {
    const sanitized = sanitizeSystemPrompt(customSystemPrompt);
    systemPrompt = sanitized.sanitized;
    if (sanitized.warnings.length > 0) {
      console.log('[Demo Chat] System prompt sanitized:', sanitized.warnings);
    }
  }

  // Build user message content with all context
  let userContent = '';
  if (additionalContext) {
    // Wrap additional context to prevent injection
    const wrapped = wrapUserContext(additionalContext, 'Additional Context');
    if (wrapped) {
      userContent += `${wrapped}\n\n---\n`;
    }
  }
  if (context) {
    userContent += `Context information:\n${context}\n\n---\n`;
  }
  userContent += `User message: ${sanitizedMessage.sanitized}`;

  try {
    const result = await generateWithBestProvider([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContent },
    ]);

    return {
      content: result.content,
      provider: result.provider,
      model: result.model,
    };
  } catch (error) {
    console.error('LLM generation failed:', error);
    // Fallback to context-only response
    return {
      content: context,
      provider: 'ollama', // placeholder
      model: 'fallback',
    };
  }
}

// ============================================================================
// Search Functions
// ============================================================================

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

function calculateScore(
  chunk: KnowledgeChunk,
  queryTerms: string[],
): { score: number; matchedTerms: string[] } {
  const matchedTerms: string[] = [];
  let score = 0;
  const chunkText = `${chunk.question} ${chunk.content} ${chunk.topic}`.toLowerCase();
  const chunkKeywords = chunk.keywords.map((k) => k.toLowerCase());

  for (const term of queryTerms) {
    if (chunkKeywords.includes(term)) {
      score += 3;
      matchedTerms.push(term);
      continue;
    }
    const partialKeywordMatch = chunkKeywords.some((k) => k.includes(term) || term.includes(k));
    if (partialKeywordMatch) {
      score += 2;
      matchedTerms.push(term);
      continue;
    }
    if (chunkText.includes(term)) {
      score += 1;
      matchedTerms.push(term);
    }
  }

  const questionTerms = tokenize(chunk.question);
  const questionOverlap = queryTerms.filter((t) => questionTerms.includes(t)).length;
  score += questionOverlap * 0.5;

  return { score, matchedTerms: Array.from(new Set(matchedTerms)) };
}

function searchKnowledge(
  query: string,
  chunks: KnowledgeChunk[],
  topK: number = 3,
): SearchResult[] {
  const queryTerms = tokenize(query);
  if (queryTerms.length === 0) return [];

  return chunks
    .map((chunk) => {
      const { score, matchedTerms } = calculateScore(chunk, queryTerms);
      return { chunk, score, matchedTerms };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

// ============================================================================
// Botsmann Knowledge Base
// ============================================================================

const knowledgeChunks: KnowledgeChunk[] = [
  // About Botsmann
  {
    id: 'about-philosophy',
    topic: 'About Botsmann',
    question: 'What is Botsmann and what is your philosophy?',
    content: `Botsmann is a platform that builds private AI assistants. We believe in the transformative power of transparency and automation. Our core principles are: making processes transparent, automating redundant tasks, and empowering individuals through technology. By building in public, financing in public, and transacting in public, we create systems that are accountable and trustworthy. Our tagline is "Your Data. Your AI. Your Control."`,
    keywords: [
      'botsmann',
      'about',
      'philosophy',
      'company',
      'who',
      'what',
      'transparency',
      'automation',
    ],
  },
  {
    id: 'about-mission',
    topic: 'About Botsmann',
    question: "What is Botsmann's mission?",
    content: `Botsmann's mission is to methodically automate redundant, intransparent, and labor-intensive processes. We aim to free people from unpleasant tasks, giving them back their most precious resource: time and freedom to focus on what truly matters. We help you build private AI assistants that know YOUR information—medical records, legal documents, financial data, learning materials.`,
    keywords: ['mission', 'goal', 'purpose', 'automate', 'automation', 'free', 'time'],
  },
  {
    id: 'about-approach',
    topic: 'About Botsmann',
    question: "What is Botsmann's approach to AI?",
    content: `Through innovative AI solutions and automation technologies, Botsmann transforms complex, time-consuming workflows into efficient, transparent processes. Our commitment to transparency ensures that every automated decision is traceable and understandable, building trust between humans and AI systems. We offer both local deployment (runs on your computer for maximum privacy) and cloud deployment (access anywhere).`,
    keywords: ['approach', 'method', 'how', 'ai', 'transparent', 'trust', 'local', 'cloud'],
  },
  {
    id: 'privacy-first',
    topic: 'Privacy & Security',
    question: 'How does Botsmann handle privacy and data security?',
    content: `Privacy is at the core of Botsmann. We build private AI assistants where your data stays yours. You can choose to run the AI locally on your computer for maximum privacy, or in the cloud for anywhere access. For local setups, there are no subscriptions required—you own it forever. We never share your data with third parties, and you have complete control over your information.`,
    keywords: ['privacy', 'security', 'data', 'private', 'local', 'safe', 'secure', 'protection'],
  },

  // How It Works
  {
    id: 'how-step-1',
    topic: 'How It Works',
    question: 'How do I get started with Botsmann?',
    content: `Getting started is simple! Step 1: Book a free consultation call. We'll understand your use case—whether it's medical, legal, financial, or learning—and recommend the best approach for your needs. No commitment required, just a friendly conversation to explore possibilities.`,
    keywords: ['start', 'begin', 'first', 'consultation', 'call', 'book', 'free', 'getting'],
  },
  {
    id: 'how-step-2',
    topic: 'How It Works',
    question: 'What happens after the consultation?',
    content: `Step 2: We set everything up for you. You choose whether you want local deployment (runs on your computer, maximum privacy) or cloud deployment (access from anywhere). We handle all the technical complexity—configuring the AI, loading your data, and making sure everything works smoothly.`,
    keywords: [
      'setup',
      'configure',
      'install',
      'deployment',
      'local',
      'cloud',
      'technical',
      'after',
    ],
  },
  {
    id: 'how-step-3',
    topic: 'How It Works',
    question: 'Do I need a subscription?',
    content: `Step 3: You own it forever! Your AI assistant knows your information and is ready to help. For local setups, there are no subscriptions required—it's yours to keep. Cloud deployments have ongoing hosting costs, but you still own your data and can export it anytime.`,
    keywords: ['subscription', 'cost', 'price', 'own', 'forever', 'keep', 'payment', 'pricing'],
  },

  // Bots - Heidi
  {
    id: 'bot-heidi-overview',
    topic: 'AI Assistants',
    question: 'What is Heidi?',
    content: `Heidi is our Swiss German Teacher bot. She's your AI companion for High German and Züridütsch—helping you learn the language and discover events in Zurich. Heidi adapts to your learning style, tests your progress intelligently, and provides dual-language support with High German and Züridütsch side by side. She also includes Swiss culture tips and local know-how.`,
    keywords: ['heidi', 'swiss', 'german', 'teacher', 'language', 'learn', 'zurich', 'züridütsch'],
  },
  {
    id: 'bot-heidi-features',
    topic: 'AI Assistants',
    question: 'What can Heidi do?',
    content: `Heidi's features include: Adaptive learning that tests your progress in smart ways, discovering tonight's events and activities in Zurich, dual-language comparison between High German and Züridütsch, real-life context examples for words and phrases, instant writing help for emails and texts in both languages, and Swiss cultural insights including history and social life tips. Heidi is currently live and available!`,
    keywords: ['heidi', 'features', 'learn', 'events', 'zurich', 'language', 'culture', 'writing'],
  },

  // Bots - Research Assistant
  {
    id: 'bot-research-overview',
    topic: 'AI Assistants',
    question: 'What is the Research Assistant?',
    content: `The Research Assistant (nicknamed "Nerd") is an AI-powered research companion for organizing data, generating insights, and discovering connections. It's designed for academics, scientists, journalists, and industry professionals who want to elevate their research workflow with AI automation.`,
    keywords: ['research', 'assistant', 'nerd', 'academic', 'science', 'data', 'organize'],
  },
  {
    id: 'bot-research-features',
    topic: 'AI Assistants',
    question: 'What can the Research Assistant do?',
    content: `The Research Assistant features: Automated research systematization (organizes your uploaded materials), web scraping for the latest updates in your field, AI-generated research drafts with proper citations, daily thought-provoking questions to challenge your thinking, Big Discovery Mode to identify research gaps and novel connections, and integration tools for collaboration. It helps transform how you conduct research.`,
    keywords: ['research', 'features', 'organize', 'scraping', 'drafts', 'citations', 'discovery'],
  },

  // Bots - Medical Expert
  {
    id: 'bot-medical-overview',
    topic: 'AI Assistants',
    question: 'What is Imhotep the Medical Expert?',
    content: `Imhotep is our Medical Expert Assistant—a private AI health assistant that works with your medical history, lab results, and treatment records. It's designed to support healthcare professionals with evidence-based insights and comprehensive research analysis. Named after the ancient Egyptian physician, Imhotep helps you stay current with medical research and make informed decisions.`,
    keywords: ['imhotep', 'medical', 'health', 'doctor', 'healthcare', 'lab', 'treatment'],
  },
  {
    id: 'bot-medical-features',
    topic: 'AI Assistants',
    question: 'What can the Medical Expert do?',
    content: `The Medical Expert (Imhotep) provides: Evidence-based insights from medical literature, research assistance and analysis, case analysis support, medical literature review, and clinical guidelines integration. It's designed to assist medical professionals in staying current with research while keeping your health data private and secure. Note: It supports healthcare professionals and is not a replacement for medical advice.`,
    keywords: ['medical', 'features', 'evidence', 'research', 'clinical', 'health', 'guidelines'],
  },

  // Bots - Legal Expert
  {
    id: 'bot-legal-overview',
    topic: 'AI Assistants',
    question: 'What is Lex the Legal Expert?',
    content: `Lex is our Legal Expert Assistant—a Swiss legal assistant with AI analysis, lawyer collaboration features, and jurisdiction-specific expertise. It helps navigate legal complexities with comprehensive legal research and analysis support for legal professionals.`,
    keywords: ['lex', 'legal', 'lawyer', 'law', 'swiss', 'jurisdiction', 'contract'],
  },
  {
    id: 'bot-legal-features',
    topic: 'AI Assistants',
    question: 'What can the Legal Expert do?',
    content: `The Legal Expert (Lex) provides: Legal research assistance, document analysis, case law insights, regulatory compliance support, and contract review assistance. It combines advanced legal knowledge with AI capabilities to provide comprehensive support for legal research and analysis. Note: Lex is a research tool and not a replacement for professional legal advice.`,
    keywords: ['legal', 'features', 'research', 'contract', 'compliance', 'document', 'analysis'],
  },

  // Bots - Trident
  {
    id: 'bot-trident-overview',
    topic: 'AI Assistants',
    question: 'What is Trident?',
    content: `Trident is our AI Product Manager—a specialized tool that combines project management capabilities with technical guidance to streamline development workflow. It's specifically optimized for Cursor development and helps teams organize tasks, create implementation plans, and deliver quality software faster.`,
    keywords: ['trident', 'product', 'manager', 'cursor', 'development', 'project', 'management'],
  },
  {
    id: 'bot-trident-features',
    topic: 'AI Assistants',
    question: 'What can Trident do?',
    content: `Trident provides: Project management to organize tasks and deliverables, technical direction with implementation-ready specifications, workflow optimization to eliminate roadblocks, detailed implementation planning and roadmaps, quality assurance strategies, and Cursor-optimized workflows. It produces clear specifications, architecture diagrams, and risk assessments that developers can immediately use.`,
    keywords: ['trident', 'features', 'project', 'tasks', 'specifications', 'roadmap', 'cursor'],
  },

  // Bots - Artistic Advisor
  {
    id: 'bot-muse-overview',
    topic: 'AI Assistants',
    question: 'What is Muse the Artistic Advisor?',
    content: `Muse is our Artistic Advisor—an AI that enhances your creative process with expert guidance on composition, style analysis, and technique refinement for your artistic projects. Whether you're a painter, designer, or creative professional, Muse helps you explore new techniques while maintaining your unique vision.`,
    keywords: ['muse', 'artistic', 'art', 'creative', 'design', 'composition', 'style'],
  },
  {
    id: 'bot-muse-features',
    topic: 'AI Assistants',
    question: 'What can the Artistic Advisor do?',
    content: `The Artistic Advisor (Muse) provides: Style analysis to understand and develop your artistic voice, composition guidance for better visual arrangements, technique suggestions based on your goals, color theory assistance, and art history insights to inspire your work. Muse helps artists explore new techniques and refine their style while maintaining their unique creative vision.`,
    keywords: ['artistic', 'features', 'style', 'composition', 'color', 'technique', 'history'],
  },

  // Consulting Services
  {
    id: 'consulting-overview',
    topic: 'Consulting',
    question: 'What consulting services does Botsmann offer?',
    content: `Botsmann offers expert AI bot consulting services. We provide: Custom bot development (we design and build AI bots tailored to your business processes), Integration & deployment (seamlessly integrate AI into your existing systems), and Training & support (knowledge transfer, best practices, and ongoing support). Our team helps you design, develop, and deploy intelligent assistants tailored to your specific needs.`,
    keywords: [
      'consulting',
      'services',
      'custom',
      'development',
      'integration',
      'training',
      'support',
    ],
  },
  {
    id: 'consulting-diy',
    topic: 'Consulting',
    question: 'Can I build my own AI assistant?',
    content: `Yes! If you prefer to build it yourself, we offer free DIY guides in our Knowledge Center with step-by-step instructions. We believe in empowering users with knowledge. However, if you want expert guidance or don't have the time, our consulting team is happy to help with custom development and deployment.`,
    keywords: ['diy', 'self', 'build', 'guide', 'knowledge', 'tutorial', 'learn'],
  },

  // Contact & Getting Started
  {
    id: 'contact-consultation',
    topic: 'Contact',
    question: 'How do I book a consultation?',
    content: `You can book a free consultation by visiting the Contact page on our website or clicking "Book a Consultation" on the homepage. We'll schedule a call to understand your needs—whether it's medical, legal, financial, or learning use cases—and recommend the best approach. No commitment required!`,
    keywords: ['contact', 'consultation', 'book', 'call', 'talk', 'meet', 'schedule'],
  },
  {
    id: 'demo-available',
    topic: 'Demo',
    question: 'Can I try a demo?',
    content: `Yes! You're using the demo right now! This assistant demonstrates how our RAG (Retrieval Augmented Generation) technology works. It searches a knowledge base to find relevant information and uses AI to generate helpful responses. This is the same technology we use to build private AI assistants for clients. Want to see how it could work with your data? Book a consultation!`,
    keywords: ['demo', 'try', 'test', 'example', 'live', 'experience', 'sample', 'rag'],
  },

  // All Bots Overview
  {
    id: 'bots-overview',
    topic: 'AI Assistants',
    question: 'What AI assistants does Botsmann offer?',
    content: `Botsmann offers six specialized AI assistants: 1) Heidi - Swiss German Teacher (live), 2) Lex - Legal Expert (demo available), 3) Imhotep - Medical Expert (demo available), 4) Nerd - Research Assistant (demo available), 5) Trident - AI Product Manager (demo available), and 6) Muse - Artistic Advisor (demo available). Each bot is specialized for its domain while keeping your data private and secure.`,
    keywords: ['bots', 'assistants', 'all', 'list', 'available', 'offer', 'which'],
  },
];

// ============================================================================
// API Request Schema
// ============================================================================

const ChatRequestSchema = z.object({
  message: z.string().min(1, 'Message is required').max(PROMPT_LIMITS.message),
  includeContext: z.boolean().optional().default(false),
  // Optional overrides for bot-specific demos (with length limits)
  systemPrompt: z.string().max(PROMPT_LIMITS.systemPrompt).optional(),
  additionalContext: z.string().max(PROMPT_LIMITS.additionalContext).optional(),
});

// ============================================================================
// API Handlers
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, includeContext, systemPrompt, additionalContext } =
      ChatRequestSchema.parse(body);

    // Determine if this is a bot-specific demo (with custom system prompt)
    // or the default Botsmann knowledge base demo
    const isBotDemo = !!systemPrompt;

    // For bot-specific demos, we don't search the Botsmann knowledge base
    // The LLM will respond based on the custom system prompt and additional context
    let results: SearchResult[] = [];
    let context = '';

    if (!isBotDemo) {
      // Default Botsmann demo: search the knowledge base
      results = searchKnowledge(message, knowledgeChunks, 3);
      context =
        results.length > 0
          ? results.map((r) => r.chunk.content).join('\n\n')
          : "I don't have specific information about that. Try asking about Botsmann's AI assistants (Heidi, Lex, Imhotep, Nerd, Trident, Muse), how to get started, our consulting services, or privacy practices!";
    }

    // Generate response with best available LLM (Ollama > Groq > OpenRouter)
    const llmResult = await generateResponse(message, context, systemPrompt, additionalContext);

    // Build response data
    const responseData: {
      success: boolean;
      data: {
        response: string;
        sources?: Array<{ title: string; content: string; relevance?: number }>;
        context?: string;
        provider: string;
        model: string;
      };
    } = {
      success: true,
      data: {
        response: llmResult.content,
        provider: llmResult.provider,
        model: llmResult.model,
      },
    };

    // Include sources for Botsmann demo
    if (!isBotDemo && results.length > 0) {
      responseData.data.sources = results.map((r) => ({
        title: r.chunk.question,
        content: r.chunk.content.substring(0, 100) + '...',
        relevance: r.score / 10, // Normalize score to 0-1 range
      }));
    }

    if (includeContext) {
      responseData.data.context = context;
    }

    return NextResponse.json(responseData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonValidationError('Validation failed', formatZodErrors(error));
    }
    console.error('Chat API error:', error);
    return jsonError('Internal server error', 'INTERNAL_ERROR', HTTP_STATUS.INTERNAL_ERROR);
  }
}

// GET handler for debugging/health check
export async function GET() {
  // Check available providers
  const hasOllama = !!process.env.OLLAMA_URL;
  const hasGroq = !!process.env.GROQ_API_KEY;
  const hasOpenRouter = !!process.env.OPENROUTER_API_KEY;

  return NextResponse.json({
    status: 'ok',
    message: 'Botsmann AI Assistant API',
    chunks: knowledgeChunks.length,
    topics: Array.from(new Set(knowledgeChunks.map((c) => c.topic))),
    providers: {
      ollama: { configured: hasOllama, url: process.env.OLLAMA_URL || null },
      groq: { configured: hasGroq },
      openrouter: { configured: hasOpenRouter },
    },
    priority: 'ollama > groq > openrouter',
  });
}
