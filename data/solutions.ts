import rawData from './solutions.json';
import type { Solution } from '@/types/solution';

const solutions: Solution[] = [
  ...rawData.individuals.map((s: any) => ({
    ...s,
    icon: '🤖',
    type: 'Bot',
    audience: ['Personal'],
    domain: ['General'],
    status: s.slug === 'swiss-german-teacher' ? 'Available' : 'Coming Soon',
    link: `/solutions/${s.slug}`,
  })),
  ...rawData.businesses.map((s: any) => ({
    ...s,
    icon: '🏢',
    type: 'Service',
    audience: ['Business'],
    domain: ['Business'],
    status: 'Coming Soon',
    link: `/solutions/${s.slug}`,
  })),
  ...rawData.governments.map((s: any) => ({
    ...s,
    icon: '🏛️',
    type: 'Platform',
    audience: ['Public'],
    domain: ['Government'],
    status: 'Coming Soon',
    link: `/solutions/${s.slug}`,
  })),
];

export default solutions;
export type { Solution };
