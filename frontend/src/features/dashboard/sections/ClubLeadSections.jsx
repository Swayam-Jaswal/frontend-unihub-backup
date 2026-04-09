import ApprovalCard from '@club/components/ApprovalCard';
import ClubCard from '@club/components/ClubCard';
import EventCard from '@club/components/EventCard';
import MemberCard from '@club/components/MemberCard';
import DashboardCard from '@dashboard/components/DashboardCard';
import StatCard from '@dashboard/components/StatCard';

function ClubLeadSections({ dashboard }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-4">
        <StatCard
          icon="clubs"
          label="Managed clubs"
          value={dashboard.stats.managedClubs}
        />
        <StatCard
          icon="events"
          label="Created events"
          theme="success"
          value={dashboard.stats.createdEvents}
        />
        <StatCard
          icon="memberships"
          label="Pending membership reviews"
          theme="neutral"
          value={dashboard.stats.pendingMembershipReviews}
        />
        <StatCard
          icon="approvals"
          label="Pending approvals"
          theme="danger"
          value={dashboard.stats.approvalsPending}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <DashboardCard actionLabel="Manage" icon="clubs" title="Managed Clubs">
          <div className="space-y-3">
            {dashboard.managedClubs.length ? (
              dashboard.managedClubs.map((clubRole) => (
                <ClubCard
                  key={clubRole._id}
                  club={clubRole.scope || { name: 'Club scope', type: 'CLUB' }}
                  meta={clubRole.roleLabel}
                />
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                No active club-lead assignments were found.
              </p>
            )}
          </div>
        </DashboardCard>

        <DashboardCard actionLabel="Review" icon="memberships" title="Membership Queue">
          <div className="space-y-3">
            {dashboard.pendingMemberships.length ? (
              dashboard.pendingMemberships.map((membership) => (
                <MemberCard key={membership._id} membership={membership} />
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                Your managed clubs do not have pending applications right now.
              </p>
            )}
          </div>
        </DashboardCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <DashboardCard actionLabel="Open Events" icon="events" title="Event Pipeline">
          <div className="space-y-3">
            {dashboard.createdEvents.length ? (
              dashboard.createdEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                You have not created any events yet in club-service.
              </p>
            )}
          </div>
        </DashboardCard>

        <DashboardCard actionLabel="Review" icon="approvals" title="Approval Attention">
          <div className="space-y-3">
            {dashboard.approvalItems.length ? (
              dashboard.approvalItems.slice(0, 4).map((approval) => (
                <ApprovalCard approval={approval} key={approval._id} />
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                There are no approval steps waiting on you.
              </p>
            )}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}

export default ClubLeadSections;
