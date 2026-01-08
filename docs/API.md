# Botsmann API Documentation

## Overview

The Botsmann platform provides RESTful API endpoints for bot interactions, user management, and data integration. All API endpoints are serverless functions deployed on Vercel Edge Network.

**Base URL**: `https://botsmann.com/api` (production)
**Base URL**: `http://localhost:3000/api` (development)

## Authentication

### API Key Authentication

All API requests require an API key in the request headers.

```http
Authorization: Bearer YOUR_API_KEY
```

**Obtaining an API Key:**
1. Contact: api@botsmann.com
2. Provide: Use case, estimated request volume
3. Receive: API key via secure channel

### Rate Limiting

- **Free Tier**: 100 requests/hour
- **Pro Tier**: 1,000 requests/hour
- **Enterprise**: Custom limits

Rate limit headers included in responses:
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

---

## Core Endpoints

### Health Check

Check API and service health status.

**Endpoint**: `GET /api/health`

**Authentication**: Not required

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2025-10-03T12:00:00Z",
  "services": {
    "database": "connected",
    "ai": "operational"
  }
}
```

**Status Codes**:
- `200 OK`: All services operational
- `503 Service Unavailable`: One or more services down

---

### Consultation Form

Submit user consultation requests.

**Endpoint**: `POST /api/consultation`

**Authentication**: Not required (public endpoint with rate limiting)

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I need help with legal consultation",
  "botType": "legal-expert",
  "metadata": {
    "source": "website",
    "page": "/bots/legal-expert"
  }
}
```

**Required Fields**:
- `name` (string, 2-100 chars)
- `email` (string, valid email format)
- `message` (string, 10-2000 chars)

**Optional Fields**:
- `botType` (string, one of: legal-expert, medical-expert, research-assistant, etc.)
- `metadata` (object, custom tracking data)

**Response**:
```json
{
  "success": true,
  "message": "Consultation request submitted successfully",
  "id": "cons_abc123xyz"
}
```

**Status Codes**:
- `200 OK`: Request submitted successfully
- `400 Bad Request`: Invalid input data
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

**Error Response**:
```json
{
  "success": false,
  "error": "Invalid email format",
  "code": "VALIDATION_ERROR"
}
```

---

## Bot-Specific Endpoints

### Legal Expert (Lex)

#### Analyze Legal Case

**Endpoint**: `POST /api/bots/legal/analyze`

**Authentication**: Required

**Request Body**:
```json
{
  "caseDescription": "I was wrongfully terminated from my job...",
  "jurisdiction": "zurich",
  "legalArea": "employment",
  "urgency": "medium",
  "caseType": "personal"
}
```

**Response**:
```json
{
  "analysis": {
    "legalArea": "Employment Law",
    "jurisdiction": "Zurich (Federal & Cantonal Law)",
    "summary": "This appears to be a wrongful termination case...",
    "relevantLaws": [
      {
        "code": "OR Art. 336",
        "title": "Wrongful Termination",
        "description": "Protection against termination..."
      }
    ],
    "riskAssessment": "medium",
    "recommendedActions": [
      "Document all communications",
      "Consult with employment lawyer within 30 days",
      "File complaint with labor office"
    ]
  },
  "nextSteps": {
    "lawyerMatching": true,
    "estimatedCost": "2000-5000 CHF",
    "timeline": "2-6 months"
  }
}
```

#### Match Lawyers

**Endpoint**: `POST /api/bots/legal/match-lawyers`

**Authentication**: Required

**Request Body**:
```json
{
  "caseId": "case_abc123",
  "jurisdiction": "zurich",
  "legalArea": "employment",
  "budget": "5000",
  "urgency": "medium"
}
```

**Response**:
```json
{
  "matches": [
    {
      "id": "lawyer_123",
      "name": "Dr. Anna Müller",
      "specialization": "Employment Law",
      "experience": 15,
      "rating": 4.8,
      "languages": ["German", "English"],
      "pricing": {
        "consultation": 300,
        "hourly": 400,
        "fixedFee": 4500
      },
      "availability": "This week",
      "matchScore": 0.95
    }
  ]
}
```

