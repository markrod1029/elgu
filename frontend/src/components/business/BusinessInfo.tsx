import React, { useState } from 'react';
import RadioGroup from '@/components/ui/RadioGroup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const BusinessInfo: React.FC = () => {
  const [businessType, setBusinessType] = useState('sole');

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Business Information and Registration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Please choose one:</label>
          <RadioGroup
            name="businessType"
            options={[
              { label: 'Sole Proprietorship', value: 'sole' },
              { label: 'Partnership', value: 'partnership' },
              { label: 'Corporation', value: 'corporation' },
              { label: 'Cooperative', value: 'cooperative' },
              { label: 'One-Person Corporation', value: 'one-person' },
            ]}
            selectedValue={businessType}
            onChange={setBusinessType}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="DTI / SEC / CDA Registration Number:" />
          <Input label="Tax Identification Number (TIN):" />
        </div>
        <Input label="Business Name:" />
        <Input label="Trade Name / Franchise (if applicable):" />
        <div className="flex items-center">
          <Checkbox id="same-as-business-name" />
          <label htmlFor="same-as-business-name" className="ml-2">Same as Business Name</label>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Main Office Address:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="House/Bldg. No" />
            <Input label="Name of Building" />
            <Input label="Block No." />
            <Input label="Lot No." />
            <Input label="Street" />
            <Input label="Subdivision" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Province" />
          <Input label="City/Municipality" />
          <Input label="Barangay" />
          <Input label="Zip Code" />
          <Input label="District" />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Contact Information:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Telephone No." />
            <Input label="Email Address:" />
            <Input label="Mobile No." />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Owner's Information:</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input label="Last Name" />
            <Input label="Given Name" />
            <Input label="Middle Name" />
            <Input label="Suffix" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sex:</label>
              <RadioGroup
                name="sex"
                options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                ]}
                selectedValue=""
                onChange={() => {}}
              />
            </div>
            <Input label="For Corporation:" />
            <Input label="% Filipino" />
            <Input label="% Foreign" />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="outline">BACK</Button>
        <div>
          <Button variant="outline" className="mr-2">SAVE AS DRAFT</Button>
          <Button>CONTINUE</Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;