import React, { useState } from 'react';
import { useI18n } from '@/shared/lib/i18n';
import { Section, Container, Heading, Text, Button } from '@/shared/ui';
import { WORK_CASES, WorkCard } from '@/entities/work';
import styles from './WorksSection.module.css';

export const WorksSection: React.FC = () => {
  const { t } = useI18n();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const totalSlides = WORK_CASES.length;

  const handlePrev = () => {
    setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    setActiveSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  return (
    <Section id="works" theme="milk" sectionIndex={1} className={styles.worksSection}>
      <Container size="md">
        <div className={styles.header}>
          <Heading level={2} overline={t('works.overline')}>
            {t('works.title')}
          </Heading>
          <Text variant="body" className={styles.description}>
            {t('works.description')}
          </Text>
        </div>

        {/* Works Slider */}
        <div className={styles.sliderContainer}>
          <div
            className={styles.sliderTrack}
            style={{
              transform: `translateX(calc(-${activeSlideIndex} * (100% / 3 + 8px)))`,
            }}
          >
            {WORK_CASES.map((work, index) => (
              <WorkCard
                key={work.id}
                work={work}
                isActive={activeSlideIndex === index}
                onClick={() => setActiveSlideIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Controls Bar */}
        <div className={styles.controls}>
          <div className={styles.navBtns}>
            <Button
              variant="circular"
              onClick={handlePrev}
              aria-label="Предыдущая работа"
            >
              ←
            </Button>
            <Button
              variant="circular"
              onClick={handleNext}
              aria-label="Следующая работа"
            >
              →
            </Button>
          </div>
          <div className={styles.counter}>
            {String(activeSlideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </div>
        </div>
      </Container>
    </Section>
  );
};
