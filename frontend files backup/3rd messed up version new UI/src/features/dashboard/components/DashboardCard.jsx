import Icon from '@dashboard/components/Icon';

function DashboardCard({
  actionLabel,
  children,
  className = '',
  icon,
  title,
}) {
  return (
    <section
      className={[
        'card-surface flex h-full flex-col gap-5 p-5 transition-all duration-300 sm:p-6',
        className,
      ].join(' ')}
    >
      {title ? (
        <header className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {icon ? (
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-[calc(var(--radius)+0.25rem)] border border-[hsl(var(--border)/0.72)] bg-[linear-gradient(135deg,hsl(var(--primary)/0.15),hsl(var(--secondary)/0.14))] text-[var(--color-text-primary)] shadow-[0_16px_36px_-28px_hsl(var(--primary)/0.85)]">
                <Icon className="h-5 w-5" name={icon} />
              </span>
            ) : null}
            <h2 className="truncate text-lg font-semibold text-[var(--color-text-primary)]">
              {title}
            </h2>
          </div>

          {actionLabel ? (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]">
              {actionLabel}
              <Icon className="h-4 w-4" name="arrowRight" />
            </span>
          ) : null}
        </header>
      ) : null}

      {children}
    </section>
  );
}

export default DashboardCard;
