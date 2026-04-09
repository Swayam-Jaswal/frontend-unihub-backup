function ClubCard({ club, meta }) {
  return (
    <article className="card-surface-muted p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
            {club.name}
          </h3>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {club.type} {club.code ? `- ${club.code}` : ''}
          </p>
        </div>

        <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold text-[var(--color-text-secondary)]">
          {meta}
        </span>
      </div>

      {club.description ? (
        <p className="mt-4 text-sm leading-6 text-[var(--color-text-secondary)]">
          {club.description}
        </p>
      ) : null}
    </article>
  );
}

export default ClubCard;
