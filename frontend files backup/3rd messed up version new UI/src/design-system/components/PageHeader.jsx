function PageHeader({ title, description, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-text-secondary)]">
          UniHub
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:justify-end">{action}</div> : null}
    </div>
  );
}

export default PageHeader;
