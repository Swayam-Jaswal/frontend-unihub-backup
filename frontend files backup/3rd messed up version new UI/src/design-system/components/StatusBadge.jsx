import { approvalStatusColors, eventStatusColors } from '@ds/tokens';

function StatusBadge({ status, type = 'event' }) {
  const map = type === 'approval' ? approvalStatusColors : eventStatusColors;
  const colors = map[status] ?? {
    bg: 'var(--color-surface-soft)',
    text: 'var(--color-text-secondary)',
    border: 'var(--color-border)',
  };

  const label = (status ?? 'UNKNOWN')
    .toLowerCase()
    .split('_')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');

  return (
    <span
      className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap backdrop-blur-lg"
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        color: colors.text,
      }}
    >
      {label}
    </span>
  );
}

export default StatusBadge;
