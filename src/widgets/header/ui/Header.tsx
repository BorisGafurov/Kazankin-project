import React, { useState } from 'react';
import clsx from 'clsx';
import { useI18n } from '@/shared/lib/i18n';
import { Container } from '@/shared/ui';
import { LanguageSwitcher } from '@/features/language-switcher';
import styles from './Header.module.css';

export interface HeaderProps {
  currentSectionIndex: number;
  onNavigate: (index: number) => void;
}

const NAV_ITEMS = [
  { index: 1, labelKey: 'nav.works' as const },
  { index: 2, labelKey: 'nav.reviews' as const },
  { index: 3, labelKey: 'nav.stages' as const },
  { index: 4, labelKey: 'nav.contact' as const },
];

export const Header: React.FC<HeaderProps> = ({ currentSectionIndex, onNavigate }) => {
  const { t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (index: number) => {
    onNavigate(index);
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <Container size="md">
        <div className={styles.inner}>
          <button
            type="button"
            className={styles.brand}
            onClick={() => handleNavClick(0)}
            aria-label={t('nav.home')}
          >
            <span className={styles.brandTitle}>KAZANKIN</span>
            <span className={styles.brandSubtitle}>{t('brand.role')}</span>
          </button>

          <div className={styles.controls}>
            <nav className={styles.nav} aria-label={t('nav.quick')}>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.index}
                  type="button"
                  className={clsx(
                    styles.navLink,
                    currentSectionIndex === item.index && styles.navLinkActive
                  )}
                  onClick={() => handleNavClick(item.index)}
                  aria-current={currentSectionIndex === item.index ? 'page' : undefined}
                >
                  {t(item.labelKey)}
                </button>
              ))}
            </nav>

            <LanguageSwitcher />

            <button
              type="button"
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={t(mobileMenuOpen ? 'nav.closeMenu' : 'nav.openMenu')}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span className={clsx(styles.bar, mobileMenuOpen && styles.barOpen1)} />
              <span className={clsx(styles.bar, mobileMenuOpen && styles.barOpen2)} />
            </button>
          </div>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <nav id="mobile-navigation" className={styles.mobileNav} aria-label={t('nav.quick')}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.index}
                type="button"
                className={clsx(
                  styles.mobileNavLink,
                  currentSectionIndex === item.index && styles.mobileNavActive
                )}
                onClick={() => handleNavClick(item.index)}
                aria-current={currentSectionIndex === item.index ? 'page' : undefined}
              >
                {t(item.labelKey)}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
