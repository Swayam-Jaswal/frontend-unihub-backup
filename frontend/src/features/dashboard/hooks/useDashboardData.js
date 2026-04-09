import { useMemo } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { selectUser } from '@auth/authSlice';
import { getApprovalDashboard } from '@club/approvals/approvals.api';
import { getAuditFeed, getUserAuditHistory } from '@club/audit/audit.api';
import { getClubs, getSocieties, getUpcomingEvents } from '@club/discovery.api';
import { getEvents } from '@club/events/events.api';
import { getGovernanceTemplates } from '@club/governance/governance.api';
import { getMyMemberships, getPendingMemberships } from '@club/memberships/memberships.api';
import { getOrganizationTree } from '@club/organizations.api';
import { getRolesForUser } from '@club/roles.api';
import {
  formatCanonicalRole,
  resolveDashboardAccess,
} from '@dashboard/utils/dashboardAccess';

function toArrayResult(result) {
  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result?.data)) {
    return result.data;
  }

  if (Array.isArray(result?.users)) {
    return result.users;
  }

  return [];
}

function toPagedItems(result) {
  return {
    items: Array.isArray(result?.data) ? result.data : [],
    total: result?.total ?? 0,
    page: result?.page ?? 1,
    totalPages: result?.totalPages ?? 1,
  };
}

function sortByNewest(items, key) {
  return [...items].sort((left, right) => new Date(right[key]) - new Date(left[key]));
}

