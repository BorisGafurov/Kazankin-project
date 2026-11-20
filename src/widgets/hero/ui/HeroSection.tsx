import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/shared/lib/i18n';
import { signalSplashVideoReady } from '@/shared/lib/media/splashVideoReady';
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
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
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

  const showBackgroundVideo = !prefersReducedMotion;
  const videoSrc = `https://s3.twcstorage.ru/c8925614-a849-4c93-a31d-76171d3611b7/KPV/hero/${isMobile ? 'hero-mobile.mp4' : 'hero-desktop.mp4'}`;

  useEffect(() => {
    const video = backgroundVideoRef.current;
    if (!video) {
      if (prefersReducedMotion) signalSplashVideoReady();
      return;
    }

    if (isActive) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isActive, prefersReducedMotion, videoSrc]);

  return (
    <Section id="hero" theme="dark" sectionIndex={0} className={styles.heroSection}>
      {showBackgroundVideo && (
        <video
          ref={backgroundVideoRef}
          key={videoSrc}
          className={styles.backgroundVideo}
          src={videoSrc}
          autoPlay={isActive}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={signalSplashVideoReady}
          onError={signalSplashVideoReady}
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
          <div className={styles.footerCopy}>
            <span className={styles.tagline} data-sand-target="true">
              {t('hero.tagline')}
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
};
