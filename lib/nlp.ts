/**
 * Natural Language Processing utilities for Kigott
 * This file implements the language processing logic for various bots
 */

interface HeidiOutput {
  iigabä: string;
  iigabetyp: string;
  content: any; // Can be table data or text responses
}

/**
 * Process inputs for the Heidi Swiss German Teacher
 * @param input The user's input text
 * @returns Formatted output based on input type
 */
export const processHeidiInput = (input: string): HeidiOutput => {
  // Determine input type
  const inputType = detectInputType(input);
  
  switch (inputType) {
    case 'noun':
    case 'adjective':
      return processWord(input, inputType);
    case 'verb':
      return processVerb(input);
    case 'phrase':
    case 'sentence':
      return processSentence(input);
    case 'text':
      return processText(input);
    case 'email':
      return processEmail(input);
    default:
      return {
        iigabä: input,
        iigabetyp: "Unbekannt",
        content: {
          message: "I couldn't determine the type of your input. Could you try with a word, phrase, or email?"
        }
      };
  }
};

/**
 * Detect the type of input
 * @param input User input text
 * @returns Input type classification
 */
function detectInputType(input: string): string {
  // Simple detection logic - more sophisticated NLP would be used in production
  const words = input.trim().split(/\s+/);
  
  if (words.length === 1) {
    // Single word - determine if it's a noun, adjective, or verb
    // This is simplified - would use actual NLP in production
    if (input.endsWith('en') || input.endsWith('n')) {
      return 'verb';
    }
    
    // For demo purposes, default to noun for single words
    return 'noun';
  }
  
  if (words.length <= 10) {
    return 'sentence';
  }
  
  if (input.toLowerCase().includes('email') || 
      input.toLowerCase().includes('mail') || 
      input.toLowerCase().includes('e-mail') ||
      input.toLowerCase().includes('draft') ||
      input.toLowerCase().includes('write')) {
    return 'email';
  }
  
  return 'text';
}

/**
 * Process a single word (noun or adjective)
 * @param word The input word
 * @param wordType The type of word
 * @returns Formatted output
 */
function processWord(word: string, wordType: string): HeidiOutput {
  // Generate a table with 10 rows comparing High German and Züridütsch
  // In a real implementation, this would query a language database
  
  const sourceLanguage = detectLanguage(word);
  const table = generateWordTable(word, wordType, sourceLanguage);
  const contextText = generateContextText(word, 5);
  
  return {
    iigabä: word,
    iigabetyp: `Es Wort (es ${wordType === 'noun' ? 'Nomen' : 'Adjektiv'}, ${sourceLanguage})`,
    content: {
      table,
      contextText
    }
  };
}

/**
 * Process a verb input
 * @param verb The input verb
 * @returns Formatted output with verb tables
 */
function processVerb(verb: string): HeidiOutput {
  const sourceLanguage = detectLanguage(verb);
  const table = generateWordTable(verb, 'verb', sourceLanguage);
  const conjugationTable = generateConjugationTable(verb);
  const contextText = generateContextText(verb, 5);
  
  return {
    iigabä: verb,
    iigabetyp: `Es Wort (es Verb, ${sourceLanguage})`,
    content: {
      table,
      conjugationTable,
      contextText
    }
  };
}

/**
 * Process a sentence or phrase
 * @param sentence The input sentence
 * @returns Formatted output
 */
function processSentence(sentence: string): HeidiOutput {
  const translations = translateSentence(sentence);
  const contextText = generateContextText(extractMainTopic(sentence), 5);
  
  return {
    iigabä: sentence,
    iigabetyp: sentence.split(/\s+/).length <= 3 ? "E Phrase" : "Es Satz",
    content: {
      translations,
      contextText
    }
  };
}

/**
 * Process a longer text
 * @param text The input text
 * @returns Formatted output
 */
function processText(text: string): HeidiOutput {
  const translations = translateText(text);
  const contextText = generateContextText(extractMainTopic(text), 5);
  
  return {
    iigabä: text,
    iigabetyp: "Es Text",
    content: {
      translations,
      contextText
    }
  };
}

/**
 * Process an email request
 * @param emailRequest Input related to email drafting
 * @returns Formatted email response
 */
