import React from 'react';

interface CardProps {
  icon: string;
  title: string;
}

const Card: React.FC<CardProps> = ({ icon, title }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow h-40">
      <img src={icon} alt={title} className="h-16 w-16 mb-4" />
      <h3 className="text-center font-semibold">{title}</h3>
    </div>
  );
};

export default Card;