import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from '@/context/FormContext';

interface BasicRequirementsProps {
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  totalSteps: number;
}

const requirements = [
    { id: 'dtiSecCdaReg', label: 'DTI/SEC/CDA Registration' },
    { id: 'barangayClearance', label: 'Barangay Clearance' },
    { id: 'communityTaxCert', label: 'Community Tax Certificate' },
    { id: 'proofOfAddress', label: 'Proof of Address' },
    { id: 'fireSafetyCert', label: 'Fire Safety Inspection Certificate' },
];

const BasicRequirements: React.FC<BasicRequirementsProps> = ({ nextStep, prevStep, currentStep, totalSteps }) => {
  const { formData, updateField } = useForm();

  const handleCheckboxChange = (id: string, checked: boolean) => {
    updateField(id, checked);
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-6 border-b pb-2">Basic Documentary Requirements</h2>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">Please check the documents you have already prepared.</p>
        {requirements.map(req => (
          <div key={req.id} className="flex items-center">
            <Checkbox
              id={req.id}
              checked={!!formData[req.id]}
              onCheckedChange={(checked) => handleCheckboxChange(req.id, !!checked)}
            />
            <label htmlFor={req.id} className="ml-2 text-sm">{req.label}</label>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12 pt-6 border-t">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>BACK</Button>
        <div className="flex gap-x-2">
          <Button variant="outline">SAVE AS DRAFT</Button>
          <Button onClick={nextStep}>{currentStep === totalSteps ? 'SUBMIT' : 'CONTINUE'}</Button>
        </div>
      </div>
    </section>
  );
};

export default BasicRequirements;