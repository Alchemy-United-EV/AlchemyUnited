import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressIndicator } from '@/components/ui/progress-indicator';
import { trackEvent } from '@/lib/analytics';

interface FormStep {
  id: string;
  title: string;
  description?: string;
  component: React.ComponentType<any>;
  validation?: () => boolean;
}

interface SmartFormStepsProps {
  steps: FormStep[];
  onComplete: () => void;
  formType: string;
}

export function SmartFormSteps({ steps, onComplete, formType }: SmartFormStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    trackEvent('form_step_view', 'user_journey', `${formType}_step_${currentStep + 1}`);
  }, [currentStep, formType]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
      trackEvent('form_step_advance', 'user_journey', `${formType}_${currentStep + 1}_to_${currentStep + 2}`);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
      trackEvent('form_step_back', 'user_journey', `${formType}_${currentStep + 1}_to_${currentStep}`);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex !== currentStep) {
      setDirection(stepIndex > currentStep ? 1 : -1);
      setCurrentStep(stepIndex);
      trackEvent('form_step_jump', 'user_journey', `${formType}_jump_to_${stepIndex + 1}`);
    }
  };

  const currentStepData = steps[currentStep];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <ProgressIndicator 
          steps={steps.map(step => step.title)} 
          currentStep={currentStep}
        />
      </div>

      {/* Step Content */}
      <div className="relative overflow-hidden min-h-[400px] bg-white rounded-lg border border-gray-200 p-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full"
          >
            {/* Step Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {currentStepData.title}
              </h2>
              {currentStepData.description && (
                <p className="text-gray-600">
                  {currentStepData.description}
                </p>
              )}
            </div>

            {/* Step Component */}
            <div className="mb-8">
              <currentStepData.component />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-gold'
                    : index < currentStep
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            type="button"
            onClick={nextStep}
            className="flex items-center gap-2 bg-gold hover:bg-gold/90 text-black"
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}