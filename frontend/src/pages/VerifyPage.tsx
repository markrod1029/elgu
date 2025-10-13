import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const VerifyPage = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 text-center bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <img src="/src/assets/images/guide3.png" alt="Verification" className="h-24 mb-4" />
          <h1 className="text-2xl font-bold">Verify your email address</h1>
          <p className="mt-2 text-gray-600">
            Enter the email address associated with your account and we'll send you a link to verify your email.
          </p>
        </div>
        <form className="space-y-6">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <Button type="submit" className="w-full">
            Send Verification
          </Button>
        </form>
      </div>
      <div className="absolute bottom-0 w-full">
        <img
          src="/src/assets/images/cityhall10-desktop.png"
          alt="Footer illustration"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default VerifyPage;