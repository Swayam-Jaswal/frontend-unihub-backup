import Loader from '@ds/components/Loader';
import { cn } from '@utils/cn';

const variantClasses = {
  default:
    'border border-transparent bg-[hsl(var(--primary))] text-[var(--color-text-inverse)] shadow-[0_18px_32px_-24px_hsl(var(--primary)/0.95)] hover:brightness-110',
  primary:
    'border border-transparent bg-[hsl(var(--primary))] text-[var(--color-text-inverse)] shadow-[0_18px_32px_-24px_hsl(var(--primary)/0.95)] hover:brightness-110',
  secondary:
    'border border-[hsl(var(--border)/0.8)] bg-[hsl(var(--muted)/0.75)] text-[var(--color-text-primary)] hover:bg-[hsl(var(--muted)/0.95)]',
  ghost:
    'border border-transparent bg-transparent text-[var(--color-text-secondary)] hover:bg-[hsl(var(--muted)/0.62)] hover:text-[var(--color-text-primary)]',
  outline:
    'border border-[hsl(var(--border)/0.82)] bg-transparent text-[var(--color-text-primary)] hover:border-[hsl(var(--primary)/0.46)] hover:bg-[hsl(var(--primary)/0.08)]',
  glow:
    'border border-[hsl(var(--primary)/0.38)] bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--secondary)))] text-[var(--color-text-on-brand)] shadow-[0_24px_42px_-24px_hsl(var(--primary)/0.9)] hover:scale-[1.01] hover:shadow-[0_28px_46px_-22px_hsl(var(--secondary)/0.75)]',
  glass:
    'border border-[hsl(var(--border)/0.7)] bg-[linear-gradient(135deg,hsl(var(--card)/0.78),hsl(var(--background-elevated)/0.62))] text-[var(--color-text-primary)] backdrop-blur-xl hover:border-[hsl(var(--primary)/0.35)] hover:bg-[linear-gradient(135deg,hsl(var(--card)/0.9),hsl(var(--background-elevated)/0.78))]',
  destructive:
    'border border-[hsl(var(--destructive)/0.28)] bg-[hsl(var(--destructive)/0.18)] text-[hsl(0_92%_78%)] hover:bg-[hsl(var(--destructive)/0.24)]',
  success:
    'border border-[hsl(var(--success)/0.24)] bg-[hsl(var(--success)/0.18)] text-[hsl(151_82%_76%)] hover:bg-[hsl(var(--success)/0.24)]',
};

const sizeClasses = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-5 text-base sm:px-6',
};

function Button({
  children,
  className = '',
  disabled = false,
  isLoading = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex min-w-0 items-center justify-center gap-2 rounded-[var(--radius)] font-semibold transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ring))] disabled:pointer-events-none disabled:opacity-60',
        variantClasses[variant] ?? variantClasses.default,
        sizeClasses[size],
        className,
      )}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading ? <Loader className="text-current" size="sm" /> : null}
      <span>{children}</span>
    </button>
  );
}

export default Button;