---

### Medical Expert (Imhotep)

#### Health Question

**Endpoint**: `POST /api/bots/medical/question`

**Authentication**: Required

**Request Body**:
```json
{
  "question": "What are the symptoms of diabetes?",
  "context": {
    "age": 45,
    "gender": "male",
    "conditions": ["hypertension"]
  }
}
```

**Response**:
```json
{
  "answer": "Diabetes symptoms include...",
  "sources": [
    {
      "title": "Mayo Clinic - Diabetes Symptoms",
      "url": "https://www.mayoclinic.org/...",
      "relevance": 0.92
    }
  ],
  "disclaimer": "This is educational information only. Consult a healthcare professional for medical advice.",
  "relatedTopics": ["Type 2 Diabetes", "Blood Sugar Management"]
}
```

#### Symptom Analysis

**Endpoint**: `POST /api/bots/medical/symptom-analysis`

**Authentication**: Required

**Request Body**:
```json
{
  "symptoms": ["headache", "fever", "fatigue"],
  "duration": "3 days",
  "severity": "moderate",
  "demographics": {
    "age": 35,
    "gender": "female"
  }
}
```

**Response**:
```json
{
  "possibleConditions": [
    {
      "name": "Influenza",
      "probability": "high",
      "description": "Common viral infection...",
      "urgency": "monitor"
    },
    {
      "name": "COVID-19",
      "probability": "medium",
      "description": "Viral respiratory infection...",
      "urgency": "test_recommended"
    }
  ],
  "recommendations": [
    "Rest and hydration",
    "Over-the-counter pain relief",
    "Monitor temperature",
    "Seek medical attention if symptoms worsen"
  ],
  "seekImmediateCare": false,
  "disclaimer": "This is not a diagnosis. Consult a healthcare provider."
}
```

---

### Research Assistant (Nerd)

#### Literature Search

**Endpoint**: `POST /api/bots/research/search`

**Authentication**: Required

**Request Body**:
```json
{
  "query": "machine learning in healthcare",
  "filters": {
    "year": "2020-2025",
    "source": ["pubmed", "arxiv"],
    "documentType": "peer-reviewed"
  },
  "limit": 10
}
```

**Response**:
```json
{
  "results": [
    {
      "title": "Deep Learning for Medical Image Analysis",
      "authors": ["Smith, J.", "Doe, A."],
      "year": 2024,
      "abstract": "This study explores...",
      "url": "https://arxiv.org/...",
      "citations": 127,
      "relevanceScore": 0.94
    }
  ],
  "totalResults": 1247,
  "searchTime": "0.3s"
}
```

#### Generate Citation

**Endpoint**: `POST /api/bots/research/cite`

**Authentication**: Required

**Request Body**:
```json
{
  "url": "https://arxiv.org/abs/2024.12345",
  "style": "apa"
}
```

**Response**:
```json
{
  "citation": "Smith, J., & Doe, A. (2024). Deep Learning for Medical Image Analysis. arXiv preprint arXiv:2024.12345.",
  "bibtex": "@article{smith2024deep, title={Deep Learning...}, ...}"
}
```

---

### Swiss German Teacher (Heidi)

#### Translate Text

**Endpoint**: `POST /api/bots/swiss-german/translate`

**Authentication**: Required

**Request Body**:
```json
{
  "text": "Hello, how are you?",
  "from": "english",
  "to": "zurich-german",
  "context": "informal"
}
```

**Response**:
```json
{
  "translations": {
    "hochdeutsch": "Hallo, wie geht es dir?",
    "zuridutsch": "Hoi, wie gaats?",
    "pronunciation": "hoy, vee gaats"
  },
  "context": "informal greeting",
  "culturalNotes": "Swiss Germans typically use 'Hoi' instead of 'Hallo' in casual settings"
}
```

