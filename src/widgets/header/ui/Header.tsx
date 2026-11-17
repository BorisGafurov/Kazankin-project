import React, { useEffect, useRef, useState } from 'react';
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

const MOBILE_MENU_ANIMATION_MS = 280;

export const Header: React.FC<HeaderProps> = ({ currentSectionIndex, onNavigate }) => {
  const { t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuClosing, setMobileMenuClosing] = useState(false);
  const mobileMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileMenuButton = useRef<HTMLButtonElement>(null);

  const closeMobileMenu = () => {
    if (!mobileMenuOpen) return;

    setMobileMenuOpen(false);
    setMobileMenuClosing(true);
    if (mobileMenuTimer.current !== null) clearTimeout(mobileMenuTimer.current);
    mobileMenuTimer.current = setTimeout(() => {
      setMobileMenuClosing(false);
      mobileMenuTimer.current = null;
    }, MOBILE_MENU_ANIMATION_MS);
  };

  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
      return;
    }

    if (mobileMenuTimer.current !== null) {
      clearTimeout(mobileMenuTimer.current);
      mobileMenuTimer.current = null;
    }
    setMobileMenuClosing(false);
    setMobileMenuOpen(true);
  };

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      closeMobileMenu();
      mobileMenuButton.current?.focus();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  useEffect(() => () => {
    if (mobileMenuTimer.current !== null) clearTimeout(mobileMenuTimer.current);
  }, []);

  const handleNavClick = (index: number) => {
    onNavigate(index);
    if (mobileMenuOpen) {
      closeMobileMenu();
      mobileMenuButton.current?.focus();
    }
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
              ref={mobileMenuButton}
              className={styles.hamburger}
              onClick={toggleMobileMenu}
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

      {(mobileMenuOpen || mobileMenuClosing) && (
        <>
          <button
            type="button"
            className={clsx(styles.mobileBackdrop, mobileMenuClosing && styles.mobileBackdropClosing)}
            aria-hidden="true"
            tabIndex={-1}
            onClick={closeMobileMenu}
          />
          <div
            className={clsx(styles.mobileDrawer, mobileMenuClosing && styles.mobileDrawerClosing)}
            aria-hidden={!mobileMenuOpen}
          >
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
                  tabIndex={mobileMenuOpen ? 0 : -1}
                >
                  {t(item.labelKey)}
                </button>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};
