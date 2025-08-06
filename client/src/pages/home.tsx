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
    <div className="bg-white text-black font-display overflow-x-hidden">
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

        <div className="relative z-10 text-center text-black px-8 sm:px-12 lg:px-16 max-w-7xl mx-auto py-20">
          <div className="animate-float">
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black mb-8 leading-[1.1] tracking-tight">
              <span className="block font-display mb-2">The Future of EV Charging</span>
              <span className="block text-gradient font-display">Has Arrived</span>
            </h1>
          </div>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-light mb-16 max-w-5xl mx-auto leading-relaxed text-gray-700 tracking-wide">
            Alchemy United delivers more than just power — we deliver presence. Intelligent infrastructure meets iconic design.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-yellow-700 text-black font-bold py-6 px-16 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-display tracking-wide"
            >
              Join the Movement
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-black text-black hover:bg-black hover:text-white font-bold py-6 px-16 rounded-full text-xl transition-all duration-300 font-display tracking-wide"
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

      {/* Section 2: Mission */}
      <section 
        id="zoom" 
        className="relative flex items-center justify-center min-h-screen bg-white py-20"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <img 
            src="/assets/plug-closeup.png" 
            alt="EV Charging Plug Close-up" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 text-center text-black px-8 sm:px-12 lg:px-16 max-w-6xl mx-auto py-20">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-12 leading-[0.9] tracking-tight">
            <span className="font-display">Charging,</span>
            <span className="text-gradient block font-display">Elevated.</span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light max-w-4xl mx-auto leading-relaxed text-gray-700 tracking-wide">
            At Alchemy United, our mission is to transform every charge into a moment of excellence. We blend cutting-edge engineering with luxury aesthetics to build a charging experience that fits seamlessly into modern lifestyles and forward-thinking communities. Because how you power up matters.
          </p>
        </div>
      </section>

      {/* Section 3: Features */}
      <section 
        id="flow" 
        className="relative flex items-center justify-center min-h-screen bg-white py-20"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <img 
            src="/assets/cable-flow.png" 
            alt="Cable Flow Scene" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center text-black px-8 sm:px-12 lg:px-16 max-w-6xl mx-auto py-20">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-16 leading-[0.9] tracking-tight">
            <span className="font-display">Smart. Fast.</span>
            <span className="text-gradient block font-display">Effortless.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-6xl mb-6">⚡</div>
              <h3 className="text-2xl font-bold mb-4 font-display tracking-wide">Ultra-Fast Charging</h3>
              <p className="text-lg text-gray-700 leading-relaxed">Engineered for high-efficiency power with minimal downtime.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-6">📱</div>
              <h3 className="text-2xl font-bold mb-4 font-display tracking-wide">Connected Control</h3>
              <p className="text-lg text-gray-700 leading-relaxed">Manage, schedule, and monitor charging from your mobile device.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-6">🌍</div>
              <h3 className="text-2xl font-bold mb-4 font-display tracking-wide">Built for the Planet</h3>
              <p className="text-lg text-gray-700 leading-relaxed">Designed with sustainability at the core — because progress shouldn't come at the Earth's expense.</p>
            </div>
          </div>
        </div>
      </section>

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
