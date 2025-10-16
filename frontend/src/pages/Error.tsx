import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@/components/atoms/typography';
import { Button } from '@/components/atoms/button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
      <div className="flex flex-col flex-grow items-center justify-center text-center py-12">
      {/* 404 Image */}
      <img
        src="/svg/404Error.svg"
        alt="404 Not Found"
        className="w-100 max-w-full mb-6"
      />

      {/* Text */}

      <Typography variant="h2" weight="bold" className="text-gray-800 mb-2">
        404 - Page Not Found
      </Typography>
      <Typography as="p" className="text-gray-600 mb-2">
        Oops! The page you are looking for does not exist.
      </Typography>

      {/* Back to home button */}
      <Button
        onClick={() => navigate('/')}
        variant="default"
      >
        Go Back Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
