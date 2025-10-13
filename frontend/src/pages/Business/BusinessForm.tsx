import React, { useState } from 'react';
import Stepper from '@/components/ui/stepper';
import BusinessInfo from '@/components/business/BusinessInfo';

const BusinessForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const steps = [
    { label: 'COMPLETE\nBasic Documentary Requirements', status: 'complete' },
    { label: 'COMPLETE\nBusiness Information', status: 'complete' },
    { label: 'INCOMPLETE\nBusiness Information', status: 'current' },
    { label: 'INCOMPLETE\nBusiness Operation', status: 'incomplete' },
    { label: 'INCOMPLETE\nBusiness Activity', status: 'incomplete' },
    { label: 'INCOMPLETE\nOther Required Information', status: 'incomplete' },
    { label: 'INCOMPLETE\nSummary Page', status: 'incomplete' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button className="text-blue-600">&larr; BACK TO HOME PAGE</button>
          <div className="text-right">
            <p className="text-sm">Logged in as: <span className="font-bold">JUVILYN SANTOS</span></p>
            <p className="text-xs text-gray-500">PROTECTED WHEN COMPLETED</p>
          </div>
        </div>
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold">UNIFIED ONLINE BUSINESS PERMIT APPLICATION</h1>
        </header>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-8">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>
          <BusinessInfo />
        </div>
        <div className="text-center mt-4 text-xs text-gray-500">
          <p>QCLPO.BPLD.BPO.FR</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessForm;