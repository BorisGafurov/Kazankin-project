import React from 'react';
import { StageStep } from '../model/types';
import { useI18n } from '@/shared/lib/i18n';
import { Badge } from '@/shared/ui';
import styles from './StageCard.module.css';

export interface StageCardProps {
  stage: StageStep;
}

export const StageCard: React.FC<StageCardProps> = ({ stage }) => {
  const { t } = useI18n();

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.number}>{stage.number}</span>
        <Badge variant={stage.badgeVariant}>{t(stage.badgeKey)}</Badge>
      </div>
      <h4 className={styles.title} data-sand-target="true">
        {t(stage.titleKey)}
      </h4>
      <p className={styles.desc} data-sand-target="true">
        {t(stage.descKey)}
      </p>
      {stage.noteKey && (
        <p className={styles.note} data-sand-target="true">
          {t(stage.noteKey)}
        </p>
      )}
    </article>
  );
};
