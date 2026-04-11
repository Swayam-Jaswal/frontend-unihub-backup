import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

function Modal({ open, onClose, title, children }) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-[var(--color-overlay)] backdrop-blur-sm" />
        <Dialog.Content
          className={[
            'fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg',
            '-translate-x-1/2 -translate-y-1/2',
            'rounded-[calc(var(--radius)+0.5rem)] border border-[hsl(var(--border)/0.72)]',
            'bg-[linear-gradient(160deg,hsl(var(--card)/0.95),hsl(var(--background-elevated)/0.88))] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl',
          ].join(' ')}
        >
          <div className="flex items-start justify-between gap-4">
            <Dialog.Title className="text-lg font-semibold text-[var(--color-text-primary)]">
              {title}
            </Dialog.Title>
            <button
              aria-label="Close"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--border)/0.68)] bg-[hsl(var(--muted)/0.5)] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              onClick={onClose}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;
