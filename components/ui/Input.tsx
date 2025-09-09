import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  unit?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  unit,
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text-secondary"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={clsx(
            'w-full px-3 py-2 bg-bg-raised border border-stroke-soft rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-accent-a2 transition-colors duration-200',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {unit && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
            {unit}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};