#### Get Zurich Events

**Endpoint**: `GET /api/bots/swiss-german/events`

**Authentication**: Required

**Query Parameters**:
- `date` (optional): Date for events (default: today, format: YYYY-MM-DD)
- `category` (optional): Event category (music, culture, sports, etc.)
- `limit` (optional): Number of results (default: 10, max: 50)

**Response**:
```json
{
  "events": [
    {
      "id": "event_123",
      "title": "Zürich Street Parade",
      "date": "2025-08-15",
      "time": "14:00",
      "location": "Innenstadt Zürich",
      "category": "music",
      "description": "Annual techno parade...",
      "url": "https://...",
      "price": "free"
    }
  ],
  "date": "2025-08-15",
  "totalEvents": 24
}
```

---

### Artistic Advisor (Artr)

#### Analyze Style

**Endpoint**: `POST /api/bots/artistic/analyze-style`

**Authentication**: Required

**Request Body**:
```json
{
  "imageUrl": "https://example.com/artwork.jpg",
  "analysisType": "comprehensive"
}
```

**Response**:
```json
{
  "style": {
    "primary": "Impressionism",
    "influences": ["Post-Impressionism", "Fauvism"],
    "confidence": 0.87
  },
  "composition": {
    "balance": "asymmetrical",
    "focalPoint": "upper-right quadrant",
    "colorHarmony": "complementary"
  },
  "techniques": [
    "Short brushstrokes",
    "Emphasis on light",
    "Visible texture"
  ],
  "recommendations": [
    "Experiment with bolder colors",
    "Consider rule of thirds for composition",
    "Add more contrast in focal areas"
  ]
}
```

---

### Product Manager (Trident)

#### Generate Documentation

**Endpoint**: `POST /api/bots/product/generate-docs`

**Authentication**: Required

**Request Body**:
```json
{
  "projectDescription": "Build a mobile app for restaurant reservations...",
  "documentType": "technical-spec",
  "includeArchitecture": true,
  "includeUserStories": true
}
```

**Response**:
```json
{
  "document": {
    "title": "Restaurant Reservation App - Technical Specification",
    "sections": [
      {
        "title": "System Architecture",
        "content": "...",
        "diagrams": ["architecture-diagram.png"]
      },
      {
        "title": "User Stories",
        "content": "...",
        "stories": [...]
      }
    ]
  },
  "format": "markdown",
  "downloadUrl": "https://..."
}
```

---

## Webhooks

Subscribe to bot events via webhooks.

### Subscribe to Webhook

**Endpoint**: `POST /api/webhooks/subscribe`

**Authentication**: Required

**Request Body**:
```json
{
  "url": "https://your-server.com/webhook",
  "events": ["bot.interaction", "consultation.submitted"],
  "botType": "legal-expert"
}
```

**Response**:
```json
{
  "webhookId": "wh_abc123",
  "status": "active",
  "secret": "whsec_abc123xyz"
}
```

### Webhook Payload

When an event occurs, we'll POST to your webhook URL:

```json
{
  "id": "evt_abc123",
  "type": "consultation.submitted",
  "timestamp": "2025-10-03T12:00:00Z",
  "data": {
    "consultationId": "cons_xyz789",
    "botType": "legal-expert",
    "user": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  },
  "signature": "sha256=..."
}
```

