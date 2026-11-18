import React from 'react';
import clsx from 'clsx';
import { WorkCase } from '../model/types';
import { useI18n } from '@/shared/lib/i18n';
import styles from './WorkCard.module.css';

export interface WorkCardProps {
  work: WorkCase;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({ work, index, isActive, onClick }) => {
  const { t } = useI18n();
  const title = t(work.titleKey);
  const imageSrc = `${import.meta.env.BASE_URL}${work.imageSrc.replace(/^\/+/, '')}`;

  return (
    <button
      id={`work-card-${work.id}`}
      type="button"
      className={clsx(styles.card, isActive && styles.activeCard)}
      onClick={onClick}
      aria-label={`${title} — ${t(work.categoryKey)}. ${t('works.openPlayer')}`}
      aria-pressed={isActive}
      data-work-index={index}
    >
      <span className={styles.poster}>
        <img
          src={imageSrc}
          alt=""
          width="850"
          height="1050"
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className={styles.playIndicator} aria-hidden="true" />
      </span>
      <span className={styles.info}>
        <span className={styles.title} data-sand-target="true">{title}</span>
        <span className={styles.category} data-sand-target="true">
          {t(work.categoryKey)}
        </span>
      </span>
    </button>
  );
};
