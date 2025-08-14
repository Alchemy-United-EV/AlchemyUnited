import { useRef, useEffect, useLayoutEffect } from 'react';
import { CTATracker } from '@/components/CTA-Tracker';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const wingRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const positionWing = () => {
      if (!heroRef.current || !badgeRef.current || !wingRef.current) return;

      const heroRect = heroRef.current.getBoundingClientRect();
      const badgeRect = badgeRef.current.getBoundingClientRect();
      
      const top = badgeRect.bottom - heroRect.top + 24;
      wingRef.current.style.top = `${top}px`;
    };

    // Initial positioning
    positionWing();

    // ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(positionWing);
    if (heroRef.current) {
      resizeObserver.observe(heroRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!wingRef.current) return;

      const scrollY = window.scrollY;
      const maxScroll = 160;
      const progress = Math.min(scrollY / maxScroll, 1);

      // Translate down, scale down, fade out for first 160px of scroll
      const translateY = progress * 18;
      const scale = 1 - (progress * 0.04); // Scale down to 0.96
      const opacity = 0.95 - (progress * 0.8); // Fade from 0.95 to 0.15

      wingRef.current.style.transform = `translateX(-50%) translateY(${translateY}px) scale(${scale})`;
      wingRef.current.style.opacity = opacity.toString();
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative overflow-hidden h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center"
      id="hero-section"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-l from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-yellow-400/5 via-transparent to-transparent"></div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
      
      {/* Wing Logo - positioned under Premium Network pill */}
      <img 
        ref={wingRef}
        src="/assets/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.png" 
        alt=""
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-0 drop-shadow-md h-10 w-auto filter brightness-125"
        style={{ opacity: 0.95 }}
        width="160"
        height="40"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-5xl animate-fade-in">
        <header>
          <div className="mb-8">
            <div ref={badgeRef}>
              <div className="inline-block p-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl mb-6 animate-shimmer">
                <div className="bg-black px-6 py-2 rounded-2xl">
                  <span className="text-yellow-400 font-semibold text-sm tracking-wide">⚡ PREMIUM NETWORK</span>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="block text-white mb-2 animate-slide-up">Premium EV</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 block animate-slide-up delay-200">Charging Network</span>
          </h1>
          
          <p className="text-lg sm:text-xl font-light mb-8 max-w-3xl mx-auto leading-relaxed text-white/90 animate-slide-up delay-300">
            Experience fast, reliable EV charging with guaranteed availability. Join our premium network for drivers and profitable hosting partners.
          </p>
        </header>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-500">
          <CTATracker 
            cta="hero-primary"
            section="hero" 
            variant="primary"
            href="/early-access"
            className="group relative bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/25 w-full sm:w-auto text-center"
          >
            <span className="relative z-10">Get Early Access</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
          </CTATracker>
          <CTATracker 
            cta="hero-secondary"
            section="hero"
            variant="secondary"
            href="/host-application"
            className="group border-2 border-white/20 hover:border-yellow-400 bg-white/5 backdrop-blur-sm text-white hover:text-yellow-400 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 hover:bg-yellow-400/10 w-full sm:w-auto text-center"
          >
            Become a Host
          </CTATracker>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white/60 text-sm animate-fade-in delay-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>99.9% Uptime</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-300"></div>
            <span>Guaranteed Reservations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
            <span>Premium Locations</span>
          </div>
        </div>
      </div>
    </section>
  );
}