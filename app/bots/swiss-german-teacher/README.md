# Heidi - Swiss German Teacher

## Overview

Heidi is an AI-powered Swiss German language teacher designed to help learners master both High German (Hochdeutsch) and Swiss German dialects, with a special focus on Züridütsch (Zurich dialect). Named after the beloved Swiss literary character, Heidi serves as your friendly companion for language learning, cultural immersion, and social integration in Switzerland.

Unlike generic language apps, Heidi combines language instruction with practical cultural insights, local events discovery, and real-world communication tools—helping you not just learn the language, but truly live like a local in Switzerland.

## Core Value Proposition

**Master Swiss German and High German** while discovering Swiss culture, connecting with locals, and navigating daily life in Switzerland with confidence.

## Key Features

### 1. Dual-Language Learning (High German + Züridütsch)

#### Comparative Language Tables
- **Side-by-Side Comparison**: See High German and Züridütsch translations together
- **Real-Life Examples**: Every word and phrase shown in practical contexts
- **Pronunciation Guides**: Phonetic transcriptions for Swiss German sounds
- **Grammar Patterns**: Understand how Swiss German differs from High German

#### Vocabulary Building
- **Contextualized Learning**: Words taught in real-world scenarios
- **Idiomatic Expressions**: Swiss-specific phrases and sayings
- **Formal vs. Casual**: When to use each register appropriately
- **Canton Variations**: Differences across Swiss German dialects

#### Interactive Practice
- **Adaptive Learning**: System learns your level and adjusts difficulty
- **Smart Testing**: Intelligent spaced repetition for better retention
- **Progress Tracking**: Monitor your advancement in both languages
- **Mistake Analysis**: Learn from errors with detailed explanations

### 2. Communication Tools

#### Email & Text Crafting
- **Dual-Language Composition**: Write emails in both High German and Züridütsch
- **Context-Aware Suggestions**: Appropriate tone for business, casual, or formal situations
- **Grammar Correction**: Real-time fixes and explanations
- **Cultural Appropriateness**: Ensure your messages fit Swiss communication norms

#### Conversation Practice
- **Real-World Scenarios**: Practice ordering food, asking directions, making appointments
- **Pronunciation Feedback**: Improve your Swiss German accent
- **Dialogue Simulation**: Interactive conversations with AI responses
- **Swiss Etiquette**: Learn cultural norms and social customs

### 3. Local Integration & Events

#### Zurich Events Discovery
- **Tonight's Events**: See what's happening today in Zurich
- **This Week's Activities**: Plan your week with local events
- **Cultural Events**: Concerts, exhibitions, festivals, theater
- **Social Gatherings**: Meetups, language exchanges, community events
- **Seasonal Highlights**: Special events throughout the year

#### Cultural Immersion
- **Swiss History**: Learn about Switzerland's past and traditions
- **Local Customs**: Understand social norms and etiquette
- **Regional Differences**: Navigate the 26 cantons' unique characteristics
- **Food & Dining**: Swiss cuisine, dining customs, and local specialties
- **Practical Tips**: Banking, transportation, bureaucracy navigation

### 4. Personalized Learning

#### Adaptive System
- **Learning Style Detection**: Adjusts to how you learn best
- **Interest-Based Content**: Topics tailored to your hobbies and profession
- **Goal Setting**: Define objectives and track progress
- **Smart Reminders**: Practice prompts based on your schedule

#### Progress Analytics
- **Skill Assessment**: Regular evaluation of language proficiency
- **Strength & Weakness Analysis**: Focus on areas needing improvement
- **Learning Velocity**: Track how quickly you're advancing
- **Achievement Milestones**: Celebrate progress with clear markers

### 5. Swiss Cultural Education

#### Cantonal Knowledge
- **26 Canton Overview**: Understand each Swiss region
- **Dialect Variations**: Key differences in Swiss German across cantons
- **Local Traditions**: Canton-specific customs and celebrations
- **Historical Context**: How regions shaped Swiss culture

#### Social Integration
- **Making Friends**: Tips for connecting with locals
- **Professional Networking**: Swiss business culture and etiquette
- **Community Participation**: Find clubs, groups, and organizations
- **Expat Resources**: Support for foreigners settling in Switzerland

### 6. Collaborative Learning Workspace (The Botsmann Model)

**The workspace is where learners, AI, and native teachers collaborate on Swiss German mastery.**

