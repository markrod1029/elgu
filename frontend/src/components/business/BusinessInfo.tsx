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
        <div>
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Main Office Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <LabeledInput label="House/Bldg. No" id="houseBldgNo" value={formData.houseBldgNo} onChange={handleChange} className="md:col-span-1" />
            <LabeledInput label="Name of Building" id="buildingName" value={formData.buildingName} onChange={handleChange} className="md:col-span-3" />
            <LabeledInput label="Block No." id="blockNo" value={formData.blockNo} onChange={handleChange} />
            <LabeledInput label="Lot No." id="lotNo" value={formData.lotNo} onChange={handleChange} />
            <LabeledInput label="Street" id="street" value={formData.street} onChange={handleChange} className="md:col-span-2" />
            <LabeledInput label="Subdivision" id="subdivision" value={formData.subdivision} onChange={handleChange} className="md:col-span-4" />
            <LabeledInput label="Province" id="province" value={formData.province} onChange={handleChange} />
            <LabeledInput label="City/Municipality" id="city" value={formData.city} onChange={handleChange} />
            <LabeledInput label="Barangay" id="barangay" value={formData.barangay} onChange={handleChange} />
            <LabeledInput label="Zip Code" id="zipCode" value={formData.zipCode} onChange={handleChange} />
            <LabeledInput label="District" id="district" value={formData.district} onChange={handleChange} className="md:col-span-2" />
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <LabeledInput label="Telephone No." id="telNo" value={formData.telNo} onChange={handleChange} />
            <LabeledInput label="Email Address:" id="email" value={formData.email} onChange={handleChange} />
            <LabeledInput label="Mobile No." id="mobileNo" value={formData.mobileNo} onChange={handleChange} />
          </div>
        </div>

        {/* Owner's Information */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Owner's Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <LabeledInput label="Last Name" id="lastName" value={formData.lastName} onChange={handleChange} />
            <LabeledInput label="Given Name" id="givenName" value={formData.givenName} onChange={handleChange} />
            <LabeledInput label="Middle Name" id="middleName" value={formData.middleName} onChange={handleChange} />
            <LabeledInput label="Suffix" id="suffix" value={formData.suffix} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sex:</label>
              <RadioGroup
                name="sex"
                options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
                selectedValue={formData.sex}
                onChange={(value) => updateField('sex', value)}
              />
            </div>
            <LabeledInput label="For Corporation:" id="forCorporation" value={formData.forCorporation} onChange={handleChange} />
            <LabeledInput label="% Filipino" id="filipino" value={formData.filipino} onChange={handleChange} />
            <LabeledInput label="% Foreign" id="foreign" value={formData.foreign} onChange={handleChange} />
          </div>
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

export default BusinessInfo;