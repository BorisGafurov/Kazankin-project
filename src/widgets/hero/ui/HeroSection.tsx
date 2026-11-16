import React from 'react';
import { useI18n } from '@/shared/lib/i18n';
import { Section, Container, Heading, Text, Button, Stack } from '@/shared/ui';
import styles from './HeroSection.module.css';

export interface HeroSectionProps {
  onNavigate: (index: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { t } = useI18n();

  return (
    <Section id="hero" theme="dark" sectionIndex={0} className={styles.heroSection}>
      <Container size="md" className={styles.heroContent}>
        <Stack gap="xl" className={styles.copy}>
          <Heading
            level={1}
            overline={t('hero.category')}
            highlight={t('hero.titleLine2')}
          >
            {t('hero.titleLine1')}
          </Heading>

          <Text variant="lead" className={styles.description}>
            {t('hero.description')}
          </Text>

          <div className={styles.actions}>
            <Button variant="primary" onClick={() => onNavigate(1)}>
              {t('hero.btnWorks')}
            </Button>
            <Button variant="secondary" onClick={() => onNavigate(3)}>
              {t('hero.btnContact')}
            </Button>
          </div>
        </Stack>
      </Container>

      <Container size="md">
        <div className={styles.footerBar}>
          <span className={styles.tagline} data-sand-target="true">
            {t('hero.tagline')}
          </span>
          <button
            type="button"
            className={styles.nextLink}
            onClick={() => onNavigate(1)}
            data-sand-target="true"
          >
            {t('hero.nextLink')}
          </button>
        </div>
      </Container>
    </Section>
  );
};
