import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { trackPageInteraction } from "@/lib/analytics";
import { useCTATracking } from "@/hooks/use-cta-tracking";
import { LazyImage } from "@/components/LazyImage";
import ContactForm from "@/components/forms/ContactForm";
import WaitlistForm from "@/components/forms/WaitlistForm";
import PartnerForm from "@/components/forms/PartnerForm";

// Simple SEO component without hooks
function SEOHead({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}

// Flip Card Component
function FlipCard({ problem, solution, index }: { problem: any, solution: any, index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full h-[28rem] sm:h-96 perspective-1000 group">
      <button
        onClick={() => {
          setIsFlipped(!isFlipped);
          trackPageInteraction('flip_card', isFlipped ? 'show_problem' : 'show_solution');
        }}
        className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gold hover:bg-white transition-all duration-300 shadow-lg animate-pulse-gold hover:animate-none group-hover:scale-110"
        title="Click to flip card"
      >
        <span className="text-xl font-bold">↻</span>
      </button>

      <div
        className="relative w-full h-full preserve-3d transition-transform duration-1000 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Problem Side (Front) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-red-900/20 via-gray-900 to-black border border-red-800/30 p-8">
          <div className="h-full flex flex-col justify-center items-center text-center">
            <div className="text-5xl mb-6 text-red-400">
              {problem.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 text-red-300">
              {problem.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {problem.description}
            </p>
          </div>
        </div>

        {/* Solution Side (Back) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-gold/20 via-gray-900 to-black border border-gold/30 p-8"
             style={{ transform: 'rotateY(180deg)' }}>
          <div className="h-full flex flex-col justify-center items-center text-center">
            <div className="text-5xl mb-6 text-gold">
              {solution.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 text-gold">
              {solution.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {solution.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { trackCTA } = useCTATracking();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const problemSolutionPairs = [
    {
      problem: {
        icon: "🔋",
        title: "Range Anxiety",
        description: "EV drivers constantly worry about finding reliable charging stations during long trips."
      },
      solution: {
        icon: "⚡",
        title: "Network Coverage",
        description: "Strategic placement of ultra-fast chargers across major routes eliminates range concerns."
      }
    },
    {
      problem: {
        icon: "⏰",
        title: "Slow Charging",
        description: "Traditional charging takes hours, disrupting busy schedules and travel plans."
      },
      solution: {
        icon: "🚀",
        title: "Ultra-Fast Speed",
        description: "350kW charging capability delivers 200+ miles of range in just 15 minutes."
      }
    },
    {
      problem: {
        icon: "💸",
        title: "Unpredictable Costs",
        description: "Varying pricing and hidden fees make charging expenses difficult to budget."
      },
      solution: {
        icon: "💎",
        title: "Transparent Pricing",
        description: "Clear membership tiers with predictable rates and no surprise charges."
      }
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <SEOHead title="Alchemy United - Premium EV Charging Network" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <LazyImage
                src="/au-logo.png"
                alt="Alchemy United"
                className="h-8 w-auto"
                loading="eager"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-gold transition-colors">Features</a>
              <a href="#membership" className="text-gray-300 hover:text-gold transition-colors">Membership</a>
              <Link href="/early-access">
                <Button className="bg-gold hover:bg-gold/90 text-black font-medium">
                  Join Network
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <LazyImage 
            src="/hero-ev-charger.png" 
            alt="Premium EV Charger" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto"
             style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <h1 className="text-6xl md:text-8xl font-light mb-8 tracking-wide leading-tight">
            PLUG INTO THE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold animate-gradient-x">
              FUTURE
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
            Revolutionary EV charging technology engineered for precision, efficiency, 
            and the future of electric mobility. Join the premium network that's redefining 
            what it means to charge.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              onClick={() => trackCTA('join_network', 'hero')}
              className="bg-gradient-to-r from-gold to-yellow-600 hover:from-yellow-400 hover:to-gold text-black font-bold py-4 px-12 text-lg rounded-full transform hover:scale-105 transition-all duration-300"
            >
              <Link href="/early-access">Join the Network</Link>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-black font-bold py-4 px-12 text-lg rounded-full transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gold animate-bounce text-2xl">
          ↓
        </div>
      </section>

      {/* Problem/Solution Cards */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-light text-center mb-16 text-gold">
            SOLVING REAL PROBLEMS
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Click each card to see how we're transforming the EV charging experience
          </p>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {problemSolutionPairs.map((pair, index) => (
              <FlipCard
                key={index}
                problem={pair.problem}
                solution={pair.solution}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-24 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-light text-center mb-16 text-gold">
            PREMIUM EXPERIENCE
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-bold mb-2 text-gold">Premium Fast Charging</h3>
              <p className="text-white/80 text-sm">Ultra-fast speeds up to 350kW</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🏙️</div>
              <h3 className="text-lg font-bold mb-2 text-gold">Prime Station Locations</h3>
              <p className="text-white/80 text-sm">Hotels, malls, offices & more</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-lg font-bold mb-2 text-gold">Co-branded Opportunities</h3>
              <p className="text-white/80 text-sm">Partner branding & revenue share</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-lg font-bold mb-2 text-gold">Intelligent Energy Tracking</h3>
              <p className="text-white/80 text-sm">Smart usage & cost optimization</p>
            </div>
          </div>
          
          <div className="text-center">
            <Button
              onClick={() => {
                trackCTA('get_on_list', 'early_access_offer');
                window.location.href = '/early-access';
              }}
              className="bg-gold hover:bg-gold/90 text-black font-bold py-8 px-16 rounded-full text-2xl transition-all duration-300 transform hover:scale-105"
            >
              Get On The List
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Forms Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-light text-center mb-16 text-gold">
            GET STARTED
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-gold">Contact Us</h3>
              <ContactForm />
            </div>
            
            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-gold">Join Waitlist</h3>
              <WaitlistForm />
            </div>
            
            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-gold">Partner With Us</h3>
              <PartnerForm />
            </div>
          </div>
        </div>
      </section>

      {/* Performance Status */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-light mb-8 text-gold">SYSTEM STATUS</h2>
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
      <footer className="py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <LazyImage
                src="/au-logo.png"
                alt="Alchemy United"
                className="h-12 mb-4 opacity-60"
              />
              <p className="text-gray-500 text-sm">
                Revolutionizing EV charging with premium technology and unmatched reliability.
              </p>
            </div>
            
            <div>
              <h4 className="text-gold font-bold mb-4">Network</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/early-access" className="hover:text-gold transition-colors">Early Access</Link></li>
                <li><Link href="/host" className="hover:text-gold transition-colors">Host Program</Link></li>
                <li><a href="#features" className="hover:text-gold transition-colors">Features</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gold font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/dashboard" className="hover:text-gold transition-colors">Dashboard</Link></li>
                <li><a href="#" className="hover:text-gold transition-colors">About</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gold font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-gold transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-gray-500 border-t border-gray-800 pt-8">
            <p>© 2025 Alchemy United. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}