import React, { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Heading.module.css';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  overline?: string;
  highlight?: string;
  children: ReactNode;
  className?: string;
  sandTarget?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  overline,
  highlight,
  children,
  className,
  sandTarget = true,
  ...rest
}) => {
  const Tag = (`h${level}`) as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <div className={styles.headingWrapper}>
      {overline && (
        <span
          className={styles.overline}
          data-sand-target={sandTarget ? 'true' : undefined}
        >
          {overline}
        </span>
      )}
      <Tag
        className={clsx(styles.heading, styles[`h${level}`], className)}
        data-sand-target={sandTarget ? 'true' : undefined}
        {...rest}
      >
        {children}
        {highlight && <span className={styles.highlight}>{highlight}</span>}
      </Tag>
    </div>
  );
};
