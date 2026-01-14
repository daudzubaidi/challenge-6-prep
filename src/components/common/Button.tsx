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
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 font-poppins';

  const variantStyles = {
    primary: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-600',
    secondary: 'bg-gray-700 text-white hover:bg-gray-800 disabled:bg-gray-600',
    outline: 'border-2 border-white text-white hover:bg-white/10 disabled:border-gray-600',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
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
