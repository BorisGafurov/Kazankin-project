import React, { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Grid.module.css';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 3,
  gap = 'md',
  className,
  ...rest
}) => {
  return (
    <div
      className={clsx(styles.grid, styles[`cols-${cols}`], styles[`gap-${gap}`], className)}
      {...rest}
    >
      {children}
    </div>
  );
};
