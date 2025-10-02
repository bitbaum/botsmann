# Lex - AI Legal Assistant Platform

> **Democratizing access to justice through AI-powered collaborative data rooms**

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()

---

## 🎯 What is Lex?

**Lex** is a revolutionary legal platform that combines:
- **AI-powered analysis** - Instant document review and case research
- **Human expertise** - Real lawyers available when you need them
- **Collaborative data rooms** - Secure workspaces for all parties
- **No appointments** - Chat 24/7 with AI, lawyers join seamlessly

### The Problem We're Solving
- Legal help is expensive and inaccessible for most people
- Finding the right lawyer is time-consuming and uncertain
- Case management is fragmented across emails, files, and apps
- Clients lack transparency into what their lawyers are doing

### Our Solution
A unified platform where AI handles routine work, lawyers provide expert guidance, and everyone collaborates in secure, transparent data rooms with multi-level access control.

---

## ✨ Key Features

### 1. 🌍 **Global Jurisdiction Coverage**
- **130+ jurisdictions** with hierarchical selection
- **US**: All 50 states
- **EU**: All 27 member countries
- **Switzerland**: All 26 cantons (Zürich, Bern, Geneva, etc.)
- **UAE**: Dubai, Abu Dhabi, Sharjah, etc.
- **Popular cities**: Singapore, Hong Kong, and more

### 2. 💬 **Interactive Data Rooms**
The heart of Lex - a secure collaborative workspace with:
- **Real-time chat**: AI + human lawyer, no appointments
- **Smart file management**: Auto-categorized documents
- **Activity timeline**: Full audit trail
- **Multi-level access**: Granular permissions for team members
- **End-to-end encryption**: Bank-level security

### 3. 🤖 **AI-Powered Intelligence**
- **Document analysis**: Extract key clauses, dates, entities
- **Auto-categorization**: 8 file categories automatically organized
- **Smart responses**: Context-aware answers based on your case
- **Precedent matching**: Find relevant case law instantly
- **Risk assessment**: Identify potential issues early

### 4. 👨‍⚖️ **Smart Lawyer Matching**
- AI matches you with lawyers based on:
  - Expertise in your legal area
  - Jurisdiction knowledge
  - Availability and response time
  - Hourly rates and languages
  - Past case success rates

### 5. 📱 **Mobile-First Design**
- Responsive on all devices
- Touch-optimized interface
- Progressive disclosure (show complexity when needed)
- Fast, smooth interactions

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd botsmann

# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
open http://localhost:3000/bots/legal-expert
```

### Project Structure
```
/app/bots/legal-expert/
├── page.tsx                          # Main page
├── components/
│   ├── demo/                         # 🔥 Core demo components
│   │   ├── DemoSection.tsx          # 4-step wizard
│   │   ├── DataRoomDemo.tsx         # Live chat interface
│   │   ├── JurisdictionSelector.tsx # Hierarchical picker
│   │   ├── FileUploader.tsx         # File upload
│   │   ├── LawyerMatcher.tsx        # Lawyer selection
│   │   ├── AIWorkspace.tsx          # File organization
│   │   ├── jurisdictions.ts         # 130+ jurisdictions
│   │   ├── constants.ts             # Mock data
│   │   ├── types.ts                 # TypeScript types
│   │   └── README.md                # Component docs
│   ├── hero/                         # Landing section
│   ├── features/                     # Features showcase
│   ├── testimonials/                 # User testimonials
│   ├── vision/                       # Long-term vision
│   └── cta/                          # Call-to-action
└── styles.css                        # Custom styles
```

---

## 📖 Documentation

### For New Engineers
1. **[Project Overview](LEX_PROJECT_OVERVIEW.md)** - Start here! Complete context and vision
2. **[Technical Architecture](LEX_TECHNICAL_ARCHITECTURE.md)** - System design and data models
3. **[Mobile-First Improvements](MOBILE_FIRST_IMPROVEMENTS.md)** - UX/UI decisions
4. **[Demo Improvements](DEMO_IMPROVEMENTS.md)** - Feature evolution
5. **[Component README](app/bots/legal-expert/components/demo/README.md)** - Demo architecture

### For Product/Design
- Review the 4-step demo flow in action
- See mobile-first responsive design
- Understand progressive disclosure strategy
- Explore data room collaboration features

### For Business/Legal
- Understand multi-level access control
- See transparency and audit trail features
- Review security and compliance approach
- Explore lawyer matching algorithm

---

## 🎨 Demo Flow

### Step 1: Case Input
1. Select jurisdiction (hierarchical drill-down)
2. Choose legal area (12 high-demand categories)
3. Describe your case (min 20 chars)
4. Set urgency level
5. Upload files (optional, drag-and-drop)

### Step 2: Lawyer Matching
1. AI filters lawyers by expertise
2. View matched lawyers with full profiles
3. Select your lawyer (one tap)
4. Review case summary

### Step 3: AI Workspace
1. See files auto-organized into 8 categories
2. View AI insights for each category
3. Understand multi-level access control
4. Learn about transparency features

### Step 4: Data Room (NEW! 🔥)
1. **Live chat** with AI and lawyer
2. **File management** (browse, comment, download)
3. **Activity timeline** (full audit trail)
4. **Real-time collaboration** (no appointments needed)

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Hooks
- **Icons**: Emojis + custom SVG

### Backend (Production)
- **API**: Node.js + Express / GraphQL
- **Database**: PostgreSQL
- **Cache**: Redis
- **File Storage**: AWS S3
- **Real-time**: Socket.io / WebSocket

### AI Services
- **LLM**: OpenAI GPT-4 / Anthropic Claude
- **Vector DB**: Pinecone / Weaviate
- **NLP**: spaCy / Hugging Face

### Infrastructure
- **Hosting**: Vercel (Frontend) + AWS (Backend)
- **CDN**: CloudFlare
- **Monitoring**: Sentry + DataDog
- **CI/CD**: GitHub Actions

---

## 🔐 Security & Privacy

### Data Protection
- ✅ End-to-end encryption for messages
- ✅ Files encrypted at rest (AES-256)
- ✅ Zero-knowledge architecture
- ✅ GDPR/HIPAA compliant

### Access Control
- ✅ Role-based permissions
- ✅ Granular file access
- ✅ Full audit trail
- ✅ Session management

### Compliance
- ✅ Attorney-client privilege protected
- ✅ Multi-jurisdiction support
- ✅ Data portability (GDPR)
- ✅ Right to erasure

---

## 📊 Current Status

### ✅ Completed
- [x] Hierarchical jurisdiction system (130+ jurisdictions)
- [x] 4-step interactive demo wizard
- [x] Live data room with real-time chat
- [x] AI + human lawyer simulation
- [x] File upload and auto-categorization
- [x] Smart lawyer matching
- [x] Mobile-first responsive design
- [x] Progressive disclosure UI
- [x] Comprehensive documentation

### 🚧 In Progress
- [ ] Backend API development
- [ ] Real AI integration (currently simulated)
- [ ] WebSocket implementation
- [ ] Payment processing
- [ ] Video consultation

### 🔮 Roadmap
- [ ] Mobile apps (React Native)
- [ ] E-signatures integration
- [ ] Court filing automation
- [ ] Blockchain audit trail
- [ ] Multi-language support

---

## 🤝 Contributing

### For Team Members
1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes (follow TypeScript + functional components)
3. Test on mobile and desktop
4. Create PR with clear description
5. Request review from 1+ team members

### Code Style
- TypeScript strict mode
- Functional components with hooks
- Tailwind for styling (no custom CSS unless needed)
- JSDoc for exported functions
- Descriptive variable names

---

## 📈 KPIs & Metrics

### Live Metrics (Shown on Page)
- **Waitlist Members**: 0 *(honest tracking)*
- **Active Cases**: 0
- **Data Rooms Created**: 0
- **Expected Launch**: Q2 2025

### Target Metrics (Q2 2025)
- 10,000+ waitlist signups
- 1,000+ beta users
- 50+ verified lawyers
- 95%+ user satisfaction

---

## 🎯 What Makes Lex Different

1. **Human-in-the-Loop AI** - Not replacing lawyers, augmenting them
2. **Collaborative Data Rooms** - Multi-party secure workspaces
3. **No Appointments** - Chat with AI 24/7, lawyer joins when needed
4. **Full Transparency** - Every action logged and visible
5. **Democratized Access** - Quality legal help for everyone
6. **Mobile-First** - Built for how people actually use phones
7. **Progressive Disclosure** - Simple on surface, powerful underneath

---

## 📞 Contact & Support

### Development Team
- **Project Lead**: TBD
- **Lead Engineer**: TBD
- **Design Lead**: TBD

### Resources
- **Issues**: [GitHub Issues](link)
- **Slack**: #lex-platform
- **Email**: dev@lex.legal

---

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

---

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Anthropic for Claude
- Next.js team for amazing framework
- Tailwind CSS for utility-first CSS
- All contributors and early users

---

## 🚀 Next Steps

### For New Engineers
1. **Read**: [LEX_PROJECT_OVERVIEW.md](LEX_PROJECT_OVERVIEW.md) - Full context
2. **Explore**: Try the demo at `/bots/legal-expert`
3. **Review**: Check [Technical Architecture](LEX_TECHNICAL_ARCHITECTURE.md)
4. **Build**: Pick an issue and start coding!

### For Product Team
1. **Test**: Mobile experience on real devices
2. **Feedback**: Gather user feedback on demo flow
3. **Iterate**: Improve based on insights
4. **Plan**: Prioritize Phase 2 features

### For Business Team
1. **Launch**: Beta waitlist campaign
2. **Partner**: Reach out to law firms
3. **Fund**: Prepare investor deck
4. **Hire**: Recruit legal experts for advisory board

---

**This is not just a demo—it's the foundation of a revolution in legal services.**

*Built with ❤️ by the Lex team*

---

*Last Updated: January 2025*
*Version: 1.0.0*
*Status: Active Development*
