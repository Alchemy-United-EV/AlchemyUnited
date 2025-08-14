import { CTATracker } from '@/components/CTA-Tracker';

export default function Hero() {
  return (
    <section 
      className="relative overflow-hidden bg-[url('/assets/hero-bg.jpg')] bg-cover bg-center bg-no-repeat py-24 md:py-32"
      id="hero-section"
    >
      {/* Luxury overlay - stronger on mobile, lighter on desktop */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white/40 md:from-white/70 md:via-white/50 md:to-white/30"></div>
      
      {/* Logo watermark behind content */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <img 
          src="/assets/au-logo.png" 
          alt=""
          className="w-96 h-auto opacity-20 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center px-6 space-y-6">
        {/* Premium Network Badge */}
        <div className="animate-[fadeInUp_0.6s_ease-out]">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-4 py-1.5 text-xs font-semibold text-gray-700 uppercase tracking-wide shadow-sm">
            ⚡ PREMIUM NETWORK
          </div>
        </div>
        
        {/* Main Heading */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            <span className="block">Premium</span>
            <span className="block text-[#D4AF37]">EV Charging</span>
            <span className="block">Network</span>
          </h1>
        </div>
        
        {/* Subheadline */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
          <p className="mt-5 text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Experience the future of electric vehicle charging with our luxury network. 
            Reliable, fast, and premium locations for discerning EV drivers.
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
          <div className="mt-10 flex flex-col sm:flex-row gap-5 sm:justify-center">
            <CTATracker 
              cta="hero-primary"
              section="hero" 
              variant="primary"
              href="/early-access"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 bg-[#D4AF37] text-black font-semibold text-lg tracking-wide shadow-[0_6px_20px_rgba(212,175,55,0.45)] hover:brightness-110 active:translate-y-[1px] transition"
            >
              Get Early Access
            </CTATracker>
            <CTATracker 
              cta="hero-secondary"
              section="hero"
              variant="secondary"
              href="/host-application"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] text-lg font-semibold bg-white/20 backdrop-blur-sm hover:bg-[#D4AF37]/10 transition"
            >
              Become a Host
            </CTATracker>
          </div>
        </div>
      </div>
    </section>
  );
}