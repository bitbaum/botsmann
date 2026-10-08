import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  jsonError,
  jsonValidationError,
  jsonLLMUnavailable,
  formatZodErrors,
  HTTP_STATUS,
} from '@/lib/api';
import { generateWithBestProvider, type ModelProvider } from '@/lib/llm-client';
import { logger } from '@/lib/logger';
import { recordLLMSuccess, recordLLMFailure } from '@/lib/llm-health';
import { enforceRateLimit } from '@/lib/rate-limit';
import {
  sanitizeSystemPrompt,
  sanitizeUserMessage,
  wrapUserContext,
  PROMPT_LIMITS,
} from '@/lib/prompt-sanitizer';

// ============================================================================
// Types
// ============================================================================

/** Raised when no provider could produce an answer and there is no fallback. */
class LLMUnavailableError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'LLMUnavailableError';
  }
}

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
- For questions the context cannot answer, point users to cato@orangecat.ch
- Mention specific bot names (Heidi, Lex, Imhotep, Nerd, Trident, Muse) when relevant
- Emphasize Botsmann's privacy-first approach when discussing data handling

Available AI Assistants:
- Heidi: Swiss German Teacher (live)
- Lex: Legal Expert (live)
- Imhotep: Medical Expert (live)
- Nerd: Research Assistant (live)
- Trident: AI Product Manager (live)
- Muse: Artistic Advisor (live)

Key value propositions:
- Your data stays yours (privacy-first)
- Local or cloud deployment options
- No subscriptions for local setups
- MIT-licensed, so anyone can run it themselves`;

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
      logger.log('[Demo Chat] System prompt sanitized:', sanitized.warnings);
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

    recordLLMSuccess();
    return {
      content: result.content,
      provider: result.provider,
      model: result.model,
    };
  } catch (error) {
    logger.error('LLM generation failed:', error);
    recordLLMFailure(error);

    // The knowledge-base demo can still serve the retrieved passage. A
    // bot-specific demo has no context to fall back on, so returning it would
    // mean answering with an empty string -- which is what made a total LLM
    // outage look like a successful request.
    if (!context) {
      throw new LLMUnavailableError('No LLM provider could answer', { cause: error });
    }

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
    content: `Privacy is at the core of Botsmann. We build private AI assistants where your data stays yours. You can choose to run the AI locally on your computer for maximum privacy, or in the cloud for anywhere access. For local setups, there are no subscriptions required—you own it forever. We never sell your data or use it to train models, and your documents are visible to your account alone.`,
    keywords: ['privacy', 'security', 'data', 'private', 'local', 'safe', 'secure', 'protection'],
  },

  // How It Works
  {
    id: 'how-step-1',
    topic: 'How It Works',
    question: 'How do I get started with Botsmann?',
    content: `Getting started is simple: pick a professional on the Professionals page and start chatting. To ask questions about your own documents, sign in and upload them on the Documents page.`,
    keywords: ['start', 'begin', 'first', 'consultation', 'try', 'free', 'getting'],
  },
  {
    id: 'how-step-2',
    topic: 'How It Works',
    question: 'Can I run Botsmann on my own computer?',
    content: `Yes. Botsmann is MIT-licensed. You can use the hosted site, or run it yourself and point it at a local model through Ollama, so your data stays on your machine. Running it yourself takes technical setup; the Knowledge Center has guides.`,
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
    content: `No. The professionals on the site are free to use, and if you run Botsmann yourself there is no subscription: it is MIT-licensed.`,
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
    content: `Heidi's features include: quizzes on what you have learned, discovering tonight's events and activities in Zurich, dual-language comparison between High German and Züridütsch, real-life context examples for words and phrases, instant writing help for emails and texts in both languages, and Swiss cultural insights including history and social life tips. Heidi is currently live and available!`,
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
    content: `The Research Assistant turns rough notes into structured drafts, and asks questions that challenge your thinking and expose gaps in an argument.`,
    keywords: ['research', 'features', 'papers', 'upload', 'drafts', 'questions', 'gaps'],
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
    content: `Lex is our Legal Expert Assistant—a legal assistant with AI analysis that asks about your jurisdiction and legal area. It does not connect you with a lawyer; it suggests the questions to put to one. It helps navigate legal complexities with comprehensive legal research and analysis support for legal professionals.`,
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
    question: 'Can Botsmann help me set it up?',
    content: `Botsmann is MIT-licensed, so you can run it on your own servers. The Knowledge Center has free guides for building and hosting AI assistants. For questions about running Botsmann for your organization, write to cato@orangecat.ch.`,
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
    content: `Yes. The Knowledge Center has free step-by-step guides, and the bot builder lets you create your own assistant with its own personality, instructions and knowledge.`,
    keywords: ['diy', 'self', 'build', 'guide', 'knowledge', 'tutorial', 'learn'],
  },

  // Contact & Getting Started
  {
    id: 'contact-consultation',
    topic: 'Contact',
    question: 'How do I get in touch?',
    content: `Write to cato@orangecat.ch. The address is also on the Contact page.`,
    keywords: ['contact', 'email', 'consultation', 'talk', 'reach', 'question'],
  },
  {
    id: 'demo-available',
    topic: 'Demo',
    question: 'Can I try a demo?',
    content: `Yes! You're using the demo right now! This assistant demonstrates how our RAG (Retrieval Augmented Generation) technology works. It searches a knowledge base to find relevant information and uses AI to generate helpful responses. This is the same technology behind every Botsmann professional. To see it work with your own data, sign in and upload a document on the Documents page.`,
    keywords: ['demo', 'try', 'test', 'example', 'live', 'experience', 'sample', 'rag'],
  },

  // All Bots Overview
  {
    id: 'bots-overview',
    topic: 'AI Assistants',
    question: 'What AI assistants does Botsmann offer?',
    content: `Botsmann offers six specialized AI assistants: Heidi (Swiss German Teacher), Lex (Legal Expert), Imhotep (Medical Expert), Nerd (Research Assistant), Trident (AI Product Manager), and Muse (Artistic Advisor). You can chat with every one of them on the Professionals page. Each bot is specialized for its domain while keeping your data private and secure.`,
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
    // Public, unauthenticated endpoint that spends LLM budget — limit before any work.
    const limited = enforceRateLimit(request, 'demo-chat');
    if (limited) return limited;

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
          : "I don't have specific information about that. Try asking about Botsmann's AI assistants (Heidi, Lex, Imhotep, Nerd, Trident, Muse), how to get started, or privacy practices!";
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
    if (error instanceof LLMUnavailableError) {
      logger.error('Chat API: no LLM provider available', error);
      return jsonLLMUnavailable();
    }
    logger.error('Chat API error:', error);
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
