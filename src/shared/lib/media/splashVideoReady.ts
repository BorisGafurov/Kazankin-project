const SPLASH_VIDEO_READY_EVENT = 'kazankin:splash-video-ready';
const SPLASH_VIDEO_READY_DATASET_KEY = 'kazankinSplashVideoReady';

const hasSplashVideoSettled = () =>
  typeof document !== 'undefined'
  && document.documentElement.dataset[SPLASH_VIDEO_READY_DATASET_KEY] === 'true';

export const signalSplashVideoReady = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (hasSplashVideoSettled()) return;

  document.documentElement.dataset[SPLASH_VIDEO_READY_DATASET_KEY] = 'true';
  window.dispatchEvent(new Event(SPLASH_VIDEO_READY_EVENT));
};

export const waitForSplashVideoReady = (onReady: () => void): (() => void) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    onReady();
    return () => undefined;
  }

  if (hasSplashVideoSettled()) {
    onReady();
    return () => undefined;
  }

  let isSettled = false;

  const settle = () => {
    if (isSettled) return;
    isSettled = true;
    window.removeEventListener(SPLASH_VIDEO_READY_EVENT, settle);
    onReady();
  };

  window.addEventListener(SPLASH_VIDEO_READY_EVENT, settle);

  return () => {
    isSettled = true;
    window.removeEventListener(SPLASH_VIDEO_READY_EVENT, settle);
  };
};