**Verifying Webhook Signatures:**

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}
```

---

## Error Handling

### Error Response Format

All errors follow this structure:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "email",
      "issue": "Invalid format"
    }
  },
  "requestId": "req_abc123",
  "timestamp": "2025-10-03T12:00:00Z"
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Missing or invalid API key |
| `FORBIDDEN` | 403 | API key lacks required permissions |
| `NOT_FOUND` | 404 | Requested resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `AI_SERVICE_ERROR` | 503 | AI model temporarily unavailable |
| `DATABASE_ERROR` | 500 | Database connection failed |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

---

## Data Models

### Bot Interaction

```typescript
interface BotInteraction {
  id: string;
  botType: string;
  userId?: string;
  sessionId: string;
  query: string;
  response: string;
  metadata: {
    model: string;
    tokens: number;
    latency: number;
  };
  timestamp: string;
}
```

### Consultation Request

```typescript
interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  message: string;
  botType?: string;
  status: 'pending' | 'contacted' | 'closed';
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
```

### User Profile

```typescript
interface UserProfile {
  id: string;
  email: string;
  name: string;
  preferences: {
    bots: string[];
    language: string;
    notifications: boolean;
  };
  apiKey?: string;
  subscription: 'free' | 'pro' | 'enterprise';
  createdAt: string;
}
```

---

## SDK & Libraries

### JavaScript/TypeScript SDK

```bash
npm install @botsmann/sdk
```

```typescript
import { BotsmannClient } from '@botsmann/sdk';

const client = new BotsmannClient({
  apiKey: process.env.BOTSMANN_API_KEY
});

// Legal bot example
const analysis = await client.legal.analyzeCase({
  caseDescription: "...",
  jurisdiction: "zurich",
  legalArea: "employment"
});

// Medical bot example
const answer = await client.medical.askQuestion({
  question: "What are symptoms of diabetes?"
});
```

### Python SDK (Coming Soon)

```bash
pip install botsmann
```

```python
from botsmann import BotsmannClient

client = BotsmannClient(api_key=os.getenv('BOTSMANN_API_KEY'))

analysis = client.legal.analyze_case(
    case_description="...",
    jurisdiction="zurich",
    legal_area="employment"
)
```

---

## API Versioning

Current version: **v1**

All endpoints are versioned in the URL path: `/api/v1/...`

**Deprecation Policy:**
- New versions announced 3 months in advance
- Old versions supported for 6 months after deprecation
- Breaking changes only in new major versions

---

## Best Practices

### Request Optimization

1. **Batch Requests**: Combine multiple queries when possible
2. **Cache Responses**: Cache non-time-sensitive data
3. **Use Webhooks**: Subscribe to events instead of polling
4. **Compress Payloads**: Use gzip compression for large requests

### Error Handling

```typescript
try {
  const response = await fetch('/api/bots/legal/analyze', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('API Error:', error.error.code, error.error.message);
    // Handle specific error codes
    if (error.error.code === 'RATE_LIMIT_EXCEEDED') {
      // Wait and retry
    }
  }

  const result = await response.json();
  return result;
} catch (error) {
  console.error('Network error:', error);
  // Handle network failures
}
```

### Rate Limit Handling

```typescript
async function makeRequestWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url, options);

    if (response.status === 429) {
      const resetTime = response.headers.get('X-RateLimit-Reset');
      const waitTime = parseInt(resetTime) * 1000 - Date.now();
      await new Promise(resolve => setTimeout(resolve, waitTime));
      continue;
    }

    return response;
  }
  throw new Error('Max retries exceeded');
}
```

---

## Support

### API Support Channels

- **Email**: api@botsmann.com
- **Documentation**: https://docs.botsmann.com/api
- **Status Page**: https://status.botsmann.com
- **Discord**: https://discord.gg/botsmann (coming soon)

### SLA (Enterprise Only)

- **Uptime**: 99.9% guaranteed
- **Response Time**: < 500ms (p95)
- **Support Response**: < 4 hours
- **Bug Fixes**: < 24 hours (critical)

---

## Changelog

### v1.0.0 (2025-10-03)
- Initial API release
- Core endpoints for all 6 bots
- Webhook support
- Rate limiting

### Upcoming
- **v1.1.0** (Q4 2025): Batch processing, advanced filtering
- **v1.2.0** (Q1 2026): Real-time WebSocket API
- **v2.0.0** (Q2 2026): GraphQL API, enhanced AI models

---

**API Version**: v1.0.0
**Last Updated**: October 2025
**Status**: ✅ Production Ready
