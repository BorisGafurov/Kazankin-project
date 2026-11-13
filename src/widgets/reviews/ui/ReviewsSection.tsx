import React from 'react';
import { useI18n } from '@/shared/lib/i18n';
import { Section, Container, Heading, Text, Grid } from '@/shared/ui';
import { REVIEWS_LIST, ReviewCard } from '@/entities/review';
import styles from './ReviewsSection.module.css';

export const ReviewsSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <Section id="reviews" theme="dark" sectionIndex={3} className={styles.reviewsSection}>
      <Container size="md">
        <div className={styles.header}>
          <Heading level={2} overline={t('reviews.overline')}>
            {t('reviews.title')}
          </Heading>
          <Text variant="body" className={styles.description}>
            {t('reviews.description')}
          </Text>
        </div>

        {/* Unified Metric Bar (5.0 ★ strictly inline) */}
        <div className={styles.metricBar}>
          <div className={styles.metricItem}>
            <div className={styles.metricNumber}>
              <span>5.0</span>
              <span className={styles.metricStar}>★</span>
            </div>
            <span className={styles.metricLabel} data-sand-target="true">
              {t('reviews.metric1')}
            </span>
          </div>

          <div className={styles.metricItem}>
            <div className={styles.metricNumber}>
              <span>40+</span>
            </div>
            <span className={styles.metricLabel} data-sand-target="true">
              {t('reviews.metric2')}
            </span>
          </div>

          <div className={styles.metricItem}>
            <div className={styles.metricNumber}>
              <span>100%</span>
            </div>
            <span className={styles.metricLabel} data-sand-target="true">
              {t('reviews.metric3')}
            </span>
          </div>
        </div>

        {/* 3-Column Reviews Grid */}
        <Grid cols={3} gap="lg" className={styles.reviewsGrid}>
          {REVIEWS_LIST.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
};
