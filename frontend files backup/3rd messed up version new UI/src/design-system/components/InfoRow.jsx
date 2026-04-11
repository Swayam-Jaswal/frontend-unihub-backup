function InfoRow({ label, value, className = '' }) {
  if (!value) return null;

  return (
    <div className={['flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-6', className].join(' ')}>
      <span className="w-36 shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">{label}</span>
      <span className="text-sm font-medium text-[var(--color-text-primary)]">{value}</span>
    </div>
  );
}

export default InfoRow;
