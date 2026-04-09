import { useOutletContext } from 'react-router-dom';
import Loader from '@ds/components/Loader';
import DashboardCard from '@dashboard/components/DashboardCard';
import AdminSections from '@dashboard/sections/AdminSections';
import ApproverSections from '@dashboard/sections/ApproverSections';
import ClubLeadSections from '@dashboard/sections/ClubLeadSections';
import StudentSections from '@dashboard/sections/StudentSections';
import { formatCanonicalRole } from '@dashboard/utils/dashboardAccess';
import { getUserDisplayName } from '@dashboard/utils/userPresentation';

const sectionMap = {
  admin: AdminSections,
  approver: ApproverSections,
  clubLead: ClubLeadSections,
  student: StudentSections,
};

function DashboardPage() {
  const dashboard = useOutletContext();
  const SectionComponent = sectionMap[dashboard.access.dashboardKind] || StudentSections;

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
          We could not load the dashboard data from club-service right now. Please
          verify your API base URLs and that the auth and club-service endpoints are up.
        </p>
      </DashboardCard>
    );
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
              Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
              Welcome back, {getUserDisplayName(dashboard.user)}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--color-text-secondary)]">
              Viewing as {dashboard.access.effectiveRoleLabel}. This dashboard is resolved
              from your auth `userType`, active PBAC role assignments from
              `club-service`, and any JWT permissions available on the frontend.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-brand)_12%,transparent)] px-3 py-2 text-sm font-medium text-[var(--color-brand)]">
              {dashboard.access.effectiveRoleLabel}
            </span>
            {dashboard.roles.slice(0, 3).map((role) => (
              <span
                className="rounded-full border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-secondary)]"
                key={role._id}
              >
                {formatCanonicalRole(role.canonicalRole)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SectionComponent dashboard={dashboard} />
    </div>
  );
}

export default DashboardPage;
