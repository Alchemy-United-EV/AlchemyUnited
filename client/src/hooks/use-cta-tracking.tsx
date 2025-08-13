import { useCallback } from 'react';
import { trackCTAClick } from '@/lib/analytics';

export const useCTATracking = () => {
  const trackCTA = useCallback((ctaName: string, location: string = 'unknown') => {
    trackCTAClick(ctaName, location);
  }, []);

  // Enhanced button click handler that automatically tracks
  const trackableButtonProps = useCallback((ctaName: string, location: string = 'unknown') => ({
    onClick: (e: React.MouseEvent) => {
      trackCTA(ctaName, location);
      // Allow the original onClick to proceed
    }
  }), [trackCTA]);

  return {
    trackCTA,
    trackableButtonProps
  };
};