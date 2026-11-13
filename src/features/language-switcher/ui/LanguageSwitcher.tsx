import React from 'react';
import clsx from 'clsx';
import { useI18n, Language } from '@/shared/lib/i18n';
import styles from './LanguageSwitcher.module.css';

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang, isSwitching } = useI18n();

  const handleSwitch = (newLang: Language) => {
    if (newLang !== lang && !isSwitching) {
      setLang(newLang);
    }
  };

  return (
    <div
      className={styles.switcher}
      role="group"
      aria-label="Переключение языка интерфейса"
    >
      <button
        type="button"
        className={clsx(styles.btn, lang === 'ru' && styles.active)}
        onClick={() => handleSwitch('ru')}
        aria-pressed={lang === 'ru'}
        disabled={isSwitching}
      >
        RU
      </button>
      <button
        type="button"
        className={clsx(styles.btn, lang === 'en' && styles.active)}
        onClick={() => handleSwitch('en')}
        aria-pressed={lang === 'en'}
        disabled={isSwitching}
      >
        EN
      </button>
    </div>
  );
};
