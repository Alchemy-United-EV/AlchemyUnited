import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
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
        activeSection === sectionId ? 'bg-blue-500' : 'bg-gray-300 hover:bg-blue-500'
      }`}
      title={title}
      aria-label={`Go to ${title} section`}
    />
  );

  return (
    <div className="bg-white text-gray-900 font-sans overflow-x-hidden">
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
        className="section-bg relative flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/section1.png')"
        }}
      >
        <div className="text-center text-white z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="animate-float">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="block">Plug Into</span>
              <span className="block text-gradient">the Future</span>
            </h1>
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-12 max-w-4xl mx-auto leading-relaxed">
            Revolutionary EV charging technology that transforms how we power tomorrow's transportation
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Discover Alchemy
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-12 rounded-full text-lg transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Section 2: Zoom/Precision */}
      <section 
        id="zoom" 
        className="section-bg relative flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/section2.png')"
        }}
      >
        <div className="text-center text-white z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-8 leading-tight">
            Precision at the
            <span className="text-gradient block">Point of Contact</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Every component engineered to perfection. Every connection designed for reliability. 
            Experience charging technology that sets new standards for the industry.
          </p>
        </div>
      </section>

      {/* Section 3: Flow */}
      <section 
        id="flow" 
        className="section-bg relative flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/section3.png')"
        }}
      >
        <div className="text-center text-white z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-8 leading-tight">
            Engineered
            <span className="text-gradient block">Energy Flow</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Seamless power delivery through cables designed for maximum efficiency. 
            Our advanced technology ensures optimal energy transfer with zero compromise.
          </p>
        </div>
      </section>

      {/* Section 4: Burst/Energy */}
      <section 
        id="burst" 
        className="section-bg relative flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/section4.png')"
        }}
      >
        <div className="text-center text-white z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-8 leading-tight">
            Every Spark
            <span className="text-gradient block">Has Purpose</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Harnessing the raw power of electricity with intelligent control systems. 
            Watch as golden energy flows through our revolutionary charging architecture.
          </p>
        </div>
      </section>

      {/* Section 5: Connection */}
      <section 
        id="connection" 
        className="section-bg relative flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/section5.png')"
        }}
      >
        <div className="text-center text-white z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-8 leading-tight">
            Built to Power
            <span className="text-gradient block">Tomorrow</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            The moment of connection. Where innovation meets reality and the future of transportation 
            becomes present. This is more than charging—this is transformation.
          </p>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section id="cta" className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black text-gray-900 mb-8 leading-tight">
            Join the
            <span className="text-gradient block">Movement</span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 font-light mb-16 max-w-4xl mx-auto leading-relaxed">
            Be part of the electric revolution. Experience the future of charging technology 
            and help us build a cleaner, more efficient tomorrow.
          </p>
          
          <div className="space-y-8">
            <Button 
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-16 rounded-full text-xl transition-all duration-300 transform hover:scale-105 animate-glow"
            >
              Get Early Access
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">No commitment required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Beta testing available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">Exclusive updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
