function Loader({
  className = '',
  fullScreen = false,
  label,
  size = 'md',
  text,
}) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-10 w-10 border-[3px]',
  };
  const content = text ?? label;
  const wrapperClass = fullScreen
    ? 'flex min-h-screen items-center justify-center bg-transparent text-[var(--color-brand)]'
    : 'inline-flex items-center gap-3 text-[var(--color-brand)]';

  return (
    <div className={`${wrapperClass} ${className}`}>
      <span
        aria-hidden="true"
        className={`inline-block animate-spin rounded-full border-solid border-[hsl(var(--border)/0.5)] border-t-current text-current ${sizeClasses[size] ?? sizeClasses.md}`}
      />
      {content ? (
        <span className="text-sm font-medium text-[var(--color-text-secondary)]">
          {content}
        </span>
      ) : null}
    </div>
  );
}

export default Loader;
