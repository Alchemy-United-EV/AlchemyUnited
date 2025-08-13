import { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

interface SmartValidationProps {
  field: string;
  value: string;
  error?: string;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
}

export function SmartFormValidation({ 
  field, 
  value, 
  error, 
  suggestions = [], 
  onSuggestionSelect 
}: SmartValidationProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (suggestions.length > 0 && value.length > 2) {
      setShowSuggestions(true);
      trackEvent('smart_suggestion_shown', 'form_assistance', field);
    } else {
      setShowSuggestions(false);
    }
  }, [suggestions, value, field]);

  const handleSuggestionClick = (suggestion: string) => {
    trackEvent('smart_suggestion_used', 'form_assistance', `${field}_${suggestion}`);
    onSuggestionSelect?.(suggestion);
    setShowSuggestions(false);
  };

  if (!showSuggestions || suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-32 overflow-y-auto">
      {suggestions.slice(0, 5).map((suggestion, index) => (
        <button
          key={index}
          type="button"
          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
          onClick={() => handleSuggestionClick(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}

// Smart email validation with common domain suggestions
export function useEmailSuggestions(email: string) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (email.includes('@') && !email.includes('.')) {
      const [localPart, domain] = email.split('@');
      const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'hotmail.com'];
      
      if (domain.length > 0) {
        const domainSuggestions = commonDomains
          .filter(d => d.startsWith(domain.toLowerCase()))
          .map(d => `${localPart}@${d}`);
        setSuggestions(domainSuggestions);
      }
    } else {
      setSuggestions([]);
    }
  }, [email]);

  return suggestions;
}

// Smart location suggestions
export function useLocationSuggestions(location: string) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (location.length > 2) {
      // Common US cities - in production, this would be an API call
      const cities = [
        'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 
        'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA',
        'Dallas, TX', 'San Jose, CA', 'Austin, TX', 'Jacksonville, FL',
        'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC', 'San Francisco, CA',
        'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC'
      ];
      
      const filtered = cities.filter(city => 
        city.toLowerCase().includes(location.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [location]);

  return suggestions;
}