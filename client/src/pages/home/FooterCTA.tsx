import { CTATracker } from '@/components/CTA-Tracker';

export default function FooterCTA() {
  return (
    <section className="au-section au-dark">
      <div className="au-container au-stack">
        <span className="au-eyebrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="currentColor"/></svg>
          Premium Network
        </span>

        <h2 className="au-h1">Ready for Fast, Reliable EV Charging?</h2>

        <p className="max-w-[48ch] opacity-90">
          Experience guaranteed availability across our curated premium stations.
        </p>

        <div className="au-row">
          <CTATracker
            cta="footer-primary"
            section="footer"
            variant="primary"
            href="/early-access"
            className="btn-au btn-au--gold"
          >
            Get Early Access
          </CTATracker>
          <CTATracker
            cta="footer-secondary"
            section="footer"
            variant="secondary"
            href="/host-application"
            className="btn-au btn-au--outline"
          >
            Become a Host
          </CTATracker>
        </div>
      </div>
    </section>
  );
}