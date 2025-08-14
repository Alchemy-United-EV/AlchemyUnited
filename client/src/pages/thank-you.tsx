import React, { useEffect } from 'react';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { CTATracker } from '@/components/CTA-Tracker';

export default function ThankYou() {
  console.log('[route] thank-you page rendering');
  // Set SEO meta tags for Thank You page (noindex)
  useEffect(() => {
    document.title = "Thank You | Application Submitted - Alchemy Network";
    document.documentElement.setAttribute('lang', 'en');
    
    // Set noindex for thank you page
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      document.head.appendChild(meta);
    }

    // Track conversion event
    const trackConversion = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const trackingData = {
          event: 'conversion_complete',
          form_type: urlParams.get('type') || 'unknown',
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
          referrer: document.referrer || 'direct',
          utm_source: urlParams.get('utm_source'),
          utm_medium: urlParams.get('utm_medium'),
          utm_campaign: urlParams.get('utm_campaign'),
        };

        await fetch('/api/analytics/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(trackingData),
          keepalive: true,
        });
      } catch (error) {
        console.error('Conversion tracking failed:', error);
      }
    };

    trackConversion();

    // Clean up on unmount - reset robots meta
    return () => {
      let robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) {
        robotsMeta.setAttribute('content', 'index, follow');
      }
    };
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const formType = urlParams.get('type');
  const isEarlyAccess = formType === 'early-access';
  const isHost = formType === 'host-application';

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-4">
            Thank You!
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            {isEarlyAccess && "Your early access request has been submitted successfully."}
            {isHost && "Your host partnership application has been submitted successfully."}
            {!isEarlyAccess && !isHost && "Your application has been submitted successfully."}
          </p>
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mb-6">
            <p className="text-gold text-sm">
              {isEarlyAccess && "We'll notify you as soon as early access spots become available. Keep an eye on your inbox!"}
              {isHost && "Our partnership team will review your application and contact you within 1-2 business days."}
              {!isEarlyAccess && !isHost && "We've received your information and will be in touch soon."}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <CTATracker
            cta="thank-you-home"
            section="thank-you"
            variant="primary"
            href="/"
            className="w-full bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-400 hover:to-gold text-black font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-gold/30 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Return Home
          </CTATracker>
          
          {isEarlyAccess && (
            <CTATracker
              cta="thank-you-cross-sell-host"
              section="thank-you"
              variant="secondary"
              href="/host-application"
              className="w-full border-2 border-gold bg-transparent text-gold hover:bg-gold hover:text-black font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-5 h-5" />
              Interested in Hosting?
            </CTATracker>
          )}
          
          {isHost && (
            <CTATracker
              cta="thank-you-cross-sell-access"
              section="thank-you"
              variant="secondary"
              href="/early-access"
              className="w-full border-2 border-gold bg-transparent text-gold hover:bg-gold hover:text-black font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-5 h-5" />
              Request Early Access
            </CTATracker>
          )}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <picture className="block mb-4">
            <source srcSet="/assets/webp/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.webp" type="image/webp" />
            <img 
              src="/assets/AE141A66-A440-499B-8889-41BABE3F729E_1754505979237.png" 
              alt="Alchemy Network Logo"
              className="h-8 w-auto mx-auto filter brightness-125"
              width="80"
              height="32"
              loading="lazy"
            />
          </picture>
          <p className="text-gray-400 text-sm">
            Questions? Contact us at{' '}
            <a 
              href="mailto:support@alchemynetwork.com" 
              data-cta="thank-you-support"
              data-cta-section="thank-you"
              data-cta-variant="support"
              className="text-gold hover:underline hover:text-gold/80 transition-colors"
              aria-label="Contact Support Team"
            >
              support@alchemynetwork.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}