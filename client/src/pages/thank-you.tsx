import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThankYou() {
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
          <Button asChild className="w-full bg-gold hover:bg-gold/90 text-black font-semibold">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </Button>
          
          {isEarlyAccess && (
            <Button asChild variant="outline" className="w-full border-gold text-gold hover:bg-gold/10">
              <Link href="/host-application">
                <ArrowRight className="w-4 h-4 mr-2" />
                Interested in Hosting?
              </Link>
            </Button>
          )}
          
          {isHost && (
            <Button asChild variant="outline" className="w-full border-gold text-gold hover:bg-gold/10">
              <Link href="/early-access">
                <ArrowRight className="w-4 h-4 mr-2" />
                Request Early Access
              </Link>
            </Button>
          )}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            Questions? Contact us at{' '}
            <a href="mailto:support@alchemynetwork.com" className="text-gold hover:underline">
              support@alchemynetwork.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}