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

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <StarRating score={review.score} />
        <p className={styles.text} data-sand-target="true">
          {t(review.textKey)}
        </p>
      </div>
      <div className={styles.authorBlock}>
        <div className={styles.avatar}>{review.avatar}</div>
        <div>
          <h4 className={styles.authorName} data-sand-target="true">
            {t(review.nameKey)}
          </h4>
          <span className={styles.authorProject} data-sand-target="true">
            {t(review.projectKey)}
          </span>
        </div>
      </div>
    </article>
  );
};
