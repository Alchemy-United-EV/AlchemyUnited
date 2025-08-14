import { useState, useEffect } from 'react';
import Hero from './Hero';
import Features from './Features';
import SocialProof from '@/components/SocialProof';
import CTA from './CTA';
import FooterCTA from './FooterCTA';

export default function Home() {
  const [logoOpacity, setLogoOpacity] = useState(1);
  const showSocialProof = true; // ENABLED

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const fadeStart = heroHeight * 0.7;
      
      if (scrollY > fadeStart) {
        const fadeProgress = (scrollY - fadeStart) / (heroHeight * 0.3);
        setLogoOpacity(Math.max(0, 1 - fadeProgress));
      } else {
        setLogoOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Logo */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 transition-opacity duration-300"
        style={{ opacity: logoOpacity }}
      >
        <picture>
          <source srcSet="/assets/webp/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.webp" type="image/webp" />
          <img 
            src="/assets/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.png" 
            alt="Alchemy United Logo"
            className="h-10 w-auto filter brightness-125"
            width="160"
            height="40"
          />
        </picture>
      </nav>

      <Hero />
      <Features />
      {showSocialProof && <SocialProof showLogos={true} />}
      <CTA />
      <FooterCTA />
    </div>
  );
}