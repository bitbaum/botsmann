/**
 * Knowledge Center components
 * @module components/knowledge
 */

export { DifficultyBadge } from './DifficultyBadge';
export { GuideCard } from './GuideCard';

/*
 * Callout, CodeBlock and TableOfContents used to live here. They were the
 * Knowledge Center's half of a component map duplicated in
 * components/blog/*MDX*.tsx — two hand-rolled renderers for one markdown
 * vocabulary, already drifted apart (different heading slug rules, different
 * callout kinds, one highlighting code and one not). bip-kit's reference
 * renderer owns all three now; the wiring is in lib/longform/.
 */
