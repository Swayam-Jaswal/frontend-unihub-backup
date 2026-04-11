import Icon from '@dashboard/components/Icon';

function EmptyState({ icon = 'dashboard', title = 'Nothing here yet', description }) {
  return (
    <div className="card-surface-muted flex flex-col items-center justify-center px-6 py-14 text-center">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-[calc(var(--radius)+0.5rem)] border border-[hsl(var(--border)/0.72)] bg-[linear-gradient(135deg,hsl(var(--primary)/0.14),hsl(var(--secondary)/0.14))] text-[var(--color-text-primary)] shadow-[0_20px_40px_-26px_hsl(var(--primary)/0.7)]">
        <Icon className="h-8 w-8" name={icon} />
      </span>
      <h3 className="mt-4 text-base font-semibold text-[var(--color-text-primary)]">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-sm leading-6 text-[var(--color-text-secondary)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default EmptyState;
