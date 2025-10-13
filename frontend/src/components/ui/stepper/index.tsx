import React from 'react';
import { cn } from '@/lib/utils';

interface StepperProps {
  steps: { label: string; status: 'complete' | 'incomplete' | 'current' }[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex flex-wrap items-center justify-center -mx-2">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = step.status === 'complete';
        const isCurrent = step.status === 'current';

        return (
          <React.Fragment key={index}>
            <div className="flex items-center p-2">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold',
                  {
                    'bg-green-500': isCompleted,
                    'bg-blue-600': isCurrent,
                    'bg-gray-300': !isCompleted && !isCurrent,
                  }
                )}
              >
                {stepNumber}
              </div>
              <div className="ml-3 text-left">
                <p
                  className={cn('text-sm whitespace-pre-line', {
                    'font-bold': isCurrent,
                    'text-gray-500': !isCompleted && !isCurrent,
                  })}
                >
                  {step.label}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn('flex-auto border-t-2 mx-4 my-4 sm:my-0', {
                  'border-green-500': isCompleted,
                  'border-gray-300': !isCompleted,
                })}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;