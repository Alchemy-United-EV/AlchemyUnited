import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building, Mail, Phone } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface FieldSuggestion {
  value: string;
  label: string;
  icon?: React.ReactNode;
  category?: string;
}

interface SmartFieldSuggestionsProps {
  field: string;
  value: string;
  onSelect: (value: string) => void;
  getSuggestions: (value: string) => FieldSuggestion[];
  placeholder?: string;
  className?: string;
}

export function SmartFieldSuggestions({
  field,
  value,
  onSelect,
  getSuggestions,
  placeholder,
  className = ""
}: SmartFieldSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<FieldSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    if (value.length > 1) {
      const newSuggestions = getSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
      setHighlightedIndex(-1);
      
      if (newSuggestions.length > 0) {
        trackEvent('smart_suggestions_shown', 'form_assistance', field);
      }
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [value, field, getSuggestions]);

  const handleSelect = (suggestion: FieldSuggestion) => {
    onSelect(suggestion.value);
    setShowSuggestions(false);
    trackEvent('smart_suggestion_selected', 'form_assistance', `${field}_${suggestion.category || 'general'}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelect(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={`${suggestion.value}-${index}`}
                type="button"
                className={`
                  w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none
                  transition-colors duration-150 flex items-center gap-3
                  ${highlightedIndex === index ? 'bg-gold/10 border-l-2 border-gold' : ''}
                  ${index === 0 ? 'rounded-t-lg' : ''}
                  ${index === suggestions.length - 1 ? 'rounded-b-lg' : ''}
                `}
                onClick={() => handleSelect(suggestion)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {suggestion.icon && (
                  <div className="flex-shrink-0 text-gray-400">
                    {suggestion.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {suggestion.label}
                  </div>
                  {suggestion.category && (
                    <div className="text-xs text-gray-500 mt-1">
                      {suggestion.category}
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Common suggestion providers
export const locationSuggestions = (value: string): FieldSuggestion[] => {
  const cities = [
    { name: 'New York', state: 'NY', category: 'Major City' },
    { name: 'Los Angeles', state: 'CA', category: 'Major City' },
    { name: 'Chicago', state: 'IL', category: 'Major City' },
    { name: 'Houston', state: 'TX', category: 'Major City' },
    { name: 'Phoenix', state: 'AZ', category: 'Major City' },
    { name: 'Philadelphia', state: 'PA', category: 'Major City' },
    { name: 'San Antonio', state: 'TX', category: 'Major City' },
    { name: 'San Diego', state: 'CA', category: 'Major City' },
    { name: 'Dallas', state: 'TX', category: 'Major City' },
    { name: 'San Jose', state: 'CA', category: 'Major City' },
    { name: 'Austin', state: 'TX', category: 'Major City' },
    { name: 'Jacksonville', state: 'FL', category: 'Major City' },
    { name: 'Fort Worth', state: 'TX', category: 'Major City' },
    { name: 'Columbus', state: 'OH', category: 'Major City' },
    { name: 'Charlotte', state: 'NC', category: 'Major City' },
    { name: 'San Francisco', state: 'CA', category: 'Major City' },
    { name: 'Indianapolis', state: 'IN', category: 'Major City' },
    { name: 'Seattle', state: 'WA', category: 'Major City' },
    { name: 'Denver', state: 'CO', category: 'Major City' },
    { name: 'Washington', state: 'DC', category: 'Major City' }
  ];

  return cities
    .filter(city => 
      city.name.toLowerCase().includes(value.toLowerCase()) ||
      city.state.toLowerCase().includes(value.toLowerCase())
    )
    .slice(0, 8)
    .map(city => ({
      value: `${city.name}, ${city.state}`,
      label: `${city.name}, ${city.state}`,
      category: city.category,
      icon: <MapPin className="w-4 h-4" />
    }));
};

export const businessTypeSuggestions = (value: string): FieldSuggestion[] => {
  const types = [
    'Hotel', 'Shopping Mall', 'Office Building', 'Restaurant', 'Retail Store',
    'Apartment Complex', 'Parking Garage', 'Medical Center', 'University',
    'Airport', 'Gas Station', 'Gym/Fitness Center', 'Grocery Store',
    'Car Dealership', 'Bank', 'Government Building', 'Library', 'Museum'
  ];

  return types
    .filter(type => type.toLowerCase().includes(value.toLowerCase()))
    .slice(0, 6)
    .map(type => ({
      value: type,
      label: type,
      category: 'Business Type',
      icon: <Building className="w-4 h-4" />
    }));
};

export const emailSuggestions = (value: string): FieldSuggestion[] => {
  if (!value.includes('@') || value.includes('.')) return [];

  const [localPart, domain] = value.split('@');
  if (!domain) return [];

  const commonDomains = [
    'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 
    'icloud.com', 'aol.com', 'protonmail.com'
  ];

  return commonDomains
    .filter(d => d.startsWith(domain.toLowerCase()))
    .slice(0, 5)
    .map(d => ({
      value: `${localPart}@${d}`,
      label: `${localPart}@${d}`,
      category: 'Email Provider',
      icon: <Mail className="w-4 h-4" />
    }));
};

export const phoneSuggestions = (value: string): FieldSuggestion[] => {
  // Format phone number suggestions
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length === 0) return [];
  if (cleaned.length > 10) return [];

  const suggestions: FieldSuggestion[] = [];

  if (cleaned.length <= 10) {
    let formatted = '';
    if (cleaned.length >= 3) {
      formatted = `(${cleaned.slice(0, 3)})`;
      if (cleaned.length >= 6) {
        formatted += ` ${cleaned.slice(3, 6)}`;
        if (cleaned.length >= 10) {
          formatted += `-${cleaned.slice(6, 10)}`;
        } else if (cleaned.length > 6) {
          formatted += `-${cleaned.slice(6)}`;
        }
      } else if (cleaned.length > 3) {
        formatted += ` ${cleaned.slice(3)}`;
      }
    } else {
      formatted = cleaned;
    }

    if (formatted !== value && cleaned.length >= 3) {
      suggestions.push({
        value: formatted,
        label: formatted,
        category: 'Formatted Phone',
        icon: <Phone className="w-4 h-4" />
      });
    }
  }

  return suggestions;
};