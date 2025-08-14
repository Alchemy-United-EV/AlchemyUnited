import { useEffect } from 'react';
import Hero from './Hero';
import Features from './Features';
import SocialProof from '@/components/SocialProof';
import CTA from './CTA';
import FooterCTA from './FooterCTA';

export default function Home() {
  const showSocialProof = true; // ENABLED

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      const wingLogo = document.getElementById('wing-logo');
      
      if (!heroSection || !wingLogo) return;

      const heroRect = heroSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate hero visibility progress (0 = fully out of view, 1 = fully in view)
      const heroTop = heroRect.top;
      const heroBottom = heroRect.bottom;
      const heroHeight = heroRect.height;
      
      // Fade in as hero comes into view, fade out as it leaves
      let fadeProgress = 0;
      if (heroBottom > 0 && heroTop < viewportHeight) {
        // Hero is at least partially in view
        const visibleHeight = Math.min(heroBottom, viewportHeight) - Math.max(heroTop, 0);
        fadeProgress = Math.min(visibleHeight / heroHeight, 1);
      }
      
      // Parallax movement: move up slightly as user scrolls
      const scrollProgress = Math.max(0, Math.min(1, -heroTop / heroHeight));
      const yOffset = scrollProgress * -24; // Move up 24px max
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        wingLogo.style.setProperty('--y', '0px');
        wingLogo.style.setProperty('--fade', '1');
      } else {
        wingLogo.style.setProperty('--y', `${yOffset}px`);
        wingLogo.style.setProperty('--fade', fadeProgress.toString());
      }
    };

    // Initial call
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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