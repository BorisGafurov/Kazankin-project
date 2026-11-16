import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/app/App';
import { WORK_CASES } from '@/entities/work/model/types';
import '@/shared/styles/global.css';

const preloadSiteAssets = (): void => {
  WORK_CASES.forEach(({ imageSrc }) => {
    const image = new Image();
    image.decoding = 'async';
    image.fetchPriority = 'low';
    image.src = `${import.meta.env.BASE_URL}${imageSrc.replace(/^\/+/, '')}`;
  });

  void document.fonts.load('700 1rem "Druk Wide Cyr"').catch(() => undefined);
  void document.fonts.load('400 1rem "Find Sans Pro"').catch(() => undefined);
};

preloadSiteAssets();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
