import React, { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'take' | 'agree' | 'none' | 'card';
  children: ReactNode;
  className?: string;
  sandTarget?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'take',
  children,
  className,
  sandTarget = true,
  ...rest
}) => {
  return (
    <span
      className={clsx(styles.badge, styles[variant], className)}
      data-sand-target={sandTarget ? 'true' : undefined}
      {...rest}
    >
      {children}
    </span>
  );
};
