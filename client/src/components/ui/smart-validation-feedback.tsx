import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, Lightbulb } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface ValidationFeedbackProps {
  field: string;
  value: string;
  error?: string;
  isValid?: boolean;
  showStrengthMeter?: boolean;
  suggestions?: string[];
}

export function SmartValidationFeedback({
  field,
  value,
  error,
  isValid,
  showStrengthMeter = false,
  suggestions = []
}: ValidationFeedbackProps) {
  const [strength, setStrength] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState('');

  useEffect(() => {
    if (showStrengthMeter && field === 'password') {
      const score = calculatePasswordStrength(value);
      setStrength(score);
      setStrengthLabel(getStrengthLabel(score));
    }
  }, [value, field, showStrengthMeter]);

  const calculatePasswordStrength = (password: string): number => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 10;
    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;
    return Math.min(score, 100);
  };

  const getStrengthLabel = (score: number): string => {
    if (score < 30) return 'Weak';
    if (score < 60) return 'Fair';
    if (score < 80) return 'Good';
    return 'Strong';
  };

  const getStrengthColor = (score: number): string => {
    if (score < 30) return 'bg-red-500';
    if (score < 60) return 'bg-yellow-500';
    if (score < 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="mt-2 space-y-2">
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-red-600 text-sm"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {!error && isValid && value.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-green-600 text-sm"
          >
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>Looks good!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password Strength Meter */}
      {showStrengthMeter && field === 'password' && value.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Password strength</span>
            <span className={`font-medium ${
              strength < 30 ? 'text-red-600' :
              strength < 60 ? 'text-yellow-600' :
              strength < 80 ? 'text-blue-600' : 'text-green-600'
            }`}>
              {strengthLabel}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full transition-colors ${getStrengthColor(strength)}`}
              initial={{ width: 0 }}
              animate={{ width: `${strength}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}

      {/* Smart Suggestions */}
      {suggestions.length > 0 && !error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-3"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-800">Suggestions:</p>
              <ul className="text-xs text-blue-700 space-y-1">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-blue-600 rounded-full" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Field-specific help text */}
      {getFieldHelp(field, value) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-start gap-2 text-xs text-gray-500"
        >
          <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
          <span>{getFieldHelp(field, value)}</span>
        </motion.div>
      )}
    </div>
  );
}

function getFieldHelp(field: string, value: string): string | null {
  switch (field) {
    case 'email':
      if (value.length > 0 && !value.includes('@')) {
        return 'Enter a valid email address';
      }
      break;
    case 'phone':
      if (value.length > 0 && value.replace(/\D/g, '').length < 10) {
        return 'Enter a 10-digit phone number';
      }
      break;
    case 'businessName':
      if (value.length > 0 && value.length < 2) {
        return 'Business name should be at least 2 characters';
      }
      break;
    case 'propertyAddress':
      if (value.length > 0 && value.length < 10) {
        return 'Please provide a complete address';
      }
      break;
  }
  return null;
}

// Real-time field validation helpers
export const getEmailSuggestions = (value: string): string[] => {
  if (!value.includes('@') || value.endsWith('.com')) return [];
  
  const suggestions = [];
  if (value.includes('@gmail') && !value.includes('@gmail.com')) {
    suggestions.push('Did you mean @gmail.com?');
  }
  if (value.includes('@yahoo') && !value.includes('@yahoo.com')) {
    suggestions.push('Did you mean @yahoo.com?');
  }
  if (value.includes('@outlook') && !value.includes('@outlook.com')) {
    suggestions.push('Did you mean @outlook.com?');
  }
  
  return suggestions;
};

export const getPasswordSuggestions = (value: string): string[] => {
  const suggestions = [];
  if (value.length < 8) {
    suggestions.push('Use at least 8 characters');
  }
  if (!/[A-Z]/.test(value)) {
    suggestions.push('Add an uppercase letter');
  }
  if (!/[0-9]/.test(value)) {
    suggestions.push('Include a number');
  }
  if (!/[^A-Za-z0-9]/.test(value)) {
    suggestions.push('Add a special character');
  }
  return suggestions;
};