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

export const Header: React.FC<HeaderProps> = ({ currentSectionIndex, onNavigate }) => {
  const { t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { index: 1, labelKey: 'nav.works' as const },
    { index: 2, labelKey: 'nav.stages' as const },
    { index: 3, labelKey: 'nav.reviews' as const },
    { index: 4, labelKey: 'nav.contact' as const },
  ];

  const handleNavClick = (index: number) => {
    onNavigate(index);
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <Container size="md">
        <div className={styles.inner}>
          {/* Brand */}
          <div
            className={styles.brand}
            onClick={() => handleNavClick(0)}
            role="button"
            tabIndex={0}
            aria-label="Перейти на главный экран"
          >
            <span className={styles.brandTitle}>Дмитрий Казанкин</span>
            <span className={styles.brandSubtitle}>ВИДЕОМОНТАЖ</span>
          </div>

          {/* Desktop Controls */}
          <div className={styles.controls}>
            <nav className={styles.nav} aria-label="Основное меню">
              {navItems.map((item) => (
                <button
                  key={item.index}
                  type="button"
                  className={clsx(
                    styles.navLink,
                    currentSectionIndex === item.index && styles.navLinkActive
                  )}
                  onClick={() => handleNavClick(item.index)}
                  data-sand-target="true"
                >
                  {t(item.labelKey)}
                </button>
              ))}
            </nav>

            <LanguageSwitcher />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileMenuOpen}
            >
              <span className={clsx(styles.bar, mobileMenuOpen && styles.barOpen1)} />
              <span className={clsx(styles.bar, mobileMenuOpen && styles.barOpen2)} />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <nav className={styles.mobileNav}>
            {navItems.map((item) => (
              <button
                key={item.index}
                type="button"
                className={clsx(
                  styles.mobileNavLink,
                  currentSectionIndex === item.index && styles.mobileNavActive
                )}
                onClick={() => handleNavClick(item.index)}
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
