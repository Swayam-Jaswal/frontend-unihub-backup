import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '@ds/components/Loader';
import DashboardCard from '@dashboard/components/DashboardCard';
import { selectUser } from '@store/authSlice';
import { usePermission, useIsAdmin } from '@hooks/usePermission';
import { getUserDisplayName } from '@dashboard/utils/userPresentation';
import { formatCanonicalRole } from '@dashboard/utils/dashboardAccess';
import StatsSection from '@dashboard/sections/StatsSection';
import ApprovalSection from '@dashboard/sections/ApprovalSection';
import EventSection from '@dashboard/sections/EventSection';
import MemberSection from '@dashboard/sections/MemberSection';
import AuditSection from '@dashboard/sections/AuditSection';
import OrgSection from '@dashboard/sections/OrgSection';
import MembershipsSection from '@dashboard/sections/MembershipsSection';

function DashboardPage() {
  const dashboard = useOutletContext();
  const user = useSelector(selectUser);
  const isAdmin = useIsAdmin();
  const { can } = usePermission(dashboard.roles ?? []);

  if (dashboard.isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader label="Building your dashboard..." size="lg" />
      </div>
    );
  }

  if (dashboard.error) {
    return (
      <DashboardCard className="max-w-2xl" icon="help" title="Dashboard unavailable">
        <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
          Could not load dashboard data. Verify that club-service is running
          and the API base URL is correct in your .env file.
        </p>
      </DashboardCard>
    );
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
            Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Welcome back,{' '}
            <span className="text-[var(--color-brand)]">
              {getUserDisplayName(user)}
            </span>
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {dashboard.roles.length
              ? `Viewing as ${formatCanonicalRole(dashboard.roles[0]?.canonicalRole)}`
              : 'Campus Member'}{' '}
            - Here is your overview.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {dashboard.roles.slice(0, 4).map((role) => (
            <span
              key={role._id}
              className="rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-brand)_12%,transparent)] px-3 py-1.5 text-sm font-medium text-[var(--color-brand)]"
            >
              {formatCanonicalRole(role.canonicalRole)}
            </span>
          ))}
        </div>
      </section>

      <StatsSection dashboard={dashboard} />

      {can('APPROVE_STEP') && (
        <ApprovalSection items={dashboard.approvalItems} />
      )}

      {can('CREATE_EVENT') && (
        <EventSection events={dashboard.createdEvents} />
      )}

      {can('MANAGE_MEMBERS') && (
        <MemberSection
          memberships={dashboard.memberships}
          pending={dashboard.pendingMemberships}
        />
      )}

      {can('VIEW_APPROVALS') && (
        <AuditSection feed={dashboard.auditFeed} />
      )}

      {isAdmin && (
        <OrgSection
          organizations={dashboard.organizations}
          stats={dashboard.stats}
          templates={dashboard.governanceTemplates}
        />
      )}

      <MembershipsSection
        memberships={dashboard.memberships}
        upcomingEvents={dashboard.upcomingEvents}
        discoveredClubs={dashboard.discoveredClubs}
      />
    </div>
  );
}

export default DashboardPage;

