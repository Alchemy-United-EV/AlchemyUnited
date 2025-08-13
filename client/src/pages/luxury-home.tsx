import { useState, useEffect } from "react";

// Flip Card Component - No framer-motion, pure CSS animations
function FlipCard({ problem, solution, index }: { problem: any, solution: any, index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-[28rem] sm:h-96 group"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      {/* Flip Button */}
      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-yellow-600 hover:bg-white transition-all duration-300 shadow-lg group-hover:scale-110"
        title="Click to flip card"
      >
        <span className="text-xl font-bold">↻</span>
      </button>

      <div
        className="relative w-full h-full transition-transform duration-1000 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Problem Side (Front) */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 sm:p-8 shadow-xl border border-red-200 hover:shadow-2xl transition-shadow duration-300"
             style={{ backfaceVisibility: 'hidden' }}>
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-200 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-red-600 text-xl sm:text-2xl">{problem.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="w-8 sm:w-12 h-1.5 sm:h-2 bg-red-300 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-red-800 mb-4 sm:mb-6 leading-tight">
                {problem.title}
              </h3>
              <p className="text-red-700 leading-relaxed text-base sm:text-lg">
                {problem.desc}
              </p>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-red-500 font-medium">
                Current EV charging experience
              </div>
              <div className="text-xs text-red-400">
                Tap ↻ to see our solution
              </div>
            </div>
          </div>
        </div>

        {/* Solution Side (Back) */}
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 sm:p-8 shadow-xl border border-yellow-300 hover:shadow-2xl transition-shadow duration-300"
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-200 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-yellow-600 text-xl sm:text-2xl">{solution.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="w-8 sm:w-12 h-1.5 sm:h-2 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-800 mb-4 sm:mb-6 leading-tight">
                {solution.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                {solution.desc}
              </p>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                <img 
                  src="/attached_assets/AE141A66-A440-499B-8889-41BABE3F729E_1754506144500.png" 
                  alt="AU"
                  className="h-6 w-auto"
                />
                <span className="text-sm text-yellow-600 font-medium">The Alchemy Way</span>
              </div>
              <div className="text-xs text-gray-500">
                Tap ↻ to see the problem
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Problem Solution Slideshow Component
function ProblemSolutionSlideshow() {
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
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      {/* Header */}
      <div className="text-center mb-12 animate-fadeInUp">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-gray-800">
          Current Charging vs <span className="text-yellow-600">Alchemy</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          See how we transform every pain point into a premium experience
        </p>
      </div>
      
      {/* Flashcards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full max-w-7xl mx-auto px-4">
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
  );
}

export default function LuxuryHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
      
      // Logo fade effect
      const fadePoint = window.innerHeight * 0.8;
      const opacity = Math.max(0, 1 - (scrollY / fadePoint));
      setLogoOpacity(opacity);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      
      {/* Navigation Logo */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 sm:p-8 transition-opacity duration-300"
        style={{ opacity: logoOpacity }}
      >
        <div className="flex items-center drop-shadow-2xl">
          <img 
            src="/attached_assets/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.png" 
            alt="Alchemy United Logo"
            className="h-8 w-auto sm:h-12 filter brightness-125"
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen bg-black overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        <div className="relative z-20 text-center text-white px-4 sm:px-6 max-w-6xl animate-fadeInUp">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-black mb-6 leading-tight tracking-tight">
            <span className="block text-white mb-1">The Future of</span>
            <span className="text-yellow-400 block">Premium Charging</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed text-white/90 px-2">
            Join Alchemy United — an exclusive network of luxury EV charging stations built for elegance, speed, and next-gen infrastructure.
          </p>
          
          <div className="flex flex-col gap-4 justify-center items-center max-w-md mx-auto">
            <button
              onClick={() => window.location.href = '/early-access'}
              className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-12 sm:py-6 sm:px-16 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto cursor-pointer"
            >
              Request Early Access
            </button>
            <button
              onClick={() => window.location.href = '/host'}
              className="inline-flex items-center justify-center border-2 border-white/30 hover:border-yellow-400 text-white hover:text-yellow-400 hover:bg-yellow-400/10 font-bold py-4 px-12 sm:py-6 sm:px-16 rounded-full text-lg sm:text-xl transition-all duration-300 bg-transparent w-full sm:w-auto cursor-pointer"
            >
              Become a Host
            </button>
          </div>
        </div>
      </section>

      {/* Problem > Solution Slideshow Section */}
      <section className="relative min-h-screen bg-white py-20 px-6 sm:px-12 lg:px-20 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <ProblemSolutionSlideshow />
        </div>
      </section>

      {/* Early Access Section */}
      <section className="relative min-h-screen bg-black py-20 px-6 sm:px-12 lg:px-20 flex items-center">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
          <div className="flex items-center justify-center mb-8">
            <img 
              src="/attached_assets/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.png" 
              alt="Alchemy United Logo"
              className="h-20 w-auto sm:h-24 filter brightness-125"
            />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-8 leading-tight">
            Gain Early Access to the{' '}
            <span className="text-yellow-400">Alchemy Network</span>
          </h2>
          
          <p className="text-xl sm:text-2xl font-light mb-12 max-w-4xl mx-auto leading-relaxed text-white/90">
            Whether you're a driver, property owner, or commercial partner — Alchemy offers high-speed EV fueling with unmatched aesthetics and intelligence.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 max-w-5xl mx-auto">
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
          
          <div>
            <button
              onClick={() => window.location.href = '/early-access'}
              className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-8 px-16 rounded-full text-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Get On The List
            </button>
          </div>
        </div>
      </section>

      {/* Become a Host Section */}
      <section className="relative min-h-screen bg-black py-20 px-6 sm:px-12 lg:px-20 flex items-center">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 leading-tight">
            Want to <span className="text-yellow-400">Host a Station?</span>
          </h2>
          
          <p className="text-xl sm:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed text-white/90">
            Own a business, hotel, gym, or property? Host an Alchemy charger and turn traffic into revenue.
          </p>
          
          <div>
            <button
              onClick={() => window.location.href = '/host'}
              className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-8 px-16 rounded-full text-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Apply to Host
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative min-h-screen bg-white py-20 px-6 sm:px-12 lg:px-20 flex items-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-20 text-gray-800">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">1. Download & Sign Up</h3>
              <p className="text-gray-600">Join the exclusive Alchemy network with verified membership</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🗺️</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">2. Find & Reserve</h3>
              <p className="text-gray-600">Locate premium stations and reserve your charging slot</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">3. Plug & Charge</h3>
              <p className="text-gray-600">Seamless charging experience with premium amenities</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">4. Pay & Go</h3>
              <p className="text-gray-600">Transparent pricing with instant billing and receipts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-black py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/attached_assets/AE141A66-A440-499B-8889-41BABE3F729E_1754506144500.png" 
              alt="Alchemy United Logo"
              className="h-12 w-auto filter brightness-125"
            />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Ready to Experience the Future?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <button
              onClick={() => window.location.href = '/early-access'}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Get Early Access
            </button>
            <button
              onClick={() => window.location.href = '/host'}
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Become a Host
            </button>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white py-3 px-6 rounded-full text-sm transition-all duration-300 cursor-pointer"
            >
              Admin Dashboard
            </button>
          </div>
          
          <p className="text-gray-400 text-sm mt-8">
            &copy; 2024 Alchemy United. Redefining the electric vehicle charging experience.
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}