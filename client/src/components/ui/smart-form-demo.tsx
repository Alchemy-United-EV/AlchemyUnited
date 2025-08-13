import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedFormField } from '@/components/ui/enhanced-form-field';
import { SmartFormSteps } from '@/components/ui/smart-form-steps';
import { useFormAnalytics } from '@/hooks/use-form-analytics';
import { trackEvent } from '@/lib/analytics';

// Demo schema for smart form features
const demoFormSchema = z.object({
  // Personal Information Step
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  
  // Business Information Step
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  businessType: z.string().min(1, 'Please select a business type'),
  location: z.string().min(5, 'Please enter a complete location'),
  
  // Additional Details Step
  requirements: z.string().min(10, 'Please provide more details about your requirements'),
  timeline: z.string().min(1, 'Please select a timeline'),
  budget: z.string().optional(),
});

type DemoFormData = z.infer<typeof demoFormSchema>;

export function SmartFormDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      businessName: '',
      businessType: '',
      location: '',
      requirements: '',
      timeline: '',
      budget: '',
    }
  });

  // Track form analytics
  useFormAnalytics('smart_form_demo', form.formState);

  const { handleSubmit, formState: { errors, isValid } } = form;

  const onSubmit = async (data: DemoFormData) => {
    trackEvent('smart_form_completed', 'conversion', 'demo_form');
    console.log('Smart form submitted:', data);
    setIsSubmitted(true);
  };

  // Step components
  const PersonalInfoStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EnhancedFormField
          name="firstName"
          label="First Name"
          value={form.watch('firstName')}
          onChange={(value) => form.setValue('firstName', value)}
          error={errors.firstName?.message || ''}
          required
          enableSmartSuggestions={false}
        />
        <EnhancedFormField
          name="lastName"
          label="Last Name"
          value={form.watch('lastName')}
          onChange={(value) => form.setValue('lastName', value)}
          error={errors.lastName?.message}
          required
          enableSmartSuggestions={false}
        />
      </div>
      <EnhancedFormField
        name="email"
        label="Email Address"
        type="email"
        value={form.watch('email')}
        onChange={(value) => form.setValue('email', value)}
        error={errors.email?.message}
        required
        enableSmartSuggestions={true}
        placeholder="your.email@example.com"
      />
      <EnhancedFormField
        name="phone"
        label="Phone Number"
        type="tel"
        value={form.watch('phone')}
        onChange={(value) => form.setValue('phone', value)}
        error={errors.phone?.message}
        required
        enableSmartSuggestions={true}
        placeholder="(555) 123-4567"
      />
    </div>
  );

  const BusinessInfoStep = () => (
    <div className="space-y-6">
      <EnhancedFormField
        name="businessName"
        label="Business Name"
        value={form.watch('businessName')}
        onChange={(value) => form.setValue('businessName', value)}
        error={errors.businessName?.message}
        required
        enableSmartSuggestions={false}
        placeholder="Your Business Name"
      />
      <EnhancedFormField
        name="businessType"
        label="Business Type"
        value={form.watch('businessType')}
        onChange={(value) => form.setValue('businessType', value)}
        error={errors.businessType?.message}
        required
        enableSmartSuggestions={true}
        placeholder="e.g., Hotel, Shopping Mall, Office Building"
      />
      <EnhancedFormField
        name="location"
        label="Business Location"
        value={form.watch('location')}
        onChange={(value) => form.setValue('location', value)}
        error={errors.location?.message}
        required
        enableSmartSuggestions={true}
        placeholder="City, State or Full Address"
      />
    </div>
  );

  const AdditionalDetailsStep = () => (
    <div className="space-y-6">
      <EnhancedFormField
        name="requirements"
        label="Project Requirements"
        value={form.watch('requirements')}
        onChange={(value) => form.setValue('requirements', value)}
        error={errors.requirements?.message}
        required
        multiline
        rows={4}
        maxLength={500}
        showCharCount={true}
        placeholder="Describe your EV charging infrastructure needs, expected capacity, special requirements..."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EnhancedFormField
          name="timeline"
          label="Project Timeline"
          value={form.watch('timeline')}
          onChange={(value) => form.setValue('timeline', value)}
          error={errors.timeline?.message}
          required
          enableSmartSuggestions={false}
          placeholder="e.g., 3-6 months, ASAP, By Q2 2024"
        />
        <EnhancedFormField
          name="budget"
          label="Estimated Budget (Optional)"
          value={form.watch('budget')}
          onChange={(value) => form.setValue('budget', value)}
          error={errors.budget?.message}
          enableSmartSuggestions={false}
          placeholder="e.g., $50K-$100K, Contact for quote"
        />
      </div>
    </div>
  );

  const steps = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      component: PersonalInfoStep,
    },
    {
      id: 'business',
      title: 'Business Details',
      description: 'Information about your business',
      component: BusinessInfoStep,
    },
    {
      id: 'details',
      title: 'Project Details',
      description: 'Specific requirements and timeline',
      component: AdditionalDetailsStep,
    },
  ];

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <Card>
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Form Submitted Successfully!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for trying our smart form features. Your submission has been processed.
            </p>
            <Button onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(0);
              form.reset();
            }}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Smart Form Experience Demo</CardTitle>
          <CardDescription className="text-center">
            Experience our intelligent form features including smart suggestions, 
            real-time validation, progress tracking, and enhanced user experience.
          </CardDescription>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        <SmartFormSteps
          steps={steps}
          onComplete={handleSubmit(onSubmit)}
          formType="smart_demo"
        />
      </form>

      {/* Feature Highlights */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </span>
              Smart Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Intelligent field suggestions for locations, business types, emails, and phone formatting.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Real-time Validation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Instant feedback with helpful suggestions and validation as you type.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Progress Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Visual progress indicators and step navigation with analytics tracking.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}