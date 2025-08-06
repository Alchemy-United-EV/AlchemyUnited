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
          <NavigationDot sectionId="hero" title="Hero" />
          <NavigationDot sectionId="zoom" title="Precision" />
          <NavigationDot sectionId="flow" title="Flow" />
          <NavigationDot sectionId="burst" title="Energy" />
          <NavigationDot sectionId="connection" title="Connection" />
          <NavigationDot sectionId="cta" title="Join" />
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
              <span className="block">Plug Into</span>
              <span className="block text-gradient">the Future</span>
            </h1>
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-12 max-w-4xl mx-auto leading-relaxed text-gray-600">
            Revolutionary EV charging technology that transforms how we power tomorrow's transportation
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-yellow-700 text-black font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Discover Alchemy
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
            Engineered for
            <span className="text-gradient block">Excellence</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-gray-600">
            Designed to connect. Every component crafted with precision engineering 
            for reliability that exceeds industry standards.
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
            Energy in
            <span className="text-gradient block">Motion</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-gray-600">
            Power with purpose. Seamless energy flow through cables designed 
            for maximum efficiency and optimal power delivery.
          </p>
        </div>
      </section>

      {/* Section 4: Burst/Energy */}
      <section 
        id="burst" 
        className="relative flex items-center justify-center min-h-screen bg-white"
      >

        <div className="relative z-10 text-center text-black px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-8 leading-tight">
            High-Voltage
            <span className="text-gradient block">Impact</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-gray-600">
            Alchemy-grade power. Harnessing raw electrical energy with intelligent 
            control systems for unprecedented charging performance.
          </p>
        </div>
      </section>

      {/* Section 5: Connection */}
      <section 
        id="connection" 
        className="relative flex items-center justify-center min-h-screen bg-white"
      >

        <div className="relative z-10 text-center text-black px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-8 leading-tight">
            Made for Your
            <span className="text-gradient block">World</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-gray-600">
            The moment of connection. Where innovation meets reality and the future 
            of transportation becomes present. This is transformation.
          </p>
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
            Join the
            <span className="text-gradient block">Movement</span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 font-light mb-16 max-w-4xl mx-auto leading-relaxed">
            Be the first to experience the future of EV charging. 
            Get exclusive early access to Alchemy technology.
          </p>
          
          <div className="space-y-8">
            <Button 
              size="lg"
              className="bg-gold hover:bg-yellow-700 text-black font-bold py-6 px-16 rounded-full text-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Notified
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
            alt="Alchemy Logo" 
            className="h-16 sm:h-20 lg:h-24 mx-auto mb-8"
          />
          <p className="text-gray-500 text-sm">
            © 2025 Alchemy. Revolutionizing the future of electric vehicle charging.
          </p>
        </div>
      </footer>
    </div>
  );
}
