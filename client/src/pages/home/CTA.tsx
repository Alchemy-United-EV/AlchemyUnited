import { CTATracker } from '@/components/CTA-Tracker';

export default function CTA() {
  return (
    <section className="au-section au-soft au-elevate">
      <div className="au-container">
        <div className="au-row">
          {/* PRIMARY */}
          <CTATracker
            cta="cta-primary"
            section="mid-page-cta"
            variant="primary"
            href="/early-access"
            className="btn-au btn-au--gold"
          >
            Request Early Access
          </CTATracker>

          {/* SECONDARY */}
          <CTATracker
            cta="cta-secondary"
            section="mid-page-cta"
            variant="secondary"
            href="/host-application"
            className="btn-au btn-au--outline"
          >
            Partner With Us
          </CTATracker>
        </div>
      </div>
    </section>
  );
}