export function useDashboardData() {
  const user = useSelector(selectUser);

  const queryResults = useQueries({
    queries: [
      {
        queryKey: ['dashboard', 'roles', user?.id],
        queryFn: () => getRolesForUser(user.id),
        enabled: !!user?.id,
      },
      {
        queryKey: ['dashboard', 'organizations'],
        queryFn: getOrganizationTree,
        enabled: !!user?.id,
      },
      {
        queryKey: ['dashboard', 'memberships', user?.id],
        queryFn: getMyMemberships,
        enabled: !!user?.id,
      },
      {
        queryKey: ['dashboard', 'discover', 'events'],
        queryFn: () => getUpcomingEvents(6),
        enabled: !!user?.id,
      },
      {
        queryKey: ['dashboard', 'discover', 'clubs'],
        queryFn: () => getClubs(6),
        enabled: !!user?.id,
      },
      {
        queryKey: ['dashboard', 'discover', 'societies'],
        queryFn: getSocieties,
        enabled: !!user?.id,
      },
      {
        queryKey: ['dashboard', 'events', user?.id],
        queryFn: () => getEvents({ createdBy: user.id, limit: 6 }),
        enabled: !!user?.id,
      },
      {
        queryKey: ['dashboard', 'approvals', user?.id],
        queryFn: getApprovalDashboard,
        enabled: !!user?.id,
      },
      {
        queryKey: ['dashboard', 'audit', 'user', user?.id],
        queryFn: () => getUserAuditHistory(user.id, 6),
        enabled: !!user?.id,
      },
    ],
  });

  const [
    rolesQuery,
    organizationsQuery,
    membershipsQuery,
    upcomingEventsQuery,
    clubsQuery,
    societiesQuery,
    createdEventsQuery,
    approvalsQuery,
    userAuditQuery,
  ] = queryResults;

  const access = useMemo(
    () => resolveDashboardAccess(user, toArrayResult(rolesQuery.data)),
    [rolesQuery.data, user],
  );

  const manageableClubIds = useMemo(
    () =>
      toArrayResult(rolesQuery.data)
        .filter((role) =>
          ['CLUB_LEAD', 'CO_LEAD', 'COORDINATOR'].includes(role.canonicalRole),
        )
        .map((role) => role.scopeId),
    [rolesQuery.data],
  );

  const pendingMembershipQueries = useQueries({
    queries: manageableClubIds.map((clubId) => ({
      queryKey: ['dashboard', 'memberships', 'pending', clubId],
      queryFn: () => getPendingMemberships(clubId),
      enabled: access.dashboardKind === 'clubLead',
    })),
  });

  const auditFeedQuery = useQuery({
    queryKey: ['dashboard', 'audit', 'feed'],
    queryFn: () => getAuditFeed(6),
    enabled: ['approver', 'admin'].includes(access.dashboardKind),
  });

  const governanceTemplatesQuery = useQuery({
    queryKey: ['dashboard', 'governance', 'templates'],
    queryFn: getGovernanceTemplates,
    enabled: ['approver', 'admin'].includes(access.dashboardKind),
  });

  const isLoading =
    queryResults.some((query) => query.isLoading) ||
    pendingMembershipQueries.some((query) => query.isLoading) ||
    auditFeedQuery.isLoading ||
    governanceTemplatesQuery.isLoading;

  const error =
    queryResults.find((query) => query.error)?.error ||
    pendingMembershipQueries.find((query) => query.error)?.error ||
    auditFeedQuery.error ||
    governanceTemplatesQuery.error ||
    null;

  return useMemo(() => {
    const organizations = toArrayResult(organizationsQuery.data);
    const orgById = new Map(
      organizations.map((organization) => [organization._id, organization]),
    );
    const roles = sortByNewest(toArrayResult(rolesQuery.data), 'assignedAt');
    const memberships = sortByNewest(toArrayResult(membershipsQuery.data), 'appliedAt');
    const upcomingEvents = toPagedItems(upcomingEventsQuery.data).items;
    const discoveredClubs = toPagedItems(clubsQuery.data).items;
    const societies = toArrayResult(societiesQuery.data);
    const createdEvents = toPagedItems(createdEventsQuery.data).items;
    const approvalSteps = toArrayResult(approvalsQuery.data);
    const userAudit = toPagedItems(userAuditQuery.data).items;
    const auditFeed = toPagedItems(auditFeedQuery.data).items;
    const governanceTemplates = toArrayResult(governanceTemplatesQuery.data);

    const membershipsWithOrg = memberships.map((membership) => ({
      ...membership,
      club: orgById.get(membership.clubId) ?? null,
    }));
    const enrichedUpcomingEvents = upcomingEvents.map((event) => ({
      ...event,
      clubName: orgById.get(event.organizingClubId)?.name ?? null,
    }));
    const enrichedCreatedEvents = createdEvents.map((event) => ({
      ...event,
      clubName: orgById.get(event.organizingClubId)?.name ?? null,
    }));

    const managedClubs = roles
      .filter((role) => manageableClubIds.includes(role.scopeId))
      .map((role) => ({
        ...role,
        scope: orgById.get(role.scopeId) ?? null,
        roleLabel: formatCanonicalRole(role.canonicalRole),
      }));

    const pendingMemberships = pendingMembershipQueries.flatMap((query, index) => {
      const clubId = manageableClubIds[index];
      const club = orgById.get(clubId) ?? null;

      return toArrayResult(query.data).map((membership) => ({
        ...membership,
        club,
      }));
    });

    const approvalItems = approvalSteps.map((step) => ({
      ...step,
      canonicalRoleLabel: formatCanonicalRole(step.canonicalRole),
      eventTitle: step.eventTitle || `Event ${step.eventId?.slice?.(-6) ?? ''}`,
    }));

    const stats = {
      membershipsActive: memberships.filter((membership) => membership.status === 'ACTIVE').length,
      membershipsPending: memberships.filter((membership) => membership.status === 'PENDING').length,
      managedClubs: manageableClubIds.length,
      myRoles: roles.length,
      upcomingEvents: enrichedUpcomingEvents.length,
      approvalsPending: approvalItems.length,
      createdEvents: enrichedCreatedEvents.length,
      societies: societies.length,
      clubs: discoveredClubs.length,
      auditItems: userAudit.length,
      governanceTemplates: governanceTemplates.length,
      organizationUnits: organizations.length,
      activeClubs: organizations.filter(
        (organization) => organization.type === 'CLUB' && organization.isActive,
      ).length,
      publicSocieties: organizations.filter(
        (organization) => organization.type === 'SOCIETY' && organization.isPublic,
      ).length,
      auditFeedItems: auditFeed.length,
      pendingMembershipReviews: pendingMemberships.length,
    };

    return {
      user,
      access,
      isLoading,
      error,
      stats,
      roles,
      organizations,
      memberships: membershipsWithOrg,
      upcomingEvents: enrichedUpcomingEvents,
      discoveredClubs,
      societies,
      createdEvents: enrichedCreatedEvents,
      approvalItems,
      userAudit,
      auditFeed,
      governanceTemplates,
      managedClubs,
      pendingMemberships,
    };
  }, [
    access,
    approvalsQuery.data,
    auditFeedQuery.data,
    clubsQuery.data,
    createdEventsQuery.data,
    error,
    governanceTemplatesQuery.data,
    isLoading,
    manageableClubIds,
    membershipsQuery.data,
    organizationsQuery.data,
    pendingMembershipQueries,
    rolesQuery.data,
    societiesQuery.data,
    upcomingEventsQuery.data,
    user,
    userAuditQuery.data,
  ]);
}
