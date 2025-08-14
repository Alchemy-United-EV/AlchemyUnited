import { CTATracker } from '@/components/CTA-Tracker';

export default function CTA() {
  return (
    <section className="relative bg-gold-gradient text-black">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center reveal">
        <picture>
          <source srcSet="/assets/webp/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.webp" type="image/webp" />
          <img 
            src="/assets/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.png" 
            alt="Alchemy Network - Premium EV Charging Network Logo"
            className="h-16 w-auto mx-auto mb-8 filter brightness-125"
            width="160"
            height="64"
            loading="lazy"
          />
        </picture>
        
        <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight">
          Join Our Premium{' '}
          <span className="text-yellow-400">EV Charging Network</span>
        </h2>
        
        <p className="text-xl mb-12 text-white/90 max-w-3xl mx-auto">
          Experience reliable EV charging with guaranteed availability. Be first to access our premium network and maximize your EV host revenue potential.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTATracker
            cta="cta-primary"
            section="mid-page-cta"
            variant="primary"
            href="/early-access"
            className="btn-primary bg-black text-white hover:shadow-elev-2 touch-tap"
          >
            Request Early Access
          </CTATracker>
          <CTATracker
            cta="cta-secondary"
            section="mid-page-cta"
            variant="secondary"
            href="/host-application"
            className="btn-secondary border-black/30 text-black hover:bg-black/5 touch-tap"
          >
            Partner With Us
          </CTATracker>
        </div>
      </div>
    </section>
  );
}