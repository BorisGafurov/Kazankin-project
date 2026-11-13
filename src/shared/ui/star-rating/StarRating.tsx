import React from 'react';
import clsx from 'clsx';
import styles from './StarRating.module.css';

export interface StarRatingProps {
  score?: number;
  maxScore?: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  score = 5,
  maxScore = 5,
  className,
}) => {
  const stars = Array.from({ length: maxScore }, (_, i) => i < score);

  return (
    <div
      className={clsx(styles.starRating, className)}
      role="img"
      aria-label={`${score} из ${maxScore} звёзд`}
    >
      {stars.map((filled, index) => (
        <span
          key={index}
          className={clsx(styles.star, filled && styles.filled)}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
};
