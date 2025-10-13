import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of your form data
interface FormData {
  businessType: string;
  registrationNumber: string;
  tin: string;
  businessName: string;
  tradeName: string;
  // Add other fields from all steps here...
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
    businessType: 'sole',
    registrationNumber: '',
    tin: '',
    businessName: '',
    tradeName: '',
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