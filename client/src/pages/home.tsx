import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });

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
        activeSection === sectionId ? 'bg-gold' : 'bg-gray-300 hover:bg-gold'
      }`}
      title={title}
      aria-label={`Go to ${title} section`}
    />
  );

  return (
    <div className="bg-white text-black font-sans overflow-x-hidden">
      {/* Sticky Navigation */}
      <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="space-y-4">
          <NavigationDot sectionId="hero" title="Home" />
          <NavigationDot sectionId="zoom" title="Mission" />
          <NavigationDot sectionId="flow" title="Features" />
          <NavigationDot sectionId="burst" title="Product" />
          <NavigationDot sectionId="connection" title="Testimonials" />
          <NavigationDot sectionId="cta" title="Reserve" />
        </div>
      </nav>

      {/* Section 1: Hero */}
      <section 
        id="hero" 
        className="relative flex items-center justify-center min-h-screen bg-white"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <img 
            src="/assets/hero-ev-charger.png" 
            alt="Alchemy EV Charging Station" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 text-center text-black px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="animate-float">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="block">The Future of EV Charging</span>
              <span className="block text-gradient">Has Arrived</span>
            </h1>
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-12 max-w-4xl mx-auto leading-relaxed text-gray-600">
            AU delivers more than just power — we deliver presence. Intelligent infrastructure meets iconic design.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-yellow-700 text-black font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Join the Movement
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-black text-black hover:bg-black hover:text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-black animate-bounce">
          <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
            <div className="w-1 h-3 bg-black rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Section 2: Zoom/Precision */}
      <section 
        id="zoom" 
        className="relative flex items-center justify-center min-h-screen bg-white"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <img 
            src="/assets/plug-closeup.png" 
            alt="EV Charging Plug Close-up" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 text-center text-black px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-8 leading-tight">
            Charging,
            <span className="text-gradient block">Elevated.</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-gray-600">
            At AU, our mission is to transform every charge into a moment of excellence. We blend cutting-edge engineering with luxury aesthetics to build a charging experience that fits seamlessly into modern lifestyles and forward-thinking communities. Because how you power up matters.
          </p>
        </div>
      </section>

      {/* Section 3: Flow */}
      <section 
        id="flow" 
        className="relative flex items-center justify-center min-h-screen bg-white"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <img 
            src="/assets/cable-flow.png" 
            alt="Cable Flow Scene" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center text-black px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-8 leading-tight">
            Smart. Fast.
            <span className="text-gradient block">Effortless.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Ultra-Fast Charging</h3>
              <p className="text-gray-600">Engineered for high-efficiency power with minimal downtime.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">Connected Control</h3>
              <p className="text-gray-600">Manage, schedule, and monitor charging from your mobile device.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2">Built for the Planet</h3>
              <p className="text-gray-600">Designed with sustainability at the core — because progress shouldn't come at the Earth's expense.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Burst/Energy */}
      <section 
        id="burst" 
        className="relative flex items-center justify-center min-h-screen bg-white"
      >

        <div className="relative z-10 text-center text-black px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-8 leading-tight">
            Where Art Meets
            <span className="text-gradient block">Energy</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-gray-600">
            Our signature matte black stations with gold-accented logos are more than chargers — they're statements. Whether installed at home, in public, or in commercial environments, AU brings elegance to utility.
          </p>
        </div>
      </section>

      {/* Section 5: Connection */}
      <section 
        id="connection" 
        className="relative flex items-center justify-center min-h-screen bg-white"
      >

        <div className="relative z-10 text-center text-black px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">What Our Users Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-50 p-8 rounded-lg">
                <p className="text-lg italic mb-4 text-gray-700">"My garage has never looked better. The AU charger is both sleek and lightning-fast."</p>
                <p className="font-semibold">– Malik R.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <p className="text-lg italic mb-4 text-gray-700">"It's rare to see EV infrastructure that feels premium. AU nailed it."</p>
                <p className="font-semibold">– Sierra G.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section id="cta" className="relative min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <img 
            src="/images/section6.png" 
            alt="Calm Visual Fade-out" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black text-black mb-8 leading-tight">
            Reserve Your
            <span className="text-gradient block">AU Charger</span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 font-light mb-16 max-w-4xl mx-auto leading-relaxed">
            Initial rollout is limited. Join the early access list and be part of the charge that changes everything.
          </p>
          
          <div className="space-y-8">
            <Button 
              size="lg"
              className="bg-gold hover:bg-yellow-700 text-black font-bold py-6 px-16 rounded-full text-xl transition-all duration-300 transform hover:scale-105"
            >
              Get on the List
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="text-sm font-medium">No commitment required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span className="text-sm font-medium">Exclusive early access</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="text-sm font-medium">Premium updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <img 
            src="/images/alchemy_footerlogo.png" 
            alt="AU Logo" 
            className="h-16 sm:h-20 lg:h-24 mx-auto mb-8"
          />
          <p className="text-gold text-lg font-semibold mb-4">
            Alchemy Unleashed. Powering What's Next.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-gray-500 text-sm mb-4">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-gold transition-colors">Contact</a>
            <a href="#" className="hover:text-gold transition-colors">Instagram @au.energy</a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 AU (Alchemy Unleashed). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
