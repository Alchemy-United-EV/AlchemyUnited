import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

export const useFormAnalytics = (formType: string, formState: any) => {
  const startTime = useRef<number>(Date.now());
  const fieldFocusTimes = useRef<Record<string, number>>({});
  const fieldInteractions = useRef<Record<string, number>>({});

  useEffect(() => {
    // Track form start
    trackEvent('form_started', 'conversion', formType);

    // Track field interactions
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLInputElement;
      if (target && target.name) {
        fieldFocusTimes.current[target.name] = Date.now();
        fieldInteractions.current[target.name] = (fieldInteractions.current[target.name] || 0) + 1;
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      const target = e.target as HTMLInputElement;
      if (target && target.name && fieldFocusTimes.current[target.name]) {
        const timeSpent = Date.now() - fieldFocusTimes.current[target.name];
        trackEvent('field_time_spent', 'form_behavior', target.name, timeSpent);
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [formType]);

  // Track form completion
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      const totalTime = Date.now() - startTime.current;
      trackEvent('form_completed', 'conversion', formType, totalTime);
      
      // Track field interaction patterns
      Object.entries(fieldInteractions.current).forEach(([field, interactions]) => {
        trackEvent('field_interactions', 'form_behavior', `${formType}_${field}`, interactions as number);
      });
    }
  }, [formState.isSubmitSuccessful, formType]);

  // Track validation errors
  useEffect(() => {
    if (Object.keys(formState.errors).length > 0) {
      Object.keys(formState.errors).forEach(field => {
        trackEvent('validation_error', 'form_behavior', `${formType}_${field}`);
      });
    }
  }, [formState.errors, formType]);
};