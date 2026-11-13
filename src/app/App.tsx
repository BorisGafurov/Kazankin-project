import React from 'react';
import { AppProviders } from './providers';
import { LandingPage } from '@/pages/landing';

export const App: React.FC = () => {
  return (
    <AppProviders>
      <LandingPage />
    </AppProviders>
  );
};
