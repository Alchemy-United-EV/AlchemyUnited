import Hero from './Hero';
import Features from './Features';
import SocialProof from '@/components/SocialProof';
import CTA from './CTA';
import FooterCTA from './FooterCTA';

export default function Home() {
  const showSocialProof = true; // ENABLED

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      {showSocialProof && <SocialProof showLogos={true} />}
      <CTA />
      <FooterCTA />
    </div>
  );
}