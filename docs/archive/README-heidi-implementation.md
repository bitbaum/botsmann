# Heidi – Your Swiss German Companion

This document outlines the implementation of Heidi, an AI-powered Swiss German language assistant integrated into the Botsmann platform.

## Overview

Heidi helps expats and learners master High German (Hochdeutsch) and Swiss German (Züridütsch), offering practical language tools, communication support, and cultural integration insights for Switzerland.

## Implementation Details

### Files Updated/Created

1. **Data Files**:
   - `data/bots.ts` - Updated with Heidi's information, including title, description, features, and tryLink
   - `data/solutions.json` - Updated the swiss-german-teacher entry with Heidi's information
   - `data/waitlist.json` - Created to store waitlist entries

2. **UI Files**:
   - `app/bots/swiss-german-teacher/page.tsx` - Redesigned to match the TDD requirements with responsive sections, including:
     - In-page input field that redirects to the ChatGPT version of Heidi
     - Waitlist form for collecting emails and preferences for future features
   - Solutions pages use the dynamic routing via `app/solutions/individuals/[slug]/page.tsx`

3. **Backend Logic**:
   - `lib/nlp.ts` - Created but kept inactive as NLP processing occurs in the ChatGPT custom GPT
   - `app/api/waitlist/route.ts` - API endpoint to handle waitlist form submissions

### Features Implemented

- **Input Redirection**: In-page input field that redirects to the ChatGPT version of Heidi
- **Waitlist Collection**: Form to collect email addresses and content preferences for future features
- **Integration with Try Link**: Direct links to ChatGPT version of Heidi throughout the interface
- **Local Data Storage**: Simple JSON-based storage for waitlist entries

## Current Functionality

Heidi's functionality is currently delivered via a ChatGPT custom GPT:

1. **Main Interaction Flow**:
   - Users enter input on the Botsmann website
   - They are redirected to the ChatGPT version of Heidi with their input
   - All NLP processing occurs within ChatGPT, not within Botsmann

2. **Waitlist Collection**:
   - Users can join a waitlist for future features
   - Collected data includes email and content preferences
   - Data is stored in a local JSON file (would be connected to CRM in production)

## Future Enhancements

As noted in the TDD, potential future enhancements (requiring approval) include:

### Phase 2 (3-6 Months):

- Activate `lib/nlp.ts` for in-page demo (e.g., single-word tables via OpenAI API)

### Phase 3 (12-18 Months):

- Full in-house NLP for all inputs
- Sign-up system for:
  - Zurich Events: Post events in chat/section
  - Newsletters: Personalized emails
  - Blog: Züridütsch posts in /app/blog
  - Videos/Audios: Daily content via text-to-speech
  - Custom Communication: Tailored chat with user profiles

## Testing

To test the implementation:

1. Visit the bot page at `/bots/swiss-german-teacher`
2. Verify all sections display correctly, including the input field
3. Test the input field by entering text and confirming redirection to ChatGPT
4. Test the waitlist form by submitting an email and preferences
5. Check the solution page at `/solutions/individuals/swiss-german-teacher`
