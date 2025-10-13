import React from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from '@/context/FormContext';

interface SummaryProps {
  prevStep: () => void;
  currentStep: number;
  totalSteps: number;
}

const Summary: React.FC<SummaryProps> = ({ prevStep, currentStep, totalSteps }) => {
  const { formData } = useForm();

  return (
    <section>
      <h2 className="text-xl font-bold mb-6 border-b pb-2">Summary</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p><strong>Business Name:</strong> {formData.businessName}</p>
            <p><strong>Business Type:</strong> {formData.businessType}</p>
            <p><strong>TIN:</strong> {formData.tin}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Business Operation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p><strong>Business Area:</strong> {formData.businessArea} sq. m.</p>
            <p><strong>No. of Employees:</strong> {formData.numEmployees}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Business Activity</h3>
          <p className="text-sm"><strong>Primary Activity:</strong> {formData.primaryActivity}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12 pt-6 border-t">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>BACK</Button>
        <div className="flex gap-x-2">
          <Button variant="outline">SAVE AS DRAFT</Button>
          <Button>{currentStep === totalSteps ? 'SUBMIT' : 'CONTINUE'}</Button>
        </div>
      </div>
    </section>
  );
};

export default Summary;