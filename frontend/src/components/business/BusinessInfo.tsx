import React from 'react';
import RadioGroup from '@/components/ui/RadioGroup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from '@/context/FormContext';

interface BusinessInfoProps {
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

const BusinessInfo: React.FC<BusinessInfoProps> = ({ nextStep, prevStep, currentStep, totalSteps }) => {
  const { formData, updateField } = useForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(e.target.id, e.target.value);
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-6 border-b pb-2">Business Information and Registration</h2>
      
      <div className="space-y-8">
        {/* Business Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <h3 className="font-semibold">Please choose one:</h3>
          </div>
          <div className="md:col-span-2">
            <RadioGroup
              name="businessType"
              options={[
                { label: 'Sole Proprietorship', value: 'sole' },
                { label: 'Partnership', value: 'partnership' },
                { label: 'Corporation', value: 'corporation' },
                { label: 'Cooperative', value: 'cooperative' },
                { label: 'One-Person Corporation', value: 'one-person' },
              ]}
              selectedValue={formData.businessType}
              onChange={(value) => updateField('businessType', value)}
            />
          </div>
        </div>

        {/* Registration Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabeledInput label="DTI / SEC / CDA Registration Number:" id="registrationNumber" value={formData.registrationNumber} onChange={handleChange} />
          <LabeledInput label="Tax Identification Number (TIN):" id="tin" value={formData.tin} onChange={handleChange} />
        </div>

        {/* Business & Trade Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabeledInput label="Business Name:" id="businessName" value={formData.businessName} onChange={handleChange} />
          <LabeledInput label="Trade Name / Franchise (if applicable):" id="tradeName" value={formData.tradeName} onChange={handleChange} />
        </div>
        <div className="flex items-center">
          <Checkbox id="sameAsBusinessName" checked={!!formData.sameAsBusinessName} onCheckedChange={(checked) => updateField('sameAsBusinessName', !!checked)} />
          <label htmlFor="sameAsBusinessName" className="ml-2 text-sm">Same as Business Name</label>
        </div>

        {/* Main Office Address */}
        {/* ... similar updates for address fields ... */}
        
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

export default BusinessInfo;