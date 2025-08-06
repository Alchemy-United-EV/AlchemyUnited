import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import auWingsLogo from "@assets/AE141A66-A440-499B-8889-41BABE3F729E_1754500827677.png";

export default function Home() {
  const [activeSection, setActiveSection] = useState("landing");
  const [showLanding, setShowLanding] = useState(true);
  const { scrollY } = useScroll();

  // Transform values for smooth animations - logo fades larger then away
  const landingOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const landingScale = useTransform(scrollY, [0, 300], [1, 1.5]); // Scale UP as it fades
  const landingY = useTransform(scrollY, [100, 300], [0, -50]);
  
  // Background logo appears behind text as main logo fades
  const bgLogoOpacity = useTransform(scrollY, [250, 400], [0, 0.15]);
  const bgLogoScale = useTransform(scrollY, [250, 400], [0.8, 0.6]);
  
  const heroY = useTransform(scrollY, [200, 500], [100, 0]);
  const heroOpacity = useTransform(scrollY, [200, 500], [0, 1]);

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
          y: landingY,
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
            src={auWingsLogo} 
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

      {/* Background Logo (subtle behind ALCHEMY UNITED) */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-15 pointer-events-none"
        style={{ 
          opacity: bgLogoOpacity,
          scale: bgLogoScale
        }}
      >
        <img 
          src={auWingsLogo} 
          alt="Alchemy United Background Logo" 
          className="h-40 sm:h-48 lg:h-56 xl:h-64"
        />
      </motion.div>

      {/* Hero Section */}
      <motion.section 
        id="hero" 
        className="relative h-[85vh] bg-black overflow-hidden"
        style={{ 
          y: heroY,
          opacity: heroOpacity
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/assets/hero-ev-charger.png" 
            alt="Alchemy EV Charging Station" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div 
            className="text-center text-white px-6 sm:px-8 lg:px-12 w-full max-w-7xl"
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
              <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-black mb-6 leading-snug tracking-tighter">
                <motion.span 
                  className="block font-display text-white mb-2"
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Smart. Stylish.
                </motion.span>
                <motion.span 
                  className="block text-gold font-display"
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Built for EV Life.
                </motion.span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light mb-8 max-w-5xl mx-auto leading-normal text-white/90 tracking-wide"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              viewport={{ once: true }}
            >
              Alchemy United delivers high-performance EV chargers that double as modern art.
            </motion.p>

            <motion.div 
              className="flex flex-wrap justify-center gap-6 mb-12 text-white/80 text-sm sm:text-base lg:text-lg"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>Fast Charging</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🖤</span>
                <span>Matte Black Finish</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🏡</span>
                <span>Home & Business Ready</span>
              </div>
            </motion.div>
            
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
                size="lg"
                className="bg-black hover:bg-gray-900 border-2 border-white/20 text-white font-bold py-8 px-20 rounded-full text-2xl transition-all duration-500 font-display tracking-wide"
              >
                Discover More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        id="zoom" 
        className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden space-y-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <img 
            src="/assets/plug-closeup.png" 
            alt="EV Charging Plug Close-up" 
            className="w-full h-full object-cover"
          />
        </div>

        <motion.div 
          className="relative z-10 text-center text-black px-6 sm:px-8 lg:px-12 max-w-8xl mx-auto py-16 space-y-12"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-2xl sm:text-4xl lg:text-6xl xl:text-7xl font-black leading-snug tracking-tighter"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="font-display block text-black">CHARGING,</span>
            <span className="text-gradient block font-display">ELEVATED.</span>
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light max-w-6xl mx-auto leading-normal text-gray-700 tracking-wide"
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
        className="relative flex items-center justify-center min-h-screen bg-white py-16 space-y-16"
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
          className="relative z-10 text-center text-black px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto py-16 space-y-12"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-2xl sm:text-4xl lg:text-6xl xl:text-7xl font-black leading-snug tracking-tight"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="font-display text-black font-black">Smart. Fast.</span>
            <span className="text-gold block font-display font-black">Effortless.</span>
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
              <h3 className="text-xl sm:text-2xl font-bold mb-4 font-display tracking-wide">Ultra-Fast Charging</h3>
              <p className="text-base sm:text-lg text-gray-700 leading-normal">Engineered for high-efficiency power with minimal downtime.</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl mb-6">📱</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 font-display tracking-wide">Connected Control</h3>
              <p className="text-base sm:text-lg text-gray-700 leading-normal">Manage, schedule, and monitor charging from your mobile device.</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl mb-6">🌍</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 font-display tracking-wide">Built for the Planet</h3>
              <p className="text-base sm:text-lg text-gray-700 leading-normal">Designed with sustainability at the core — because progress shouldn't come at the Earth's expense.</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Section 4: Product */}
      <section 
        id="burst" 
        className="relative flex items-center justify-center min-h-screen bg-white py-8"
      >

        <div className="relative z-10 text-center text-black px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto py-12">
          <motion.h2 
            className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black mb-12 text-gold leading-snug tracking-tight font-display"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Features That Matter
          </motion.h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <motion.div 
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl lg:text-6xl mb-4">⚡</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 font-display text-black">Speed</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-normal">90% charge in 30 minutes</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl lg:text-6xl mb-4">🔒</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 font-display text-black">Security</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-normal">Anti-tamper lock & weatherproof</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl lg:text-6xl mb-4">🎨</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 font-display text-black">Design</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-normal">Matte black with gold logo</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl lg:text-6xl mb-4">📱</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 font-display text-black">Smart App</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-normal">Remote start, tracking, and usage insights</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <motion.section 
        id="how-it-works" 
        className="relative flex items-center justify-center min-h-screen bg-gray-50 py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="relative z-10 text-center text-black px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto py-12"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black mb-16 text-black leading-snug tracking-tight font-display"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-6 text-2xl font-bold text-black">1</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 font-display text-black">Join the List</h3>
              <p className="text-base sm:text-lg text-gray-700 leading-normal">Sign up for early access and secure your spot</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-6 text-2xl font-bold text-black">2</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 font-display text-black">Choose Your Station</h3>
              <p className="text-base sm:text-lg text-gray-700 leading-normal">Select the perfect charger for your needs</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-6 text-2xl font-bold text-black">3</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 font-display text-black">We Ship to Your Door</h3>
              <p className="text-base sm:text-lg text-gray-700 leading-normal">Fast, secure delivery straight to you</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-6 text-2xl font-bold text-black">4</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 font-display text-black">Plug In & Track</h3>
              <p className="text-base sm:text-lg text-gray-700 leading-normal">Connect the app and start charging smarter</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Why Alchemy United Section */}
      <motion.section 
        id="why-alchemy" 
        className="relative flex items-center justify-center min-h-screen bg-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="relative z-10 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto py-12"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="/assets/hero-ev-charger.png" 
                alt="Alchemy United EV Charger" 
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </motion.div>
            
            <motion.div 
              className="order-1 lg:order-2 text-center lg:text-left"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-10 text-black leading-snug tracking-tight font-display">
                Why <span className="text-gold">Alchemy United?</span>
              </h2>
              
              <div className="space-y-6 max-w-lg mx-auto lg:mx-0">
                <div className="flex items-start gap-4">
                  <span className="text-green-500 text-2xl mt-1">✅</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 font-display text-black">Built for Home & Business</h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-normal">Versatile installation options for any environment</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-green-500 text-2xl mt-1">✅</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 font-display text-black">Luxury Style, Durable Performance</h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-normal">Premium design meets industrial-grade reliability</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-green-500 text-2xl mt-1">✅</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 font-display text-black">Easy Setup, Expert Support</h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-normal">Simple installation with professional guidance</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Section 6: CTA */}
      <section id="cta" className="relative min-h-screen bg-white flex items-center justify-center px-4 sm:px-8 lg:px-12 py-8">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <img 
            src="/images/section6.png" 
            alt="Calm Visual Fade-out" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center max-w-6xl mx-auto py-12">
          <motion.h2 
            className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black text-black mb-8 leading-snug tracking-tight font-display"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Be the First to <span className="text-gold">Charge Differently</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl sm:text-2xl lg:text-3xl text-gray-700 font-light mb-8 leading-normal tracking-wide"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Join the early access list and unlock:
          </motion.p>

          <motion.div 
            className="text-left max-w-lg mx-auto mb-12 space-y-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 text-lg sm:text-xl text-gray-700">
              <span className="text-green-500 text-xl">✅</span>
              <span>10% off launch units</span>
            </div>
            <div className="flex items-center gap-4 text-lg sm:text-xl text-gray-700">
              <span className="text-green-500 text-xl">✅</span>
              <span>First shipments guaranteed</span>
            </div>
            <div className="flex items-center gap-4 text-lg sm:text-xl text-gray-700">
              <span className="text-green-500 text-xl">✅</span>
              <span>Collector edition finish</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg"
              className="bg-gold hover:bg-yellow-700 text-black font-bold py-10 px-24 rounded-full text-xl sm:text-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-display tracking-wide"
            >
              Get on the List
            </Button>
          </motion.div>
            
          <motion.div 
            className="flex flex-col sm:flex-row gap-12 justify-center items-center text-gray-600 mt-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
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
