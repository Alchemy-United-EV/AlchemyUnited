import { forwardRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SmartValidationFeedback } from '@/components/ui/smart-validation-feedback';
import { SmartFieldSuggestions, locationSuggestions, businessTypeSuggestions, emailSuggestions, phoneSuggestions } from '@/components/ui/smart-field-suggestions';
import { trackEvent } from '@/lib/analytics';

interface EnhancedFormFieldProps {
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
  enableSmartSuggestions?: boolean;
  className?: string;
}

export const EnhancedFormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, EnhancedFormFieldProps>(
  ({
    name,
    label,
    type = 'text',
    value,
    onChange,
    error,
    placeholder,
    required = false,
    multiline = false,
    rows = 3,
    maxLength,
    showCharCount = false,
    enableSmartSuggestions = false,
    className = '',
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [fieldTouched, setFieldTouched] = useState(false);

    useEffect(() => {
      if (fieldTouched && value.length > 0) {
        trackEvent('field_interaction', 'form_behavior', name);
      }
    }, [value, fieldTouched, name]);

    const handleFocus = () => {
      setIsFocused(true);
      setFieldTouched(true);
      trackEvent('field_focus', 'form_behavior', name);
    };

    const handleBlur = () => {
      setIsFocused(false);
      if (value.length > 0) {
        trackEvent('field_complete', 'form_behavior', name);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (maxLength && newValue.length > maxLength) return;
      onChange(newValue);
    };

    const getSuggestions = (inputValue: string) => {
      if (!enableSmartSuggestions) return [];
      
      switch (name) {
        case 'location':
        case 'propertyAddress':
          return locationSuggestions(inputValue);
        case 'propertyType':
        case 'businessType':
          return businessTypeSuggestions(inputValue);
        case 'email':
          return emailSuggestions(inputValue);
        case 'phone':
          return phoneSuggestions(inputValue);
        default:
          return [];
      }
    };

    const isValid = !error && value.length > 0;
    const characterCount = value.length;
    const isNearLimit = maxLength && characterCount > maxLength * 0.8;

    return (
      <div className={`space-y-2 ${className}`}>
        {/* Label */}
        <motion.label
          htmlFor={name}
          className={`
            block text-sm font-medium transition-colors duration-200
            ${isFocused ? 'text-gold' : 'text-gray-700'}
            ${error ? 'text-red-600' : ''}
          `}
          animate={{ color: isFocused ? '#D4AF37' : error ? '#DC2626' : '#374151' }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>

        {/* Input Field Container */}
        <div className="relative">
          {multiline ? (
            <Textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              id={name}
              name={name}
              value={value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              rows={rows}
              className={`
                w-full transition-all duration-200 resize-none
                ${isFocused ? 'ring-2 ring-gold border-gold' : ''}
                ${error ? 'border-red-500 ring-1 ring-red-500' : ''}
                ${isValid ? 'border-green-500' : ''}
              `}
              {...props}
            />
          ) : (
            <>
              <Input
                ref={ref as React.Ref<HTMLInputElement>}
                id={name}
                name={name}
                type={type === 'password' && showPassword ? 'text' : type}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={`
                  w-full transition-all duration-200
                  ${type === 'password' ? 'pr-10' : ''}
                  ${isFocused ? 'ring-2 ring-gold border-gold' : ''}
                  ${error ? 'border-red-500 ring-1 ring-red-500' : ''}
                  ${isValid ? 'border-green-500' : ''}
                `}
                {...props}
              />

              {/* Password Toggle */}
              {type === 'password' && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              )}
            </>
          )}

          {/* Smart Suggestions */}
          {enableSmartSuggestions && isFocused && (
            <SmartFieldSuggestions
              field={name}
              value={value}
              onSelect={onChange}
              getSuggestions={getSuggestions}
            />
          )}
        </div>

        {/* Character Count */}
        {showCharCount && maxLength && (
          <div className={`
            text-xs text-right transition-colors duration-200
            ${isNearLimit ? 'text-orange-600' : 'text-gray-500'}
            ${characterCount === maxLength ? 'text-red-600' : ''}
          `}>
            {characterCount}/{maxLength}
          </div>
        )}

        {/* Validation Feedback */}
        <SmartValidationFeedback
          field={name}
          value={value}
          error={error}
          isValid={isValid}
          showStrengthMeter={type === 'password'}
        />

        {/* Focus Animation */}
        <motion.div
          className="h-0.5 bg-gold origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    );
  }
);