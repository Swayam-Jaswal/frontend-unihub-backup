import ApprovalCard from '@club/components/ApprovalCard';
import DashboardCard from '@dashboard/components/DashboardCard';
import StatCard from '@dashboard/components/StatCard';
import { formatCanonicalRole } from '@dashboard/utils/dashboardAccess';
import { formatStatusLabel } from '@dashboard/utils/dashboardFormatters';

function ApproverSections({ dashboard }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-4">
        <StatCard
          icon="approvals"
          label="Pending approvals"
          value={dashboard.stats.approvalsPending}
        />
        <StatCard
          icon="governance"
          label="Governance templates"
          theme="neutral"
          value={dashboard.stats.governanceTemplates}
        />
        <StatCard
          icon="audit"
          label="Audit feed items"
          theme="success"
          value={dashboard.stats.auditFeedItems}
        />
        <StatCard
          icon="profile"
          label="Assigned roles"
          theme="danger"
          value={dashboard.stats.myRoles}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <DashboardCard actionLabel="Review All" icon="approvals" title="Approval Workbench">
          <div className="space-y-3">
            {dashboard.approvalItems.length ? (
              dashboard.approvalItems.map((approval) => (
                <ApprovalCard approval={approval} key={approval._id} />
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                No approval steps are currently assigned to you.
              </p>
            )}
          </div>
        </DashboardCard>

        <DashboardCard actionLabel="Templates" icon="governance" title="Governance Templates">
          <div className="space-y-3">
            {dashboard.governanceTemplates.length ? (
              dashboard.governanceTemplates.slice(0, 4).map((template) => (
                <article className="card-surface-muted p-4" key={template._id}>
                  <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                    {template.name || `Template ${template._id.slice(-4)}`}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {template.description || 'Reusable governance workflow template.'}
                  </p>
                </article>
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                Governance templates are not available for this university yet.
              </p>
            )}
          </div>
        </DashboardCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <DashboardCard actionLabel="Live Feed" icon="audit" title="Recent Audit Activity">
          <div className="space-y-3">
            {dashboard.auditFeed.length ? (
              dashboard.auditFeed.map((item) => (
                <article className="card-surface-muted p-4" key={item._id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                        {formatStatusLabel(item.action)}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                        {item.entityType} - {item.performedByRole || 'Role unavailable'}
                      </p>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                No audit records were returned for the live feed.
              </p>
            )}
          </div>
        </DashboardCard>

        <DashboardCard actionLabel="PBAC" icon="profile" title="Approval Roles In Scope">
          <div className="grid gap-3 md:grid-cols-2">
            {dashboard.roles.length ? (
              dashboard.roles.map((role) => (
                <article className="card-surface-muted p-4" key={role._id}>
                  <p className="text-base font-semibold text-[var(--color-text-primary)]">
                    {formatCanonicalRole(role.canonicalRole)}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {role.displayRoleName || role.scopeType}
                  </p>
                </article>
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                No active PBAC roles are visible for this user yet.
              </p>
            )}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}

export default ApproverSections;
