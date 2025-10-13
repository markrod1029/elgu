import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from '@/context/FormContext';

interface BusinessOperationProps {
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  totalSteps: number;
}

const LabeledInput: React.FC<{ label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void } & React.InputHTMLAttributes<HTMLInputElement>> = ({ label, id, value, onChange, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <Input id={id} value={value} onChange={onChange} {...props} />
  </div>
);

const BusinessOperation: React.FC<BusinessOperationProps> = ({ nextStep, prevStep, currentStep, totalSteps }) => {
  const { formData, updateField } = useForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(e.target.id, e.target.value);
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-6 border-b pb-2">Business Operation</h2>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabeledInput label="Business Area (in sq. m.)" id="businessArea" value={formData.businessArea || ''} onChange={handleChange} />
          <LabeledInput label="No. of Employees" id="numEmployees" value={formData.numEmployees || ''} onChange={handleChange} />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Business Address</h3>
          <div className="flex items-center mb-4">
            <Checkbox id="opSameAsMain" checked={!!formData.opSameAsMain} onCheckedChange={(checked) => updateField('opSameAsMain', !!checked)} />
            <label htmlFor="opSameAsMain" className="ml-2 text-sm">Same as Main Office Address</label>
          </div>
          {/* ... address fields ... */}
        </div>
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

export default BusinessOperation;