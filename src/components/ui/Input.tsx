// src/components/ui/Input.tsx
'use client';

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, leftIcon, rightIcon, className = '', ...props }, ref) => {
    // Base styles
    const baseStyles = 'rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';
    
    // Error styles
    const errorStyles = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '';
    
    // Width style
    const widthStyle = fullWidth ? 'w-full' : '';
    
    // Icon styles
    const leftIconStyle = leftIcon ? 'pl-10' : '';
    const rightIconStyle = rightIcon ? 'pr-10' : '';
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`${baseStyles} ${errorStyles} ${widthStyle} ${leftIconStyle} ${rightIconStyle} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;