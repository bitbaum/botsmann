import HeroSection from '@/components/home/HeroSection';
import FeaturedBots from '@/components/home/FeaturedBots';
import CollaborationSection from '@/components/home/CollaborationSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-screen-xl mx-auto px-6 py-12 space-y-16">
        <HeroSection />
        <FeaturedBots />
        <CollaborationSection />
      </main>
    </div>
  );
}
