import React, { useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { StageStep } from '../model/types';
import { useI18n } from '@/shared/lib/i18n';
import { Badge } from '@/shared/ui';
import styles from './StageCard.module.css';

const CLOSE_ANIMATION_MS = 280;

export interface StageCardProps {
  stage: StageStep;
  expanded: boolean;
  onToggle: () => void;
}

export const StageCard: React.FC<StageCardProps> = ({ stage, expanded, onToggle }) => {
  const { t } = useI18n();
  const detailsId = `stage-details-${stage.number}`;
  const [closing, setClosing] = useState(false);
  const previousExpanded = useRef(expanded);
  const closingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    if (closingTimeout.current !== null) {
      clearTimeout(closingTimeout.current);
      closingTimeout.current = null;
    }

    if (expanded) {
      setClosing(false);
    } else if (previousExpanded.current) {
      setClosing(true);
      closingTimeout.current = setTimeout(() => {
        setClosing(false);
        closingTimeout.current = null;
      }, CLOSE_ANIMATION_MS);
    }

    previousExpanded.current = expanded;
  }, [expanded]);

  useLayoutEffect(() => () => {
    if (closingTimeout.current !== null) {
      clearTimeout(closingTimeout.current);
    }
  }, []);

  return (
    <article className={clsx(styles.card, expanded && styles.expanded, closing && styles.closing)}>
      <div className={styles.overlayContent} data-stage-dialog={expanded ? stage.number : undefined}>
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
            {expanded ? '×' : '+'}
          </span>
        </button>

        <div id={detailsId} className={styles.details} aria-hidden={!expanded}>
          <div className={styles.detailsContent}>
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
        </div>
      </div>
    </article>
  );
};
