import React from 'react';
import clsx from 'clsx';
import { WorkCase } from '../model/types';
import { useI18n } from '@/shared/lib/i18n';
import { Badge } from '@/shared/ui';
import styles from './WorkCard.module.css';

export interface WorkCardProps {
  work: WorkCase;
  isActive: boolean;
  onClick: () => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({ work, isActive, onClick }) => {
  const { t } = useI18n();

  return (
    <article
      className={clsx(
        styles.card,
        styles[work.theme],
        isActive && styles.activeCard
      )}
      onClick={onClick}
    >
      <div className={styles.poster}>
        {isActive && <Badge variant="card">{t('works.badge')}</Badge>}
        <div className={styles.posterOverlay}>
          <h3
            className={styles.posterTitle}
            data-sand-target="true"
          >
            {t(work.posterTitleKey)}
          </h3>
          <p
            className={styles.posterCaption}
            data-sand-target="true"
          >
            {t(work.posterCaptionKey)}
          </p>
        </div>
      </div>
      <div className={styles.info}>
        <h4
          className={clsx(styles.title, isActive && styles.titleActive)}
          data-sand-target="true"
        >
          {t(work.titleKey)}
        </h4>
        <span
          className={styles.category}
          data-sand-target="true"
        >
          {t(work.categoryKey)}
        </span>
      </div>
    </article>
  );
};
