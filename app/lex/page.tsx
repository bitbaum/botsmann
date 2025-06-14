import Hero from './components/Hero';
import ProblemBlock from './components/ProblemBlock';
import SolutionsTabs from './components/SolutionsTabs';
import TechAccordion from './components/TechAccordion';
import Comparison from './components/Comparison';
import CTA from './components/CTA';

export const metadata = {
  title: 'Lex · Private AI Lawyer | Botsmann',
  description: 'Run Lex on your own hardware or in our encrypted cloud. Instant legal answers, zero data leaks.',
};

export default async function LexPage() {
  return (
    <main>
      <Hero />
      <ProblemBlock />
      <SolutionsTabs />
      <TechAccordion />
      <Comparison />
      <CTA />
    </main>
  );
}
