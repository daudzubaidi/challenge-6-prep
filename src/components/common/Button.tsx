import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  disabled = false,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = 'font-semibold rounded-full transition-all duration-200 inline-flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-primary text-neutral-25 hover:bg-primary-light disabled:bg-gray-600',
    secondary: 'backdrop-blur-[20px] bg-neutral-black/60 border border-neutral-900 text-neutral-25 hover:bg-neutral-black/70 disabled:border-gray-600',
    outline: 'border-2 border-white text-white hover:bg-white/10 disabled:border-gray-600 bg-transparent',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-text-md font-semibold',
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} disabled:cursor-not-allowed`}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
