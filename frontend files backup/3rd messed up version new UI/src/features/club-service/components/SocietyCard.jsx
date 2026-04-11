function SocietyCard({ society, childClubs = [], schoolName = '' }) {
  return (
    <article className="card-surface overflow-hidden">
      <div
        className="h-44 w-full"
        style={{
          background: society.logoUrl
            ? `url(${society.logoUrl}) center/cover no-repeat`
            : 'linear-gradient(135deg, var(--color-brand-soft) 0%, var(--color-surface-soft) 100%)',
        }}
      />
      <div className="p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
          Society
        </p>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          {society.name}
        </h3>
        {schoolName ? (
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{schoolName}</p>
        ) : null}
        {society.description ? (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--color-text-secondary)]">
            {society.description}
          </p>
        ) : null}

        {childClubs.length > 0 ? (
          <div className="mt-4 border-t border-[hsl(var(--border)/0.55)] pt-4">
            <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
              Clubs
            </p>
            <div className="space-y-2">
              {childClubs.slice(0, 3).map((club) => (
                <div key={club._id} className="rounded-[var(--radius)] border border-[hsl(var(--border)/0.48)] bg-[hsl(var(--muted)/0.45)] px-3 py-2 text-sm">
                  <span className="text-[var(--color-text-primary)]">{club.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default SocietyCard;
