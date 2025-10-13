import React from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from '@/context/FormContext';

interface SummaryProps {
  prevStep: () => void;
  currentStep: number;
  totalSteps: number;
}

const SummaryDetail: React.FC<{ label: string; value: string | undefined | null }> = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold">{value || 'N/A'}</p>
    </div>
);

const Summary: React.FC<SummaryProps> = ({ prevStep, currentStep, totalSteps }) => {
  const { formData } = useForm();

  return (
    <section>
      <h2 className="text-xl font-bold mb-6 border-b pb-2">Application Summary</h2>

      <div className="space-y-8">
        {/* Business Information */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Business Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <SummaryDetail label="Business Type" value={formData.businessType} />
            <SummaryDetail label="Registration Number" value={formData.registrationNumber} />
            <SummaryDetail label="TIN" value={formData.tin} />
            <SummaryDetail label="Business Name" value={formData.businessName} />
            <SummaryDetail label="Trade Name" value={formData.tradeName} />
          </div>
        </div>

        {/* Main Office Address */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Main Office Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <SummaryDetail label="House/Bldg. No" value={formData.houseBldgNo} />
            <SummaryDetail label="Building Name" value={formData.buildingName} />
            <SummaryDetail label="Street" value={formData.street} />
            <SummaryDetail label="City" value={formData.city} />
            <SummaryDetail label="Province" value={formData.province} />
            <SummaryDetail label="Zip Code" value={formData.zipCode} />
          </div>
        </div>

        {/* Owner's Information */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Owner's Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <SummaryDetail label="Full Name" value={`${formData.givenName} ${formData.middleName} ${formData.lastName} ${formData.suffix}`} />
            <SummaryDetail label="Sex" value={formData.sex} />
            <SummaryDetail label="Email" value={formData.email} />
            <SummaryDetail label="Mobile No." value={formData.mobileNo} />
          </div>
        </div>

        {/* Business Operation */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Business Operation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <SummaryDetail label="Business Area (sq. m.)" value={formData.businessArea} />
            <SummaryDetail label="Number of Employees" value={formData.numEmployees} />
          </div>
        </div>

        {/* Business Activity */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Business Activity</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <SummaryDetail label="Primary Activity" value={formData.primaryActivity} />
            <SummaryDetail label="Secondary Activity" value={formData.secondaryActivity} />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12 pt-6 border-t">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>BACK</Button>
        <div className="flex gap-x-2">
          <Button variant="outline">SAVE AS DRAFT</Button>
          <Button>{currentStep === totalSteps ? 'SUBMIT APPLICATION' : 'CONTINUE'}</Button>
        </div>
      </div>
    </section>
  );
};

export default Summary;