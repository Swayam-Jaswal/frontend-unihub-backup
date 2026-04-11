import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Loader from '@ds/components/Loader';
import EmptyState from '@ds/components/EmptyState';
import PageHeader from '@ds/components/PageHeader';
import Avatar from '@ds/components/Avatar';
import StatusBadge from '@ds/components/StatusBadge';
import Modal from '@ds/components/Modal';
import Button from '@ds/components/Button';
import { useMemberships } from '@club/hooks/useMemberships';
import { useLeaveClub } from '@club/hooks/useLeaveClub';
import { useOrganizationTree } from '@club/hooks/useDiscovery';

function MembershipsPage() {
  useOutletContext();

  const [confirmLeave, setConfirmLeave] = useState(null);
  const membershipsQuery = useMemberships();
  const orgTree = useOrganizationTree();
  const leaveClub = useLeaveClub();

  const { byId } = orgTree.data ?? { byId: new Map() };
  const memberships = membershipsQuery.data?.memberships ?? [];

  const getClubName = (clubId) => byId.get(String(clubId))?.name ?? 'Club';
  const getSocietyName = (clubId) => {
    const club = byId.get(String(clubId));
    if (!club?.parentId) return null;
    return byId.get(String(club.parentId))?.name ?? null;
  };
  const getSchoolName = (clubId) => {
    const club = byId.get(String(clubId));
    const society = club?.parentId ? byId.get(String(club.parentId)) : null;
    const school = society?.parentId ? byId.get(String(society.parentId)) : null;
    return school?.name ?? null;
  };

  const isLoading = membershipsQuery.isLoading || orgTree.isLoading;

  return (
    <div className="space-y-8">
      <PageHeader title="Memberships" description="Your club memberships and their status." />

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader size="lg" /></div>
      ) : memberships.length === 0 ? (
        <EmptyState
          icon="memberships"
          title="No memberships yet"
          description="Explore clubs and apply to join."
        />
      ) : (
        <>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
            My Clubs
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {memberships.map((membership) => {
              const clubName = getClubName(membership.clubId);
              const societyName = getSocietyName(membership.clubId);
              const schoolName = getSchoolName(membership.clubId);

              return (
                <article key={membership._id} className="card-surface p-5">
                  <div className="flex items-start gap-4">
                    <Avatar name={clubName} size="lg" />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                        {clubName}
                      </h3>
                      {societyName ? (
                        <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
                          Society: {societyName}
                        </p>
                      ) : null}
                      {schoolName ? (
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          School: {schoolName}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <StatusBadge status={membership.status} type="event" />
                    {membership.status === 'ACTIVE' ? (
                      <Button
                        className="h-auto px-0 py-0 text-[var(--color-danger)] hover:bg-transparent hover:underline"
                        onClick={() => setConfirmLeave({ clubId: membership.clubId, clubName })}
                        size="sm"
                        variant="ghost"
                      >
                        Leave Club
                      </Button>
                    ) : null}
                  </div>

                  {membership.status === 'PENDING' ? (
                    <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                      Application under review
                    </p>
                  ) : null}
                  {membership.status === 'REJECTED' && membership.rejectionReason ? (
                    <p className="mt-2 text-xs text-[var(--color-danger)]">
                      Reason: {membership.rejectionReason}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </>
      )}

      <Modal
        open={!!confirmLeave}
        onClose={() => setConfirmLeave(null)}
        title="Leave Club"
      >
        <p className="text-sm text-[var(--color-text-secondary)]">
          Are you sure you want to leave{' '}
          <strong className="text-[var(--color-text-primary)]">
            {confirmLeave?.clubName}
          </strong>
          ? You will need to reapply to rejoin.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setConfirmLeave(null)}>Cancel</Button>
          <Button
            isLoading={leaveClub.isPending}
            onClick={() => {
              leaveClub.mutate(confirmLeave.clubId, {
                onSuccess: () => setConfirmLeave(null),
              });
            }}
            style={{
              background: 'var(--color-danger)',
              color: 'var(--color-text-on-brand)',
            }}
          >
            Leave Club
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default MembershipsPage;
