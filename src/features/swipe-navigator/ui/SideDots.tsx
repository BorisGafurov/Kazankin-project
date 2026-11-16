import React from 'react';
import clsx from 'clsx';
import { useI18n } from '@/shared/lib/i18n';
import styles from './SideDots.module.css';

const SECTION_LABELS = [
  'nav.home',
  'nav.works',
  'nav.reviews',
  'nav.stages',
  'nav.contact',
] as const;

export interface SideDotsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export const SideDots: React.FC<SideDotsProps> = ({ total, current, onSelect }) => {
  const { t } = useI18n();

  return (
    <aside className={styles.dots} aria-label={t('nav.quick')}>
      {Array.from({ length: total }, (_, index) => {
        const labelKey = SECTION_LABELS[index];
        const label = labelKey
          ? `${t('nav.screen')} ${index + 1}: ${t(labelKey)}`
          : `${t('nav.screen')} ${index + 1}`;

        return (
          <button
            key={index}
            type="button"
            className={clsx(styles.dot, current === index && styles.active)}
            onClick={() => onSelect(index)}
            aria-label={label}
            aria-current={current === index ? 'page' : undefined}
          />
        );
      })}
    </aside>
  );
};
