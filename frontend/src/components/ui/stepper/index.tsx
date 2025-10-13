import React from 'react';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index + 1 === currentStep ? 'bg-green-500 text-white' : 'bg-gray-300'
            }`}
          >
            {index + 1}
          </div>
          <p className="ml-2">{step}</p>
          {index < steps.length - 1 && <div className="w-16 h-1 bg-gray-300 mx-4"></div>}
        </div>
      ))}
    </div>
  );
};

export default Stepper;