import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <img src="/src/assets/images/elgu_png.png" alt="Logo" className="h-20 mb-4" />
          <h1 className="text-2xl font-bold">Welcome back!</h1>
        </div>
        <form className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="text-right">
            <Link to="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="relative flex items-center justify-center">
          <span className="absolute px-3 bg-white">OR</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <Button variant="outline" className="w-full">
          Mag-sign in sa Google
        </Button>
        <div className="text-center">
          <p>
            Don't have an account yet?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
        <div className="text-center">
          <Link to="/verify">
            <Button variant="link">VERIFY</Button>
          </Link>
        </div>
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

export default LoginPage;