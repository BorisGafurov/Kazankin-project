import React, { useEffect, useState } from 'react';
import { useI18n } from '@/shared/lib/i18n';
import { Section, Container, Heading, Text, Button, Stack } from '@/shared/ui';
import styles from './HeroSection.module.css';

const MOBILE_QUERY = '(max-width: 767px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export interface HeroSectionProps {
  onNavigate: (index: number) => void;
  isActive: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, isActive }) => {
  const { t } = useI18n();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const updatePreferences = () => {
      setIsMobile(mobileQuery.matches);
      setPrefersReducedMotion(reducedMotionQuery.matches);
    };

    mobileQuery.addEventListener('change', updatePreferences);
    reducedMotionQuery.addEventListener('change', updatePreferences);
    return () => {
      mobileQuery.removeEventListener('change', updatePreferences);
      reducedMotionQuery.removeEventListener('change', updatePreferences);
    };
  }, []);

  const showBackgroundVideo = isActive && !prefersReducedMotion;
  const videoSrc = `https://s3.twcstorage.ru/c8925614-a849-4c93-a31d-76171d3611b7/videos/hero/${isMobile ? 'hero-mobile.mp4' : 'hero-desktop.mp4'}`;

  return (
    <Section id="hero" theme="dark" sectionIndex={0} className={styles.heroSection}>
      {showBackgroundVideo && (
        <video
          key={videoSrc}
          className={styles.backgroundVideo}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

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
