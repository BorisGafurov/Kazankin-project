import React, { useRef, useState } from 'react';
import { useI18n } from '@/shared/lib/i18n';
import { Section, Container, Heading, Text, Button } from '@/shared/ui';
import { WORK_CASES, WorkCard } from '@/entities/work';
import styles from './WorksSection.module.css';

export const WorksSection: React.FC = () => {
  const { t } = useI18n();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalSlides = WORK_CASES.length;

  const selectSlide = (index: number) => {
    const nextIndex = (index + totalSlides) % totalSlides;
    setActiveSlideIndex(nextIndex);

    requestAnimationFrame(() => {
      carouselRef.current
        ?.querySelector<HTMLElement>(`[data-work-index="${nextIndex}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  };

  return (
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
                onClick={() => selectSlide(index)}
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
  );
};
