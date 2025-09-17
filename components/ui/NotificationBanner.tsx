import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useState } from 'react';

interface NotificationBannerProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  dismissible?: boolean;
  className?: string;
}

export function NotificationBanner({ 
  variant, 
  title, 
  message, 
  dismissible = true,
  className 
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const variants = {
    info: 'bg-primary/20 border-primary/30 text-white',
    success: 'bg-success/20 border-success/30 text-white',
    warning: 'bg-warning/20 border-warning/30 text-white',
    error: 'bg-danger/20 border-danger/30 text-white',
  };

  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  return (
    <div className={cn(
      'flex items-start space-x-3 p-4 rounded-lg border backdrop-blur-sm',
      variants[variant],
      className
    )}>
      <span className="text-lg">{icons[variant]}</span>
      <div className="flex-1">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm opacity-90">{message}</p>
      </div>
      {dismissible && (
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/60 hover:text-white transition-colors duration-200"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
