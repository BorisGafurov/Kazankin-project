import React, { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'contact' | 'circular' | 'rdr-brush';
  children: ReactNode;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  sandTarget?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  as = 'button',
  href,
  target,
  rel,
  className,
  sandTarget = true,
  ...rest
}) => {
  const commonClasses = clsx(
    styles.btn,
    styles[variant],
    className
  );

  if (as === 'a' && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={commonClasses}
        data-sand-target={sandTarget ? 'true' : undefined}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <span className={styles.btnContent}>{children}</span>
      </a>
    );
  }

  return (
    <button
      className={commonClasses}
      data-sand-target={sandTarget ? 'true' : undefined}
      {...rest}
    >
      <span className={styles.btnContent}>{children}</span>
    </button>
  );
};
