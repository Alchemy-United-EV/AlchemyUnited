import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export const useBusinessAnalytics = () => {
  useEffect(() => {
    // Track session start
    trackEvent('session_start', 'user_journey', 'page_load');

    // Track referrer information
    if (document.referrer) {
      const referrerDomain = new URL(document.referrer).hostname;
      trackEvent('traffic_source', 'acquisition', referrerDomain);
    }

    // Track device type
    const userAgent = navigator.userAgent;
    let deviceType = 'desktop';
    if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
      deviceType = /iPad/.test(userAgent) ? 'tablet' : 'mobile';
    }
    trackEvent('device_type', 'technical', deviceType);

    // Track screen resolution
    trackEvent('screen_resolution', 'technical', `${screen.width}x${screen.height}`);

    // Track connection type if available
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection && connection.effectiveType) {
        trackEvent('connection_type', 'technical', connection.effectiveType);
      }
    }

    // Track time zone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    trackEvent('user_timezone', 'demographics', timeZone);

    // Track visit time (hour of day for usage patterns)
    const hour = new Date().getHours();
    let timeOfDay = 'morning';
    if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
    else if (hour >= 21 || hour < 6) timeOfDay = 'night';
    
    trackEvent('visit_time', 'user_behavior', timeOfDay);
  }, []);
};