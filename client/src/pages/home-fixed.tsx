import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { trackPageView, trackCTA, trackFormStart } from "@/lib/analytics";
import { SEOHead } from "@/components/SEOHead";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Track page view
    trackPageView('/');
    
    // Simple intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCTA = (action: string, section: string) => {
    trackCTA(action, section);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Alchemy United - Premium EV Charging Network"
        description="Revolutionary EV charging technology engineered for precision, efficiency, and the future of electric mobility."
        canonical="/"
      />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/hero-ev-charger.png" 
            alt="Premium EV Charger" 
            className="w-full h-full object-cover opacity-30"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black"></div>
        </div>
        
        <div className={`relative z-10 text-center px-4 max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-8">
            <img src="/au-logo.png" alt="Alchemy United" className="h-16 mx-auto mb-8" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wide">
            PLUG INTO THE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold">
              FUTURE
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light">
            Revolutionary EV charging technology engineered for precision, efficiency, 
            and the future of electric mobility.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/early-access">
              <button 
                onClick={() => handleCTA('join_network', 'hero')}
                className="px-8 py-4 bg-gradient-to-r from-gold to-yellow-600 text-black font-medium rounded-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105"
              >
                JOIN THE NETWORK
              </button>
            </Link>
            <button className="px-8 py-4 border border-gold text-gold font-medium rounded-lg hover:bg-gold hover:text-black transition-all duration-300">
              LEARN MORE
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gold animate-bounce">
          ↓
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-center mb-16 text-gold">
            PREMIUM CHARGING EXPERIENCE
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-gray-800 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-all duration-300">
              <div className="text-4xl text-gold mb-4">⚡</div>
              <h3 className="text-xl font-medium mb-4">Ultra-Fast Charging</h3>
              <p className="text-gray-400">Revolutionary charging speeds up to 350kW that redefine convenience</p>
            </div>
            
            <div className="text-center p-8 border border-gray-800 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-all duration-300">
              <div className="text-4xl text-gold mb-4">🌐</div>
              <h3 className="text-xl font-medium mb-4">Network Membership</h3>
              <p className="text-gray-400">Exclusive access to premium charging locations nationwide</p>
            </div>
            
            <div className="text-center p-8 border border-gray-800 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-all duration-300">
              <div className="text-4xl text-gold mb-4">🔒</div>
              <h3 className="text-xl font-medium mb-4">Secure & Reliable</h3>
              <p className="text-gray-400">Bank-grade security with 99.9% uptime guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-light mb-6 text-gold">Ready to Join the Future?</h2>
          <p className="text-gray-300 mb-8 text-lg">Get early access to our premium charging network</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/early-access">
              <button 
                onClick={() => handleCTA('get_early_access', 'cta_section')}
                className="px-12 py-4 bg-gradient-to-r from-gold to-yellow-600 text-black font-bold rounded-full text-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105"
              >
                Get Early Access
              </button>
            </Link>
            <Link href="/host">
              <button 
                onClick={() => handleCTA('become_host', 'cta_section')}
                className="px-12 py-4 border-2 border-gold text-gold font-bold rounded-full text-lg hover:bg-gold hover:text-black transition-all duration-300"
              >
                Become a Host
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Performance Status */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl font-light mb-8 text-gold">SYSTEM STATUS</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-4">
              <div className="text-2xl font-bold text-green-400">0.010s</div>
              <div className="text-sm text-gray-400">Response Time</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-green-400">✓</div>
              <div className="text-sm text-gray-400">Security Headers</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-green-400">✓</div>
              <div className="text-sm text-gray-400">Cache Optimization</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-green-400">✓</div>
              <div className="text-sm text-gray-400">Image Compression</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center px-4">
          <div className="mb-6">
            <img src="/au-logo.png" alt="Alchemy United" className="h-12 mx-auto opacity-60" />
          </div>
          <p className="text-gray-500">© 2025 Alchemy United. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/dashboard" className="text-gray-500 hover:text-gold transition-colors">Dashboard</Link>
            <Link href="/early-access" className="text-gray-500 hover:text-gold transition-colors">Early Access</Link>
            <Link href="/host" className="text-gray-500 hover:text-gold transition-colors">Host Program</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}