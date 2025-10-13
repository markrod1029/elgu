import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of your form data
interface FormData {
  // Basic Requirements
  dtiSecCdaReg?: boolean;
  barangayClearance?: boolean;
  communityTaxCert?: boolean;
  proofOfAddress?: boolean;
  fireSafetyCert?: boolean;

  // Business Info
  businessType: string;
  registrationNumber: string;
  tin: string;
  businessName: string;
  tradeName: string;
  sameAsBusinessName?: boolean;
  houseBldgNo: string;
  buildingName: string;
  blockNo: string;
  lotNo: string;
  street: string;
  subdivision: string;
  province: string;
  city: string;
  barangay: string;
  zipCode: string;
  district: string;
  telNo: string;
  email: string;
  mobileNo: string;
  lastName: string;
  givenName: string;
  middleName: string;
  suffix: string;
  sex: string;
  forCorporation: string;
  filipino: string;
  foreign: string;

  // Business Operation
  businessArea: string;
  numEmployees: string;
  opSameAsMain?: boolean;
  opHouseBldgNo: string;
  opBuildingName: string;
  opBlockNo: string;
  opLotNo: string;
  opStreet: string;
  opSubdivision: string;
  opProvince: string;
  opCity: string;
  opBarangay: string;
  opZipCode: string;
  opDistrict: string;

  // Business Activity
  primaryActivity: string;
  secondaryActivity: string;
  productsServices: string;

  // Other Info
  emergencyName: string;
  emergencyContact: string;
  insuranceProvider: string;
  policyNumber: string;
  additionalComments: string;
  termsAndConditions?: boolean;

  [key: string]: any; // Allow for dynamic properties
}

// Define the context shape
interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  updateField: (field: string, value: any) => void;
}

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Create the provider component
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    // Basic Requirements
    dtiSecCdaReg: false,
    barangayClearance: false,
    communityTaxCert: false,
    proofOfAddress: false,
    fireSafetyCert: false,

    // Business Info
    businessType: 'sole',
    registrationNumber: '',
    tin: '',
    businessName: '',
    tradeName: '',
    sameAsBusinessName: false,
    houseBldgNo: '',
    buildingName: '',
    blockNo: '',
    lotNo: '',
    street: '',
    subdivision: '',
    province: '',
    city: '',
    barangay: '',
    zipCode: '',
    district: '',
    telNo: '',
    email: '',
    mobileNo: '',
    lastName: '',
    givenName: '',
    middleName: '',
    suffix: '',
    sex: '',
    forCorporation: '',
    filipino: '',
    foreign: '',

    // Business Operation
    businessArea: '',
    numEmployees: '',
    opSameAsMain: false,
    opHouseBldgNo: '',
    opBuildingName: '',
    opBlockNo: '',
    opLotNo: '',
    opStreet: '',
    opSubdivision: '',
    opProvince: '',
    opCity: '',
    opBarangay: '',
    opZipCode: '',
    opDistrict: '',

    // Business Activity
    primaryActivity: '',
    secondaryActivity: '',
    productsServices: '',

    // Other Info
    emergencyName: '',
    emergencyContact: '',
    insuranceProvider: '',
    policyNumber: '',
    additionalComments: '',
    termsAndConditions: false,
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, updateField }}>
      {children}
    </FormContext.Provider>
  );
};

// Create a custom hook to use the form context
export const useForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};