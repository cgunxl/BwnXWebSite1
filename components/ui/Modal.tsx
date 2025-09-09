import React, { useEffect } from 'react';
import { clsx } from 'clsx';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-overlay-veil backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={clsx(
          'relative w-full max-w-md bg-bg-raised border border-stroke-soft rounded-xl shadow-2xl',
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-stroke-soft">
            <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 text-text-muted hover:text-text-primary transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};