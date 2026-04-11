import { forwardRef } from 'react';
import { cn } from '@utils/cn';

const Textarea = forwardRef(function Textarea(
  { className = '', error, helperText, label, rows = 4, ...props },
  ref,
) {
  return (
    <label className="block space-y-2">
      {label ? (
        <span className="text-sm font-medium text-[var(--color-text-primary)]">{label}</span>
      ) : null}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'w-full resize-none rounded-[var(--radius)] border bg-[linear-gradient(135deg,hsl(var(--card)/0.84),hsl(var(--background-elevated)/0.72))] px-4 py-3 text-base text-[var(--color-text-primary)] outline-none transition-all duration-200 placeholder:text-[var(--color-text-secondary)] backdrop-blur-xl sm:text-sm',
          error
            ? 'border-[hsl(var(--destructive)/0.55)] focus:border-[hsl(var(--destructive))] focus:[box-shadow:0_0_0_4px_hsl(var(--destructive)/0.12)]'
            : 'border-[hsl(var(--border)/0.8)] focus:border-[hsl(var(--primary)/0.82)] focus:[box-shadow:0_0_0_4px_hsl(var(--primary)/0.12)]',
          className,
        )}
        {...props}
      />
      {error ? (
        <p className="text-sm text-[var(--color-danger)]">{error}</p>
      ) : helperText ? (
        <p className="text-sm text-[var(--color-text-secondary)]">{helperText}</p>
      ) : null}
    </label>
  );
});

export default Textarea;
