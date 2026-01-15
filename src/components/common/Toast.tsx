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
      <div
        style={{
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          minHeight: '56px',
          borderRadius: '12px',
          paddingLeft: '32px',
          paddingRight: '32px',
          minWidth: '360px',
        }}
        className="flex items-center justify-center gap-[16px]"
      >
        <Check className="w-[24px] h-[24px] text-white flex-shrink-0" />
        <p
          style={{
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '30px',
            color: 'white',
            textAlign: 'center',
          }}
        >
          {message}
        </p>
      </div>
    </div>
  );
};
