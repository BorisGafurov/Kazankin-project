import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/shared/lib/i18n';
import { Section, Container, Heading, Text, Button } from '@/shared/ui';
import { WORK_CASES, WorkCard } from '@/entities/work';
import { WorkVideoPlayer } from './WorkVideoPlayer';
import styles from './WorksSection.module.css';

export const WorksSection: React.FC = () => {
  const { t } = useI18n();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [playerWork, setPlayerWork] = useState<(typeof WORK_CASES)[number] | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const closeFallbackRef = useRef<number | null>(null);
  const totalSlides = WORK_CASES.length;

  useEffect(() => () => {
    if (closeFallbackRef.current !== null) window.clearTimeout(closeFallbackRef.current);
  }, []);

  const selectSlide = (index: number) => {
    const nextIndex = (index + totalSlides) % totalSlides;
    setActiveSlideIndex(nextIndex);

    requestAnimationFrame(() => {
      carouselRef.current
        ?.querySelector<HTMLElement>(`[data-work-index="${nextIndex}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  };

  const openPlayer = (work: (typeof WORK_CASES)[number], index: number) => {
    if (closeFallbackRef.current !== null) window.clearTimeout(closeFallbackRef.current);
    closeFallbackRef.current = null;
    selectSlide(index);
    setPlayerWork(work);
    setIsPlayerOpen(true);
  };

  const closePlayer = () => {
    if (!isPlayerOpen) return;
    setIsPlayerOpen(false);
    if (closeFallbackRef.current !== null) window.clearTimeout(closeFallbackRef.current);
    closeFallbackRef.current = window.setTimeout(completePlayerClose, 350);
  };

  const completePlayerClose = () => {
    if (closeFallbackRef.current !== null) window.clearTimeout(closeFallbackRef.current);
    closeFallbackRef.current = null;
    const closedWorkId = playerWork?.id;
    setPlayerWork(null);
    if (closedWorkId) {
      window.requestAnimationFrame(() => {
        document.getElementById(`work-card-${closedWorkId}`)?.focus();
      });
    }
  };

  return (
    <>
      <Section id="works" theme="milk" sectionIndex={1} className={styles.worksSection}>
        <Container size="md" className={styles.content}>
          <div className={styles.header}>
            <Heading level={2} overline={t('works.overline')}>
              {t('works.title')}
            </Heading>
            <Text variant="body" className={styles.description}>
              {t('works.description')}
            </Text>
          </div>

          <div
            id="works-carousel"
            ref={carouselRef}
            className={styles.sliderContainer}
            role="region"
            aria-roledescription="carousel"
            aria-label={t('works.title')}
          >
            <div className={styles.sliderTrack}>
              {WORK_CASES.map((work, index) => (
                <WorkCard
                  key={work.id}
                  work={work}
                  index={index}
                  isActive={activeSlideIndex === index}
                  onClick={() => openPlayer(work, index)}
                />
              ))}
            </div>
          </div>

          <div className={styles.controls}>
            <div className={styles.navBtns}>
              <Button
                variant="circular"
                onClick={() => selectSlide(activeSlideIndex - 1)}
                aria-label={t('works.previous')}
                aria-controls="works-carousel"
              >
                <span aria-hidden="true">←</span>
              </Button>
              <Button
                variant="circular"
                onClick={() => selectSlide(activeSlideIndex + 1)}
                aria-label={t('works.next')}
                aria-controls="works-carousel"
              >
                <span aria-hidden="true">→</span>
              </Button>
            </div>
            <div className={styles.counter} aria-live="polite" aria-atomic="true">
              {String(activeSlideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </div>
          </div>
        </Container>
      </Section>
      <WorkVideoPlayer
        work={playerWork}
        isOpen={isPlayerOpen}
        onClose={closePlayer}
        onCloseComplete={completePlayerClose}
      />
    </>
  );
};
