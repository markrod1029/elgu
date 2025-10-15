import React from 'react';
import Maps from '@/components/Maps';

const NonCompliantBusinessesPage: React.FC = () => {
  return <Maps complianceFilter="noncompliant" />;
};

export default NonCompliantBusinessesPage;