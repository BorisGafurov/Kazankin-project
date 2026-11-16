import React from 'react';
import { ReviewItem } from '../model/types';
import { useI18n } from '@/shared/lib/i18n';
import { StarRating } from '@/shared/ui';
import styles from './ReviewCard.module.css';

export interface ReviewCardProps {
  review: ReviewItem;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { t } = useI18n();
  const maxScore = 5;
  const ratingAriaLabel = t('reviews.ratingAria')
    .replace('{score}', String(review.score))
    .replace('{maxScore}', String(maxScore));

  return (
    <article className={styles.card}>
      {review.isMock && <p className={styles.mockBadge}>{t('reviews.mockLabel')}</p>}
      <div className={styles.top}>
        <div className={styles.rating}>
          <StarRating score={review.score} maxScore={maxScore} ariaLabel={ratingAriaLabel} />
          <span className={styles.score}>{review.score} / {maxScore}</span>
        </div>
        <p className={styles.text} data-sand-target="true">
          {t(review.textKey)}
        </p>
      </div>
      <div className={styles.authorBlock}>
        <div className={styles.avatar} aria-hidden="true">{review.avatar}</div>
        <div>
          <h3 className={styles.authorName} data-sand-target="true">
            {t(review.nameKey)}
          </h3>
          <span className={styles.authorProject} data-sand-target="true">
            {t(review.projectKey)}
          </span>
        </div>
      </div>
    </article>
  );
};
