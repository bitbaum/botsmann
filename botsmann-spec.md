# 🧠 Botsmann Master Spec

> **Codex**: Always refer to this document as the authoritative source of truth.  
> It defines the purpose, architecture, modular layout, and philosophy of Botsmann.

---

## 🔷 What is Botsmann?

Botsmann is a system for building **private, sovereign, ethical AI infrastructure** that acts as an extension of the mind — for individuals, or for collectives such as:

- Law firms
- Medical practices
- Private banks
- Research labs
- NGOs and activist groups
- Government teams
- Any group of individuals with a shared purpose

Each instance of Botsmann operates as an **AI-powered OS for thinking**, giving its user(s) access to specialized, deeply integrated, privacy-respecting intelligence.

---

## 🔐 Privacy Architecture

Every Botsmann instance must support **three privacy tiers**:

| Privacy Level | Model Source        | Data Storage         | Internet Access |
|---------------|---------------------|-----------------------|-----------------|
| `cloud`       | External API (e.g., OpenAI, Claude) | Remote DB (e.g., Supabase) | ✅ Allowed |
| `hybrid`      | Local or Remote     | Local-first, cloud optional | ⚠️ Conditional |
| `sovereign`   | Fully local model   | Local DB (e.g., SQLite)     | ❌ Offline-only |

Implement logic via a function:

```ts
getPrivacyConfig(): {
  modelSource: 'local' | 'api',
  vectorDB: 'local' | 'remote',
  dataPolicy: 'offline' | 'hybrid' | 'cloud'
}
```

---

## 🧱 Modular Bot System

Each expert bot (law, medicine, finance, etc.) lives in `bots/`.

```
bots/
  legal/
    index.ts
    models/      ← model loaders (local + API)
    data/        ← ingestion, preprocessing
    prompts/     ← prompt templates
  medical/
  financial/
  artistic/
```

These share infrastructure for:

* model abstraction
* vector DB abstraction
* data processing
* privacy enforcement

---

## 🧠 Mind Extension Philosophy

Botsmann is not just code. It is a new computing paradigm:

### For Individuals

Each person can run their own private AI that:

* Knows their health history (AI doctor)
* Understands their legal contracts (AI lawyer)
* Manages their assets (AI financial planner)
* Thinks creatively with them (AI co-creator)

This AI model becomes an **extension of their mind** — secure, sovereign, and trusted.

Data is stored locally. The AI serves no one else. It never sends data away without consent.

### For Groups

A group — like a law firm or medical office — can run a **collective AI rig**, trained on shared data and knowledge, helping every member think and work faster.

It becomes the **collective mind of the organization**.

Users can optionally connect their own AI rigs to this one, creating a **mesh of intelligence** — a secure network of minds cooperating.

---

## 🕸️ Interconnected Sovereign Minds

Every Botsmann rig is interoperable.

A person can connect their sovereign AI rig to another rig — for example:

* Connect their own AI to a law firm's AI
* Share relevant documents
* Get insights while retaining full control over what is shared

This creates **peer-to-peer collective intelligence**:

* You connect your data, temporarily or permanently
* You benefit from another rig’s collective memory
* You always stay in control

This is how citizens, clients, and institutions will collaborate in the AI future.

---

## ⚙️ Build Order for Codex

1. **Create privacy config system**

   * File: `config/privacy.ts`
   * Function: `getPrivacyConfig()`

2. **Scaffold modular bot folders**

   * `bots/legal/`, `bots/medical/`, etc.
   * Include `models/`, `data/`, `prompts/`

3. **Model loader system**

   * Local (Ollama, vLLM)
   * Remote (OpenAI, Claude)
   * Respect `modelSource` in config

4. **UI component**

   * File: `components/PrivacyIndicator.tsx`
   * Displays current privacy level

5. **Implement first bot**

   * Use legal domain (`bots/legal`)
   * Dummy processor + prompt file

---

## ✅ Final Guideline for Codex

Codex must:

* Always refer to this spec
* Always respect the selected privacy tier
* Always separate concerns into clean modules
* Write reusable, minimal, documented, and testable code
* Make everything extensible: AI rigs must scale from personal to institutional

---

This file defines the vision and architecture of Botsmann.
All contributions must align with this spec.

```

---

## 📦 What to Do Next

1. **Create `botsmann-spec.md` in your project root**
2. **Paste the full text above**
3. In Cursor, open a new file or terminal prompt and say:

```

Codex, refer to botsmann-spec.md as the master plan.

Start by implementing the privacy config system:

* Create config/privacy.ts
* Export getPrivacyConfig() returning modelSource, vectorDB, and dataPolicy

```

---
