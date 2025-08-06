import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "wouter";

// Flip Card Component
function FlipCard({ problem, solution, index }: { problem: any, solution: any, index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // No automatic flipping - only manual interaction

  return (
    <motion.div 
      className="relative w-full h-[28rem] sm:h-96 perspective-1000 group"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Flip Button */}
      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gold hover:bg-white transition-all duration-300 shadow-lg animate-pulse-gold hover:animate-none group-hover:scale-110"
        title="Click to flip card"
      >
        <span className="text-xl font-bold">↻</span>
      </button>

      <motion.div
        className="relative w-full h-full preserve-3d transition-transform duration-1000 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Problem Side (Front) */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 sm:p-8 shadow-xl border border-red-200 hover:shadow-2xl transition-shadow duration-300">
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
              <h3 className="text-xl sm:text-2xl font-bold text-red-800 mb-4 sm:mb-6 font-display leading-tight">
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
          className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-gold/10 to-gold/20 rounded-2xl p-6 sm:p-8 shadow-xl border border-gold/40 hover:shadow-2xl transition-shadow duration-300"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gold/30 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-gold text-xl sm:text-2xl">{solution.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="w-8 sm:w-12 h-1.5 sm:h-2 bg-gold rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gold mb-4 sm:mb-6 font-display leading-tight">
                {solution.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                {solution.desc}
              </p>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                <img 
                  src="/assets/au-logo.png" 
                  alt="AU"
                  className="h-6 w-auto"
                />
                <span className="text-sm text-gold font-medium">The Alchemy Way</span>
              </div>
              <div className="text-xs text-gray-500">
                Tap ↻ to see the problem
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Problem Solution Flashcards Component
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
      <motion.div 
        className="text-center mb-12"
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-gray-800 font-display">
          Current Charging vs <span className="text-gold">Alchemy</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          See how we transform every pain point into a premium experience
        </p>
      </motion.div>
      
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

export default function Home() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Hero parallax effects - gentler fade for better interaction
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, -50]);
  
  // Logo fade effect - fades out when scrolling past hero section
  const logoOpacity = useTransform(scrollY, [0, window.innerHeight * 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      
      {/* Navigation Logo */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: logoOpacity }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center drop-shadow-2xl">
          <img 
            src="/assets/au-logo.png" 
            alt="Alchemy United Logo"
            className="h-8 w-auto sm:h-12 filter brightness-125"
          />
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        className="relative h-screen bg-black overflow-hidden flex items-center justify-center"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0">
          <img 
            src="/assets/hero-ev-charger.png" 
            alt="Alchemy United EV Charging Station" 
            className="w-full h-full object-cover"
          />
        </div>

        <motion.div 
          className="relative z-20 text-center text-white px-4 sm:px-6 max-w-6xl"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
        >
          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-black mb-6 leading-tight tracking-tight font-display"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            <span className="block text-white mb-1">The Future of</span>
            <span className="text-gold block">Premium Charging</span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed text-white/90 px-2"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
          >
            Join Alchemy United — an exclusive network of luxury EV charging stations built for elegance, speed, and next-gen infrastructure.
          </motion.p>
          
          <motion.div 
            className="flex flex-col gap-4 justify-center items-center max-w-md mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
          >
            <button
              onClick={() => window.location.href = '/early-access'}
              className="inline-flex items-center justify-center bg-gold hover:bg-gold/90 text-black font-bold py-4 px-12 sm:py-6 sm:px-16 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 font-display w-full sm:w-auto cursor-pointer"
            >
              Request Early Access
            </button>
            <button
              onClick={() => window.location.href = '/host'}
              className="inline-flex items-center justify-center border-2 border-white/30 hover:border-gold text-white hover:text-gold hover:bg-gold/10 font-bold py-4 px-12 sm:py-6 sm:px-16 rounded-full text-lg sm:text-xl transition-all duration-300 bg-transparent font-display w-full sm:w-auto cursor-pointer"
            >
              Become a Host
            </button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Problem > Solution Slideshow Section */}
      <section className="relative min-h-screen bg-white py-20 px-6 sm:px-12 lg:px-20 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <ProblemSolutionSlideshow />
        </div>
      </section>

      {/* Offer Section */}
      <section className="relative min-h-screen bg-gray-900 py-20 px-6 sm:px-12 lg:px-20 flex items-center">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/assets/cable-flow.png" 
            alt="EV Cable Flow" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <motion.div 
          className="relative z-10 max-w-6xl mx-auto text-center text-white"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-8">
            <img 
              src="/assets/au-logo.png" 
              alt="Alchemy United Logo"
              className="h-20 w-auto sm:h-24 filter brightness-125"
            />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-8 leading-tight font-display">
            Gain Early Access to the{' '}
            <span className="text-gold">Alchemy Network</span>
          </h2>
          
          <p className="text-xl sm:text-2xl font-light mb-12 max-w-4xl mx-auto leading-relaxed text-white/90">
            Whether you're a driver, property owner, or commercial partner — Alchemy offers high-speed EV fueling with unmatched aesthetics and intelligence.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 max-w-5xl mx-auto">
            <motion.div 
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-bold mb-2 text-gold">Premium Fast Charging</h3>
              <p className="text-white/80 text-sm">Ultra-fast speeds up to 350kW</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">🏙️</div>
              <h3 className="text-lg font-bold mb-2 text-gold">Prime Station Locations</h3>
              <p className="text-white/80 text-sm">Hotels, malls, offices & more</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-lg font-bold mb-2 text-gold">Co-branded Opportunities</h3>
              <p className="text-white/80 text-sm">Partner branding & revenue share</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-lg font-bold mb-2 text-gold">Intelligent Energy Tracking</h3>
              <p className="text-white/80 text-sm">Smart usage & cost optimization</p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => window.location.href = '/early-access'}
              className="inline-flex items-center justify-center bg-gold hover:bg-gold/90 text-black font-bold py-8 px-16 rounded-full text-2xl transition-all duration-300 transform hover:scale-105 font-display cursor-pointer"
            >
              Get On The List
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Become a Host Section */}
      <section className="relative min-h-screen bg-black py-20 px-6 sm:px-12 lg:px-20 flex items-center">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="/assets/plug-closeup.png" 
            alt="EV Charger Plugged Into Car" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto text-center text-white"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 leading-tight font-display">
            Want to <span className="text-gold">Host a Station?</span>
          </h2>
          
          <p className="text-xl sm:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed text-white/90">
            Own a business, hotel, gym, or property? Host an Alchemy charger and turn traffic into revenue.
          </p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => window.location.href = '/host'}
              className="inline-flex items-center justify-center bg-gold hover:bg-gold/90 text-black font-bold py-8 px-16 rounded-full text-2xl transition-all duration-300 transform hover:scale-105 font-display cursor-pointer"
            >
              Apply to Host
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="relative min-h-screen bg-white py-20 px-6 sm:px-12 lg:px-20 flex items-center">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-20 text-gray-800 font-display">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <motion.div 
              className="text-center"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-black">
                1
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 font-display">Apply for Access</h3>
              <p className="text-gray-600 leading-relaxed">Submit your application and join the exclusive waitlist for premium charging access.</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-black">
                2
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 font-display">Get Verified + Invited</h3>
              <p className="text-gray-600 leading-relaxed">Complete verification process and receive your exclusive invitation to the network.</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-black">
                3
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 font-display">Use the Platform</h3>
              <p className="text-gray-600 leading-relaxed">Access your dashboard to locate stations, make reservations, and manage your charging network.</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-black">
                4
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 font-display">Earn & Charge</h3>
              <p className="text-gray-600 leading-relaxed">Earn rewards, track usage analytics, or charge instantly at any Alchemy station.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="relative bg-gray-50 py-20 px-6 sm:px-12 lg:px-20">
        <motion.div 
          className="max-w-6xl mx-auto text-center"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-16 text-gray-800 font-display">
            Trusted by Drivers and Developers Alike
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 opacity-60">
            <div className="flex items-center justify-center">
              <div className="w-24 h-12 bg-gray-300 rounded flex items-center justify-center text-gray-500 font-bold">TESLA</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-24 h-12 bg-gray-300 rounded flex items-center justify-center text-gray-500 font-bold">BMW</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-24 h-12 bg-gray-300 rounded flex items-center justify-center text-gray-500 font-bold">AUDI</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-24 h-12 bg-gray-300 rounded flex items-center justify-center text-gray-500 font-bold">FORD</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-24 h-12 bg-gray-300 rounded flex items-center justify-center text-gray-500 font-bold">GM</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA Footer */}
      <section className="relative min-h-screen bg-black flex items-center justify-center">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="/assets/hero-ev-charger.png" 
            alt="Alchemy Charger with White Car" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <motion.div 
          className="relative z-10 text-center text-white px-6 max-w-5xl"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-12 leading-tight font-display">
            Join the <span className="text-gold">Movement</span>
          </h2>
          
          <p className="text-xl sm:text-2xl font-light mb-16 leading-relaxed text-white/90">
            Be the first to experience the future of premium EV charging.
          </p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => window.location.href = '/early-access'}
              className="inline-flex items-center justify-center bg-gold hover:bg-gold/90 text-black font-bold py-10 px-20 rounded-full text-2xl transition-all duration-300 transform hover:scale-105 font-display cursor-pointer"
            >
              Request Invite
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-16 px-6 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <img 
              src="/assets/au-logo.png" 
              alt="Alchemy United Logo"
              className="h-12 w-auto sm:h-16 filter brightness-125"
            />
          </div>
          <p className="text-gold text-lg sm:text-xl font-bold mb-8 font-display leading-tight">
            Alchemy United.<br className="sm:hidden" /> Powering What's Next.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-white/60 mb-8">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-gold transition-colors">Contact</a>
            <a href="#" className="hover:text-gold transition-colors">Partners</a>
          </div>
          <p className="text-white/40 text-sm">
            © 2025 Alchemy United. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}