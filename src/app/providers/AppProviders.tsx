import React, { ReactNode } from 'react';
import { I18nProvider } from '@/shared/lib/i18n';

export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <I18nProvider>{children}</I18nProvider>;
};
