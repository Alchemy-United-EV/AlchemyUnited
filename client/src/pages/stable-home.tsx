import React, { useState, useEffect } from "react";

// Simple Flip Card Component - Pure CSS, no complex animations
function FlipCard({ problem, solution, index }: { problem: any, solution: any, index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full h-96 group cursor-pointer">
      {/* Flip Button */}
      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="absolute top-4 right-4 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-yellow-600 shadow-md"
        title="Click to flip"
      >
        <span className="text-lg">↻</span>
      </button>

      {/* Card Container */}
      <div className="relative w-full h-full">
        {/* Problem Side (Front) */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-xl p-6 shadow-lg border transition-all duration-500 ${
            isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100 rotate-y-0'
          } bg-gradient-to-br from-red-50 to-red-100 border-red-200`}
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-red-200 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-2xl">{problem.icon}</span>
                </div>
                <div className="flex-1 h-2 bg-red-300 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-red-800 mb-4">
                {problem.title}
              </h3>
              <p className="text-red-700 text-lg leading-relaxed">
                {problem.desc}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-500 font-medium">Current EV Experience</span>
              <span className="text-xs text-red-400">Tap ↻ for solution</span>
            </div>
          </div>
        </div>

        {/* Solution Side (Back) */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-xl p-6 shadow-lg border transition-all duration-500 ${
            isFlipped ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180'
          } bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300`}
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-yellow-200 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-2xl">{solution.icon}</span>
                </div>
                <div className="flex-1 h-2 bg-yellow-400 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-yellow-800 mb-4">
                {solution.title}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {solution.desc}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <picture>
                  <source srcSet="/assets/webp/AE141A66-A440-499B-8889-41BABE3F729E_1754506144500.webp" type="image/webp" />
                  <img 
                    src="/assets/AE141A66-A440-499B-8889-41BABE3F729E_1754506144500.png" 
                    alt="AU"
                    className="h-6 w-auto"
                    width="24"
                    height="24"
                    loading="lazy"
                  />
                </picture>
                <span className="text-sm text-yellow-600 font-medium">The Alchemy Way</span>
              </div>
              <span className="text-xs text-gray-500">Tap ↻ for problem</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StableHome() {
  // Set page title and meta description for SEO
  React.useEffect(() => {
    document.title = "Alchemy United - Premium EV Charging Network | Luxury Electric Vehicle Stations";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join Alchemy United\'s exclusive luxury EV charging network. Premium fast charging stations with guaranteed reservations, 99.9% uptime, and transparent pricing. Request early access today.');
    }

    // Update Open Graph meta tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Alchemy United - Premium EV Charging Network | Luxury Electric Vehicle Stations');
    }

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Join Alchemy United\'s exclusive luxury EV charging network. Premium fast charging stations with guaranteed reservations, 99.9% uptime, and transparent pricing.');
    }
  }, []);
  const [logoOpacity, setLogoOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadePoint = window.innerHeight * 0.7;
      const opacity = Math.max(0, 1 - (scrollY / fadePoint));
      setLogoOpacity(opacity);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cardPairs = [
    {
      problem: { icon: '⏰', title: 'No Reservation System', desc: 'Drive to stations only to find them occupied or broken. 78% success rate means wasted trips and time.' },
      solution: { icon: '📅', title: 'Guaranteed Reservations', desc: 'Book your charging slot in advance with guaranteed availability and premium locations' }
    },
    {
      problem: { icon: '⚡', title: 'Unreliable Stations', desc: '22% of charging attempts fail due to broken equipment, network issues, or payment system failures' },
      solution: { icon: '🔧', title: '99.9% Uptime Guarantee', desc: 'AI-powered maintenance and 24/7 monitoring ensure stations work when you need them' }
    },
    {
      problem: { icon: '💰', title: 'Wild West Pricing', desc: 'Unpredictable costs ranging $11-$50 for full charge with hidden fees and confusing billing' },
      solution: { icon: '💎', title: 'Transparent Premium Pricing', desc: 'Clear, consistent rates with no hidden fees. Premium service at honest prices' }
    },
    {
      problem: { icon: '🏢', title: 'Property Host Headaches', desc: 'Vandalism, theft, maintenance costs, and liability concerns make hosting charging stations risky' },
      solution: { icon: '🛡️', title: 'Full Host Protection', desc: 'We handle insurance, security, maintenance, and operations while you earn passive income' }
    }
  ];

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

      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        
        <div className="relative z-20 text-center text-white px-6 max-w-5xl">
          <header>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="block text-white mb-2">The Future of</span>
              <span className="text-yellow-400 block">Premium Charging</span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-light mb-12 max-w-4xl mx-auto leading-relaxed text-white/90">
              Join Alchemy United — an exclusive network of luxury EV charging stations built for elegance, speed, and next-gen infrastructure.
            </p>
          </header>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => window.location.href = '/early-access'}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105"
            >
              Request Early Access
            </button>
            <button
              onClick={() => window.location.href = '/host'}
              className="border-2 border-white/40 hover:border-yellow-400 text-white hover:text-yellow-400 font-bold py-4 px-8 rounded-full text-xl transition-all duration-300"
            >
              Become a Host
            </button>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section className="py-20 px-6" aria-labelledby="comparison-heading">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-16">
            <h2 id="comparison-heading" className="text-5xl sm:text-6xl font-black mb-4 text-gray-800">
              Current Charging vs <span className="text-yellow-500">Alchemy</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we transform every pain point into a premium experience
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {cardPairs.map((pair, index) => (
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

      {/* Early Access Section */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <picture>
            <source srcSet="/assets/webp/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.webp" type="image/webp" />
            <img 
              src="/assets/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.png" 
              alt="Alchemy United Logo"
              className="h-16 w-auto mx-auto mb-8 filter brightness-125"
              width="160"
              height="64"
              loading="lazy"
            />
          </picture>
          
          <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight">
            Gain Early Access to the{' '}
            <span className="text-yellow-400">Alchemy Network</span>
          </h2>
          
          <p className="text-xl font-light mb-16 leading-relaxed text-white/90">
            Whether you're a driver, property owner, or commercial partner — Alchemy offers high-speed EV fueling with unmatched aesthetics and intelligence.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-bold mb-2 text-yellow-400">Premium Fast Charging</h3>
              <p className="text-white/80 text-sm">Ultra-fast speeds up to 350kW</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏙️</div>
              <h3 className="text-lg font-bold mb-2 text-yellow-400">Prime Station Locations</h3>
              <p className="text-white/80 text-sm">Hotels, malls, offices & more</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-lg font-bold mb-2 text-yellow-400">Co-branded Opportunities</h3>
              <p className="text-white/80 text-sm">Partner branding & revenue share</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-lg font-bold mb-2 text-yellow-400">Intelligent Energy Tracking</h3>
              <p className="text-white/80 text-sm">Smart usage & cost optimization</p>
            </div>
          </div>
          
          <button
            onClick={() => window.location.href = '/early-access'}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-6 px-12 rounded-full text-2xl transition-all duration-300 transform hover:scale-105"
          >
            Get On The List
          </button>
        </div>
      </section>

      {/* Host Section */}
      <section className="bg-gray-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight">
            Want to <span className="text-yellow-400">Host a Station?</span>
          </h2>
          
          <p className="text-xl font-light mb-12 leading-relaxed text-white/90">
            Own a business, hotel, gym, or property? Host an Alchemy charger and turn traffic into revenue.
          </p>
          
          <button
            onClick={() => window.location.href = '/host'}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-6 px-12 rounded-full text-2xl transition-all duration-300 transform hover:scale-105"
          >
            Apply to Host
          </button>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-black py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <picture>
            <source srcSet="/assets/webp/AE141A66-A440-499B-8889-41BABE3F729E_1754506144500.webp" type="image/webp" />
            <img 
              src="/assets/AE141A66-A440-499B-8889-41BABE3F729E_1754506144500.png" 
              alt="Alchemy United Logo"
              className="h-10 w-auto mx-auto mb-6 filter brightness-125"
              width="40"
              height="40"
              loading="lazy"
            />
          </picture>
          
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Experience the Future?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <button
              onClick={() => window.location.href = '/early-access'}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full transition-all duration-300"
            >
              Get Early Access
            </button>
            <button
              onClick={() => window.location.href = '/host'}
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold py-3 px-6 rounded-full transition-all duration-300"
            >
              Become a Host
            </button>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white py-2 px-4 rounded-full text-sm transition-all duration-300"
            >
              Admin Dashboard
            </button>
          </div>
          
          <p className="text-gray-400 text-sm mt-8">
            &copy; 2024 Alchemy United. Redefining the electric vehicle charging experience.
          </p>
        </div>
      </section>
    </div>
  );
}