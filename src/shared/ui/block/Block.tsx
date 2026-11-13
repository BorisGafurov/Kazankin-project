import React, { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Block.module.css';

export interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  as?: 'div' | 'article' | 'aside' | 'header' | 'footer';
  className?: string;
}

export const Block: React.FC<BlockProps> = ({
  children,
  padding = 'none',
  margin = 'none',
  as = 'div',
  className,
  ...rest
}) => {
  const Tag = as;
  return (
    <Tag
      className={clsx(
        styles.block,
        styles[`p-${padding}`],
        styles[`m-${margin}`],
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};
