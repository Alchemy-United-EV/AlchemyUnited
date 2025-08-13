import { useEffect } from 'react';

interface PerformanceEntry extends PerformanceEntry {
  transferSize?: number;
  encodedBodySize?: number;
  decodedBodySize?: number;
}

export function PerformanceBudget() {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              console.log('FCP:', entry.startTime);
            }
            if (entry.name === 'largest-contentful-paint') {
              console.log('LCP:', entry.startTime);
            }
            break;
          case 'layout-shift':
            console.log('CLS:', (entry as any).value);
            break;
          case 'first-input':
            console.log('FID:', entry.processingStart - entry.startTime);
            break;
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['paint', 'layout-shift', 'first-input'] });
    } catch (e) {
      console.warn('Performance monitoring not fully supported');
    }

    // Monitor resource loading
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resourceEntry = entry as PerformanceEntry;
        const transferSize = resourceEntry.transferSize || 0;
        
        // Warn about large resources
        if (transferSize > 500000) { // 500KB
          console.warn('Large resource detected:', entry.name, 'Size:', transferSize);
        }
        
        // Log slow resources
        if (entry.duration > 1000) {
          console.warn('Slow resource:', entry.name, 'Duration:', entry.duration);
        }
      }
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.warn('Resource monitoring not supported');
    }

    return () => {
      observer.disconnect();
      resourceObserver.disconnect();
    };
  }, []);

  return null;
}