import React, { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Container.module.css';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'md',
  ...rest
}) => {
  return (
    <div
      className={clsx(styles.container, styles[size], className)}
      {...rest}
    >
      {children}
    </div>
  );
};
