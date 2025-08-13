import { useEffect, useRef } from 'react';
import { trackFormAbandonment } from '@/lib/analytics';

export const useFormAbandonment = (formType: string, formState: any) => {
  const lastActiveField = useRef<string>('');
  const formStarted = useRef<boolean>(false);

  useEffect(() => {
    // Track which field was last interacted with
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLInputElement;
      if (target && target.name) {
        lastActiveField.current = target.name;
        formStarted.current = true;
      }
    };

    // Track form abandonment on page unload
    const handleBeforeUnload = () => {
      if (formStarted.current && !formState.isSubmitSuccessful) {
        trackFormAbandonment(formType, lastActiveField.current || 'unknown');
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [formType, formState.isSubmitSuccessful]);
};