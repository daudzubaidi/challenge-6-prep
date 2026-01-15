import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-[24px]">
      {icon && <div className="text-[200px] leading-[200px]">{icon}</div>}
      <div className="flex flex-col items-center gap-[8px] w-full">
        <h3 className="text-[16px] leading-[30px] font-semibold text-white">{title}</h3>
        {description && (
          <p className="text-[14px] leading-[28px] font-normal text-neutral-400 text-center">
            {description}
          </p>
        )}
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" className="w-full h-[52px] text-text-md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
