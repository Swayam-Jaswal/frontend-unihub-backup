import { useQueries, useQuery } from '@tanstack/react-query';
import { getMyMemberships, getPendingMemberships } from '@club/memberships/memberships.api';

function toArray(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;
  return [];
}

export function useMemberships({ enabled = true, managedClubIds = [] } = {}) {
  const membershipsQuery = useQuery({
    queryKey: ['club-service', 'memberships', 'my'],
    queryFn: getMyMemberships,
    enabled,
  });

  const pendingQueries = useQueries({
    queries: managedClubIds.map((clubId) => ({
      queryKey: ['club-service', 'memberships', 'pending', clubId],
      queryFn: () => getPendingMemberships(clubId),
      enabled: enabled && !!clubId,
    })),
  });

  return {
    data: {
      memberships: toArray(membershipsQuery.data),
      pendingMemberships: pendingQueries.flatMap((query, index) =>
        toArray(query.data).map((membership) => ({
          ...membership,
          sourceClubId: managedClubIds[index],
        })),
      ),
    },
    error: membershipsQuery.error || pendingQueries.find((query) => query.error)?.error || null,
    isLoading: membershipsQuery.isLoading || pendingQueries.some((query) => query.isLoading),
  };
}

export default useMemberships;
