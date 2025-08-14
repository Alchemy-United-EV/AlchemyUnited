import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// FlipCard Component for Problems ↔ Solutions
interface FlipCardProps {
  id: string;
  problemTitle: string;
  problemText: string;
  solutionTitle: string;
  solutionText: string;
}

function FlipCard({ id, problemTitle, problemText, solutionTitle, solutionText }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggle = () => setIsFlipped(!isFlipped);

  return (
    <div className="group perspective fade-in">
      <button
        type="button"
        onClick={toggle}
        onKeyDown={(e) => { 
          if (e.key === "Enter" || e.key === " ") { 
            e.preventDefault(); 
            toggle(); 
          }
        }}
        aria-pressed={isFlipped}
        aria-label={isFlipped ? "Show problem" : "Show solution"}
        className="relative w-full h-72 focus:outline-none transform hover:scale-[1.01] transition-transform duration-200 touch-tap"
      >
        <div className={`preserve-3d duration-700 ease-out relative w-full h-full ${isFlipped ? "rotate-y-180" : ""} hover:shadow-[var(--shadow-lg)]`}>
          {/* Problem side (front) */}
          <div className="absolute inset-0 backface-hidden card p-6 border-red-100 bg-gradient-to-br from-red-50 to-red-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">⚠️</span>
              </div>
              <p className="text-sm font-bold text-red-700 uppercase tracking-wide">Problem</p>
            </div>
            <h3 className="text-xl font-bold text-red-800 mb-3 leading-tight">{problemTitle}</h3>
            <p className="text-sm text-red-900/90 leading-relaxed mb-4">{problemText}</p>
            <div className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-red-600 font-semibold bg-red-200/50 px-3 py-1.5 rounded-full">
              <span>Tap 🔄 for solution</span>
            </div>
          </div>
          
          {/* Solution side (back) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 card p-6 border-emerald-100 bg-gradient-to-br from-emerald-50 to-emerald-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <p className="text-sm font-bold text-emerald-700 uppercase tracking-wide">Solution</p>
            </div>
            <h3 className="text-xl font-bold text-emerald-800 mb-3 leading-tight">{solutionTitle}</h3>
            <p className="text-sm text-emerald-900/90 leading-relaxed mb-4">{solutionText}</p>
            <div className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-200/50 px-3 py-1.5 rounded-full">
              <span>Tap 🔄 for problem</span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

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
    
    // Add immediate dopamine feedback
    const submitBtn = e.currentTarget.querySelector('button[type="submit"]') as HTMLElement;
    const form = e.currentTarget as HTMLElement;
    
    if (submitBtn) {
      submitBtn.classList.add('haptic-heavy');
      setTimeout(() => submitBtn.classList.remove('haptic-heavy'), 300);
    }
    
    try {
      // Map to match server schema - need ALL required fields
      const submissionData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        vehicleType: "Model S", // Default values for required fields
        chargingFrequency: "Weekly",
        location: "Not specified"
      };
      
      const response = await fetch('/api/early-access-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      
      if (response.ok) {
        // Success dopamine burst
        if (submitBtn) {
          submitBtn.classList.add('success-pop');
          submitBtn.innerHTML = '✓ Success!';
          submitBtn.style.background = 'var(--gold)';
        }
        if (form) {
          form.classList.add('haptic-bounce');
        }
        
        setTimeout(() => {
          setSubmitted(true);
        }, 600);
      } else {
        const error = await response.json();
        console.error('Submission error:', error);
        if (submitBtn) {
          submitBtn.classList.add('haptic-shake');
          setTimeout(() => submitBtn.classList.remove('haptic-shake'), 300);
        }
      }
    } catch (error) {
      console.error('Submission failed:', error);
      if (submitBtn) {
        submitBtn.classList.add('haptic-shake');
        setTimeout(() => submitBtn.classList.remove('haptic-shake'), 300);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Add haptic feedback for typing
    const input = document.activeElement as HTMLElement;
    if (input && input.tagName === 'INPUT') {
      input.classList.add('haptic-light');
      setTimeout(() => input.classList.remove('haptic-light'), 100);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center success-pop">
          <div className="animate-bounce text-6xl mb-4">🎉</div>
          <h1 className="h1-premium text-gold mb-6 animate-pulse-gold">Thank You!</h1>
          <p className="subcopy mb-8">Your application has been submitted successfully. We'll contact you within 24-48 hours.</p>
          <a href="/" className="btn-primary touch-tap">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="backdrop-blur-md bg-white/70 supports-[backdrop-filter]:bg-white/50 border-b border-black/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <a href="/" className="hover:text-gold transition-colors">
            ← Back to Home
          </a>
          <img 
            src="/assets/au-logo.png" 
            alt="Alchemy United Logo"
            className="h-8 w-auto"
          />
          <div></div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mx-auto max-w-4xl px-6 pt-12 pb-4 reveal">
            <h1 className="h1-premium text-center">
              Request <span className="text-gold">Early Access</span>
            </h1>
            <p className="subcopy text-center">
              Join the exclusive waitlist for premium EV charging
            </p>
          </div>

          <form 
            onSubmit={handleSubmit}
            className="card p-6 md:p-8 mt-6 reveal space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-white font-medium mb-2">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full bg-white/10 border border-white/30 text-white placeholder:text-white/60 rounded-lg px-3 py-2 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all touch-tap"
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
                  className="w-full bg-white/10 border border-white/30 text-white placeholder:text-white/60 rounded-lg px-3 py-2 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all touch-tap"
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
                className="w-full bg-white/10 border border-white/30 text-white placeholder:text-white/60 rounded-lg px-3 py-2 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all touch-tap"
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
                className="w-full bg-white/10 border border-white/30 text-white placeholder:text-white/60 rounded-lg px-3 py-2 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all touch-tap"
                placeholder="(555) 123-4567"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full md:w-auto touch-tap"
            >
              Request Early Access
            </button>
            <p className="subcopy mt-3 text-center">No spam. Cancel anytime. Your data is secure.</p>
          </form>
        </div>
      </main>
    </div>
  );
}

// Simplified Home Component that works with current setup
function HomeComponent() {
  useEffect(() => {
    console.log("[home] mounted successfully");
    document.title = "Alchemy Network | Premium EV Charging for Drivers & Hosts";
    
    // Scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, { threshold: 0.1 });

    // Initialize all reveal elements
    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    // Immediately show elements that are already in view
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('in');
        }
      });
    }, 100);

    // Optimized dopamine micro-interactions using event delegation
    const handleInteraction = (e: Event) => {
      const el = e.target as HTMLElement;
      const isInteractive = el.matches('button, a, input, select, [role="button"]');
      
      if (!isInteractive) return;
      
      if (e.type === 'touchstart') {
        el.classList.add('haptic-medium');
        setTimeout(() => el.classList.remove('haptic-medium'), 200);
      } else if (e.type === 'mousedown') {
        el.classList.add('haptic-light');
        setTimeout(() => el.classList.remove('haptic-light'), 100);
      } else if (e.type === 'focus') {
        el.style.outline = '2px solid var(--gold)';
        el.style.outlineOffset = '2px';
      }
    };

    // Use event delegation for better performance
    document.addEventListener('touchstart', handleInteraction, { passive: true });
    document.addEventListener('mousedown', handleInteraction);
    document.addEventListener('focus', handleInteraction, true);

    return () => {
      observer.disconnect();
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('mousedown', handleInteraction);
      document.removeEventListener('focus', handleInteraction);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <img 
            src="/assets/au-logo.png" 
            alt="Alchemy United Premium EV Charging Network"
            className="h-8 w-auto"
          />
          <div className="flex gap-4">
            <button
              onClick={() => window.location.href = '/early-access'}
              className="hover:text-[var(--gold)] transition-colors px-4 py-2 underline decoration-[var(--gold)] underline-offset-4"
            >
              Get Early Access
            </button>
            <button
              onClick={() => window.location.href = '/host-application'}
              className="btn-gold-ghost"
            >
              Become a Host
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="relative overflow-hidden bg-[url('/assets/hero-image.jpeg')] bg-cover bg-center py-20 md:py-28">
          {/* Overlay for contrast */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-transparent md:from-white/60 md:via-white/30"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            <div className="fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-1.5 text-xs font-medium text-gray-700 shadow-sm mb-4">
                ⚡ PREMIUM NETWORK
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
                <span className="block">Premium</span>
                <span className="block text-[#D4AF37]">EV Charging</span>
                <span className="block">Network</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto mt-3 leading-relaxed">
                Experience the future of electric vehicle charging with our luxury network. 
                Reliable, fast, and premium locations for discerning EV drivers.
              </p>
              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 sm:justify-center">
                <button
                  onClick={() => window.location.href = '/early-access'}
                  className="inline-flex items-center justify-center rounded-2xl px-7 py-4 bg-[#D4AF37] text-black font-semibold tracking-wide shadow-[0_8px_24px_rgba(212,175,55,0.35)] hover:brightness-105 active:translate-y-[1px] transition"
                >
                  Get Early Access
                </button>
                <button
                  onClick={() => window.location.href = '/host-application'}
                  className="inline-flex items-center justify-center rounded-2xl px-7 py-4 border border-[#D4AF37] text-[#D4AF37]/95 bg-white/10 backdrop-blur-sm hover:bg-[#D4AF37]/10 transition"
                >
                  Become a Host
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_100%)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center fade-in">
              <div className="badge mb-2">Premium Network</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Why Choose Alchemy Network?
              </h2>
            </div>

            <div className="mt-12">
              <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="card p-6 hover:translate-y-[-2px] transition-transform duration-200 will-change-transform hover-lift fade-in">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[var(--gold)] text-black mb-4">
                    ⚡
                  </div>
                  <h3 className="text-lg leading-6 font-semibold text-gray-900 mb-2">Ultra-Fast Charging</h3>
                  <p className="text-base text-gray-600">
                    State-of-the-art charging technology delivering up to 350kW power for rapid charging sessions.
                  </p>
                </div>

                <div className="card p-6 hover:translate-y-[-2px] transition-transform duration-200 will-change-transform hover-lift fade-in">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[var(--gold)] text-black mb-4">
                    🏆
                  </div>
                  <h3 className="text-lg leading-6 font-semibold text-gray-900 mb-2">Premium Locations</h3>
                  <p className="text-base text-gray-600">
                    Carefully curated charging stations at luxury hotels, premium shopping centers, and exclusive venues.
                  </p>
                </div>

                <div className="card p-6 hover:translate-y-[-2px] transition-transform duration-200 will-change-transform hover-lift fade-in">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[var(--gold)] text-black mb-4">
                    🔒
                  </div>
                  <h3 className="text-lg leading-6 font-semibold text-gray-900 mb-2">Reliable Network</h3>
                  <p className="text-base text-gray-600">
                    99.8% uptime guarantee with 24/7 customer support and real-time station monitoring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Problems ↔ Solutions Flip Cards */}
        <div className="py-16 bg-[var(--bg-page)]">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-12 fade-in">
              <div className="badge mb-2">Problems 🔄 Solutions</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                We Solve Real <span className="text-[var(--gold)]">EV Problems</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mt-4">Tap any card to see how we transform industry pain points into seamless experiences</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: 'reliability',
                  problemTitle: 'Slow charge speeds',
                  problemText: 'Legacy equipment and power limits cause long dwell times and poor throughput.',
                  solutionTitle: 'Guaranteed reservations',
                  solutionText: 'Premium chargers with bookable time slots and 99.9% uptime SLAs keep trips on schedule.'
                },
                {
                  id: 'pricing',
                  problemTitle: 'Pricing chaos',
                  problemText: 'Complex billing structures, hidden fees, and variable rates make costs unpredictable.',
                  solutionTitle: 'Transparent pricing',
                  solutionText: 'Simple per-kWh rates with no hidden fees or membership requirements.'
                },
                {
                  id: 'security',
                  problemTitle: 'Host security concerns',
                  problemText: 'Property owners worry about liability, maintenance costs, and unvetted users.',
                  solutionTitle: 'Vetted community',
                  solutionText: 'Background-checked drivers, insurance coverage, and 24/7 monitoring protect host properties.'
                }
              ].map(pair => (
                <FlipCard key={pair.id} {...pair} />
              ))}
            </div>
          </div>
        </div>

        {/* Social Proof - Testimonials */}
        <div className="py-16 bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_100%)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 fade-in">
              <div className="badge mb-2">Trusted Network</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Loved by <span className="text-[var(--gold)]">1,000+</span> Users
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mt-4">Real stories from drivers and hosts in our network</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: 'Sarah Chen',
                  role: 'Model S Owner',
                  location: 'San Francisco, CA',
                  rating: 5,
                  text: 'Finally found reliable EV charging with guaranteed availability. This premium EV charging network changed my road trip planning completely.'
                },
                {
                  name: 'Michael Rodriguez',
                  role: 'EV Host Partner',
                  location: 'Austin, TX',
                  rating: 5,
                  text: 'The EV host revenue model is transparent and profitable. Fast charging demand keeps my site busy with excellent returns.'
                },
                {
                  name: 'Jennifer Walsh',
                  role: 'Tesla Owner',
                  location: 'Denver, CO',
                  rating: 5,
                  text: 'Premium locations and guaranteed uptime make this my go-to charging network for business travel.'
                }
              ].map((testimonial, index) => (
                <div key={index} className="card p-6 hover-lift fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--gold)] text-black font-bold flex items-center justify-center">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location} • {testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-[var(--gold)]">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partner Networks */}
        <div className="py-16 bg-[var(--bg-page)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 fade-in">
              <div className="badge mb-2">Trusted Partners</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Integrated with <span className="text-[var(--gold)]">Leading Networks</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mt-4">Connect with the most trusted EV charging brands</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: 'Mercedes-Benz', letter: 'M' },
                { name: 'Tesla Network', letter: 'T' },
                { name: 'BMW Charging', letter: 'B' },
                { name: 'Audi e-tron', letter: 'A' },
                { name: 'Lucid Motors', letter: 'L' },
                { name: 'Rivian', letter: 'R' }
              ].map((partner, index) => (
                <div key={index} className="card p-4 text-center hover-lift fade-in">
                  <div className="w-16 h-16 rounded-full bg-[var(--gold)] text-black font-bold flex items-center justify-center mx-auto mb-3 text-xl">
                    {partner.letter}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{partner.name}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8 fade-in">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">50+</span> charging networks • 
                <span className="font-semibold text-gray-900"> 10,000+</span> stations • 
                <span className="font-semibold text-gray-900"> 99.9%</span> uptime
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA Section */}
        <div className="relative isolate overflow-hidden rounded-2xl mx-6 my-12 px-6 py-10 text-center bg-white shadow-[0_30px_60px_-30px_rgba(212,175,55,.35)] border border-[var(--border)]">
          <div className="fade-in">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Ready to experience premium EV charging?
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-600">
              Join thousands of satisfied drivers who have chosen the premium experience.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.href = '/early-access'}
                className="btn-gold"
              >
                Get Early Access Today
              </button>
              <button
                onClick={() => window.location.href = '/host-application'}
                className="btn-gold-ghost"
              >
                Become a Host Partner
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Host Application Form Component
function HostApplicationForm() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactFirstName: '',
    contactLastName: '',
    email: '',
    phone: '',
    propertyType: '',
    propertyAddress: '',
    parkingSpaces: '',
    electricalCapacity: '',
    expectedTraffic: '',
    operatingHours: '',
    currentAmenities: '',
    partnershipInterest: '',
    timeline: '',
    additionalInfo: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log("[host-application] mounted successfully");
    document.title = "Host Application | Alchemy Premium EV Charging Network";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Host application submitted:', formData);
    
    try {
      const response = await fetch('/api/host-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitted(true);
        window.location.href = '/thank-you';
      } else {
        const error = await response.json();
        console.error('Host application submission error:', error);
      }
    } catch (error) {
      console.error('Host application submission failed:', error);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gold">Application Submitted!</h1>
          <p className="text-xl mb-8">We'll contact you within 2-3 business days.</p>
          <a href="/" className="bg-gold text-black px-6 py-3 rounded-full font-bold">Return Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <a href="/">
            <img 
              src="/assets/au-logo.png" 
              alt="Alchemy United Premium EV Charging Network"
              className="h-8 w-auto"
            />
          </a>
          <a href="/" className="text-gray-700 hover:text-[var(--gold)] transition-colors">← Back to Home</a>
        </div>
      </nav>

      {/* Form Content */}
      <main className="pt-8 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl px-6 pt-12 pb-4 fade-in">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 text-center">Become a Host Partner</h1>
            <p className="text-lg md:text-xl text-gray-600 text-center max-w-3xl mx-auto mt-4">
              Join our premium EV charging network and generate revenue while providing exceptional service to EV drivers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card p-6 md:p-8 mt-6 fade-in">
            {/* Business Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Business Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="Your Business Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type *
                  </label>
                  <select
                    required
                    value={formData.propertyType}
                    onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  >
                    <option value="">Select Property Type</option>
                    <option value="hotel">Hotel/Resort</option>
                    <option value="retail">Retail/Shopping Center</option>
                    <option value="restaurant">Restaurant/Dining</option>
                    <option value="office">Office Building</option>
                    <option value="parking">Parking Facility</option>
                    <option value="residential">Residential Complex</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactFirstName}
                    onChange={(e) => setFormData({...formData, contactFirstName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="Your First Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactLastName}
                    onChange={(e) => setFormData({...formData, contactLastName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="Your Last Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Property Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Address *
                  </label>
                  <textarea
                    required
                    value={formData.propertyAddress}
                    onChange={(e) => setFormData({...formData, propertyAddress: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    rows={3}
                    placeholder="Full address of the property"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Parking Spaces *
                    </label>
                    <select
                      required
                      value={formData.parkingSpaces}
                      onChange={(e) => setFormData({...formData, parkingSpaces: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    >
                      <option value="">Select Parking Spaces</option>
                      <option value="2-5">2-5 spaces</option>
                      <option value="6-10">6-10 spaces</option>
                      <option value="11-20">11-20 spaces</option>
                      <option value="21-50">21-50 spaces</option>
                      <option value="50+">50+ spaces</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Electrical Capacity *
                    </label>
                    <select
                      required
                      value={formData.electricalCapacity}
                      onChange={(e) => setFormData({...formData, electricalCapacity: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    >
                      <option value="">Select Electrical Capacity</option>
                      <option value="unknown">Not sure/Need assessment</option>
                      <option value="sufficient">Sufficient for EV charging</option>
                      <option value="upgrade-needed">May need upgrades</option>
                      <option value="high-capacity">High capacity available</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Operations */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Operations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Daily Traffic *
                  </label>
                  <select
                    required
                    value={formData.expectedTraffic}
                    onChange={(e) => setFormData({...formData, expectedTraffic: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  >
                    <option value="">Select Traffic Level</option>
                    <option value="low">Low (0-50 visitors/day)</option>
                    <option value="medium">Medium (50-200 visitors/day)</option>
                    <option value="high">High (200-500 visitors/day)</option>
                    <option value="very-high">Very High (500+ visitors/day)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Operating Hours *
                  </label>
                  <select
                    required
                    value={formData.operatingHours}
                    onChange={(e) => setFormData({...formData, operatingHours: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  >
                    <option value="">Select Operating Hours</option>
                    <option value="24/7">24/7</option>
                    <option value="extended">Extended (6 AM - 11 PM)</option>
                    <option value="business">Business Hours (9 AM - 6 PM)</option>
                    <option value="retail">Retail Hours (10 AM - 9 PM)</option>
                    <option value="custom">Custom Schedule</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Partnership Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Partnership Interest</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partnership Model Interest *
                  </label>
                  <select
                    required
                    value={formData.partnershipInterest}
                    onChange={(e) => setFormData({...formData, partnershipInterest: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  >
                    <option value="">Select Partnership Model</option>
                    <option value="revenue-share">Revenue sharing partnership</option>
                    <option value="lease">Site lease agreement</option>
                    <option value="purchase">Equipment purchase option</option>
                    <option value="discuss">Open to discussion</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Implementation Timeline *
                  </label>
                  <select
                    required
                    value={formData.timeline}
                    onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  >
                    <option value="">Select Timeline</option>
                    <option value="asap">As soon as possible</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-12-months">6-12 months</option>
                    <option value="12+-months">12+ months</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Additional Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Amenities
                  </label>
                  <textarea
                    value={formData.currentAmenities}
                    onChange={(e) => setFormData({...formData, currentAmenities: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    rows={3}
                    placeholder="Describe current amenities (WiFi, restrooms, food service, etc.)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    rows={4}
                    placeholder="Any additional information about your property or questions about the partnership"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="btn-primary w-full md:w-auto touch-tap"
              >
                Submit Host Application
              </button>
              <p className="subcopy mt-3 text-center">Your information is secure. We'll contact you within 2-3 business days.</p>
            </div>
          </form>
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
  
  if (path === '/host-application') {
    return <HostApplicationForm />;
  }
  
  if (path === '/thank-you') {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center reveal">
        <h1 className="h1-premium">Thank You!</h1>
        <p className="subcopy mt-4">Your application has been received.</p>
        <a href="/" className="btn-secondary touch-tap mt-6 inline-block">Return Home</a>
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

if (typeof window !== 'undefined') {
  const show = () => {
    document.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
      const r = el.getBoundingClientRect();
      const enter = r.top < window.innerHeight * 0.9;
      if (enter) el.classList.add('in');
    });
  };
  ['scroll','resize','load'].forEach(ev=>window.addEventListener(ev, show, {passive:true}));
  show();
}
