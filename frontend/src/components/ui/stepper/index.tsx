import React from 'react';

interface StepperProps {
  steps: { label: string; status: 'complete' | 'incomplete' | 'current' }[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                step.status === 'complete' ? 'bg-green-500' : step.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              {index + 1}
            </div>
            <div className="ml-2 text-center">
              <p className={`text-sm ${step.status === 'incomplete' ? 'text-gray-500' : ''}`}>{step.label}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-auto border-t-2 mx-4 ${step.status === 'complete' ? 'border-green-500' : 'border-gray-300'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;