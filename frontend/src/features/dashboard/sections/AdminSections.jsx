import DashboardCard from '@dashboard/components/DashboardCard';
import StatCard from '@dashboard/components/StatCard';
import { formatCanonicalRole } from '@dashboard/utils/dashboardAccess';
import { formatStatusLabel } from '@dashboard/utils/dashboardFormatters';

function AdminSections({ dashboard }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-4">
        <StatCard
          icon="dashboard"
          label="Organization units"
          value={dashboard.stats.organizationUnits}
        />
        <StatCard
          icon="clubs"
          label="Active clubs"
          theme="success"
          value={dashboard.stats.activeClubs}
        />
        <StatCard
          icon="societies"
          label="Public societies"
          theme="neutral"
          value={dashboard.stats.publicSocieties}
        />
        <StatCard
          icon="audit"
          label="Audit feed items"
          theme="danger"
          value={dashboard.stats.auditFeedItems}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <DashboardCard actionLabel="Topology" icon="dashboard" title="Organization Overview">
          <div className="grid gap-3 md:grid-cols-2">
            <article className="card-surface-muted p-4">
              <p className="text-sm text-[var(--color-text-secondary)]">Clubs</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                {dashboard.organizations.filter((item) => item.type === 'CLUB').length}
              </p>
            </article>
            <article className="card-surface-muted p-4">
              <p className="text-sm text-[var(--color-text-secondary)]">Societies</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                {dashboard.organizations.filter((item) => item.type === 'SOCIETY').length}
              </p>
            </article>
            <article className="card-surface-muted p-4">
              <p className="text-sm text-[var(--color-text-secondary)]">Events created</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                {dashboard.stats.createdEvents}
              </p>
            </article>
            <article className="card-surface-muted p-4">
              <p className="text-sm text-[var(--color-text-secondary)]">Approval backlog</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                {dashboard.stats.approvalsPending}
              </p>
            </article>
          </div>
        </DashboardCard>

        <DashboardCard actionLabel="Governance" icon="governance" title="Governance Readiness">
          <div className="space-y-3">
            {dashboard.governanceTemplates.length ? (
              dashboard.governanceTemplates.map((template) => (
                <article className="card-surface-muted p-4" key={template._id}>
                  <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                    {template.name || `Template ${template._id.slice(-4)}`}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {template.description || 'Governance flow is available for downstream scopes.'}
                  </p>
                </article>
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                Governance templates have not been configured yet.
              </p>
            )}
          </div>
        </DashboardCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <DashboardCard actionLabel="Feed" icon="audit" title="University Audit Feed">
          <div className="space-y-3">
            {dashboard.auditFeed.length ? (
              dashboard.auditFeed.map((item) => (
                <article className="card-surface-muted p-4" key={item._id}>
                  <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                    {formatStatusLabel(item.action)}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {item.entityType} - {item.performedByRole || 'Unknown role'}
                  </p>
                </article>
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                The audit feed is empty for now.
              </p>
            )}
          </div>
        </DashboardCard>

        <DashboardCard actionLabel="Roles" icon="profile" title="Active Role Assignments">
          <div className="space-y-3">
            {dashboard.roles.length ? (
              dashboard.roles.map((role) => (
                <article className="card-surface-muted p-4" key={role._id}>
                  <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                    {formatCanonicalRole(role.canonicalRole)}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {role.scopeType} - {role.displayRoleName || 'Assignment active'}
                  </p>
                </article>
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                No role assignments were returned from club-service.
              </p>
            )}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}

export default AdminSections;
