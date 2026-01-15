import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div className={`w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[140px] ${className}`}>
      {children}
    </div>
  );
};
