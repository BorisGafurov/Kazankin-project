import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Language, TranslationKey } from './types';
import { translations } from './translations';

interface I18nContextType {
  lang: Language;
  setLang: (newLang: Language) => void;
  t: (key: TranslationKey) => string;
  isSwitching: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('ru');
  const [isSwitching, setIsSwitching] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kazankin_lang') as Language;
      if (saved === 'ru' || saved === 'en') {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch (_) {}
  }, []);

  const setLang = useCallback((nextLang: Language) => {
    if (nextLang === lang || isSwitching) return;
    setIsSwitching(true);

    try {
      localStorage.setItem('kazankin_lang', nextLang);
    } catch (_) {}

    document.documentElement.lang = nextLang;

    // Smooth, jitter-free text transition:
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-sand-target="true"]'));
    const visibleTargets = targets.filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0 && rect.width > 0;
    });

    // 1. Soft opacity fade out (150ms)
    visibleTargets.forEach((el) => {
      el.classList.remove('i18n-transition-in');
      el.classList.add('i18n-transition-out');
    });

    // 2. Midpoint: update language and soft fade in
    setTimeout(() => {
      setLangState(nextLang);
      visibleTargets.forEach((el) => {
        el.classList.remove('i18n-transition-out');
        el.classList.add('i18n-transition-in');
      });
    }, 150);

    // 3. Clean up transition classes after completion
    setTimeout(() => {
      visibleTargets.forEach((el) => {
        el.classList.remove('i18n-transition-in');
      });
      setIsSwitching(false);
    }, 360);
  }, [lang, isSwitching]);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[lang]?.[key] ?? key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t, isSwitching }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
