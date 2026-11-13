import React, { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Section.module.css';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  id: string;
  theme?: 'dark' | 'milk' | 'contact';
  className?: string;
  fullpage?: boolean;
  sectionIndex?: number;
}

export const Section: React.FC<SectionProps> = ({
  children,
  id,
  theme = 'dark',
  className,
  fullpage = true,
  sectionIndex,
  ...rest
}) => {
  return (
    <section
      id={id}
      data-index={sectionIndex}
      className={clsx(
        styles.section,
        styles[theme],
        fullpage && styles.fullpage,
        className
      )}
      {...rest}
    >
      {children}
    </section>
  );
};
