import { useEffect } from 'react';

export const UTMCapture = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Capture UTM parameters and store in localStorage
    const utmData = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content'),
      referrer: document.referrer || 'direct',
      landing_page: window.location.pathname + window.location.search,
      timestamp: new Date().toISOString(),
      session_id: Math.random().toString(36).substring(2, 15),
    };

    // Only store if we have UTM data or if it's the first visit
    if (Object.values(utmData).some(val => val) || !localStorage.getItem('alchemy_attribution')) {
      localStorage.setItem('alchemy_attribution', JSON.stringify(utmData));
    }
  }, []);

  return null;
};

// Helper function to get UTM data for form submissions
export const getAttributionData = () => {
  try {
    const stored = localStorage.getItem('alchemy_attribution');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};