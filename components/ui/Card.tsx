import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glow' | 'glass';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  onClick
}) => {
  const variantClasses = {
    default: 'bg-gradient-to-b from-surface-1/90 to-bg-raised/90 border border-stroke-soft',
    glow: 'bg-gradient-to-b from-surface-1/90 to-bg-raised/90 border border-stroke-soft shadow-glow',
    glass: 'bg-gradient-to-b from-surface-1/50 to-bg-raised/50 border border-stroke-soft backdrop-blur-sm'
  };

  return (
    <div
      className={clsx(
        'rounded-xl p-6 shadow-lg',
        variantClasses[variant],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};