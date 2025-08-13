import { useEffect } from 'react';
import { trackPerformance } from '@/lib/analytics';

export const usePerformanceTracking = () => {
  useEffect(() => {
    // Track Core Web Vitals when available
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        trackPerformance('LCP', Math.round(lastEntry.startTime));
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          trackPerformance('FID', Math.round(entry.processingStart - entry.startTime));
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      // Track CLS on page unload
      const trackCLS = () => {
        trackPerformance('CLS', Math.round(clsValue * 1000) / 1000);
      };
      window.addEventListener('beforeunload', trackCLS);

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        window.removeEventListener('beforeunload', trackCLS);
      };
    }

    // Track basic page load time
    const handleLoad = () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        trackPerformance('page_load_time', Math.round(navigationEntry.loadEventEnd - navigationEntry.fetchStart));
        trackPerformance('dom_content_loaded', Math.round(navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart));
      }
    };

    // Track time on page when user leaves
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackPerformance('time_on_page', timeSpent);
    };

    window.addEventListener('load', handleLoad);
    window.addEventListener('beforeunload', trackTimeOnPage);
    
    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('beforeunload', trackTimeOnPage);
    };
  }, []);
};