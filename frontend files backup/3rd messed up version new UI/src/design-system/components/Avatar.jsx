function Avatar({ name = '', size = 'md', className = '' }) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? '')
      .join('') || 'U';

  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  return (
    <div
      className={[
        sizes[size] ?? sizes.md,
        'flex shrink-0 items-center justify-center rounded-full',
        'border border-[hsl(var(--border)/0.68)] bg-[linear-gradient(135deg,hsl(var(--primary)/0.22),hsl(var(--secondary)/0.2))] font-semibold text-[var(--color-text-on-brand)] shadow-[var(--shadow-user-avatar)] backdrop-blur-xl',
        className,
      ].join(' ')}
    >
      {initials}
    </div>
  );
}

export default Avatar;
