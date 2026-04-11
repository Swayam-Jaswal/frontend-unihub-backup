function SectionLabel({ children }) {
  return (
    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-text-secondary)]">
      {children}
    </p>
  );
}

export default SectionLabel;
