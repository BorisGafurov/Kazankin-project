import React from 'react';
import clsx from 'clsx';
import { StageStep } from '../model/types';
import { useI18n } from '@/shared/lib/i18n';
import { Badge } from '@/shared/ui';
import styles from './StageCard.module.css';

export interface StageCardProps {
  stage: StageStep;
  expanded: boolean;
  onToggle: () => void;
}

export const StageCard: React.FC<StageCardProps> = ({ stage, expanded, onToggle }) => {
  const { t } = useI18n();
  const detailsId = `stage-details-${stage.number}`;

  return (
    <article className={clsx(styles.card, expanded && styles.expanded)}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={expanded}
        aria-controls={detailsId}
        onClick={onToggle}
      >
        <span className={styles.number}>{stage.number}</span>
        <span className={styles.title} data-sand-target="true">
          {t(stage.titleKey)}
        </span>
        <span className={styles.icon} aria-hidden="true">
          {expanded ? '−' : '+'}
        </span>
      </button>

      <div id={detailsId} className={styles.details} hidden={!expanded}>
        <Badge variant={stage.badgeVariant}>{t(stage.badgeKey)}</Badge>
        <p className={styles.desc} data-sand-target="true">
          {t(stage.descKey)}
        </p>
        {stage.noteKey && (
          <p className={styles.note} data-sand-target="true">
            {t(stage.noteKey)}
          </p>
        )}
      </div>
    </article>
  );
};
