import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [activeSection, setActiveSection] = useState("landing");
  const [showLanding, setShowLanding] = useState(true);
  const { scrollY } = useScroll();

  // Transform values for smooth animations
  const landingOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const landingScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const heroY = useTransform(scrollY, [200, 600], [150, 0]);
  const heroOpacity = useTransform(scrollY, [200, 600], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      // Check if we're still on the landing (first 300px)
      if (window.pageYOffset < 300) {
        current = 'landing';
        setShowLanding(true);
      } else {
        setShowLanding(false);
        sections.forEach(section => {
          const sectionTop = (section as HTMLElement).offsetTop;
          if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id') || '';
          }
        });
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const NavigationDot = ({ sectionId, title }: { sectionId: string; title: string }) => (
    <button
      onClick={() => scrollToSection(sectionId)}
      className={`block w-3 h-3 rounded-full transition-colors duration-300 ${
        activeSection === sectionId ? 'bg-gold' : 'bg-white/40 hover:bg-gold'
      }`}
      title={title}
      aria-label={`Go to ${title} section`}
    />
  );

  return (
    <div className="bg-black text-white font-display overflow-hidden relative">
      {/* Landing Screen with AU Logo */}
      <motion.div 
        className="fixed inset-0 bg-black flex items-center justify-center z-40"
        style={{ 
          opacity: landingOpacity,
          scale: landingScale,
          pointerEvents: showLanding ? 'auto' : 'none'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center px-8"
        >
          <motion.img 
            src="/attached_assets/AE141A66-A440-499B-8889-41BABE3F729E_1754500827677.png" 
            alt="Alchemy United Golden Wings Logo" 
            className="h-48 sm:h-64 lg:h-80 xl:h-96 mx-auto mb-12 drop-shadow-2xl"
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <motion.div
            className="mt-20 text-gold/80 text-lg sm:text-xl tracking-[0.4em] uppercase font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1.4 }}
          >
            Scroll to Experience
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Sticky Navigation */}
      <nav className="fixed right-6 sm:right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="space-y-6">
          <NavigationDot sectionId="hero" title="Home" />
          <NavigationDot sectionId="zoom" title="Mission" />
          <NavigationDot sectionId="flow" title="Features" />
          <NavigationDot sectionId="burst" title="Product" />
          <NavigationDot sectionId="connection" title="Testimonials" />
          <NavigationDot sectionId="cta" title="Reserve" />
        </div>
      </nav>

      {/* Spacer for scroll effect */}
      <div className="h-screen bg-black"></div>

      {/* Hero Section */}
      <motion.section 
        id="hero" 
        className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-white overflow-hidden"
        style={{ 
          y: heroY,
          opacity: heroOpacity
        }}
      >
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <img 
            src="/assets/hero-ev-charger.png" 
            alt="Alchemy EV Charging Station" 
            className="w-full h-full object-cover"
          />
        </div>

        <motion.div 
          className="relative z-20 text-center text-white px-6 sm:px-8 lg:px-12 max-w-8xl mx-auto py-24"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
          >
            <h1 className="text-6xl sm:text-8xl lg:text-9xl xl:text-[12rem] font-black mb-8 leading-[0.85] tracking-tighter">
              <motion.span 
                className="block font-display text-white mb-4"
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              >
                ALCHEMY
              </motion.span>
              <motion.span 
                className="block text-gold font-display"
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                viewport={{ once: true }}
              >
                UNITED
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-light mb-20 max-w-6xl mx-auto leading-relaxed text-white/90 tracking-wide"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            viewport={{ once: true }}
          >
            The Future of Electric Excellence
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-center"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              className="bg-gold hover:bg-yellow-600 text-black font-bold py-8 px-20 rounded-full text-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl font-display tracking-wide"
            >
              Experience Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-3 border-white/80 text-white hover:bg-white hover:text-black font-bold py-8 px-20 rounded-full text-2xl transition-all duration-500 font-display tracking-wide backdrop-blur-sm"
            >
              Discover More
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        id="zoom" 
        className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <img 
            src="/assets/plug-closeup.png" 
            alt="EV Charging Plug Close-up" 
            className="w-full h-full object-cover"
          />
        </div>

        <motion.div 
          className="relative z-10 text-center text-black px-6 sm:px-8 lg:px-12 max-w-8xl mx-auto py-32"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl sm:text-7xl lg:text-9xl xl:text-[8rem] font-black mb-16 leading-[0.8] tracking-tighter"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="font-display block text-black">CHARGING,</span>
            <span className="text-gradient block font-display">ELEVATED.</span>
          </motion.h2>
          <motion.p 
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light max-w-6xl mx-auto leading-relaxed text-gray-700 tracking-wide"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            viewport={{ once: true }}
          >
            Transforming every charge into a moment of excellence through luxury engineering.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Section 3: Features */}
      <motion.section 
        id="flow" 
        className="relative flex items-center justify-center min-h-screen bg-white py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <img 
            src="/assets/cable-flow.png" 
            alt="Cable Flow Scene" 
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div 
          className="relative z-10 text-center text-black px-8 sm:px-12 lg:px-16 max-w-6xl mx-auto py-20"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl sm:text-6xl lg:text-8xl font-black mb-16 leading-[0.9] tracking-tight"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="font-display">Smart. Fast.</span>
            <span className="text-gradient block font-display">Effortless.</span>
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl mb-6">⚡</div>
              <h3 className="text-2xl font-bold mb-4 font-display tracking-wide">Ultra-Fast Charging</h3>
              <p className="text-lg text-gray-700 leading-relaxed">Engineered for high-efficiency power with minimal downtime.</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl mb-6">📱</div>
              <h3 className="text-2xl font-bold mb-4 font-display tracking-wide">Connected Control</h3>
              <p className="text-lg text-gray-700 leading-relaxed">Manage, schedule, and monitor charging from your mobile device.</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl mb-6">🌍</div>
              <h3 className="text-2xl font-bold mb-4 font-display tracking-wide">Built for the Planet</h3>
              <p className="text-lg text-gray-700 leading-relaxed">Designed with sustainability at the core — because progress shouldn't come at the Earth's expense.</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Section 4: Product */}
      <section 
        id="burst" 
        className="relative flex items-center justify-center min-h-screen bg-white py-20"
      >

        <div className="relative z-10 text-center text-black px-8 sm:px-12 lg:px-16 max-w-6xl mx-auto py-20">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-12 leading-[0.9] tracking-tight">
            <span className="font-display">Where Art Meets</span>
            <span className="text-gradient block font-display">Energy</span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light max-w-4xl mx-auto leading-relaxed text-gray-700 tracking-wide">
            Our signature matte black stations with gold-accented logos are more than chargers — they're statements. Whether installed at home, in public, or in commercial environments, Alchemy United brings elegance to utility.
          </p>
        </div>
      </section>

      {/* Section 5: Testimonials */}
      <section 
        id="connection" 
        className="relative flex items-center justify-center min-h-screen bg-white py-20"
      >

        <div className="relative z-10 text-center text-black px-8 sm:px-12 lg:px-16 max-w-6xl mx-auto py-20">
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 font-display tracking-tight leading-[0.9]">What Our Users Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="bg-gray-50 p-12 rounded-2xl">
                <p className="text-xl italic mb-6 text-gray-700 leading-relaxed">"My garage has never looked better. The Alchemy United charger is both sleek and lightning-fast."</p>
                <p className="font-bold text-lg font-display">– Malik R.</p>
              </div>
              <div className="bg-gray-50 p-12 rounded-2xl">
                <p className="text-xl italic mb-6 text-gray-700 leading-relaxed">"It's rare to see EV infrastructure that feels premium. Alchemy United nailed it."</p>
                <p className="font-bold text-lg font-display">– Sierra G.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section id="cta" className="relative min-h-screen bg-white flex items-center justify-center px-8 sm:px-12 lg:px-16 py-20">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <img 
            src="/images/section6.png" 
            alt="Calm Visual Fade-out" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center max-w-7xl mx-auto py-20">
          <h2 className="text-5xl sm:text-7xl lg:text-9xl font-black text-black mb-12 leading-[0.9] tracking-tight">
            <span className="font-display">Reserve Your</span>
            <span className="text-gradient block font-display">Alchemy United Charger</span>
          </h2>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 font-light mb-20 max-w-5xl mx-auto leading-relaxed tracking-wide">
            Initial rollout is limited. Join the early access list and be part of the charge that changes everything.
          </p>
          
          <div className="space-y-12">
            <Button 
              size="lg"
              className="bg-gold hover:bg-yellow-700 text-black font-bold py-8 px-20 rounded-full text-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-display tracking-wide"
            >
              Get on the List
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-12 justify-center items-center text-gray-600">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gold rounded-full"></div>
                <span className="text-lg font-medium font-display">No commitment required</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-black rounded-full"></div>
                <span className="text-lg font-medium font-display">Exclusive early access</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gold rounded-full"></div>
                <span className="text-lg font-medium font-display">Premium updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-24 px-8 sm:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <img 
            src="/images/alchemy_footerlogo.png" 
            alt="Alchemy United Logo" 
            className="h-20 sm:h-24 lg:h-28 mx-auto mb-12"
          />
          <p className="text-gold text-2xl font-bold mb-8 font-display tracking-wide">
            Alchemy Unleashed. Powering What's Next.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-gray-600 text-lg mb-8">
            <a href="#" className="hover:text-gold transition-colors font-display">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors font-display">Terms of Use</a>
            <a href="#" className="hover:text-gold transition-colors font-display">Contact</a>
            <a href="#" className="hover:text-gold transition-colors font-display">Instagram @alchemyunited.energy</a>
          </div>
          <p className="text-gray-500 text-base font-display">
            © 2025 Alchemy United. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
