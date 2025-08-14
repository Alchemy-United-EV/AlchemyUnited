import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Minimal Early Access Form - No external dependencies causing React context issues
function EarlyAccessForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log("[early-access] mounted successfully");
    document.title = "Request Early Access | Alchemy Premium EV Charging Network";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    try {
      const response = await fetch('/api/early-access-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h1 className="text-4xl font-bold mb-6 text-gold">Thank You!</h1>
          <p className="text-xl mb-8">Your application has been submitted successfully.</p>
          <a href="/" className="inline-block bg-gold text-black px-8 py-3 rounded-full font-bold hover:bg-gold/90 transition-colors">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 sm:p-8">
        <a href="/" className="text-white hover:text-gold transition-colors">
          ← Back to Home
        </a>
        <img 
          src="/assets/au-logo.png" 
          alt="Alchemy United Logo"
          className="h-8 w-auto filter brightness-125"
        />
        <div></div>
      </nav>

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Request <span className="text-gold">Early Access</span>
            </h1>
            <p className="text-xl text-white/80">
              Join the exclusive waitlist for premium EV charging
            </p>
          </div>

          <form 
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-white font-medium mb-2">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full bg-white/10 border border-white/30 text-white placeholder:text-white/60 rounded-lg px-3 py-2"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-white font-medium mb-2">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full bg-white/10 border border-white/30 text-white placeholder:text-white/60 rounded-lg px-3 py-2"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full bg-white/10 border border-white/30 text-white placeholder:text-white/60 rounded-lg px-3 py-2"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-white font-medium mb-2">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full bg-white/10 border border-white/30 text-white placeholder:text-white/60 rounded-lg px-3 py-2"
                placeholder="(555) 123-4567"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold hover:bg-gold/90 text-black font-bold py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
              Request Early Access
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

// Minimal Home Component - Inline to avoid React context issues
function HomeComponent() {
  useEffect(() => {
    console.log("[home] mounted successfully");
    document.title = "Alchemy Network | Premium EV Charging for Drivers & Hosts";
  }, []);

  const handleEarlyAccessClick = () => {
    console.log("Early access button clicked");
    window.location.href = '/early-access';
  };

  const handleHostClick = () => {
    console.log("Host application button clicked");
    window.location.href = '/host-application';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 sm:p-8 bg-black/80 backdrop-blur-sm">
        <img 
          src="/assets/au-logo.png" 
          alt="Alchemy United Logo"
          className="h-8 w-auto filter brightness-125"
        />
        <div className="flex gap-4">
          <button
            onClick={handleEarlyAccessClick}
            className="text-white hover:text-gold transition-colors px-4 py-2"
          >
            Get Early Access
          </button>
          <button
            onClick={handleHostClick}
            className="bg-gold text-black px-6 py-2 rounded-full font-semibold hover:bg-gold/90 transition-colors"
          >
            Become a Host
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <h1 className="text-5xl sm:text-7xl font-black mb-8 leading-tight">
              Premium <span className="text-gold">EV Charging</span><br />
              Network
            </h1>
            <p className="text-xl sm:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
              Experience the future of electric vehicle charging with our luxury network. 
              Reliable, fast, and premium locations for discerning EV drivers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleEarlyAccessClick}
                className="bg-gold text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-gold/90 transform hover:scale-105 transition-all duration-300"
              >
                Get Early Access
              </button>
              <button
                onClick={handleHostClick}
                className="border-2 border-gold text-gold px-8 py-4 rounded-full text-lg font-bold hover:bg-gold hover:text-black transition-all duration-300"
              >
                Become a Host Partner
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gold text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Ultra-Fast Charging</h3>
              <p className="text-white/70">State-of-the-art charging technology delivering up to 350kW power for rapid charging sessions.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gold text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Premium Locations</h3>
              <p className="text-white/70">Carefully curated charging stations at luxury hotels, premium shopping centers, and exclusive venues.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gold text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Reliable Network</h3>
              <p className="text-white/70">99.8% uptime guarantee with 24/7 customer support and real-time station monitoring.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Simple routing based on pathname
function App() {
  const path = window.location.pathname;
  
  if (path === '/early-access') {
    return <EarlyAccessForm />;
  }
  
  // For other routes, redirect to home using window.location
  if (path !== '/' && path !== '/host-application' && path !== '/thank-you') {
    window.location.href = '/';
    return <div>Redirecting...</div>;
  }
  
  // Temporary stubs for other routes
  if (path === '/host-application') {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Host Application</h1>
        <p className="text-xl mb-8">Coming soon...</p>
        <a href="/" className="bg-gold text-black px-6 py-3 rounded-full font-bold">Return Home</a>
      </div>
    </div>;
  }
  
  if (path === '/thank-you') {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gold">Thank You!</h1>
        <p className="text-xl mb-8">Your application has been received.</p>
        <a href="/" className="bg-gold text-black px-6 py-3 rounded-full font-bold">Return Home</a>
      </div>
    </div>;
  }
  
  return <HomeComponent />;
}

const el = document.getElementById("root");
if (!el) throw new Error("No #root element");

createRoot(el).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