#### How It Works: 80/20 Split

**AI Does (80% of the work):**
- Vocabulary lessons across 7M Swiss German embeddings
- Grammar practice and pattern recognition
- Translation (High German ↔ Züridütsch)
- Written conversation practice
- Cultural context and explanations
- Spaced repetition and progress tracking

**Native Teacher Does (20% of the work - Liability Management):**
- Pronunciation coaching and accent correction
- Real-time conversation practice
- Cultural nuances and local expressions
- Dialect variations (Bernese, Basel, etc.)
- Social integration guidance
- Personalized feedback on speaking

#### Workspace Lifecycle

**Phase 1: Learner + AI (Most Cases)**
1. Learner sets goals, level, learning preferences in private workspace
2. AI analyzes with language expertise (RAG with 7M Swiss German embeddings)
3. AI provides lessons, vocabulary, grammar practice
4. AI determines if native teacher needed (especially for pronunciation)

**Phase 2: Adding Native Teacher (When Needed)**
1. AI identifies needs (e.g., "pronunciation practice for Züridütsch")
2. Learner invites teacher to workspace with access control
3. Teacher sees all context (learner's level, AI lessons, progress)
4. Teacher focuses on speaking and cultural nuances (AI handles vocabulary prep)

**Phase 3: Ongoing Collaboration**
- Learner practices with AI daily, uploads conversation recordings
- AI tracks progress and identifies problem areas
- Teacher reviews recordings and provides coaching
- All learning materials in one workspace

#### Privacy & Data Ownership

Learner owns all learning data with three deployment options:
- **Self-Hosted**: All data on learner's hardware, AI runs locally (Ollama/Llama)
- **Cloud Encrypted**: AES-256 encryption, learner holds keys, zero-knowledge architecture
- **Enterprise**: Language schools can host for students with compliance

#### Cost Savings Example

**Traditional Model:** Teacher does everything (100% of work)
- Cost: CHF 80/hr × 50 hours = CHF 4,000 (beginner to intermediate)

**Botsmann Workspace Model:** AI does vocabulary/grammar (80%), teacher does speaking (20%)
- AI Cost: CHF 29/month × 3 months = CHF 87
- Teacher Cost: CHF 80/hr × 10 hours = CHF 800
- **Total: CHF 887 vs CHF 4,000 (78% savings)**

**Benefits:**
- 80% cost reduction for learners
- 3x more students for teachers (AI does prep)
- Better fluency (AI consistency + human pronunciation)

## Current Capabilities

### Language Support
- **High German (Hochdeutsch)**: Standard German as taught in schools
- **Züridütsch (Zurich Dialect)**: Primary Swiss German focus
- **Other Swiss Dialects**: Basic coverage of Bernese, Basel, and other variants
- **English Support**: Interface and explanations available in English

### Interactive Features
1. **Language Comparison Tool**: Type a word/phrase, get High German + Züridütsch table
2. **Email/Text Generator**: Input your message intent, receive dual-language versions
3. **Events Browser**: Discover tonight's and this week's Zurich events
4. **Cultural Quiz**: Test your knowledge of Swiss customs and language
5. **Pronunciation Coach**: Practice Swiss German sounds with feedback

### Content Areas
- **Everyday Conversations**: Greetings, shopping, dining, transportation
- **Professional Language**: Business German, office terminology, formal communication
- **Social Situations**: Making friends, dating, family gatherings
- **Swiss Administration**: Bureaucracy, healthcare, banking terminology
- **Cultural Topics**: History, politics, traditions, food, sports

## File Structure

```
swiss-german-teacher/
├── page.tsx                      # Main page component
├── README.md                     # This documentation
└── components/
    ├── hero/                     # Landing section
    │   └── HeroSection.tsx       # Main hero introduction
    ├── language-learning/        # Language learning features
    │   └── LanguageLearningSection.tsx
    ├── communication/            # Communication tools
    │   └── CommunicationSection.tsx
    ├── social/                   # Social integration features
    │   └── SocialSection.tsx
    ├── content/                  # Swiss cultural content
    │   └── SwissContentSection.tsx
    ├── future/                   # Future vision and roadmap
    │   └── FutureVisionSection.tsx
    └── shared/                   # Shared components
        └── WaitlistForm.tsx      # Beta waitlist signup
```

## Current Status

**⚠️ Proof of Concept Stage**

Heidi is currently a UI/UX prototype demonstrating the vision for Swiss German language learning. The current implementation showcases the intended user experience with static content and mockups.

**What Works Now:**
- ✅ Complete feature showcase and learning methodology
- ✅ Swiss cultural content structure
- ✅ Bilingual interface design (High German + Züridütsch examples)
- ✅ Events discovery framework
- ✅ Mobile-responsive Swiss-themed design

**What's Coming (Q2-Q3 2026):**
- ⏳ Real AI-powered language instruction with GPT-4
- ⏳ Swiss German speech recognition and pronunciation feedback
- ⏳ Adaptive learning with spaced repetition (SM-2 algorithm)
- ⏳ Live Zurich events integration (API scraping)
- ⏳ High German ↔ Züridütsch translation with dialect variations

## Technical Implementation Plan

This section details exactly how Heidi will be built as a production-ready Swiss German language learning platform.

### AI Architecture (Planned)

```
User Input (text/speech)
    ↓
Language Detection (High German/Swiss German/English) → GPT-4
    ↓
Intent Classification (translate/learn/practice/events)
    ↓
Content Generation Path:
  ├─ Translation: High German ↔ Züridütsch + variations
  ├─ Learning: Vocabulary + grammar + pronunciation
  ├─ Practice: Conversation simulation + feedback
  └─ Events: Real-time Zurich event scraping + filtering
    ↓
Personalization Engine (user level, interests, goals)
    ↓
Response Generation → GPT-4 with Swiss context
    ↓
Output (text + audio + exercises) → User
```

### Core AI Components

#### 1. Swiss German Language Model & Dataset

**Challenge:** Swiss German (Schwyzerdütsch) is a collection of Alemannic dialects with:
- No standardized written form
- Significant regional variations (26 cantons, multiple subdialects)
- Limited training data compared to High German
- Phonetic spelling variations (same word can be written multiple ways)

**Solution: Custom Fine-tuned Model**

```typescript
// Swiss German training data collection and preprocessing
async function buildSwissGermanCorpus() {
  // 1. Data sources for Swiss German
  const dataSources = {
    // Written Swiss German
    swissTextCorpus: {
      source: 'Swiss Text Corpus (ArchiMob, SpinAndy)',
      size: '~500K sentences',
      dialects: ['zurich', 'bern', 'basel', 'st-gallen']
    },
    // Social media and forums
    socialMedia: {
      sources: ['Twitter/X Swiss German posts', 'Reddit r/Switzerland', 'Swiss forums'],
      size: '~2M short texts'
    },
    // Swiss German literature and songs
    cultural: {
      sources: ['Swiss German poetry', 'Mundart song lyrics', 'folk tales'],
      size: '~100K texts'
    },
    // Parallel corpus (High German ↔ Swiss German)
    parallel: {
      sources: ['ArchiMob transcriptions', 'manually curated pairs'],
      size: '~200K parallel sentences'
    }
  };

  // 2. Preprocessing: Handle Swiss German writing variations
  const corpus = [];

  for (const [category, data] of Object.entries(dataSources)) {
    const texts = await fetchCorpusData(data.sources);

    for (const text of texts) {
      // Normalize Swiss German spelling variations
      const normalized = normalizeSwissGerman(text, {
        preserveDialect: true, // Keep dialect markers
        standardizeCommonWords: true, // e.g., "gsi/gsy/gseh" → "gsi" (been)
        annotateDialect: data.dialects // Tag which dialect
      });

      corpus.push({
        original: text,
        normalized,
        highGerman: await translateToHighGerman(text), // Parallel data
        dialect: detectDialect(text),
        category
      });
    }
  }

  return corpus; // ~2.8M texts total
}

// Fine-tune GPT-4 or use RAG with Swiss German knowledge base
async function createSwissGermanModel() {
  const corpus = await buildSwissGermanCorpus();

  // Option A: Fine-tuning (if OpenAI allows dialect fine-tuning)
  const fineTunedModel = await openai.fineTuning.create({
    model: 'gpt-4o-mini', // Start with smaller model
    training_data: corpus.map(c => ({
      messages: [
        { role: 'system', content: 'You are a Swiss German language expert. Translate and teach Züridütsch.' },
        { role: 'user', content: c.highGerman },
        { role: 'assistant', content: c.normalized }
      ]
    })),
    validation_data: corpus.slice(0, 1000) // Hold out for validation
  });

  // Option B: RAG approach (more likely)
  // Store Swiss German examples in vector database
  const embeddings = await openai.embeddings.create({
    model: 'text-embedding-3-large',
    input: corpus.map(c => `High German: ${c.highGerman}\nZüridütsch: ${c.normalized}`)
  });

  await vectorDB.upsert(
    embeddings.data.map((emb, i) => ({
      id: `swiss-german-${i}`,
      values: emb.embedding,
      metadata: {
        highGerman: corpus[i].highGerman,
        swissGerman: corpus[i].normalized,
        dialect: corpus[i].dialect,
        category: corpus[i].category,
        examples: corpus[i].examples || []
      }
    }))
  );

  return { model: fineTunedModel, ragDB: vectorDB };
}
```

**Corpus Size Estimate:**
- Swiss German examples: ~2.8M texts → ~5.6M embeddings (parallel pairs)
- High German grammar/vocabulary: ~1M examples
- Cultural content: ~500K texts
- **Total: ~7M embeddings** (~22GB vector storage)

#### 2. Translation System: High German ↔ Züridütsch

```typescript
// Bidirectional translation with dialect awareness
async function translateGermanSwiss(
  text: string,
  direction: 'to-swiss' | 'to-high-german',
  targetDialect: 'zurich' | 'bern' | 'basel' | 'general' = 'zurich',
  formality: 'formal' | 'casual' = 'casual'
) {
  // 1. Retrieve similar translation pairs from corpus
  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-large',
    input: text
  });

  const similarPairs = await vectorDB.query({
    vector: queryEmbedding.data[0].embedding,
    topK: 15,
    filter: {
      dialect: targetDialect,
      direction: direction
    }
  });

  // 2. Use GPT-4 with Swiss German context for translation
  const translation = await openai.chat.completions.create({
    model: 'gpt-4',
    temperature: 0.3, // Lower for consistency
    messages: [{
      role: 'system',
      content: `You are a Swiss German translation expert specializing in ${targetDialect} dialect.

RULES:
1. Translate ${direction === 'to-swiss' ? 'High German to Züridütsch' : 'Züridütsch to High German'}
2. Use ${formality} register
3. Provide natural-sounding translations that locals actually use
4. Include pronunciation guide for Swiss German
5. Note any cultural context or usage tips

Swiss German spelling conventions:
- "ch" is common (chli, richtig → rächtli)
- Double vowels for long sounds (aa, ee, oo)
- "k" often becomes "gg" (Kind → Chind, but spoken as "Chind")
- No "ß", use "ss"
`
    }, {
      role: 'user',
      content: `Translate: "${text}"

Similar examples from corpus:
${similarPairs.matches.slice(0, 5).map(m =>
  `HG: ${m.metadata.highGerman} → ZH: ${m.metadata.swissGerman}`
).join('\n')}`
    }],
    response_format: { type: 'json_object' }
  });

  const result = JSON.parse(translation.choices[0].message.content);

  return {
    original: text,
    translated: result.translation,
    pronunciation: result.pronunciation || null,
    formality,
    dialect: targetDialect,
    notes: result.notes || '',
    examples: result.usage_examples || []
  };
}
```

#### 3. Adaptive Learning System with Spaced Repetition

```typescript
// Spaced Repetition (SM-2 Algorithm) for vocabulary retention
interface LearningCard {
  id: string;
  userId: string;
  highGerman: string;
  swissGerman: string;
  type: 'vocabulary' | 'grammar' | 'phrase';

  // SM-2 algorithm variables
  easeFactor: number;      // Default 2.5
  interval: number;        // Days until next review
  repetitions: number;     // Number of successful reviews
  nextReview: Date;        // When to show again

  // Learning metadata
  correctCount: number;
  incorrectCount: number;
  lastReviewed: Date | null;
  masteryLevel: 'beginner' | 'intermediate' | 'advanced' | 'mastered';
}

// SM-2 Spaced Repetition Algorithm
function calculateNextReview(
  card: LearningCard,
  userResponse: 0 | 1 | 2 | 3 | 4 | 5 // Quality of response (0=complete failure, 5=perfect)
): LearningCard {
  const updated = { ...card };

  if (userResponse < 3) {
    // Failed recall: reset repetitions, show again soon
    updated.repetitions = 0;
    updated.interval = 1; // Review tomorrow
    updated.incorrectCount++;
  } else {
    // Successful recall: increase interval
    updated.correctCount++;

    if (updated.repetitions === 0) {
      updated.interval = 1;
    } else if (updated.repetitions === 1) {
      updated.interval = 6;
    } else {
      updated.interval = Math.round(updated.interval * updated.easeFactor);
    }

    updated.repetitions++;

    // Adjust ease factor based on response quality
    updated.easeFactor = Math.max(
      1.3,
      updated.easeFactor + (0.1 - (5 - userResponse) * (0.08 + (5 - userResponse) * 0.02))
    );
  }

  // Set next review date
  updated.nextReview = new Date(Date.now() + updated.interval * 24 * 60 * 60 * 1000);
  updated.lastReviewed = new Date();

  // Update mastery level
  if (updated.correctCount > 20 && updated.incorrectCount < 3) {
    updated.masteryLevel = 'mastered';
  } else if (updated.correctCount > 10) {
    updated.masteryLevel = 'advanced';
  } else if (updated.correctCount > 5) {
    updated.masteryLevel = 'intermediate';
  }

  return updated;
}

// Personalized lesson generation
async function generatePersonalizedLesson(userId: string) {
  // 1. Get user's learning cards due for review
  const dueCards = await db.learningCards.find({
    userId,
    nextReview: { $lte: new Date() }
  }).sort({ nextReview: 1 }).limit(20);

  // 2. Analyze user's weak areas
  const weakAreas = await analyzeUserWeaknesses(userId);

  // 3. Generate new content targeting weak areas
  const newContent = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: `Generate 5 Swiss German learning exercises targeting: ${weakAreas.join(', ')}.
                Mix vocabulary, grammar, and conversational practice.`
    }, {
      role: 'user',
      content: `User level: ${weakAreas.level}\nDialect: Züridütsch`
    }],
    response_format: { type: 'json_object' }
  });

  const exercises = JSON.parse(newContent.choices[0].message.content);

  return {
    review: dueCards,
    newExercises: exercises,
    focusAreas: weakAreas
  };
}
```

#### 4. Speech Recognition & Pronunciation Feedback

```typescript
// Swiss German pronunciation assessment
async function assessPronunciation(
  audioBlob: Blob,
  targetPhrase: string,
  dialect: 'zurich' | 'bern' | 'basel'
) {
  // 1. Convert speech to text using Whisper
  const transcription = await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file: audioBlob,
    language: 'de', // German (will recognize Swiss German)
    response_format: 'verbose_json'
  });

  // 2. Analyze pronunciation using phonetic comparison
  const phoneticTarget = await getSwissGermanPhonetics(targetPhrase, dialect);
  const phoneticSpoken = await getSwissGermanPhonetics(transcription.text, dialect);

  const phonemeMatches = comparePhonemes(phoneticTarget, phoneticSpoken);

  // 3. Generate feedback using GPT-4
  const feedback = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: `You are a Swiss German pronunciation coach. Provide constructive feedback on pronunciation.`
    }, {
      role: 'user',
      content: `Target: "${targetPhrase}" (${phoneticTarget})
                Spoken: "${transcription.text}" (${phoneticSpoken})
                Phoneme matches: ${JSON.stringify(phonemeMatches)}`
    }]
  });

  return {
    transcribed: transcription.text,
    accuracy: phonemeMatches.overallScore,
    feedback: feedback.choices[0].message.content,
    specificErrors: phonemeMatches.errors,
    audioPlayback: await generateSwissGermanAudio(targetPhrase, dialect)
  };
}

// Generate Swiss German audio (TTS)
async function generateSwissGermanAudio(text: string, dialect: string): Promise<Blob> {
  // Challenge: OpenAI TTS doesn't support Swiss German
  // Solution options:
  // 1. Use Swiss German TTS services (e.g., ReadSpeaker, custom models)
  // 2. Fine-tune Coqui TTS on Swiss German corpus
  // 3. Use High German TTS with adjusted phonetics (temporary)

  // For now: Use OpenAI TTS with closest approximation
  const audio = await openai.audio.speech.create({
    model: 'tts-1-hd',
    voice: 'shimmer', // Female voice closest to Swiss pronunciation
    input: text,
    speed: 0.9 // Slightly slower for learners
  });

  return audio;
}
```

#### 5. Zurich Events Integration

```typescript
// Real-time event scraping and curation
async function fetchZurichEvents(timeframe: 'today' | 'this-week') {
  const sources = [
    { name: 'Zürich Tourism', url: 'https://www.zuerich.com/en/visit/events' },
    { name: 'Ron Orp', url: 'https://www.ronorp.net/zurich.aspx' },
    { name: 'Züritipp', url: 'https://www.zueritipp.ch/' },
    { name: 'Eventfrog', url: 'https://www.eventfrog.ch/de/c/party-events/ch/zurich.html' }
  ];

  const allEvents = [];

  for (const source of sources) {
    try {
      // Scrape with Playwright
      const page = await browser.newPage();
      await page.goto(source.url);

      // Extract event data (custom selectors per source)
      const events = await page.evaluate((timeframe) => {
        // Source-specific scraping logic
        const eventElements = document.querySelectorAll('.event-card'); // Example
        return Array.from(eventElements).map(el => ({
          title: el.querySelector('.title')?.textContent,
          date: el.querySelector('.date')?.textContent,
          location: el.querySelector('.location')?.textContent,
          description: el.querySelector('.description')?.textContent,
          url: el.querySelector('a')?.href
        }));
      }, timeframe);

      allEvents.push(...events.map(e => ({ ...e, source: source.name })));
      await page.close();
    } catch (error) {
      console.error(`Failed to scrape ${source.name}:`, error);
    }
  }

  // Filter and deduplicate
  const filtered = deduplicateEvents(allEvents);
  const today = new Date();

  return timeframe === 'today'
    ? filtered.filter(e => isSameDay(parseDate(e.date), today))
    : filtered.filter(e => isThisWeek(parseDate(e.date)));
}

// Event recommendation based on user interests
async function recommendEvents(userId: string, events: Event[]) {
  const user = await db.users.findOne({ id: userId });
  const interests = user.interests || [];

  // Embed user interests and event descriptions
  const interestEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-large',
    input: interests.join(' ')
  });

  const eventEmbeddings = await Promise.all(
    events.map(e => openai.embeddings.create({
      model: 'text-embedding-3-large',
      input: `${e.title} ${e.description}`
    }))
  );

  // Rank by relevance
  const rankedEvents = events.map((event, i) => ({
    ...event,
    relevance: cosineSimilarity(
      interestEmbedding.data[0].embedding,
      eventEmbeddings[i].data[0].embedding
    )
  })).sort((a, b) => b.relevance - a.relevance);

  return rankedEvents.slice(0, 10);
}
```

### Vector Database Architecture

**Choice: MongoDB Atlas Vector Search**

*Rationale:* Language learning requires:
1. **Bilingual pairs**: Store High German ↔ Swiss German parallel corpus
2. **Dialect variations**: Filter by Zurich, Bern, Basel dialects
3. **User progress data**: Integrate with learning cards in same DB
4. **Cultural content**: Swiss history, customs, events

**Schema:**
```typescript
// MongoDB Collection: swiss_german_corpus
{
  _id: ObjectId,
  highGerman: "Guten Morgen, wie geht es dir?",
  swissGerman: "Guete Morge, wie gaht's?",
  dialect: "zurich",
  formality: "casual",
  category: "greeting",
  pronunciation: "['guːətə 'mɔrgə, viː gɑːts]",
  audioUrl: "https://...",
  embedding: [0.023, -0.891, ...], // 3072-dim vector
  examples: [
    { context: "meeting a friend", usage: "..." },
    { context: "at work", usage: "..." }
  ],
  difficulty: "beginner",
  relatedPhrases: ["guete Namitag", "guete Oobe"]
}

// Vector search index
db.swiss_german_corpus.createIndex({
  "embedding": "vectorSearch"
}, {
  "numDimensions": 3072,
  "similarity": "cosine"
});
```

### API Implementation

**Endpoint: Translation & Learning**
```typescript
// POST /api/heidi/translate
interface TranslateRequest {
  text: string;
  direction: 'to-swiss' | 'to-high-german';
  dialect?: 'zurich' | 'bern' | 'basel';
  formality?: 'formal' | 'casual';
}

export async function POST(req: Request) {
  const data: TranslateRequest = await req.json();

  const translation = await translateGermanSwiss(
    data.text,
    data.direction,
    data.dialect || 'zurich',
    data.formality || 'casual'
  );

  return Response.json(translation);
}

// POST /api/heidi/lesson
interface LessonRequest {
  userId: string;
}

export async function POST(req: Request) {
  const { userId } = await req.json();

  const lesson = await generatePersonalizedLesson(userId);

  return Response.json(lesson);
}

// GET /api/heidi/events
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const timeframe = searchParams.get('timeframe') as 'today' | 'this-week';

  const events = await fetchZurichEvents(timeframe);

  return Response.json({ events });
}
```

### Technical Architecture

#### Current (Proof of Concept)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS with Swiss-themed green/blue palette
- **UI Components**: Custom components with Swiss design aesthetics
- **State Management**: React hooks (useState, useEffect)
- **Routing**: Hash-based navigation with smooth scrolling
- **Data**: Static examples and mockups

#### Planned (Production)
- **Frontend**: Next.js 14 + TypeScript + Zustand
- **AI/ML**: OpenAI GPT-4 + Whisper (speech) + text-embedding-3-large
- **Vector DB**: MongoDB Atlas Vector Search
- **Swiss German Corpus**: ~7M embeddings from ArchiMob, social media, cultural texts
- **Speech**: Whisper transcription + custom Swiss German TTS
- **Learning Algorithm**: SM-2 spaced repetition + adaptive difficulty
- **Events Scraping**: Playwright for real-time Zurich event aggregation
- **Caching**: Redis for translations and frequent queries
- **Monitoring**: Track learning progress, translation quality, user engagement

### Design Principles
- **Swiss Aesthetics**: Clean, minimalist design reflecting Swiss design culture
- **Bilingual First**: Always show both languages side-by-side
- **Cultural Sensitivity**: Respectful representation of Swiss culture
- **Accessibility**: WCAG 2.1 AA compliant for all learners
- **Mobile-Friendly**: Optimized for learning on-the-go

## Use Cases

### For Language Learners
- Master both High German and Swiss German dialects
- Understand when to use formal vs. informal language
- Practice real-world conversations
- Improve pronunciation and comprehension

### For Expats in Switzerland
- Navigate daily life with confidence
- Understand Swiss cultural norms and customs
- Find social events and meet locals
- Communicate professionally and socially

### For Students
- Prepare for language exams (Goethe, TELC)
- Understand Swiss German in academic settings
- Learn vocabulary for specific fields of study
- Practice academic and professional communication

### For Professionals
- Master business German for Swiss workplaces
- Write professional emails in High German
- Understand Swiss business culture and etiquette
- Network effectively with Swiss colleagues

### For Swiss Culture Enthusiasts
- Dive deep into Swiss history and traditions
- Understand regional differences across cantons
- Learn about Swiss cuisine, music, and arts
- Connect with Swiss cultural events and activities

## Development

### Running Locally
```bash
npm run dev
```
Navigate to: `http://localhost:3000/bots/swiss-german-teacher`

### Testing
```bash
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

### Building for Production
```bash
npm run build
npm start
```

## Future Roadmap

### Q1 2025
- [ ] **Voice Recognition**: Real-time Swiss German speech recognition
- [ ] **Audio Lessons**: Native speaker recordings for all dialects
- [ ] **Mobile App**: iOS/Android apps for learning on-the-go
- [ ] **Dialect Expansion**: Coverage for all major Swiss German dialects

### Q2 2025
- [ ] **Live Tutoring**: Connect with Swiss German native speakers
- [ ] **Community Features**: Join study groups and practice partners
- [ ] **Gamification**: Achievements, leaderboards, and challenges
- [ ] **Cultural Deep-Dives**: Video content on Swiss traditions

### Q3 2025
- [ ] **AR Integration**: Point camera at objects for instant translations
- [ ] **Event Integration**: Direct event booking and RSVP
- [ ] **Social Network**: Connect with other learners and locals
- [ ] **Professional Certification**: Language proficiency certificates

### Q4 2025
- [ ] **Switzerland-Wide Coverage**: Events and culture for all cantons
- [ ] **Business Module**: Specialized Swiss business communication
- [ ] **Kids Version**: Swiss German for children and families
- [ ] **Integration Services**: Connect with Swiss integration programs

## Educational Approach

### Learning Methodology
- **Contextual Learning**: Teach language in real-life situations
- **Spaced Repetition**: Optimize retention with proven memory techniques
- **Cultural Integration**: Language and culture taught together
- **Practical Focus**: Emphasis on usable, everyday language
- **Error-Friendly**: Learn from mistakes without judgment

### Difficulty Levels
1. **Beginner (A1-A2)**: Basic vocabulary and simple sentences
2. **Intermediate (B1-B2)**: Complex conversations and grammar
3. **Advanced (C1-C2)**: Fluency in both formal and dialectal German
4. **Native-Level**: Idiomatic expressions and cultural nuances

### Progress Tracking
- **CEFR Alignment**: Track progress using Common European Framework
- **Skill Breakdown**: Reading, writing, listening, speaking
- **Dialect Proficiency**: Measure Swiss German comprehension separately
- **Cultural Knowledge**: Quiz performance on Swiss culture

## Integration Possibilities

### Current Integrations
- **Zurich Events API**: Real-time event discovery
- **Swiss German Dictionaries**: Comprehensive dialect databases
- **Cultural Resources**: Swiss history and tradition databases

### Planned Integrations
- **Language Exchange Platforms**: Tandem, HelloTalk integration
- **Swiss Media**: SRF, NZZ, Blick for authentic content
- **Cantonal Websites**: Official resources from all 26 cantons
- **Swiss Tourism**: Cultural sites and tourist information
- **Integration Offices**: Connect with official integration programs

## Privacy & Data

### User Privacy
- **GDPR Compliant**: Full compliance with Swiss and EU data protection laws
- **Data Encryption**: All personal data encrypted at rest and in transit
- **User Control**: Full control over data sharing and deletion
- **Anonymous Learning**: Option to learn without account creation

### Content Quality
- **Native Speaker Verified**: All Swiss German content validated by natives
- **Regular Updates**: Content refreshed quarterly for accuracy
- **Cultural Sensitivity**: Reviewed for appropriate cultural representation
- **Diverse Perspectives**: Content represents all Swiss regions fairly

## Contributing

See main Botsmann contributing guidelines. For Heidi-specific contributions:

1. **Swiss German Content**: Native speakers preferred for dialect content
2. **Cultural Accuracy**: Verify Swiss cultural information with reliable sources
3. **Event Data**: Keep Zurich event information current and accurate
4. **Translation Quality**: Ensure High German ↔ Züridütsch accuracy

## Resources

### Learning Resources
- **Swiss German Dictionary**: Comprehensive Züridütsch vocabulary
- **Grammar Guides**: Detailed explanations of Swiss German grammar
- **Cultural Guides**: Swiss etiquette, customs, and traditions
- **Audio Library**: Native speaker pronunciation examples

### External Links
- **Swiss German Websites**: Links to authentic Swiss German resources
- **Language Exchange**: Partner finding for practice
- **Swiss Culture**: Museums, cultural centers, historical sites
- **Official Integration**: Swiss government integration resources

## Support

- **Email**: heidi@botsmann.com
- **Language Support**: language@botsmann.com
- **Documentation**: https://docs.botsmann.com/heidi
- **Community**: https://community.botsmann.com/swiss-german

## License

Proprietary - All rights reserved

---

**Fun Fact**: Heidi is named after Johanna Spyri's beloved 1881 novel "Heidi," which tells the story of a young girl in the Swiss Alps. Just as the literary Heidi helped people understand Swiss mountain culture, our AI Heidi helps learners understand Swiss language and culture!

**Live Demo**: Try Heidi now at [https://chatgpt.com/g/g-rni41WTSh-heidi-tell](https://chatgpt.com/g/g-rni41WTSh-heidi-tell)

---

## Why Learn Swiss German?

### Professional Advantages
- **Career Opportunities**: Many Swiss jobs require Swiss German
- **Workplace Integration**: Better relationships with colleagues
- **Client Communication**: Connect with Swiss German-speaking customers
- **Networking**: Access to Swiss professional networks

### Social Benefits
- **Make Friends**: Connect authentically with locals
- **Understand Humor**: Get Swiss jokes and cultural references
- **Join Communities**: Participate in local clubs and activities
- **Feel at Home**: True integration into Swiss society

### Cultural Enrichment
- **Deeper Understanding**: Appreciate Swiss culture from the inside
- **Regional Pride**: Understand cantonal identities and traditions
- **Media Access**: Enjoy Swiss films, music, and literature
- **Historical Context**: Understand Switzerland's linguistic evolution

**Remember**: In Switzerland, speaking Swiss German isn't just about communication—it's about belonging. Heidi helps you achieve both! 🇨🇭
