import React from 'react';
import clsx from 'clsx';
import { StageStep } from '../model/types';
import { useI18n } from '@/shared/lib/i18n';
import { Badge } from '@/shared/ui';
import styles from './StageCard.module.css';

export interface StageCardProps {
  stage: StageStep;
  isExpanded: boolean;
  onToggle: () => void;
}

export const StageCard: React.FC<StageCardProps> = ({ stage, isExpanded, onToggle }) => {
  const { t } = useI18n();

  return (
    <div
      className={clsx(styles.card, isExpanded && styles.expanded)}
      aria-expanded={isExpanded}
      onClick={onToggle}
    >
      <div className={styles.header}>
        <span className={styles.number}>{stage.number}</span>
        <div className={styles.meta}>
          <Badge variant={stage.badgeVariant}>{t(stage.badgeKey)}</Badge>
          <span className={styles.chevron} aria-hidden="true">
            ▼
          </span>
        </div>
      </div>
      <h3 className={styles.title} data-sand-target="true">
        {t(stage.titleKey)}
      </h3>
      <p className={styles.desc} data-sand-target="true">
        {t(stage.descKey)}
      </p>
      <div className={styles.details}>
        <p className={styles.detailText} data-sand-target="true">
          {t(stage.detailKey)}
        </p>
      </div>
    </div>
  );
};
