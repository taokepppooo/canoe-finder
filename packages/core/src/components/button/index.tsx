import React, { ReactElement } from 'react';

export type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
};

export const CfButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  disabled,
  className,
  ...props
}): ReactElement => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cf-ui-button ${className}`}
      {...props}>
      {children}
    </button>
  );
};
