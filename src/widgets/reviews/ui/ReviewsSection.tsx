import React from 'react';
import { useI18n } from '@/shared/lib/i18n';
import { ReviewCard, REVIEWS_LIST } from '@/entities/review';
import { Container, Heading, Section, Text } from '@/shared/ui';
import styles from './ReviewsSection.module.css';

export const ReviewsSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <Section
      id="reviews"
      theme="dark"
      sectionIndex={2}
      className={styles.reviewsSection}
      aria-labelledby="reviews-title"
    >
      <Container size="md">
        <div className={styles.content}>
          <div className={styles.intro}>
            <Text variant="caption" className={styles.overline}>
              {t('reviews.overline')}
            </Text>
            <Heading level={2} id="reviews-title" className={styles.title}>
              {t('reviews.title')}
            </Heading>
            <Text className={styles.description}>
              {t('reviews.description')}
            </Text>
          </div>

          <div className={styles.reviewList}>
            {REVIEWS_LIST.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
