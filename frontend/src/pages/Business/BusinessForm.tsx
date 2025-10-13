import React, { useState } from 'react';
import Stepper from '@/components/ui/stepper';
import BusinessInfo from '@/components/business/BusinessInfo';

const BusinessForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const steps = [
    'COMPLETE',
    'COMPLETE',
    'Business Information',
    'Business Operation',
    'Business Activity',
    'Other Required Information',
    'Summary Page',
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button className="text-blue-600">&larr; BACK TO HOME PAGE</button>
          <div className="text-right">
            <p className="text-sm">Logged in as: <span className="font-bold">JUVILYN SANTOS</span></p>
          </div>
        </div>
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold">UNIFIED ONLINE BUSINESS PERMIT APPLICATION</h1>
        </header>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <Stepper steps={steps} currentStep={currentStep} />
          <div className="mt-8">
            <BusinessInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessForm;