import StatCard from '@dashboard/components/StatCard';
import { usePermission, useIsAdmin } from '@hooks/usePermission';

function StatsSection({ dashboard }) {
  const stats = dashboard.stats;
  const { can } = usePermission(dashboard.roles ?? []);
  const isAdmin = useIsAdmin();

  let statItems;

  if (isAdmin) {
    statItems = [
      { icon: 'dashboard', label: 'Org Units', theme: 'brand', value: stats.organizationUnits },
      { icon: 'clubs', label: 'Active Clubs', theme: 'success', value: stats.activeClubs },
      { icon: 'societies', label: 'Public Societies', theme: 'neutral', value: stats.publicSocieties },
      { icon: 'audit', label: 'Audit Feed Items', theme: 'danger', value: stats.auditFeedItems },
    ];
  } else if (can('APPROVE_STEP')) {
    statItems = [
      { icon: 'approvals', label: 'Pending Approvals', theme: 'brand', value: stats.approvalsPending },
      { icon: 'profile', label: 'My Roles', theme: 'neutral', value: stats.myRoles },
      { icon: 'audit', label: 'Audit Items', theme: 'success', value: stats.auditFeedItems },
      { icon: 'dashboard', label: 'Org Units', theme: 'danger', value: stats.organizationUnits },
    ];
  } else if (can('MANAGE_MEMBERS')) {
    statItems = [
      { icon: 'clubs', label: 'Managed Clubs', theme: 'brand', value: stats.managedClubs },
      { icon: 'memberships', label: 'Pending Reviews', theme: 'neutral', value: stats.pendingMembershipReviews },
      { icon: 'events', label: 'Created Events', theme: 'success', value: stats.createdEvents },
      { icon: 'approvals', label: 'Pending Approvals', theme: 'danger', value: stats.approvalsPending },
    ];
  } else {
    statItems = [
      { icon: 'memberships', label: 'Active Memberships', theme: 'brand', value: stats.membershipsActive },
      { icon: 'approvals', label: 'Pending Apps', theme: 'neutral', value: stats.membershipsPending },
      { icon: 'events', label: 'Upcoming Events', theme: 'success', value: stats.upcomingEvents },
      { icon: 'clubs', label: 'Clubs to Explore', theme: 'danger', value: stats.clubs },
    ];
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statItems.map((item) => (
        <StatCard
          icon={item.icon}
          key={item.label}
          label={item.label}
          theme={item.theme}
          value={item.value}
        />
      ))}
    </div>
  );
}

export default StatsSection;
