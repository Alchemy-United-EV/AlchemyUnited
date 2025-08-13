// Define the gtag function globally
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    return;
  }

  // Add Google Analytics script to the head
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const script2 = document.createElement('script');
  script2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
  document.head.appendChild(script2);
};

// Track page views - useful for single-page applications
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;
  
  window.gtag('config', measurementId, {
    page_path: url
  });
};

// Track events
export const trackEvent = (
  action: string, 
  category?: string, 
  label?: string, 
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', 'engagement', `${percentage}%`, percentage);
};

// Track time on page
export const trackTimeOnPage = (seconds: number) => {
  trackEvent('time_on_page', 'engagement', 'duration', seconds);
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', 'conversion', `${ctaName}_${location}`);
};

// Track form abandonment
export const trackFormAbandonment = (formType: string, lastField: string) => {
  trackEvent('form_abandonment', 'conversion', `${formType}_${lastField}`);
};

// Track hover interactions
export const trackHoverInteraction = (element: string, duration: number) => {
  trackEvent('hover_interaction', 'engagement', element, duration);
};

// Track section visibility
export const trackSectionView = (sectionName: string, timeSpent: number) => {
  trackEvent('section_view', 'engagement', sectionName, timeSpent);
};

// Track performance metrics
export const trackPerformance = (metric: string, value: number) => {
  trackEvent('performance', 'technical', metric, value);
};

// Track error events
export const trackError = (errorType: string, errorMessage: string) => {
  trackEvent('error', 'technical', `${errorType}_${errorMessage}`);
};

// Specific tracking functions for common events
export const trackFormSubmission = (formType: string, success: boolean = true) => {
  trackEvent('form_submit', 'engagement', formType, success ? 1 : 0);
};

export const trackDashboardAction = (action: string, details?: string) => {
  trackEvent('dashboard_action', 'admin', `${action}${details ? `_${details}` : ''}`, 1);
};

export const trackStatusChange = (leadId: number, fromStatus: string, toStatus: string) => {
  trackEvent('lead_status_change', 'admin', `${fromStatus}_to_${toStatus}`, leadId);
};

export const trackPageInteraction = (element: string, action: string) => {
  trackEvent(`${element}_${action}`, 'interaction', element, 1);
};