function processEmail(emailRequest: string): HeidiOutput {
  const emailDraft = generateEmailDraft(emailRequest);
  const zuridutschNote = "Wöu du öppis änders wöu, säg mir Bescheid!";
  
  return {
    iigabä: emailRequest,
    iigabetyp: "Es E-Mail",
    content: {
      hochdeutschDraft: emailDraft,
      zuridutschNote
    }
  };
}

// Helper functions

/**
 * Detect the language of the input
 * @param text Input text
 * @returns Detected language code
 */
function detectLanguage(text: string): string {
  // Simplified language detection - would use proper NLP in production
  // This is just for demonstration purposes
  
  const germanChars = /[äöüßÄÖÜ]/;
  if (germanChars.test(text)) {
    return "Hochdütsch";
  }
  
  // Simple heuristic: if word has 'ch' or ends with 'li', likely Swiss German
  if (text.includes('ch') || text.endsWith('li')) {
    return "Züridütsch";
  }
  
  return "Englisch";
}

/**
 * Generate a comparison table for a word
 * @param word Input word
 * @param wordType Type of word
 * @param sourceLanguage Source language
 * @returns Table data
 */
function generateWordTable(word: string, wordType: string, sourceLanguage: string) {
  // In production, this would query a language database or API
  
  // Example table data
  const tableData = [];
  
  // For demonstration, just add sample rows
  // In production, this would be filled with real translation data
  if (word.toLowerCase() === 'dog' || word.toLowerCase() === 'hund') {
    return [
      {
        iigabä: 'de Hund, -',
        bedütig: 'CH: de Hund DE: der Hund Es Tier mit vier Bei, wo böllt und treu isch.',
        hochdütsch: 'Der Hund bellt laut.',
        züridütsch: 'De Hund böllt luut.'
      },
      {
        iigabä: 'hündisch',
        bedütig: 'CH: hündisch DE: hündisch Öppis wo zum Hund ghört.',
        hochdütsch: 'Seine hündische Treue ist bemerkenswert.',
        züridütsch: 'Sini hündischi Treui isch bemerkensweert.'
      },
      {
        iigabä: 'd Hundehütte, -',
        bedütig: 'CH: d Hundehütte DE: die Hundehütte Es Hüüsli für en Hund.',
        hochdütsch: 'Der Hund schläft in seiner Hundehütte.',
        züridütsch: 'De Hund schlaft i sinere Hundehütte.'
      }
    ];
  }
  
  // Default sample data
  return [
    {
      iigabä: word,
      bedütig: `CH: ${getZuriGermanWord(word)} DE: ${getHighGermanWord(word)} Erkläärig vom Wort.`,
      hochdütsch: `Ein Beispielsatz mit ${getHighGermanWord(word)}.`,
      züridütsch: `Es Biispiil mit ${getZuriGermanWord(word)}.`
    }
  ];
}

/**
 * Generate conjugation table for verbs
 * @param verb Input verb
 * @returns Conjugation table data
 */
function generateConjugationTable(verb: string) {
  // In production, this would use real verb conjugation data
  
  if (verb.toLowerCase() === 'gehen' || verb.toLowerCase() === 'go') {
    return {
      hochdeutsch: {
        present: ['ich gehe', 'du gehst', 'er/sie/es geht', 'wir gehen', 'ihr geht', 'sie gehen'],
        past: ['ich ging', 'du gingst', 'er/sie/es ging', 'wir gingen', 'ihr gingt', 'sie gingen']
      },
      zuridutsch: {
        present: ['ich gang', 'du gansch', 'er/si/es gaat', 'mir gönd', 'ir gönd', 'si gönd'],
        past: ['ich bin gange', 'du bisch gange', 'er/si/es isch gange', 'mir sind gange', 'ir sind gange', 'si sind gange']
      }
    };
  }
  
  // Default conjugation
  return {
    hochdeutsch: {
      present: ['ich ' + verb + 'e', 'du ' + verb + 'st', 'er/sie/es ' + verb + 't', 'wir ' + verb + 'en', 'ihr ' + verb + 't', 'sie ' + verb + 'en'],
    },
    zuridutsch: {
      present: ['ich ' + verb, 'du ' + verb + 'sch', 'er/si/es ' + verb + 't', 'mir ' + verb + 'ed', 'ir ' + verb + 'ed', 'si ' + verb + 'ed'],
    }
  };
}

