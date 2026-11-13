import React, { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Text.module.css';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'body' | 'body-sm' | 'lead' | 'caption' | 'muted';
  as?: 'p' | 'span' | 'div';
  children: ReactNode;
  className?: string;
  sandTarget?: boolean;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  as = 'p',
  children,
  className,
  sandTarget = true,
  ...rest
}) => {
  const Tag = as;

  return (
    <Tag
      className={clsx(styles.text, styles[variant], className)}
      data-sand-target={sandTarget ? 'true' : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
};
