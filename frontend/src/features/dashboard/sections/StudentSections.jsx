import ClubCard from '@club/components/ClubCard';
import EventCard from '@club/components/EventCard';
import MemberCard from '@club/components/MemberCard';
import DashboardCard from '@dashboard/components/DashboardCard';
import StatCard from '@dashboard/components/StatCard';

function StudentSections({ dashboard }) {
  const membershipPreview = dashboard.memberships.slice(0, 3);
  const eventPreview = dashboard.upcomingEvents.slice(0, 3);
  const clubPreview = dashboard.discoveredClubs.slice(0, 2);
  const societyPreview = dashboard.societies.slice(0, 2);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-4">
        <StatCard
          icon="memberships"
          label="Active memberships"
          value={dashboard.stats.membershipsActive}
        />
        <StatCard
          icon="approvals"
          label="Pending applications"
          theme="neutral"
          value={dashboard.stats.membershipsPending}
        />
        <StatCard
          icon="events"
          label="Upcoming events"
          theme="success"
          value={dashboard.stats.upcomingEvents}
        />
        <StatCard
          icon="clubs"
          label="Clubs to explore"
          theme="danger"
          value={dashboard.stats.clubs}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DashboardCard actionLabel="View All" icon="memberships" title="My Memberships">
          <div className="space-y-3">
            {membershipPreview.length ? (
              membershipPreview.map((membership) => (
                <MemberCard key={membership._id} membership={membership} />
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                No memberships found yet. Explore clubs and societies from the sidebar next.
              </p>
            )}
          </div>
        </DashboardCard>

        <DashboardCard actionLabel="View All" icon="events" title="Upcoming Events">
          <div className="space-y-3">
            {eventPreview.length ? (
              eventPreview.map((event) => <EventCard key={event._id} event={event} />)
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                There are no public upcoming events right now.
              </p>
            )}
          </div>
        </DashboardCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <DashboardCard actionLabel="Explore" icon="clubs" title="Suggested Clubs">
          <div className="grid gap-3 md:grid-cols-2">
            {clubPreview.length ? (
              clubPreview.map((club) => (
                <ClubCard key={club._id} club={club} meta={club.tags?.[0] || 'Open'} />
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                No public clubs are available yet.
              </p>
            )}
          </div>
        </DashboardCard>

        <DashboardCard actionLabel="Explore" icon="societies" title="Societies">
          <div className="grid gap-3 md:grid-cols-2">
            {societyPreview.length ? (
              societyPreview.map((society) => (
                <ClubCard key={society._id} club={society} meta={society.code || 'Public'} />
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                No public societies are available yet.
              </p>
            )}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}

export default StudentSections;