/**
 * Generate contextual example text
 * @param topic The main topic or word
 * @param sentenceCount Number of sentences to generate
 * @returns Contextual text in Züridütsch
 */
function generateContextText(topic: string, sentenceCount: number): string {
  // In production, this would use a language model to generate contextual examples
  // For demonstration, return a fixed set of sentences
  
  if (topic.toLowerCase() === 'dog' || topic.toLowerCase() === 'hund') {
    return "Min Hund heisst Bello. Er isch siebe Jaar alt und en Deutsche Schäferhund. Bello mag am liebste mit em Ball spiele. Wänn ich vo de Arbet hei chume, isch er immer ganz ufgregt. De Tierarzt seit, er seig sehr gsund für sis Alter.";
  }
  
  return "Im Züridütsch gits vill Wörter, wo andersch sind als im Hochdütsch. D'Lüüt i de Schwiiz redid verschiedeni Dialekt. Z'Züri redet mer Züridütsch. Wenn du Züridütsch lernsch, chasch besser mit de Schwiizer rede. Es isch nöd so schwirig wie's vilicht usgseet.";
}

/**
 * Translate a sentence
 * @param sentence The input sentence
 * @returns Translations in both languages
 */
function translateSentence(sentence: string) {
  // In production, this would use a translation API
  
  if (sentence.toLowerCase().includes('hello') || sentence.toLowerCase().includes('hallo')) {
    return {
      hochdeutsch: "Hallo, wie geht es Ihnen heute?",
      zuridutsch: "Hoi, wie gaats dir hüt?"
    };
  }
  
  // Default translations
  return {
    hochdeutsch: "Dies ist ein Beispielsatz auf Hochdeutsch.",
    zuridutsch: "Das isch en Biispiilsatz uf Züridütsch."
  };
}

/**
 * Translate a longer text
 * @param text The input text
 * @returns Translations in both languages
 */
function translateText(text: string) {
  // In production, this would use a translation API
  // For demo purposes, return simplified translations
  
  return {
    hochdeutsch: "Dies ist eine Übersetzung des Textes auf Hochdeutsch. In einer realen Implementierung würde der gesamte Text übersetzt werden.",
    zuridutsch: "Das isch en Übersetztig vom Text uf Züridütsch. I de ächte Implementierig würd de ganz Text übersetzt werde."
  };
}

/**
 * Extract the main topic from a text
 * @param text Input text
 * @returns Extracted main topic
 */
function extractMainTopic(text: string): string {
  // In production, this would use NLP topic extraction
  // For demo, extract a keyword based on frequency or position
  
  const words = text.toLowerCase().split(/\s+/);
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'der', 'die', 'das', 'und', 'oder'];
  
  // Find the first substantive word that's not a stop word
  for (const word of words) {
    if (word.length > 3 && !stopWords.includes(word)) {
      return word;
    }
  }
  
  return words[0] || "general";
}

/**
 * Generate an email draft based on a request
 * @param request The email request
 * @returns Formatted email draft
 */
function generateEmailDraft(request: string): string {
  // In production, this would generate a context-aware email
  // For demo, return a sample email
  
  return `Betreff: Ihre Anfrage

Sehr geehrte Frau Müller,

vielen Dank für Ihre Nachricht. Ich freue mich über Ihr Interesse an unserem Angebot.

Wie gewünscht, sende ich Ihnen hiermit die angeforderten Informationen. Bei weiteren Fragen stehe ich Ihnen gerne zur Verfügung.

Mit freundlichen Grüßen,
[Ihr Name]`;
}

/**
 * Get the High German version of a word
 * @param word Input word
 * @returns High German translation
 */
function getHighGermanWord(word: string): string {
  // Would use a dictionary in production
  const translations: Record<string, string> = {
    'dog': 'der Hund',
    'cat': 'die Katze',
    'house': 'das Haus',
    'go': 'gehen',
    'eat': 'essen'
  };
  
  return translations[word.toLowerCase()] || word;
}

/**
 * Get the Züri German version of a word
 * @param word Input word
 * @returns Züri German translation
 */
function getZuriGermanWord(word: string): string {
  // Would use a dictionary in production
  const translations: Record<string, string> = {
    'dog': 'de Hund',
    'cat': 'd Chatz',
    'house': 's Huus',
    'go': 'gaa',
    'eat': 'ässe'
  };
  
  return translations[word.toLowerCase()] || word;
} 