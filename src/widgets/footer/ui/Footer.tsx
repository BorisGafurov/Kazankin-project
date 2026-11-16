import React from 'react';
import { useI18n } from '@/shared/lib/i18n';
import { Container } from '@/shared/ui';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <Container size="md">
        <div className={styles.inner}>
          <span className={styles.brand}>{t('footer.brand')}</span>
          <span className={styles.geo} data-sand-target="true">
            {t('footer.geo')}
          </span>
        </div>
      </Container>
    </footer>
  );
};
