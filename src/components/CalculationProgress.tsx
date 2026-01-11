'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

const steps = [
  "Locating your property",
  "Analyzing satellite imagery",
  "Measuring roof dimensions",
  "Calculating pitch & slope",
  "Estimating materials",
  "Generating your quote",
];

interface CalculationProgressProps {
  isComplete: boolean;
}

export function CalculationProgress({ isComplete }: CalculationProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isComplete) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentStep(steps.length); // Show all complete
      return;
    }

    const timer = setInterval(() => {
      setCurrentStep((s) => (s < steps.length - 1 ? s + 1 : s));
    }, 2000);

    return () => clearInterval(timer);
  }, [isComplete]);

  return (
    <div className="space-y-3">
      {steps.map((step, i) => (
        <motion.div
          key={step}
          initial={{ opacity: 0.4, x: -10 }}
          animate={{
            opacity: i <= currentStep ? 1 : 0.4,
            x: 0,
          }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
              ${i < currentStep || (isComplete && i === steps.length - 1)
                ? 'bg-green-500 text-white'
                : i === currentStep && !isComplete
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-200 text-slate-400'
              }`}
          >
            {i < currentStep || isComplete ? (
              <Check className="w-4 h-4" />
            ) : i === currentStep && !isComplete ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              i + 1
            )}
          </div>
          <span
            className={`transition-colors duration-300 ${
              i <= currentStep ? 'text-slate-900 font-medium' : 'text-slate-400'
            }`}
          >
            {step}
            {i === currentStep && !isComplete && (
              <span className="text-orange-500">...</span>
            )}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
