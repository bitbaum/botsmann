/**
 * User Context Module
 *
 * Extracts, stores, and retrieves accumulated user knowledge
 * to personalize AI professional interactions.
 */

export { extractAndSaveContext } from './extractor';
export { saveUserContext, getRelevantContext, type UserContextEntry } from './store';
export { detectDomains } from './domain-detector';
