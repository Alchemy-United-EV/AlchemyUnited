import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function ProgressIndicator({ steps, currentStep, className = "" }: ProgressIndicatorProps) {
  return (
    <div className={`flex items-center justify-between w-full max-w-2xl mx-auto ${className}`}>
      {steps.map((step, index) => (
        <div key={step} className="flex items-center flex-1">
          {/* Step Circle */}
          <motion.div
            className={`
              relative flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold text-sm
              ${index < currentStep 
                ? 'bg-gold border-gold text-black' 
                : index === currentStep 
                ? 'bg-white border-gold text-gold' 
                : 'bg-gray-100 border-gray-300 text-gray-400'
              }
            `}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {index < currentStep ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <span>{index + 1}</span>
            )}
          </motion.div>

          {/* Step Label */}
          <motion.span 
            className={`
              ml-3 text-sm font-medium hidden sm:block
              ${index <= currentStep ? 'text-gray-800' : 'text-gray-400'}
            `}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {step}
          </motion.span>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <motion.div 
              className={`
                flex-1 h-0.5 mx-4
                ${index < currentStep ? 'bg-gold' : 'bg-gray-200'}
              `}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: index < currentStep ? 1 : 0.3 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}