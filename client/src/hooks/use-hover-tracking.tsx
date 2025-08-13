import { useCallback, useRef } from 'react';
import { trackHoverInteraction } from '@/lib/analytics';

export const useHoverTracking = () => {
  const hoverStartTime = useRef<number>(0);

  const startHover = useCallback((elementName: string) => {
    hoverStartTime.current = Date.now();
  }, []);

  const endHover = useCallback((elementName: string) => {
    if (hoverStartTime.current > 0) {
      const duration = Date.now() - hoverStartTime.current;
      if (duration > 500) { // Only track hovers longer than 500ms
        trackHoverInteraction(elementName, duration);
      }
      hoverStartTime.current = 0;
    }
  }, []);

  const hoverProps = useCallback((elementName: string) => ({
    onMouseEnter: () => startHover(elementName),
    onMouseLeave: () => endHover(elementName),
  }), [startHover, endHover]);

  return { hoverProps };
};