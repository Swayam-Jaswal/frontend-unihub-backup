import { formatDate, formatStatusLabel } from '@dashboard/utils/dashboardFormatters';

function MemberCard({ membership }) {
  return (
    <article className="card-surface-muted flex items-center justify-between gap-4 p-4">
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          {membership.club?.name || 'Club Membership'}
        </h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {membership.club?.type || 'CLUB'} - {formatDate(membership.appliedAt || membership.createdAt)}
        </p>
      </div>

      <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold text-[var(--color-brand)]">
        {formatStatusLabel(membership.status)}
      </span>
    </article>
  );
}

export default MemberCard;
