import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/Input';


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    extensionName: '',
    username: '',
    password: '',
    verifyPassword: '',
    email: '',
    acceptTerms: false,
    notARobot: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/src/assets/images/elgu_png.png" alt="Logo" className="h-16" />
            <div>
              <h1 className="text-xl font-bold">BUSINESS PERMIT</h1>
              <p className="text-gray-500">MUNICIPALITY OF LEGANES, ILOILO</p>
            </div>
          </div>
          <img src="/src/assets/images/Reverse logo.png" alt="Secondary Logo" className="h-16" />
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="mb-4 text-lg font-semibold">REGISTRANT PROFILE</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input name="firstName" placeholder="First name *" value={formData.firstName} onChange={handleChange} />
            <Input name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} />
            <Input name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleChange} />
            <Input name="extensionName" placeholder="Extension Name" value={formData.extensionName} onChange={handleChange} />
          </div>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="mb-4 text-lg font-semibold">ACCOUNT DETAILS</h2>
          <div className="space-y-4">
            <Input name="username" placeholder="Username *" value={formData.username} onChange={handleChange} />
            <Input name="password" type="password" placeholder="Password *" value={formData.password} onChange={handleChange} />
            <Input name="verifyPassword" type="password" placeholder="Verify Password *" value={formData.verifyPassword} onChange={handleChange} />
            <Input name="email" type="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} />
          </div>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="mb-4 text-lg font-semibold">TERMS AND CONDITIONS</h2>
          <div className="p-4 space-y-2 bg-gray-100 rounded-md">
            <p>1. Registrant should validate their account by clicking the verification link sent to the supplied email address.</p>
            <p>2. Registrant should not create multiple false accounts.</p>
            <p>3. Registrant will not share to anyone.</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Disclaimer</h3>
            <p>In accordance to R.A. 10173 or Data Privacy Act, all collected information will be treated with utmost confidentiality and will not be subjected to public disclosure.</p>
          </div>
          <div className="flex items-center mt-4 space-x-2">
            <input type="checkbox" id="terms" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} />
            <label htmlFor="terms">I accept the Terms and Conditions</label>
          </div>
          <div className="flex items-center mt-4 space-x-2">
            <input type="checkbox" id="robot" name="notARobot" checked={formData.notARobot} onChange={handleChange} />
            <label htmlFor="robot">I'm not a robot</label>
          </div>
        </div>

        <div className="flex justify-between">
          <Link to="/login">
            <Button variant="outline">BACK</Button>
          </Link>
          <Button>REGISTER</Button>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        {/* <img
          src="/assets/cityhall-desktop.png"
          alt="Footer illustration"
          className="w-full"
        /> */}
      </div>
    </div>
  );
};

export default RegisterPage;