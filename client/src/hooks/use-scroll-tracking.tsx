import { useEffect, useRef } from 'react';
import { trackScrollDepth, trackSectionView } from '@/lib/analytics';

export const useScrollTracking = () => {
  const trackedDepths = useRef(new Set<number>());
  const sectionTimers = useRef<Map<string, number>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / documentHeight) * 100);

      // Track at 25%, 50%, 75%, 90% intervals
      const milestones = [25, 50, 75, 90];
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    };

    // Track section visibility
    const sections = document.querySelectorAll('[data-section]');
    if (sections.length > 0) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const sectionName = entry.target.getAttribute('data-section');
            if (!sectionName) return;

            if (entry.isIntersecting) {
              sectionTimers.current.set(sectionName, Date.now());
            } else {
              const startTime = sectionTimers.current.get(sectionName);
              if (startTime) {
                const timeSpent = Math.round((Date.now() - startTime) / 1000);
                if (timeSpent >= 2) { // Only track if viewed for at least 2 seconds
                  trackSectionView(sectionName, timeSpent);
                }
                sectionTimers.current.delete(sectionName);
              }
            }
          });
        },
        { threshold: 0.5 }
      );

      sections.forEach((section) => observerRef.current?.observe(section));
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);
};