import React from 'react';

interface CTATrackerProps {
  children: React.ReactNode;
  cta: string;
  section: string;
  variant?: string;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const CTATracker: React.FC<CTATrackerProps> = ({
  children,
  cta,
  section,
  variant = 'default',
  className = '',
  href,
  onClick,
}) => {
  const handleClick = async () => {
    // Track CTA click
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const trackingData = {
        cta,
        section,
        variant,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        referrer: document.referrer || 'direct',
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_term: urlParams.get('utm_term'),
        utm_content: urlParams.get('utm_content'),
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
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
      console.error('Analytics tracking failed:', error);
    }

    // Execute the original onClick handler
    if (onClick) {
      onClick();
    }
  };

  if (href) {
    return (
      <a
        href={href}
        className={className}
        data-cta={cta}
        data-cta-section={section}
        data-cta-variant={variant}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={className}
      data-cta={cta}
      data-cta-section={section}
      data-cta-variant={variant}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default CTATracker;