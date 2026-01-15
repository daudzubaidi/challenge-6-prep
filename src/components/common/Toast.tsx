import { Check } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ message, isVisible, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-[114px] left-1/2 -translate-x-1/2 z-[100]">
      <div className="flex items-center justify-center gap-[16px] backdrop-blur-[20px] bg-[rgba(0,0,0,0.6)] min-h-[56px] rounded-[12px] px-[32px] min-w-[360px]">
        <Check className="w-[24px] h-[24px] text-white flex-shrink-0" />
        <p className="text-[16px] leading-[30px] font-semibold text-white text-center">
          {message}
        </p>
      </div>
    </div>
  );
};
