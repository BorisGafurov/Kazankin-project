import React from 'react';
import clsx from 'clsx';
import styles from './SideDots.module.css';

export interface SideDotsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export const SideDots: React.FC<SideDotsProps> = ({ total, current, onSelect }) => {
  return (
    <aside className={styles.dots} aria-label="Быстрая навигация по секциям">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          className={clsx(styles.dot, current === i && styles.active)}
          onClick={() => onSelect(i)}
          aria-label={`Перейти к экрану ${i + 1}`}
          aria-current={current === i ? 'true' : undefined}
        />
      ))}
    </aside>
  );
};
