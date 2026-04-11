import { formatCanonicalRole } from '@dashboard/utils/dashboardAccess';
import StatusBadge from '@ds/components/StatusBadge';

function ApprovalCard({ approval }) {
  return (
    <article className="card-surface-muted flex items-start justify-between gap-4 p-4">
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          {approval.eventTitle}
        </h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {approval.canonicalRoleLabel || formatCanonicalRole(approval.canonicalRole)} - Step {approval.stepOrder}
        </p>
      </div>
      <StatusBadge status={approval.status || 'PENDING'} type="approval" />
    </article>
  );
}

export default ApprovalCard;
